import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { Button } from '../Button/Button'
import { useState } from 'react'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A fully accessible modal dialog component with focus management, keyboard navigation, and customizable content.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    closeOnOverlayClick: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const ModalDemo = (args: any) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export const Default: Story = {
  render: (args) => (
    <ModalDemo {...args}>
      <div>
        <p>This is the modal content. You can put any content here.</p>
        <div style={{ marginTop: '1rem' }}>
          <Button variant="outline" onClick={() => {}}>Cancel</Button>
          <Button style={{ marginLeft: '0.5rem' }} onClick={() => {}}>Confirm</Button>
        </div>
      </div>
    </ModalDemo>
  ),
  args: {
    title: 'Modal Title',
  },
}

export const WithoutTitle: Story = {
  render: (args) => (
    <ModalDemo {...args}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: '600' }}>
          Custom Header
        </h3>
        <p>This modal doesn't use the built-in title prop, but has a custom header instead.</p>
      </div>
    </ModalDemo>
  ),
  args: {},
}

export const SmallSize: Story = {
  render: (args) => (
    <ModalDemo {...args}>
      <p>This is a small modal. Perfect for simple confirmations or alerts.</p>
    </ModalDemo>
  ),
  args: {
    title: 'Small Modal',
    size: 'sm',
  },
}

export const LargeSize: Story = {
  render: (args) => (
    <ModalDemo {...args}>
      <div>
        <p>This is a large modal with more content space.</p>
        <p>You can use this for forms, detailed information, or any content that needs more room.</p>
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem' }}>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Example Form Content</h4>
          <p style={{ margin: 0, color: '#6b7280' }}>This could contain a form or other interactive elements.</p>
        </div>
      </div>
    </ModalDemo>
  ),
  args: {
    title: 'Large Modal',
    size: 'lg',
  },
}

export const NoOverlayClose: Story = {
  render: (args) => (
    <ModalDemo {...args}>
      <div>
        <p>This modal won't close when you click the overlay.</p>
        <p>You must use the close button or ESC key.</p>
      </div>
    </ModalDemo>
  ),
  args: {
    title: 'No Overlay Close',
    closeOnOverlayClick: false,
  },
}

export const NoEscapeClose: Story = {
  render: (args) => (
    <ModalDemo {...args}>
      <div>
        <p>This modal won't close when you press ESC.</p>
        <p>You must use the close button or click the overlay.</p>
      </div>
    </ModalDemo>
  ),
  args: {
    title: 'No ESC Close',
    closeOnEscape: false,
  },
}