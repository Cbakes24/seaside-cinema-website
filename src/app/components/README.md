# Gallery Component

A reusable, responsive gallery component that displays images in a grid layout with various customization options.

## Features

- ✅ Responsive grid layout
- ✅ Square aspect ratio by default (customizable)
- ✅ Image optimization with Next.js Image component
- ✅ Hover effects and animations
- ✅ Loading states
- ✅ Customizable grid columns per breakpoint
- ✅ Filter by image extensions
- ✅ Limit number of images
- ✅ Custom image arrays
- ✅ Auto-load from public directory
- ✅ Sorting options

## Usage

### Basic Usage

```tsx
import Gallery from './components/Gallery';

// Default gallery with all images from public directory
<Gallery />
```

### Advanced Usage

```tsx
import Gallery from './components/Gallery';

// Customized gallery
<Gallery 
  maxImages={12}
  aspectRatio="square"
  gridCols={{
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    '2xl': 6
  }}
  imageExtensions={['.jpg', '.jpeg', '.png']}
  className="my-custom-class"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageExtensions` | `string[]` | `['.jpg', '.jpeg', '.png', '.webp', '.gif', '.JPG', '.JPEG', '.PNG', '.WEBP', '.GIF']` | File extensions to include |
| `className` | `string` | `''` | Additional CSS classes |
| `maxImages` | `number` | `undefined` | Maximum number of images to display |
| `images` | `GalleryImage[]` | `undefined` | Custom array of images |
| `autoLoad` | `boolean` | `true` | Whether to auto-load from public directory |
| `sortBy` | `'name' \| 'date' \| 'none'` | `'name'` | How to sort images |
| `showLoading` | `boolean` | `true` | Whether to show loading state |
| `aspectRatio` | `'square' \| '16/9' \| '4/3' \| '3/2'` | `'square'` | Aspect ratio of image containers |
| `gridCols` | `object` | `{ sm: 2, md: 3, lg: 4, xl: 5, '2xl': 6 }` | Grid columns per breakpoint |

## GalleryImage Interface

```tsx
interface GalleryImage {
  src: string;      // Image source path
  alt: string;      // Alt text for accessibility
  filename: string; // Original filename
  width?: number;   // Optional width
  height?: number;  // Optional height
}
```

## Examples

### Default Gallery
```tsx
<Gallery />
```

### Limited Images
```tsx
<Gallery maxImages={6} />
```

### Custom Grid Layout
```tsx
<Gallery 
  gridCols={{
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
    '2xl': 5
  }}
/>
```

### Different Aspect Ratio
```tsx
<Gallery aspectRatio="16/9" />
```

### Custom Images
```tsx
<Gallery 
  autoLoad={false}
  images={[
    { src: '/image1.jpg', alt: 'Image 1', filename: 'image1.jpg' },
    { src: '/image2.jpg', alt: 'Image 2', filename: 'image2.jpg' },
  ]}
/>
```

### Filter by Extension
```tsx
<Gallery imageExtensions={['.jpg', '.jpeg']} />
```

## Responsive Breakpoints

The component uses Tailwind CSS breakpoints:
- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up
- `2xl`: 1536px and up

## Styling

The component uses Tailwind CSS classes and includes:
- Hover effects with scale transform
- Smooth transitions
- Loading skeleton animation
- Rounded corners
- Proper image object-fit

## Notes

- Images are optimized using Next.js Image component
- First 4 images are prioritized for loading
- Hover effects include a subtle overlay
- Loading state shows skeleton placeholders
- Images are filtered by extension before display
- Alt text is auto-generated from filename if not provided 
