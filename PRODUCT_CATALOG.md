# Smart IS Product Catalog - Tablet Optimized

A modern, tablet-friendly product showcase application designed for event presentations and product demonstrations.

## Features

### 1. **Tablet-Optimized Design**
- Large, touch-friendly interface optimized for 10-12" tablets
- Responsive layout that works seamlessly across devices
- Optimized spacing and font sizes for easy viewing from a distance
- Clean, distraction-free interface for event showcases

### 2. **Interactive Product Catalog**
- Browse all 8 Smart IS products
- Filter by category (IoT & Automation, Cloud Solutions, Cybersecurity, Data Analytics, AI Solutions, Networking, Data Management, DevOps Tools)
- Sort by Newest, Highest Rated, or Alphabetically
- Real-time product count display

### 3. **Featured Products**
- New products highlighted at the top of the home page
- Visual "NEW" badges on new products in the grid
- Prominent display of featured products

### 4. **Detailed Product Pages**
- Comprehensive product information
- Full specifications and technical details
- Complete feature list with icons
- Star ratings with review counts
- Related products from same category
- Copy-to-clipboard pricing feature

### 5. **Modern UI/UX**
- Beautiful gradient backgrounds and color scheme
- Smooth animations on page load and interactions
- Hover effects and interactive elements
- Professional typography and spacing
- Consistent design system throughout

## Product Data Structure

All products are defined in `/lib/products.ts`:

```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  features: string[];
  specs: Record<string, string>;
  price: string;
  isNew: boolean;
  image: string;
  rating: number;
  reviews: number;
}
```

## Available Products

1. **SmartDevice Pro** - IoT & Automation ($999)
2. **CloudPlex Enterprise** - Cloud Solutions (Custom)
3. **Security Vault 360** - Cybersecurity ($599/month)
4. **Analytics Pro** - Data Analytics ($799/month)
5. **AI Assistant Pro** - AI Solutions ($399/month)
6. **Network Optimizer** - Networking ($499/month)
7. **DataStream Hub** - Data Management ($899/month)
8. **DevOps Suite** - DevOps Tools ($599/month)

## Pages

### Home Page (/)
- Hero section with featured new products
- Interactive filter and sort controls
- Product grid with all products
- Automatic filtering and sorting

### Product Detail Page (/products/[id])
- Full product information
- Large product image
- Complete specifications
- All features with icons
- Related products section
- Demo request and learn more buttons

## Customization

### Add a New Product
1. Edit `/lib/products.ts`
2. Add a new product object to the `products` array
3. The product will automatically appear in the catalog

### Update Product Information
Edit the product object in `/lib/products.ts`:
- Update `features` array for the feature list
- Update `specs` object for specifications
- Modify `isNew` to show/hide the NEW badge
- Change `price`, `rating`, `reviews` as needed

### Change Colors
Edit `/app/globals.css` and modify the CSS variables in the `:root` and `.dark` sections:
- `--primary`: Main brand color (blue)
- `--secondary`: Secondary color (purple)
- `--accent`: Accent color (cyan)
- And others for comprehensive theming

## Technical Stack

- **Framework**: Next.js 15+ with App Router
- **Styling**: Tailwind CSS v4 with custom animations
- **Components**: React components with TypeScript
- **Icons**: Lucide React icons
- **State Management**: React hooks (useState, useMemo)
- **Images**: Next.js Image component for optimization

## Deployment

The site is ready to deploy to Vercel:

```bash
# Install dependencies
pnpm install

# Run locally
pnpm dev

# Build for production
pnpm build

# Deploy to Vercel
vercel deploy
```

## Event Setup

For event presentations on tablets:

1. **Tablet Configuration**
   - Landscape orientation recommended
   - Full brightness for visibility
   - Landscape orientation locks recommended

2. **Navigation**
   - Use the home page to browse all products
   - Tap products to view detailed information
   - Use filter and sort controls to organize display

3. **Tips**
   - Products are sorted by "Newest" by default
   - Use category filter to focus on specific product types
   - Product detail pages show comprehensive information
   - Back button easily returns to the product list

## Browser Support

- Chrome/Edge (latest)
- Safari (latest)
- Firefox (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized images with Next.js Image component
- Lazy loading of product cards
- Efficient filtering and sorting with useMemo
- Smooth animations with CSS
- Fast load times optimized for tablet networks
