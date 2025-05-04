# Image Usage Guide in Next.js

This guide explains how to properly import and use images in this Next.js project.

## Configuration

The project is configured to handle images through:

1. Next.js Image Optimization (configured in `next.config.ts`)
2. TypeScript declarations for image imports (in `types/images.d.ts`)

## Importing Images

### Method 1: Direct Import (Recommended for static images)

```tsx
// Import the image
import myImage from './path/to/image.png';

// Use with Next.js Image component
import Image from 'next/image';

function MyComponent() {
  return (
    <Image
      src={myImage}
      alt="Description of the image"
      width={500} // Optional if the image size is known at build time
      height={300} // Optional if the image size is known at build time
      placeholder="blur" // Optional, shows a blur effect while loading
    />
  );
}
```

### Method 2: Using Image Component with Path String

```tsx
import Image from 'next/image';

function MyComponent() {
  return (
    <Image
      src="/images/my-image.jpg" // Path relative to the public directory
      alt="Description of the image"
      width={500}
      height={300}
    />
  );
}
```

### Method 3: Using as Background Image

```tsx
import myImage from './path/to/image.png';

function MyComponent() {
  return (
    <div
      style={{
        backgroundImage: `url(${myImage.src})`,
        backgroundSize: 'cover',
        width: '100%',
        height: '300px',
      }}
    />
  );
}
```

## Remote Images

For remote images (from external URLs), you need to configure the domains or patterns in `next.config.ts`:

```ts
// next.config.ts
const nextConfig = {
  images: {
    domains: ['example.com', 'another-domain.com'],
    // OR use remotePatterns for more control
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
      },
    ],
  },
};
```

Then you can use remote images:

```tsx
import Image from 'next/image';

function MyComponent() {
  return (
    <Image
      src="https://example.com/my-image.jpg"
      alt="Remote image"
      width={500}
      height={300}
    />
  );
}
```

## Image Optimization Benefits

- Automatic WebP/AVIF conversion
- Responsive images with srcset
- Lazy loading
- Prevents Cumulative Layout Shift (CLS)
- Image resizing

## Best Practices

1. Always provide meaningful `alt` text for accessibility
2. Use appropriate image formats (WebP for better compression)
3. Consider using the `priority` prop for above-the-fold images
4. Use responsive sizing with `fill` and appropriate `sizes` prop for responsive layouts
5. Optimize images before adding them to the project using tools like ImageOptim
