import React, { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const hasError = Boolean(error)

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-secondary-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-secondary-500 text-sm" aria-hidden="true">
                {leftIcon}
              </span>
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset transition-colors',
              'placeholder:text-secondary-400 focus-ring',
              'text-secondary-900 bg-white',
              leftIcon ? 'pl-10' : 'pl-3',
              rightIcon ? 'pr-10' : 'pr-3',
              hasError 
                ? 'ring-red-300 focus:ring-red-500' 
                : 'ring-secondary-300 focus:ring-primary-500',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : 
              helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-secondary-500 text-sm" aria-hidden="true">
                {rightIcon}
              </span>
            </div>
          )}
        </div>
        
        {error && (
          <p 
            id={`${inputId}-error`}
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p 
            id={`${inputId}-helper`}
            className="mt-1 text-sm text-secondary-500"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'