# Design System Template - Button Components

A flexible, configurable button system for Shopify themes that can be easily adapted for any project. Built with CSS Custom Properties for maximum portability and ease of customization.

---

## 📦 What's Included

This design system template includes:

- **`assets/ds-config.css`** - Central configuration file with all design tokens
- **`assets/ds-buttons.css`** - Complete button component system
- **`snippets/ds-button-docs.liquid`** - Interactive documentation with live examples
- **`snippets/ds-settings-sync.liquid`** - Syncs Shopify Theme Settings with CSS variables
- **`config/settings_schema.json`** - Shopify admin controls for visual customization
- **`README-DESIGN-SYSTEM.md`** - This implementation guide

---

## 🚀 Quick Start

### 1. Installation

All files are already in place. To activate the design system:

**Add to `layout/theme.liquid` in the `<head>` section:**

```liquid
<!-- Design System Stylesheets -->
{{ 'ds-config.css' | asset_url | stylesheet_tag }}
{{ 'ds-buttons.css' | asset_url | stylesheet_tag }}

<!-- Sync with Theme Settings -->
{% render 'ds-settings-sync' %}
```

**Order matters!** The files must load in this sequence:
1. First: `ds-config.css` (base configuration)
2. Second: `ds-buttons.css` (component styles)
3. Third: `ds-settings-sync` snippet (theme customizer overrides)

### 2. View Documentation

To see all button examples and usage guide:

**Option A - Create a documentation page:**
1. Create `templates/page.button-docs.liquid` with:
   ```liquid
   {% render 'ds-button-docs' %}
   ```
2. In Shopify admin, create a new Page
3. Assign the "button-docs" template
4. Visit the page to see live examples

**Option B - Add to any existing template:**
```liquid
{% render 'ds-button-docs' %}
```

### 3. Use Buttons in Your Theme

```html
<!-- Primary Button -->
<button class="btn btn--primary">Shop Now</button>

<!-- Secondary Button (Outlined) -->
<a href="/collections/all" class="btn btn--secondary">View All</a>

<!-- Tertiary Button (Text Only) -->
<button class="btn btn--tertiary">Learn More</button>

<!-- With Icons -->
<button class="btn btn--primary">
  <svg class="btn__icon" viewBox="0 0 20 20" fill="currentColor">
    <!-- Your SVG path here -->
  </svg>
  <span>Add to Cart</span>
</button>

<!-- Full Width (Mobile CTAs) -->
<button class="btn btn--primary btn--full-width">Checkout</button>
```

---

## 🎨 Customization Guide

### Method 1: Edit CSS Variables (Code-Based)

**For developers:** Direct control via CSS

Edit `assets/ds-config.css` and update the button tokens:

```css
:root {
  /* Primary Button */
  --ds-btn-primary-bg: #your-color;
  --ds-btn-primary-text: #your-color;
  --ds-btn-primary-hover-bg: #your-color;

  /* Secondary Button */
  --ds-btn-secondary-bg: transparent;
  --ds-btn-secondary-text: #your-color;
  --ds-btn-secondary-border: #your-color;
  --ds-btn-secondary-hover-bg: #your-color;

  /* Tertiary Button */
  --ds-btn-tertiary-text: #your-color;
  --ds-btn-tertiary-hover-bg: #your-color;

  /* Appearance */
  --ds-btn-border-radius: 4px;
  --ds-btn-text-transform: uppercase;
  --ds-btn-transition-duration: 250ms;
}
```

Changes apply immediately to all buttons across the site.

### Method 2: Shopify Theme Customizer (Visual)

**For non-technical users:** Point-and-click interface

1. Go to Shopify admin → **Online Store** → **Themes**
2. Click **Customize** on your active theme
3. Open **Theme settings** (left sidebar)
4. Scroll to **Design System** section
5. Adjust colors and appearance using visual controls
6. Click **Save**

Theme customizer settings override CSS file values.

---

## 📐 Button API Reference

### Base Class

```html
<button class="btn">...</button>
```

All buttons require the base `.btn` class.

### Button Types

| Class | Description | Use Case |
|-------|-------------|----------|
| `.btn--primary` | Filled button with background | High-priority actions (Add to Cart, Checkout) |
| `.btn--secondary` | Outlined button with border | Medium-priority actions (View Details, Learn More) |
| `.btn--tertiary` | Text-only button with underline on hover | Low-priority actions (Cancel, Skip) |

