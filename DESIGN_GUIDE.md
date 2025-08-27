# AI Origo Website Design Guide

## Overview
The website has been redesigned with a clean, minimalist aesthetic featuring a high-tech mystery theme. The design uses a dark color palette with subtle blue accents and pixel-inspired animations.

## Color Palette
- Primary Blue: `#0066ff`
- Primary Cyan: `#00ccff`
- Dark Background: `#0a0a0a`
- Text Primary: `#ffffff`
- Text Secondary: `#888888`

## Visual Assets

### Videos Implemented
The innovation section now features three looping videos:
- **simulation.mp4** - Simulation-Driven Solutions
- **heatmap.mp4** - Visual Intelligence Tools  
- **ai-agents.mp4** - Collaborative Agent Systems

Videos are:
- 16:9 aspect ratio with object-fit: cover
- HTML5 autoplay, loop, muted
- No controls for clean presentation
- Subtle overlay gradient for better text contrast
- Hover effects to enhance interactivity

### Adding More Assets

#### Hero Section Background
- **Location**: `.hero-background`
- **Recommended search terms**: "abstract technology", "neural network visualization", "digital particles"
- **Style**: Dark, abstract, with blue/cyan accents
- **Implementation**: Add as CSS background-image or replace the gradient

#### Partner Logos
- **ZEL Group Logo**: `/assets/images/zel-logo.png`
- **Performance One Brain Logo**: `/assets/images/performance-one-brain-logo.png`
- **Format**: PNG with transparent background, ~400px width
- **Note**: Logos are automatically converted to grayscale via CSS

### Free Stock Photo Resources
1. **Unsplash** (unsplash.com) - No attribution required
2. **Pexels** (pexels.com) - No attribution required
3. **Pixabay** (pixabay.com) - No attribution required
4. **Freepik** (freepik.com) - Requires attribution

### Implementation Example
```html
<div class="innovation-image-placeholder" data-image-type="simulation">
  <img src="/assets/images/simulation-visual.jpg" alt="AI Simulation Visualization">
</div>
```

### Image Guidelines
- Use dark, moody images that match the site's aesthetic
- Ensure images have blue/cyan highlights when possible
- Optimize images for web (compress to under 200KB)
- Use WebP format for better performance
- Add appropriate alt text for accessibility

## Design Features
- Clean, minimal navigation with hover effects
- Subtle parallax scrolling on hero and intro sections
- Smooth right-to-left slide-in animations on page load
- Intersection Observer animations for content as you scroll
- Responsive design for all devices
- Glassmorphism effects on cards
- Pixel-inspired animated background
- Instant page loads with no preloader

## Performance Optimizations
- Minimal JavaScript for better performance
- CSS animations using GPU acceleration
- Lazy loading for images
- Efficient color palette with CSS variables
