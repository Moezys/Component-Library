import type { Meta, StoryObj } from '@storybook/react'
import { Table } from './Table'
import { Button } from '../Button/Button'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible table component for displaying structured data with support for custom rendering, loading states, and interactive rows.'
      }
    }
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Pending' },
]

const basicColumns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
]

const customColumns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { 
    key: 'role', 
    header: 'Role',
    render: (value: any) => (
      <span style={{ 
        padding: '0.25rem 0.75rem', 
        borderRadius: '9999px',
        fontSize: '0.875rem',
        backgroundColor: value === 'Admin' ? '#dbeafe' : '#f3f4f6',
        color: value === 'Admin' ? '#1e40af' : '#374151'
      }}>
        {value}
      </span>
    )
  },
  { 
    key: 'status', 
    header: 'Status',
    render: (value: any) => (
      <span style={{ 
        padding: '0.25rem 0.75rem', 
        borderRadius: '9999px',
        fontSize: '0.875rem',
        backgroundColor: 
          value === 'Active' ? '#d1fae5' : 
          value === 'Inactive' ? '#fee2e2' : '#fef3c7',
        color: 
          value === 'Active' ? '#065f46' : 
          value === 'Inactive' ? '#991b1b' : '#92400e'
      }}>
        {value}
      </span>
    )
  },
  {
    key: 'id',
    header: 'Actions',
    render: (value: any, row: any) => (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button size="sm" variant="outline">Edit</Button>
        <Button size="sm" variant="destructive">Delete</Button>
      </div>
    )
  },
]

export const Basic: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    caption: 'User management table',
  },
}

export const WithCustomRendering: Story = {
  args: {
    data: sampleData,
    columns: customColumns,
    caption: 'User management table with custom styling',
  },
}

export const Striped: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    striped: true,
    caption: 'Striped table for better readability',
  },
}

export const Hoverable: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    hoverable: true,
    caption: 'Hoverable rows table',
  },
}

export const ClickableRows: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    hoverable: true,
    onRowClick: (row: any) => alert(`Clicked on ${row.name}`),
    caption: 'Table with clickable rows',
  },
}

export const Empty: Story = {
  args: {
    data: [],
    columns: basicColumns,
    emptyMessage: 'No users found',
  },
}

export const Loading: Story = {
  args: {
    data: [],
    columns: basicColumns,
    loading: true,
  },
}

export const CustomEmpty: Story = {
  args: {
    data: [],
    columns: basicColumns,
    emptyMessage: '🔍 No matching records found. Try adjusting your search criteria.',
  },
}