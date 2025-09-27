# Button Component

A versatile button component with multiple variants, sizes, and states. Supports icons and loading states with proper accessibility features.

## Usage

```tsx
import { Button } from '@yourname/ui'

// Basic usage
<Button>Click me</Button>

// With variant and size
<Button variant="primary" size="lg">
  Large Primary Button
</Button>

// With icons
<Button leftIcon={<PlusIcon />}>
  Add Item
</Button>

// Loading state
<Button loading>
  Processing...
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the button |
| `loading` | `boolean` | `false` | Shows loading spinner and disables button |
| `leftIcon` | `React.ReactNode` | - | Icon to display on the left |
| `rightIcon` | `React.ReactNode` | - | Icon to display on the right |
| `disabled` | `boolean` | `false` | Disables the button |
| `children` | `React.ReactNode` | - | Button content |

All other HTML button attributes are supported.

## Variants

- **Primary**: The main call-to-action button
- **Secondary**: Secondary actions
- **Outline**: Outlined style for less prominent actions
- **Ghost**: Minimal style for subtle actions
- **Destructive**: For dangerous actions like delete

## Accessibility Features

- ✅ Keyboard navigation support (Tab, Enter, Space)
- ✅ Screen reader friendly with proper ARIA attributes
- ✅ Focus visible indicators
- ✅ Loading state announced to screen readers
- ✅ Disabled state properly communicated

## Keyboard Interactions

| Key | Action |
|-----|--------|
| `Tab` | Moves focus to/from the button |
| `Enter` or `Space` | Activates the button |

## Examples

### All Variants
```tsx
<div style={{ display: 'flex', gap: '1rem' }}>
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Delete</Button>
</div>
```

### With Icons
```tsx
<Button leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
  Add and Continue
</Button>
```

### Loading State
```tsx
<Button loading>
  Saving...
</Button>
```

### Custom Styling
```tsx
<Button 
  variant="primary" 
  size="lg"
  className="my-custom-class"
  style={{ minWidth: '200px' }}
>
  Custom Button
</Button>
```

## Theme Support

The Button component automatically adapts to the current theme. You can change themes using the theme provider or data attributes:

```tsx
<div data-theme="green">
  <Button variant="primary">Green Theme Button</Button>
</div>
```