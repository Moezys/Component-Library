import React, { useEffect, useRef } from 'react'
import { cn } from '../../utils/cn'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  className?: string
}

const modalSizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl'
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement
      
      // Focus the modal
      if (modalRef.current) {
        modalRef.current.focus()
      }
    } else {
      // Restore focus to the previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (!closeOnEscape) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose, closeOnEscape])

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && closeOnOverlayClick) {
      onClose()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Trap focus within modal
    if (event.key === 'Tab') {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      
      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            event.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            event.preventDefault()
          }
        }
      }
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className={cn(
          'relative w-full bg-white rounded-lg shadow-xl',
          'animate-slide-in',
          modalSizes[size],
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-secondary-200">
            <h2 
              id="modal-title"
              className="text-lg font-semibold text-secondary-900"
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-secondary-400 hover:text-secondary-600 focus-ring rounded-sm"
              aria-label="Close modal"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.displayName = 'Modal'