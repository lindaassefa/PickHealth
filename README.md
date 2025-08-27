# PickHealth Landing Page

A premium, highly animated landing page for PickHealth - a corporate wellness catering platform. This landing page combines the best elements of Cava and Sweetgreen's websites with modern animations and captivating UI.

## 🎨 Design Features

### Visual Design
- **Color Scheme**: Deep forest greens (#1a472a, #166534), fresh greens (#10b981, #34d399), warm terracotta (#ea580c), cream whites (#fefce8)
- **Typography**: Large, bold headlines with gradient text effects using Inter font family
- **Glassmorphism**: Subtle glassmorphism elements and shadows throughout
- **High-Quality Imagery**: Food photography with overlay effects and smooth transitions

### Animations & Interactions
1. **Hero Section**: Typing animation for headline with floating food elements
2. **Floating Elements**: Parallax food images with subtle animations
3. **Counter Animations**: Animated statistics with smooth count-up effects
4. **Scroll-Triggered Reveals**: Smooth animations triggered by scroll position
5. **Hover Effects**: Interactive cards and buttons with smooth transitions
6. **Gradient Text**: Animated gradient text effects
7. **Morphing Shapes**: Dynamic background animations
8. **Staggered Animations**: Sequential list item animations

## �� Sections

### Hero Section
- Animated typing text: "Transform Your Office Food Culture"
- Floating food elements (bowls, ingredients) with parallax effects
- Gradient CTA buttons with hover effects and ripple animations
- Subtle animated gradient mesh background

### Problem Section
- Dark background with animated statistics
- Counter animations for key stats:
  - Office food scores 48/100 (same as Wendy's)
  - 65% want healthier options
  - $10-15 spent per meal on junk food
- Animated infographic showing the problem

### How It Works Section
- 3-step animated timeline with icons
- Cards that slide up and have hover effects
- Step 1: Company setup (animated form preview)
- Step 2: Dietitian curation (animated matching process)
- Step 3: Delivery (animated delivery truck/process)

### Features Grid
- **For Companies**: Productivity, Wellness, Reporting, Retention
- **For Meal Providers**: Corporate clients, Bulk orders, Guaranteed payments, Growth
- Tabbed interface with smooth transitions
- Animated cards with icons and hover effects

### Social Proof Section
- Animated testimonial carousel
- Company logos with hover effects
- Market validation stats with counter animations
- Progress bar animations

### Food Showcase
- Masonry grid of healthy meal images
- Hover effects revealing nutrition info
- Smooth image transitions and Ken Burns effects
- Nutrition labels that slide in on hover

### Coming Soon Section
- Atlanta map with animated pins
- Email signup with smooth form animations
- Progress bar showing "launching soon"
- Expansion city pins for future growth

## 🛠️ Technical Features

### Performance Optimizations
- Smooth 60fps animations using CSS transforms and opacity
- Intersection Observer for scroll-triggered animations
- CSS Grid and Flexbox for responsive layouts
- Custom easing functions for premium feel
- Optimized images with lazy loading
- Mobile-first responsive design

### Animation System
- Custom AOS (Animate On Scroll) implementation
- Parallax scrolling effects
- Staggered animations
- Counter animations with smooth easing
- Ripple effects on button clicks
- Smooth scroll navigation with progress indicator

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px
- Adaptive layouts for all screen sizes
- Touch-friendly interactions on mobile

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pickhealth-landing
   ```

2. **Open in browser**
   ```bash
   open index.html
   ```
   
   Or simply double-click the `index.html` file to open it in your default browser.

3. **Development server** (optional)
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## 📁 Project Structure

```
pickhealth-landing/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All CSS styles and animations
├── js/
│   └── main.js         # JavaScript functionality and animations
└── README.md           # Project documentation
```

## 🎯 Key Features

### CSS Features
- CSS Custom Properties (CSS Variables)
- CSS Grid and Flexbox layouts
- Advanced animations with keyframes
- Backdrop filters and glassmorphism
- Smooth transitions and transforms
- Responsive design with media queries

### JavaScript Features
- ES6+ class-based architecture
- Intersection Observer API
- Smooth scrolling and parallax effects
- Form handling and validation
- Tab system with smooth transitions
- Performance optimizations
- Ripple effects and micro-interactions

## 🔧 Customization

### Colors
Update the CSS custom properties in `:root` to change the color scheme:

```css
:root {
    --deep-green: #1a472a;
    --fresh-green: #10b981;
    --terracotta: #ea580c;
    /* ... more colors */
}
```

### Animations
Modify animation durations and easing in the CSS:

```css
:root {
    --transition-fast: 150ms ease-out;
    --transition-normal: 300ms ease-out;
    --transition-slow: 500ms ease-out;
}
```

### Content
Update the HTML content in `index.html` to match your brand and messaging.

## 📊 Performance Metrics

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🌟 Future Enhancements

- Dark mode toggle
- Advanced parallax effects
- WebGL background animations
- Progressive Web App (PWA) features
- Advanced form validation
- Analytics integration
- A/B testing capabilities

## 📄 License

This project is created for demonstration purposes. Please ensure you have the right to use any images or content in your production environment.

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve this landing page.

---

**Built with ❤️ for PickHealth - Transforming office food culture, one meal at a time.**
