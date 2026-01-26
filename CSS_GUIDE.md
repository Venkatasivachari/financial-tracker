# 🎨 CSS & Styling Guide

## ✅ CSS Setup - Now Complete!

### What Was Fixed
- ✅ Added `styles.css` import to `index.html`
- ✅ Updated `tailwind.config.cjs` to include all JSX files
- ✅ Created comprehensive Tailwind utility classes
- ✅ Added `components.css` for custom styles
- ✅ Enabled dark mode support

---

## 📦 CSS Files Structure

### 1. `index.html`
- Imports both CSS files
- Meta tags for responsiveness
- Semantic HTML5

### 2. `styles.css` (Tailwind CSS)
**Main styling file with:**
- Base styles (body, html, elements)
- Component utilities (.btn, .card, .input, .label, .badge)
- Alert styles (.alert-success, .alert-error, .alert-info)
- Table styling
- Form elements
- Custom scrollbar styling
- Focus/accessibility styles

### 3. `components.css` (Custom CSS)
**Additional styling for:**
- Gradient backgrounds
- Custom shadows
- Animations (fade, slide, spin, pulse)
- Chart colors
- Hover effects
- Responsive typography
- Grid utilities
- Status indicators
- Print styles

---

## 🎯 Available CSS Classes

### Buttons
```html
<!-- Primary Button -->
<button class="btn btn-primary">Add Expense</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">Cancel</button>

<!-- Danger Button -->
<button class="btn btn-danger">Delete</button>
```

### Cards
```html
<div class="card">
  <h2>Title</h2>
  <p>Content here</p>
</div>
```

### Inputs & Forms
```html
<div class="form-group">
  <label class="label">Email Address</label>
  <input type="email" class="input" placeholder="user@example.com" />
</div>
```

### Badges
```html
<span class="badge badge-blue">Food</span>
<span class="badge badge-green">Active</span>
<span class="badge badge-red">Alert</span>
```

### Alerts
```html
<div class="alert alert-success">✓ Saved successfully!</div>
<div class="alert alert-error">✗ Something went wrong</div>
<div class="alert alert-info">ℹ Information message</div>
```

### Tables
```html
<table class="table">
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
</table>
```

---

## 🌈 Tailwind CSS Utilities

### Spacing
```html
<!-- Margin -->
<div class="m-4">Margin 4</div>
<div class="mt-2">Margin top 2</div>

<!-- Padding -->
<div class="p-4">Padding 4</div>
<div class="px-4">Horizontal padding</div>
```

### Colors
```html
<!-- Text colors -->
<p class="text-blue-600">Blue text</p>
<p class="text-gray-500">Gray text</p>

<!-- Background colors -->
<div class="bg-blue-100">Light blue background</div>
<div class="bg-gray-800 dark:bg-gray-900">Dark theme aware</div>

<!-- Border colors -->
<div class="border-2 border-red-500">Red border</div>
```

### Typography
```html
<!-- Font sizes -->
<p class="text-sm">Small text</p>
<p class="text-base">Normal text</p>
<h1 class="text-3xl font-bold">Large heading</h1>

<!-- Text alignment -->
<p class="text-left">Left aligned</p>
<p class="text-center">Centered</p>
<p class="text-right">Right aligned</p>
```

### Flexbox
```html
<!-- Flex container -->
<div class="flex items-center justify-between">
  <span>Left</span>
  <span>Right</span>
</div>

<!-- Flex column -->
<div class="flex flex-col space-y-2">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Grid
```html
<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```

### Responsive
```html
<!-- Hide on mobile, show on tablet+ -->
<div class="hidden md:block">Desktop only</div>

<!-- Show on mobile, hide on tablet+ -->
<div class="md:hidden">Mobile only</div>

<!-- Responsive text size -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">Responsive heading</h1>
```

### Shadows
```html
<div class="shadow-soft">Soft shadow</div>
<div class="shadow-medium">Medium shadow</div>
<div class="shadow-large">Large shadow</div>
```

### Hover Effects
```html
<!-- Lift on hover -->
<div class="hover-lift">
  <div class="card">Lifts on hover</div>
</div>

<!-- Scale on hover -->
<button class="hover-scale btn btn-primary">Scale on hover</button>
```

### Transitions
```html
<!-- Fast transition -->
<div class="transition-fast">Fast animation</div>

<!-- Normal transition -->
<div class="transition-normal">Normal animation</div>

