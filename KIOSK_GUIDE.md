# Smart IS Kiosk - Interactive Digital Brochure Guide

## Overview

This is a premium tablet-first kiosk experience designed for event booth showcasing. It feels like a museum exhibit or Tesla showroom - not a traditional website.

## Architecture

### Components

1. **KioskApp.tsx** - Main orchestrator
   - Manages state transitions between screens
   - Handles idle mode detection (60s auto-return to welcome)
   - Tracks user interaction

2. **WelcomeScreen.tsx** - Fullscreen welcome
   - Company logo and branding
   - Animated background gradients
   - "Tap to Explore" CTA
   - Ready for idle-mode auto-play

3. **MainMenu.tsx** - Category selection
   - 3 large interactive tiles (Products, Services, About)
   - Hover animations with scale + glow
   - Back button for navigation

4. **ProductsCarousel.tsx** - Horizontal scroll
   - Fullscreen carousel of latest products
   - Smooth snap scrolling
   - Large product cards with images
   - Tap to view details

5. **ProductDetail.tsx** - Immersive fullscreen detail
   - Split layout: image on left, content on right
   - Swipe left/right to navigate between products
   - Large typography and spacing
   - Request Demo button

## User Flow

```
Welcome Screen
    ↓ (Tap to Explore)
Main Menu (Products / Services / About)
    ↓ (Select Products)
Products Carousel
    ↓ (Tap product)
Product Detail (Swipe for next product)
    ↓ (Back button)
Main Menu
    ↓ (Back button)
Welcome Screen
```

## Key Features

### Idle Mode
- **60 second inactivity timeout**
- Auto-returns to Welcome Screen
- Tracks all user interactions (touch, mouse, keyboard)
- Resets timer on any interaction

### Animations
- **Entry animations**: Staggered fade-in with scale
- **Hover states**: Scale + glow + shadow lift
- **Transitions**: Smooth slide-in/out with Framer Motion
- **Ambient animations**: Subtle background pulse effects

### Tablet UX
- Large touch targets (48px+ minimum)
- No scrolling on welcome/menu screens
- Horizontal swipe for products carousel
- Swipe left/right in product detail
- Fullscreen, immersive sections

### Dark First Design
- Gradient backgrounds (navy to black)
- Primary orange accent (#FF5722)
- High contrast white text
- Glassmorphism effects with backdrops
- Soft shadows with colored glows

## Customization

### Update Products
Edit `/lib/products.ts`:
```typescript
export const products: Product[] = [
  {
    id: 'product-id',
    name: 'Product Name',
    category: 'Category',
    description: 'Long description...',
    shortDescription: 'Short description',
    features: ['Feature 1', 'Feature 2', ...],
    specs: { 'Key': 'Value', ... },
    price: 'Contact for pricing',
    isNew: true,
    image: '/path/to/image.jpg',
    rating: 4.8,
    reviews: 42
  }
]
```

### Change Colors
Edit `/app/globals.css`:
```css
:root {
  --primary: #FF5722;      /* Main accent (orange) */
  --secondary: #003366;    /* Navy blue */
}
```

### Adjust Idle Time
Edit `components/KioskApp.tsx`:
```typescript
// Change 60000 (60 seconds) to desired milliseconds
setTimeout(() => {
  if (state !== 'welcome') {
    setState('welcome')
  }
}, 60000)
```

### Add Services Section
Edit `components/KioskApp.tsx` - Replace placeholder:
```typescript
{state === 'services' && (
  <ServicesCarousel key="services" onBack={handleBack} />
)}
```

## Events & Booth Setup

### Recommended Display Settings
- 48" or larger tablet/monitor
- Landscape orientation (1920x1080 minimum)
- 1-2 hour demo cycles
- Kiosk stand with robust frame

### Engagement Tips
- Place product cards at eye level on carousel
- Use bright, high-contrast images
- Keep descriptions short (1-2 lines max)
- Highlight 2-3 key features per product
- Include clear CTAs (Demo, Learn More)

### Performance Optimization
- Optimize images (WebP format, <500KB)
- Use placeholder.svg for missing images
- Test on target tablet device
- Monitor bundle size with `next/image`

## Development

### Install Dependencies
```bash
npm install framer-motion lucide-react
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Deploy
- Upload to Vercel for instant kiosk deployment
- Set environment for production use
- Test all touch interactions before event

## Browser Support
- Chrome/Edge (Windows kiosks)
- Safari (iPad)
- Mobile browsers (testing)
- All modern tablets (2018+)

## Accessibility
- Large text (16px minimum)
- High contrast ratios
- Touch-friendly spacing (44px buttons)
- Keyboard navigation (back buttons)
- No rapid flashing animations

## Troubleshooting

**Idle mode not working**: Check if interaction listeners are attached
**Images not loading**: Verify image paths in products data
**Animations stuttering**: Check device CPU/GPU performance
**Touch not responsive**: Ensure viewport settings allow touch

---

Built with Next.js 16, Tailwind CSS, shadcn/ui, and Framer Motion.
