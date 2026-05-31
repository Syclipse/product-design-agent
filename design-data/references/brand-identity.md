# Brand Identity

## Primary Brand Fonts (MANDATORY)

### Inter
- **Usage**: All headings, body text, UI labels, buttons, forms
- **Weights**: 
  - 400 (Regular): Body text, descriptions
  - 500 (Medium): Subheadings, emphasized text
  - 600 (Semibold): Headings, section titles
  - 700 (Bold): Hero text, primary headings
- **Line Heights**:
  - Display (hero): 1.1
  - Headings: 1.2
  - Body: 1.5
  - UI labels: 1.0
- **Letter Spacing**:
  - Display: -0.02em (tighter)
  - Headings: -0.01em (slight tightening)
  - Body: 0 (default)
  - Small text: 0.01em (slight widening)

### Fragment Mono
- **Usage**: Code blocks, data labels, technical content, IDs, timestamps
- **Weights**:
  - 400 (Regular): Code blocks, data displays
  - 500 (Medium): Emphasized code, active states
- **Line Heights**:
  - Code blocks: 1.6
  - Inline code: 1.0
  - Data labels: 1.2
- **Use Cases**:
  - API responses
  - Terminal output
  - File paths
  - Timestamps (ISO 8601 format)
  - Unique IDs
  - Version numbers
  - Technical specifications

### CSS Variables

```css
:root {
  /* Inter */
  --font-display: 'Inter', sans-serif;
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-ui: 'Inter', sans-serif;
  
  /* Fragment Mono */
  --font-code: 'Fragment Mono', monospace;
  --font-data: 'Fragment Mono', monospace;
  --font-technical: 'Fragment Mono', monospace;
  
  /* Weights */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  
  /* Line heights */
  --line-display: 1.1;
  --line-heading: 1.2;
  --line-body: 1.5;
  --line-ui: 1.0;
  --line-code: 1.6;
  
  /* Letter spacing */
  --tracking-tight: -0.02em;
  --tracking-snug: -0.01em;
  --tracking-normal: 0;
  --tracking-wide: 0.01em;
}
```

### Font Loading

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}

@font-face {
  font-family: 'Fragment Mono';
  src: url('/fonts/FragmentMono-Regular.woff2') format('woff2');
  font-weight: 400 500;
  font-display: optional;
}
```

---

## Brand Colors (Two-Tone)

The brand uses two purples with distinct roles — plum is **identity**, violet is **interaction**. Don't mix them up.

| Role | Color | Hex | OKLCH | Use for |
|------|-------|-----|-------|---------|
| **Primary brand** | Deep Plum | `#501E60` | `oklch(34.1% 0.119 317)` | Brand identity, brand moments, primary surfaces/headers |
| **Interactive accent** | Violet | `#7C3AED` | `oklch(54.1% 0.247 293)` | CTAs, active states, focus, links, selected states |

Reserve a single accent — don't dilute focus with multiple accent colors.

### Deep Plum #501E60 (Primary Brand)

**Hex**: `#501E60`
**RGB**: `rgb(80, 30, 96)`
**OKLCH**: `oklch(34.1% 0.119 317)`

**Usage**: Brand identity, brand moments, primary surfaces, section headers. For text on plum, use white (verify ≥ 4.5:1).

### Violet #7C3AED (Interactive Accent)

**Hex**: `#7C3AED`  
**RGB**: `rgb(124, 58, 237)`  
**OKLCH**: `oklch(54.1% 0.247 293)`

**Usage**:
- Primary CTAs
- Active states
- Focus indicators
- Brand moments
- Interactive elements

### Shades & Tints (OKLCH Scale)

```css
:root {
  /* Two-tone brand */
  --brand: oklch(34.1% 0.119 317);   /* Deep Plum #501E60 - primary brand */
  --accent: oklch(54.1% 0.247 293);  /* Violet #7C3AED - interactive accent */

  /* Base (violet accent scale) */
  --purple-base: oklch(54.1% 0.247 293);
  
  /* Lighter (for backgrounds, hover states) */
  --purple-100: oklch(95% 0.05 286.7);  /* Very light */
  --purple-200: oklch(90% 0.08 286.7);  /* Light */
  --purple-300: oklch(80% 0.12 286.7);  /* Soft */
  --purple-400: oklch(70% 0.18 286.7);  /* Medium light */
  --purple-500: oklch(54.1% 0.247 293); /* Base */
  
  /* Darker (for text, emphasis) */
  --purple-600: oklch(50% 0.22 286.7);  /* Medium dark */
  --purple-700: oklch(42% 0.18 286.7);  /* Dark */
  --purple-800: oklch(32% 0.12 286.7);  /* Very dark */
  --purple-900: oklch(22% 0.08 286.7);  /* Almost black */
}
```

