import React, { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    label,
    error,
    helperText,
    options,
    placeholder,
    id,
    ...props 
  }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`
    const hasError = Boolean(error)

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={selectId}
            className="block text-sm font-medium text-secondary-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset transition-colors',
              'text-secondary-900 bg-white appearance-none',
              'focus-ring pr-10',
              hasError 
                ? 'ring-red-300 focus:ring-red-500' 
                : 'ring-secondary-300 focus:ring-primary-500',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${selectId}-error` : 
              helperText ? `${selectId}-helper` : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Custom dropdown arrow */}
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-secondary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        
        {error && (
          <p 
            id={`${selectId}-error`}
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p 
            id={`${selectId}-helper`}
            className="mt-1 text-sm text-secondary-500"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'