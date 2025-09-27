import React, { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    label,
    error,
    helperText,
    resize = 'vertical',
    id,
    ...props 
  }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    const hasError = Boolean(error)

    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize'
    }

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={textareaId}
            className="block text-sm font-medium text-secondary-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset transition-colors',
            'placeholder:text-secondary-400 focus-ring',
            'text-secondary-900 bg-white',
            'min-h-[80px]',
            resizeClasses[resize],
            hasError 
              ? 'ring-red-300 focus:ring-red-500' 
              : 'ring-secondary-300 focus:ring-primary-500',
            className
          )}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${textareaId}-error` : 
            helperText ? `${textareaId}-helper` : undefined
          }
          {...props}
        />
        
        {error && (
          <p 
            id={`${textareaId}-error`}
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p 
            id={`${textareaId}-helper`}
            className="mt-1 text-sm text-secondary-500"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'