### Color System

```css
:root {
  /* Brand vs. interactive accent */
  --color-brand: var(--brand);          /* Deep plum - identity */
  --color-accent: var(--accent);        /* Violet - interaction */

  /* Primary (interactive) */
  --color-primary: var(--purple-500);
  --color-primary-hover: var(--purple-600);
  --color-primary-active: var(--purple-700);
  
  /* Backgrounds */
  --color-primary-bg: var(--purple-100);
  --color-primary-bg-hover: var(--purple-200);
  
  /* Text on primary */
  --color-on-primary: oklch(100% 0 0); /* White */
  
  /* Focus ring */
  --color-focus-ring: var(--purple-400);
}
```

### Usage Guidelines

**DO:**
- Use for primary CTAs and active states
- Use lighter shades for hover/focus backgrounds
- Use darker shades for text on light backgrounds
- Maintain 4.5:1 contrast ratio for text

**DON'T:**
- Don't use purple for error states (use red)
- Don't use purple for success states (use green)
- Don't use purple for neutral information (use gray)
- Don't create purple gradients as default style (ban list item #2)

---

## Enforcement Rules

### Deviation Protocol

If design uses non-brand fonts (Roboto, Arial, Helvetica, sans-serif):

1. **Flag warning**: "Non-brand font detected: [font]"
2. **Require justification**: "Justification required. Use Inter (headings/body) or Fragment Mono (code/labels/data) unless specific reason to deviate."
3. **Document reason**: If deviation approved, document in system.md

### Validation Checks

```javascript
// Plugin validates brand fonts
function validateBrandFonts(css) {
  const brandFonts = ['inter', 'fragment mono'];
  const forbiddenFonts = ['roboto', 'arial', 'helvetica'];
  
  for (const font of forbiddenFonts) {
    if (css.includes(`font-family: '${font}'`)) {
      // Check for justification
      if (!css.includes(`/* Justification: ${font} */`)) {
        return {
          valid: false,
          message: `Non-brand font (${font}) without justification. Use Inter or Fragment Mono.`
        };
      }
    }
  }
  
  return { valid: true };
}
```

---

## Typography Scale

### Display (Hero Text)

```css
.text-display-2xl {
  font-family: var(--font-display);
  font-size: clamp(48px, 6vw, 72px);
  font-weight: var(--weight-bold);
  line-height: var(--line-display);
  letter-spacing: var(--tracking-tight);
}

.text-display-xl {
  font-family: var(--font-display);
  font-size: clamp(36px, 5vw, 60px);
  font-weight: var(--weight-bold);
  line-height: var(--line-display);
  letter-spacing: var(--tracking-tight);
}
```

### Headings

```css
.text-h1 {
  font-family: var(--font-heading);
  font-size: clamp(32px, 4vw, 48px);
  font-weight: var(--weight-semibold);
  line-height: var(--line-heading);
  letter-spacing: var(--tracking-snug);
}

.text-h2 {
  font-family: var(--font-heading);
  font-size: clamp(24px, 3vw, 36px);
  font-weight: var(--weight-semibold);
  line-height: var(--line-heading);
  letter-spacing: var(--tracking-snug);
}

.text-h3 {
  font-family: var(--font-heading);
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: var(--weight-medium);
  line-height: var(--line-heading);
}
```

### Body

```css
.text-body-lg {
  font-family: var(--font-body);
  font-size: 18px;
  font-weight: var(--weight-regular);
  line-height: var(--line-body);
}

.text-body {
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: var(--weight-regular);
  line-height: var(--line-body);
}

.text-body-sm {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: var(--weight-regular);
  line-height: var(--line-body);
}
```

### Technical/Code

```css
.text-code {
  font-family: var(--font-code);
  font-size: 14px;
  font-weight: var(--weight-regular);
  line-height: var(--line-code);
}

.text-data-label {
  font-family: var(--font-data);
  font-size: 12px;
  font-weight: var(--weight-medium);
  line-height: 1.2;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}
```

---

## Integration Checklist

- [ ] Inter loaded for headings, body, UI
- [ ] Fragment Mono loaded for code, data labels
- [ ] Deep plum #501E60 = primary brand; violet #7C3AED = interactive accent
- [ ] OKLCH shade scale defined (100-900)
- [ ] Typography scale applied (display, h1-h3, body, code)
- [ ] Font weights consistent (400/500/600/700 for Inter, 400/500 for Fragment Mono)
- [ ] No Roboto, Arial, or Helvetica without documented justification
