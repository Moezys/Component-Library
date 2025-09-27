import React from 'react'
import { cn } from '../../utils/cn'

export interface TableColumn<T> {
  key: keyof T
  header: string
  render?: (value: T[keyof T], row: T) => React.ReactNode
  sortable?: boolean
  className?: string
}

export interface TableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  caption?: string
  className?: string
  emptyMessage?: string
  loading?: boolean
  onRowClick?: (row: T, index: number) => void
  striped?: boolean
  hoverable?: boolean
}

export function Table<T extends Record<string, any>>({
  data,
  columns,
  caption,
  className,
  emptyMessage = 'No data available',
  loading = false,
  onRowClick,
  striped = false,
  hoverable = false
}: TableProps<T>) {
  if (loading) {
    return (
      <div className="w-full p-8 text-center">
        <div className="inline-flex items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
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
          Loading...
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="w-full p-8 text-center text-secondary-500">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className={cn('w-full overflow-hidden rounded-lg shadow', className)}>
      <table className="w-full">
        {caption && (
          <caption className="sr-only">{caption}</caption>
        )}
        
        <thead className="bg-secondary-50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={cn(
                  'px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider',
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody className="bg-white divide-y divide-secondary-200">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={cn(
                striped && rowIndex % 2 === 1 && 'bg-secondary-50',
                hoverable && 'hover:bg-secondary-100',
                onRowClick && 'cursor-pointer focus:bg-secondary-100',
                'focus-ring'
              )}
              onClick={() => onRowClick?.(row, rowIndex)}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && onRowClick) {
                  e.preventDefault()
                  onRowClick(row, rowIndex)
                }
              }}
              tabIndex={onRowClick ? 0 : undefined}
              role={onRowClick ? 'button' : undefined}
            >
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900"
                >
                  {column.render 
                    ? column.render(row[column.key], row, rowIndex)
                    : String(row[column.key] || '')
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Table.displayName = 'Table'