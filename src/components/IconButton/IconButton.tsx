import React, { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon: React.ReactNode
  'aria-label': string
}

const iconButtonVariants = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm',
  secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white shadow-sm',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 bg-transparent',
  ghost: 'text-primary-600 hover:bg-primary-50 bg-transparent',
  destructive: 'bg-red-600 hover:bg-red-700 text-white shadow-sm'
}

const iconButtonSizes = {
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-3'
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    icon,
    disabled,
    'aria-label': ariaLabel,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading

    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-ring disabled:opacity-50 disabled:pointer-events-none',
          iconButtonVariants[variant],
          iconButtonSizes[size],
          className
        )}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-label={ariaLabel}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <span className="flex-shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'