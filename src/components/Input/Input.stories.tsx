import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
import { Search, Mail } from 'lucide-react'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible input component with support for labels, icons, error states, and helper text. Fully accessible with proper ARIA attributes.'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url', 'number'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Password must be at least 8 characters long',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
}

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leftIcon: <Search size={16} />,
  },
}

export const WithRightIcon: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    rightIcon: <Mail size={16} />,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This is disabled',
    disabled: true,
    defaultValue: 'Cannot edit this',
  },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
      <Input placeholder="Default state" />
      <Input 
        label="With Label" 
        placeholder="Enter text..."
        helperText="This is helper text"
      />
      <Input 
        label="Error State" 
        placeholder="Enter text..."
        error="This field is required"
        defaultValue="Invalid input"
      />
      <Input 
        label="With Icon" 
        placeholder="Search..."
        leftIcon={<Search size={16} />}
      />
      <Input 
        label="Disabled" 
        placeholder="Cannot edit"
        disabled
        defaultValue="Read only"
      />
    </div>
  ),
}