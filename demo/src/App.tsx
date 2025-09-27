import React, { useState } from 'react'
import { 
  Button, 
  Input, 
  Textarea, 
  Select, 
  Modal, 
  Table, 
  Toast, 
  IconButton,
  themes,
  type Theme,
  type TableColumn
} from '../../src/index'
import { 
  Plus, 
  Settings, 
  Search, 
  Mail, 
  Edit, 
  Trash2, 
  Users, 
  BarChart3, 
  Calendar,
  Bell
} from 'lucide-react'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  joinDate: string
}

const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', joinDate: '2023-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive', joinDate: '2023-03-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Admin', status: 'Active', joinDate: '2023-04-05' },
]

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'user', label: 'User' },
]

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('blue')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    bio: ''
  })

  const tableColumns: TableColumn<User>[] = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { 
      key: 'role', 
      header: 'Role',
      render: (value: string) => (
        <span style={{ 
          padding: '0.25rem 0.75rem', 
          borderRadius: '9999px',
          fontSize: '0.875rem',
          backgroundColor: value === 'Admin' ? '#dbeafe' : value === 'Editor' ? '#fef3c7' : '#f3f4f6',
          color: value === 'Admin' ? '#1e40af' : value === 'Editor' ? '#92400e' : '#374151'
        }}>
          {value}
        </span>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <span style={{ 
          padding: '0.25rem 0.75rem', 
          borderRadius: '9999px',
          fontSize: '0.875rem',
          backgroundColor: value === 'Active' ? '#d1fae5' : '#fee2e2',
          color: value === 'Active' ? '#065f46' : '#991b1b'
        }}>
          {value}
        </span>
      )
    },
    { key: 'joinDate', header: 'Join Date' },
    {
      key: 'id',
      header: 'Actions',
      render: (_, row) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <IconButton 
            icon={<Edit size={14} />} 
            size="sm" 
            variant="outline"
            aria-label={`Edit ${row.name}`}
          />
          <IconButton 
            icon={<Trash2 size={14} />} 
            size="sm" 
            variant="destructive"
            aria-label={`Delete ${row.name}`}
          />
        </div>
      )
    },
  ]

  const stats = [
    { title: 'Total Users', value: '2,543', icon: Users, change: '+12%' },
    { title: 'Revenue', value: '$45,231', icon: BarChart3, change: '+18%' },
    { title: 'Orders', value: '1,234', icon: Calendar, change: '+8%' },
    { title: 'Notifications', value: '23', icon: Bell, change: '-5%' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form data:', formData)
    setIsModalOpen(false)
    setShowToast(true)
  }

  return (
    <div data-theme={theme === 'blue' ? undefined : theme} style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
            Dashboard Demo
          </h1>
          <p style={{ color: '#6b7280', margin: '0.25rem 0 0 0' }}>
            Component library demonstration
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Select
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
            options={themes.map(t => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) }))}
            aria-label="Select theme"
          />
          <IconButton 
            icon={<Settings size={18} />} 
            variant="outline"
            aria-label="Settings"
          />
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '2rem' }}>
        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ 
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0 0 0.5rem 0' }}>
                    {stat.title}
                  </p>
                  <p style={{ fontSize: '2rem', fontWeight: '600', margin: 0 }}>
                    {stat.value}
                  </p>
                  <p style={{ 
                    color: stat.change.startsWith('+') ? '#059669' : '#dc2626', 
                    fontSize: '0.875rem',
                    margin: '0.5rem 0 0 0'
                  }}>
                    {stat.change}
                  </p>
                </div>
                <div style={{ 
                  padding: '0.75rem',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '0.5rem'
                }}>
                  <stat.icon size={24} style={{ color: '#6b7280' }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls Section */}
        <div style={{ 
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0 0 1rem 0' }}>
            Quick Actions
          </h2>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <Button 
              leftIcon={<Plus size={16} />}
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              style={{ 
                backgroundColor: '#2563eb', 
                color: 'white',
                border: '1px solid #2563eb'
              }}
            >
              Add User
            </Button>
            <Button 
              variant="outline"
              style={{ borderWidth: '1px', borderStyle: 'solid' }}
            >
              Export Data
            </Button>
            <Button 
              variant="outline"
              style={{ borderWidth: '1px', borderStyle: 'solid' }}
            >
              Refresh
            </Button>
            <Button 
              variant="secondary"
              onClick={() => setShowToast(true)}
            >
              Show Notification
            </Button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <Input 
              label="Search Users"
              placeholder="Search by name or email..."
              leftIcon={<Search size={16} />}
            />
            <Select
              label="Filter by Role"
              options={[
                { value: '', label: 'All Roles' },
                ...roleOptions
              ]}
            />
          </div>
        </div>

        {/* Users Table */}
        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
              Users
            </h2>
          </div>
          
          <Table
            data={sampleUsers}
            columns={tableColumns}
            hoverable
            onRowClick={(user) => console.log('Clicked user:', user)}
            caption="User management table"
          />
        </div>
      </main>

      {/* Add User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New User"
        size="md"
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input
            label="Full Name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
          
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            leftIcon={<Mail size={16} />}
            required
          />
          
          <Select
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
            options={roleOptions}
            placeholder="Select a role"
            required
          />
          
          <Textarea
            label="Bio"
            placeholder="Optional bio..."
            value={formData.bio}
            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
            rows={3}
          />
          
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Add User
            </Button>
          </div>
        </form>
      </Modal>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message="Action completed successfully!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}

export default App