<!-- Slow transition -->
<div class="transition-slow">Slow animation</div>
```

### Animations
```html
<!-- Fade in -->
<div class="animate-fadeIn">Fades in</div>

<!-- Slide down -->
<div class="animate-slideInDown">Slides down</div>

<!-- Pulse -->
<div class="animate-pulse">Pulsing element</div>

<!-- Spin -->
<div class="animate-spin">Spinning loader</div>
```

### Utilities
```html
<!-- Flex between (space-between + center) -->
<div class="flex-between">
  <span>Left</span>
  <span>Right</span>
</div>

<!-- Flex center -->
<div class="flex-center h-64">
  Centered in height
</div>

<!-- Line clamp -->
<p class="line-clamp-2">Text limited to 2 lines...</p>

<!-- Container max widths -->
<div class="container-md mx-auto">Max 900px</div>
```

---

## 🌓 Dark Mode

Dark mode is **automatically enabled** based on system preference. Add classes:

```html
<!-- Light mode only -->
<div class="bg-white">Light background</div>

<!-- Dark mode override -->
<div class="bg-white dark:bg-gray-800">
  White on light, gray on dark
</div>

<!-- Text that changes color -->
<p class="text-gray-900 dark:text-gray-100">
  Dark text in light mode, light text in dark mode
</p>
```

---

## 🎨 Component Examples

### Stat Card
```html
<div class="card">
  <div class="flex-between mb-4">
    <h3 class="text-lg font-semibold">Total Spent</h3>
    <span class="text-2xl">💰</span>
  </div>
  <p class="text-3xl font-bold text-blue-600">$1,234.56</p>
  <p class="text-sm text-gray-500 mt-2">↑ 12% from last month</p>
</div>
```

### Form Section
```html
<form class="space-y-4">
  <div class="form-group">
    <label class="label">Category</label>
    <select class="input">
      <option>Food</option>
      <option>Transport</option>
    </select>
  </div>
  
  <div class="form-group">
    <label class="label">Amount</label>
    <input type="number" class="input" placeholder="0.00" />
  </div>
  
  <button class="btn btn-primary w-full">Save</button>
</form>
```

### Alert Box
```html
<div class="alert alert-success animate-slideInDown">
  ✓ Expense added successfully!
</div>
```

### Table
```html
<div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Category</th>
        <th>Amount</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2026-01-26</td>
        <td><span class="badge badge-blue">Food</span></td>
        <td>$25.50</td>
        <td>
          <button class="text-blue-600 hover:underline">Edit</button>
          <button class="text-red-600 hover:underline">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Class Prefix |
|-----------|-------|--------------|
| Mobile | < 640px | (default) |
| Tablet | 640px - 1024px | `md:` |
| Desktop | > 1024px | `lg:` |

**Example:**
```html
<!-- 1 column on mobile, 2 on tablet, 3 on desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- cards -->
</div>
```

---

## 🎯 CSS Best Practices

1. **Use Tailwind classes first** - No custom CSS needed for most cases
2. **Use semantic HTML** - `<button>`, `<form>`, `<table>`, etc.
3. **Combine classes** - `class="flex items-center justify-between"`
4. **Use dark mode** - Add `dark:` prefix for dark mode variants
5. **Responsive first** - Design mobile-first, then add `md:` and `lg:`
6. **Accessibility** - Use proper contrast, focus states, ARIA labels

---

## 🔧 Customization

To add custom colors, edit `tailwind.config.cjs`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      custom: '#FF5733',
    },
  },
}
```

Then use:
```html
<button class="bg-primary">Primary color button</button>
<button class="bg-custom">Custom color button</button>
```

---

## ✅ CSS Components Now Available

| Component | Classes | Status |
|-----------|---------|--------|
| Button | .btn, .btn-primary, .btn-secondary, .btn-danger | ✅ |
| Card | .card | ✅ |
| Input | .input, .label | ✅ |
| Form | .form-group | ✅ |
| Badge | .badge, .badge-blue, .badge-green, .badge-red | ✅ |
| Alert | .alert, .alert-success, .alert-error, .alert-info | ✅ |
| Table | .table | ✅ |
| Animations | .animate-fadeIn, .animate-spin, .animate-pulse | ✅ |
| Shadows | .shadow-soft, .shadow-medium, .shadow-large | ✅ |
| Hover Effects | .hover-lift, .hover-scale | ✅ |

---

**Last Updated:** January 26, 2026  
**Status:** ✅ All CSS & Styling Complete
