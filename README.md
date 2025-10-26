# Syncta - Revolutionary Landing Page

A cutting-edge landing page showcasing advanced web technologies including WebGL, 3D graphics, complex animations, and modern UI/UX patterns. Built to demonstrate what's possible with AI-assisted web development.

## Features

### Hero Section
- **15000+ GPU-Accelerated Particles**: WebGL particle system using Three.js with real-time physics
- **Interactive Cursor Effects**: Custom cursor with trail particles and magnetic attraction
- **Kinetic Typography**: Variable font weight animations with scroll-reactive effects
- **Magnetic CTA Buttons**: Buttons with magnetic cursor attraction, ripple effects, and confetti celebrations
- **Scroll Indicator**: Animated SVG with path drawing

### 3D Interactive Showcase
- **Three.js 3D Scene**: Floating device models (laptop, tablet, mobile) with realistic materials
- **HDR Environment Mapping**: Metallic surfaces with realistic reflections
- **OrbitControls**: Limited rotation for guided user interaction
- **Post-Processing**: Bloom effects and anti-aliasing (adaptive based on device)
- **Performance Optimization**: GPU instancing, LOD system, adaptive quality

### Glassmorphism Services Section
- **Physics-Based Interactions**: Magnetic hover effects with spring animations
- **Backdrop Blur Effects**: True glassmorphism with backdrop-filter
- **Asymmetric Grid Layout**: Creative broken-grid design that's fully responsive
- **Smooth Transitions**: Spring physics using Framer Motion

### Horizontal Scroll Portfolio
- **GSAP ScrollTrigger**: Pin and scrub horizontal gallery
- **Parallax Effects**: Images scale during scroll for depth
- **Lazy Loading**: Optimized image loading with placeholders
- **Responsive**: Converts to vertical scroll on mobile

### Kinetic Testimonials Carousel
- **Infinite Loop Animation**: Seamless GSAP timeline with no visible break
- **Pause on Hover**: User-controlled animation with smooth resume
- **3D Card Effects**: Hover transforms with perspective
- **Avatar Gradients**: Border gradients using background-clip

### Interactive Contact Form
- **Real-Time Validation**: Email format, typo detection, character limits
- **Live Feedback**: Character counter with warnings
- **Success Animation**: Confetti particles on submission
- **Floating Shapes**: Animated background illustration

### Rich Footer
- **Multi-Column Grid**: Fully responsive layout
- **Newsletter Signup**: Inline form with success state
- **Social Icons**: Spring physics hover animations
- **Animated Pattern**: SVG background with CSS animations

### Global Features
- **Lenis Smooth Scroll**: Custom easing for buttery-smooth scrolling
- **Dark Mode**: Toggle with localStorage persistence
- **Scroll Progress**: Top bar indicator + percentage counter
- **Custom Cursor**: System-wide cursor replacement with magnetic behavior
- **Accessibility**: ARIA labels, keyboard navigation, reduced-motion support
- **Performance**: Code-splitting, lazy loading, adaptive quality

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool with optimized chunks
- **Tailwind CSS** - Utility-first styling
- **Three.js** - WebGL 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful Three.js helpers
- **@react-three/postprocessing** - Post-processing effects
- **GSAP** - Professional-grade animations
- **Framer Motion** - React animation library
- **Lenis** - Smooth scroll library

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CustomCursor/    # Custom cursor with trail
│   ├── DarkModeToggle/  # Dark mode switch
│   ├── MagneticButton/  # Magnetic button with effects
│   ├── ScrollIndicator/ # Animated scroll arrow
│   └── ScrollProgress/  # Progress bar and percentage
├── hooks/               # Custom React hooks
│   ├── useDarkMode.ts   # Dark mode state management
│   └── useSmoothScroll.ts # Lenis smooth scroll setup
├── sections/            # Page sections
│   ├── Hero/            # Hero with particles
│   ├── Showcase3D/      # 3D device showcase
│   ├── Services/        # Glassmorphism cards
│   ├── Portfolio/       # Horizontal scroll gallery
│   ├── Testimonials/    # Carousel
│   ├── Contact/         # Contact form
│   └── Footer/          # Footer
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## Design System

### Colors
- **Electric Blue**: `#0066FF` - Primary brand color
- **Neon Pink**: `#FF0080` - Accent color
- **Deep Purple**: `#6B00FF` - Gradient color
- **Warm Black**: `#1a1a1a` - Dark backgrounds
- **Soft White**: `#f5f5f5` - Light backgrounds
- **Accent Yellow**: `#FFD700` - Highlights

### Typography
- **Headings**: Space Grotesk (variable font)
- **Body**: Inter (variable font)

### Spacing Scale
4px base: 4, 8, 16, 24, 32, 48, 64, 96, 128

### Border Radius
- Small: 8px
- Medium: 16px
- Large: 24px

## Performance Optimizations

- **Code Splitting**: Three.js, animations, and vendor code in separate chunks
- **Lazy Loading**: WebGL components loaded on-demand
- **Image Optimization**: WebP format, responsive srcset, lazy loading
- **Adaptive Quality**: Particle count and effects adjust based on device
- **GPU Acceleration**: Transform and opacity animations use hardware acceleration
- **Bundle Size**: Initial load <500KB gzipped (excluding images)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Graceful degradation for older browsers with WebGL detection and fallbacks.

## Accessibility

- ARIA labels and landmarks
- Keyboard navigation support
- Focus-visible styles
- Skip-to-content link
- Reduced-motion support
- WCAG AA color contrast
- Semantic HTML

## Mobile Responsiveness

Breakpoints:
- xs: <480px (small phones)
- sm: 480-640px (phones)
- md: 640-1024px (tablets)
- lg: 1024-1440px (laptops)
- xl: >1440px (desktops)

Mobile optimizations:
- Reduced particle count (20% of desktop)
- Simplified post-processing
- Native smooth scroll
- Touch-friendly interactions
- Optimized layouts

## Development

```bash
# Run dev server
npm run dev

# Type check
npx tsc --noEmit

# Build
npm run build

# Lint
npm run lint
```

## License

This project was created as a demonstration of AI-assisted web development capabilities.

## Credits

Built with Claude Code - AI-powered web development assistant.

---

**Note**: This landing page represents an ambitious demonstration of modern web capabilities. While fully functional, some features (like the contact form) use simulated endpoints. In production, you would integrate with real backend services.
