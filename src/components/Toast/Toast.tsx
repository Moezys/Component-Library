import React, { useEffect, useState } from 'react'
import { cn } from '../../utils/cn'

export interface ToastProps {
  id?: string
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  onClose?: () => void
  closable?: boolean
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
}

const toastTypes = {
  success: {
    bg: 'bg-green-50 border-green-200',
    text: 'text-green-800',
    icon: (
      <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )
  },
  error: {
    bg: 'bg-red-50 border-red-200',
    text: 'text-red-800',
    icon: (
      <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    )
  },
  warning: {
    bg: 'bg-yellow-50 border-yellow-200',
    text: 'text-yellow-800',
    icon: (
      <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    )
  },
  info: {
    bg: 'bg-blue-50 border-blue-200',
    text: 'text-blue-800',
    icon: (
      <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    )
  }
}

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 5000,
  onClose,
  closable = true,
  position = 'top-right'
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onClose?.(), 200) // Allow fade out animation
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose?.(), 200)
  }

  if (!isVisible) {
    return null
  }

  const typeConfig = toastTypes[type]

  return (
    <div
      className={cn(
        'fixed z-50 max-w-sm w-full pointer-events-auto',
        'transform transition-all duration-200 ease-in-out',
        positionClasses[position],
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className={cn(
        'rounded-lg border p-4 shadow-lg',
        typeConfig.bg
      )}>
        <div className="flex items-start">
          <div className="flex-shrink-0" aria-hidden="true">
            {typeConfig.icon}
          </div>
          <div className="ml-3 flex-1">
            <p className={cn('text-sm font-medium', typeConfig.text)}>
              {message}
            </p>
          </div>
          {closable && (
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={handleClose}
                className={cn(
                  'inline-flex rounded-md p-1.5 focus-ring',
                  typeConfig.text,
                  'hover:opacity-75'
                )}
                aria-label="Close notification"
              >
                <svg
                  className="h-4 w-4"
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
        </div>
      </div>
    </div>
  )
}

Toast.displayName = 'Toast'