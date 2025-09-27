# Input Component

A flexible input component with support for labels, icons, error states, and helper text. Fully accessible with proper ARIA attributes.

## Usage

```tsx
import { Input } from '@yourname/ui'

// Basic usage
<Input placeholder="Enter text..." />

// With label and helper text
<Input 
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
/>

// With error state
<Input 
  label="Password"
  type="password"
  error="Password is required"
/>

// With icons
<Input 
  label="Search"
  placeholder="Search..."
  leftIcon={<SearchIcon />}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text for the input |
| `error` | `string` | - | Error message to display |
| `helperText` | `string` | - | Helper text shown below input |
| `leftIcon` | `React.ReactNode` | - | Icon to display on the left |
| `rightIcon` | `React.ReactNode` | - | Icon to display on the right |

All standard HTML input attributes are supported including `type`, `placeholder`, `disabled`, `required`, etc.

## Input Types

Supports all HTML input types:
- `text` (default)
- `email`
- `password`
- `search`
- `tel`
- `url`
- `number`
- And more...

## Accessibility Features

- ✅ Automatic ID generation for proper label association
- ✅ ARIA attributes for error states (`aria-invalid`, `aria-describedby`)
- ✅ Screen reader announcements for errors
- ✅ Focus visible indicators
- ✅ Proper contrast ratios
- ✅ Keyboard navigation support

## Keyboard Interactions

| Key | Action |
|-----|--------|
| `Tab` | Moves focus to/from the input |
| Standard text input keys | Input text as expected |

## States

### Default State
```tsx
<Input placeholder="Enter text..." />
```

### With Label
```tsx
<Input 
  label="Full Name"
  placeholder="Enter your full name"
/>
```

### Error State
```tsx
<Input 
  label="Email"
  type="email"
  error="Please enter a valid email address"
  defaultValue="invalid-email"
/>
```

### With Helper Text
```tsx
<Input 
  label="Password"
  type="password"
  helperText="Must be at least 8 characters"
/>
```

### Disabled State
```tsx
<Input 
  label="Read Only Field"
  disabled
  defaultValue="Cannot edit this"
/>
```

### With Icons
```tsx
// Left icon
<Input 
  label="Search"
  placeholder="Search..."
  leftIcon={<SearchIcon />}
/>

// Right icon
<Input 
  label="Email"
  type="email"
  rightIcon={<MailIcon />}
/>
```

## Validation

The Input component works well with form validation libraries:

```tsx
// With React Hook Form
const { register, formState: { errors } } = useForm()

<Input
  {...register('email', { required: 'Email is required' })}
  label="Email"
  type="email"
  error={errors.email?.message}
/>
```

## Custom Styling

```tsx
<Input 
  label="Custom Input"
  className="my-custom-input"
  style={{ maxWidth: '300px' }}
/>
```

## Theme Support

The Input component automatically adapts to the current theme and supports both light and dark modes.