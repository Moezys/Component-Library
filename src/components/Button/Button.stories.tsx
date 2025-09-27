import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { Plus, Download, ArrowRight } from 'lucide-react'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states. Supports icons and loading states with proper accessibility features.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
    },
    size: {
      control: 'select', 
      options: ['sm', 'md', 'lg'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
}

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
}

export const Small: Story = {
  args: {
    children: 'Button',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    children: 'Button',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    children: 'Button',
    size: 'lg',
  },
}

export const WithLeftIcon: Story = {
  args: {
    children: 'Add Item',
    leftIcon: <Plus size={16} />,
  },
}

export const WithRightIcon: Story = {
  args: {
    children: 'Download',
    rightIcon: <Download size={16} />,
  },
}

export const WithBothIcons: Story = {
  args: {
    children: 'Continue',
    leftIcon: <Plus size={16} />,
    rightIcon: <ArrowRight size={16} />,
  },
}

export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}