### Size Modifiers

| Class | Description |
|-------|-------------|
| `.btn--sm` | Small button (reduced padding and font size) |
| *default* | Medium button (no additional class needed) |
| `.btn--lg` | Large button (increased padding and font size) |

### Layout Modifiers

| Class | Description |
|-------|-------------|
| `.btn--full-width` | Button spans 100% of container width |
| `.btn--icon-only` | Square button for icon-only use (requires aria-label) |

### State Modifiers

| Class/Attribute | Description |
|-----------------|-------------|
| `disabled` | Native disabled state (attribute) |
| `.btn--disabled` | Disabled appearance (class-based alternative) |
| `.btn--loading` | Shows spinner, prevents interaction |

### Icon Support

```html
<!-- Icon Left -->
<button class="btn btn--primary">
  <svg class="btn__icon">...</svg>
  <span>Text</span>
</button>

<!-- Icon Right -->
<button class="btn btn--primary">
  <span>Text</span>
  <svg class="btn__icon">...</svg>
</button>

<!-- Icon Only -->
<button class="btn btn--primary btn--icon-only" aria-label="Close">
  <svg class="btn__icon">...</svg>
</button>
```

**Note:** Icon SVGs must have `class="btn__icon"` for proper sizing.

---

## 🔧 Advanced Customization

### Adding a New Button Type

Example: Creating a "Danger" button variant

**1. Add tokens to `assets/ds-config.css`:**

```css
:root {
  /* Danger Button */
  --ds-btn-danger-bg: #FF4040;
  --ds-btn-danger-text: #FFFFFF;
  --ds-btn-danger-border: #FF4040;

  --ds-btn-danger-hover-bg: #CC0000;
  --ds-btn-danger-hover-text: #FFFFFF;
  --ds-btn-danger-hover-border: #CC0000;
}
```

**2. Create the class in `assets/ds-buttons.css`:**

```css
.btn--danger {
  background-color: var(--ds-btn-danger-bg);
  color: var(--ds-btn-danger-text);
  border-color: var(--ds-btn-danger-border);
}

.btn--danger:hover:not(:disabled):not(.btn--disabled) {
  background-color: var(--ds-btn-danger-hover-bg);
  color: var(--ds-btn-danger-hover-text);
  border-color: var(--ds-btn-danger-hover-border);
}
```

**3. Use it:**

```html
<button class="btn btn--danger">Delete</button>
```

### Customizing Button Behavior

**Change transition speed globally:**
```css
:root {
  --ds-btn-transition-duration: 150ms; /* Faster */
}
```

**Add rounded corners:**
```css
:root {
  --ds-btn-border-radius: 8px;
}
```

**Change text style:**
```css
:root {
  --ds-btn-text-transform: none; /* No uppercase */
  --ds-btn-font-weight: 600; /* Semi-bold */
  --ds-btn-letter-spacing: 0; /* No letter spacing */
}
```

---

## 📱 Responsive Behavior

### Mobile Optimizations

- Minimum tap target: **44px** (accessibility requirement)
- Font sizes automatically adjust on mobile (via media queries)
- Optional: Uncomment full-width mobile buttons in `ds-buttons.css`

### Accessibility Features

✓ Focus-visible outline for keyboard navigation
✓ Proper color contrast ratios
✓ Screen reader support via aria-labels
✓ Disabled state prevents interaction
✓ Reduced motion support for animations

---

## 🌍 Using Across Multiple Projects

### Portability Checklist

This design system template is designed to be copied to new projects:

- [ ] Copy `assets/ds-config.css` to new project
- [ ] Copy `assets/ds-buttons.css` to new project
- [ ] Copy `snippets/ds-button-docs.liquid` (optional, for documentation)
- [ ] Update values in `ds-config.css` to match new brand
- [ ] Import stylesheets in theme.liquid
- [ ] Test all button variants

**Time to adapt:** ~15 minutes per project

### Framework Compatibility

| Framework | Compatible | Notes |
|-----------|------------|-------|
| Shopify (Liquid) | ✅ Full | Native support |
| Next.js / React | ✅ Full | Import CSS, use class names |
| Vue / Nuxt | ✅ Full | Import CSS, use class names |
| HTML/CSS | ✅ Full | Pure CSS, works anywhere |
| WordPress | ✅ Full | Enqueue CSS, use class names |

**Note:** For non-Shopify projects, skip `ds-settings-sync.liquid` and `settings_schema.json`.

---

## 🎯 Best Practices

### Do's ✅

- Use primary buttons for the main action on a page
- Use secondary buttons for alternative or less important actions
- Use tertiary buttons for navigation or low-priority actions
- Limit to 1-2 CTAs per section for clarity
- Always include `aria-label` for icon-only buttons
- Test color contrast ratios for accessibility

### Don'ts ❌

- Don't use multiple primary buttons in close proximity
- Don't mix button types without clear hierarchy
- Don't override individual button styles inline (use the system)
- Don't skip the base `.btn` class
- Don't forget hover states for interactive elements

### Button Hierarchy Example

```html
<!-- Good: Clear hierarchy -->
<div class="btn-group">
  <button class="btn btn--primary">Add to Cart</button>
  <button class="btn btn--secondary">View Details</button>
</div>

<!-- Avoid: Two competing primary actions -->
<div class="btn-group">
  <button class="btn btn--primary">Buy Now</button>
  <button class="btn btn--primary">Add to Cart</button>
</div>
```

---

## 🐛 Troubleshooting

### Buttons not styled correctly

**Check:**
1. Are stylesheets loaded in correct order in theme.liquid?
2. Is the base `.btn` class present?
3. Are there conflicting CSS rules in other files?
4. Clear browser cache and hard refresh

### Theme Settings not applying

**Check:**
1. Is `ds-settings-sync.liquid` snippet rendered in theme.liquid?
2. Is it placed AFTER the CSS stylesheets?
3. Save theme settings in Shopify admin and refresh

### Colors not changing

**Check:**
1. CSS specificity issues - design system uses CSS variables
2. Verify variable names match in config and buttons CSS
3. Check browser DevTools to see computed values

---

## 📚 Additional Resources

### Color Tools
- [Coolors.co](https://coolors.co) - Color palette generator
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Accessibility testing

### Icon Libraries
- [Heroicons](https://heroicons.com/) - Free SVG icons
- [Feather Icons](https://feathericons.com/) - Simple, consistent icons
- [Phosphor Icons](https://phosphoricons.com/) - Flexible icon family

### CSS Variable Resources
- [MDN: CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [CSS Tricks: Custom Properties Guide](https://css-tricks.com/a-complete-guide-to-custom-properties/)

---

## 🔄 Version & Updates

**Version:** 1.0.0
**Created:** 2025
**Compatible with:** Shopify Dawn 2.0+

### Changelog

**v1.0.0** - Initial Release
- Primary, Secondary, Tertiary button types
- Size variants (sm, md, lg)
- Icon support
- Full-width option
- Loading states
- Shopify Theme Settings integration
- Complete documentation

---

## 💡 Examples in Real Use

### Add to Cart Button
```html
<form method="post" action="/cart/add">
  <button type="submit" class="btn btn--primary btn--full-width">
    <svg class="btn__icon" viewBox="0 0 20 20" fill="currentColor">
      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
    </svg>
    <span>Add to Cart</span>
  </button>
</form>
```

### Newsletter Signup
```html
<div class="newsletter">
  <input type="email" placeholder="Enter your email">
  <button class="btn btn--primary">Subscribe</button>
</div>
```

### Product Card Actions
```html
<div class="btn-group">
  <a href="/products/example" class="btn btn--primary">
    Quick Add
  </a>
  <a href="/products/example" class="btn btn--tertiary">
    View Details
  </a>
</div>
```

---

## 🤝 Contributing

This is a template meant to be customized for your needs. Feel free to:

- Modify any styles to match your brand
- Add new button variants
- Extend the design system with new components
- Share your improvements with the team

---

## 📄 License

This design system template is provided as-is for use in Shopify theme projects.

---

## ✨ Support

For questions or issues:
1. Check the documentation in `snippets/ds-button-docs.liquid`
2. Review the troubleshooting section above
3. Inspect CSS custom properties in browser DevTools
4. Contact your development team

---

**Happy Building! 🚀**
