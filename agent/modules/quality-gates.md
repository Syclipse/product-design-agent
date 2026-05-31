# Quality Gates, Brand Identity & Premium Patterns

Before ANY design output (mockups, prototypes, wireframes, components), you MUST pass all 5 gates. Plugin validates automatically.

---

## Gate 1: Intent Declaration (MANDATORY - BLOCKS OUTPUT)

**Required before any code/design:**
1. **Who**: Specific human (role + context + mood + environment) - NOT "users"
2. **What**: Specific task (verb + object + success state)
3. **Feel**: Specific emotion/tone - NOT "clean", "modern", "professional"

**Forbidden Terms**: "clean", "modern", "intuitive", "professional", "sleek", "users", "people", "customers"

**Example PASS:**
```markdown
**Who**: Sarah, support manager reviewing 50+ tickets/day in noisy call center, stressed about SLA deadlines
**What**: Triage incoming tickets by urgency without reading full content
**Feel**: Calm urgency - hierarchy obvious at a glance, no visual noise competing for attention
```

**Example FAIL:**
```markdown
**Who**: Users managing tasks
**What**: View and organize their work
**Feel**: Clean and modern interface
```

**Enforcement**: Plugin blocks output if intent uses forbidden terms or abstract descriptions.

---

## Gate 2: Domain Exploration (MANDATORY - BLOCKS OUTPUT)

**Required before implementation:**
1. **Domain** (5+ concepts from product's world - NOT generic tech terms)
2. **Color world** (5+ natural colors FROM DOMAIN - NOT arbitrary palettes)
3. **Signature element** (1 unique element that appears 5+ times in design)
4. **Defaults to reject** (3 specific common patterns with alternatives)

**Example PASS:**
```markdown
**Domain**: Support desk, ticket lifecycle, SLA countdown, queue management, escalation paths
**Color world**: Amber (caution), Crimson (critical), Forest (resolved), Slate (neutral), Frost (inactive)
**Signature**: "SLA Countdown Ring" - circular progress indicator at card corner
**Defaults to reject**:
- Standard card grid → Use varied heights based on ticket complexity
- Blue/purple tech gradient → Use domain-driven amber/crimson for urgency
- List view only → Add kanban swimlanes for queue stages
```

**Example FAIL:**
```markdown
**Domain**: Software, technology, data, cloud
**Color world**: Blue, purple, teal, gray, white
**Signature**: Rounded corners
```

**Enforcement**: Plugin blocks if <5 domain concepts, <5 colors, no signature, or <3 defaults rejected.

---

## Gate 3: Validation Tests (MANDATORY - BLOCKS OUTPUT)

**Run before showing design - ALL must pass:**

1. **Swap test**: If you swapped choices for common alternatives, would it feel different?
   - PASS: "Color system emerges from support domain (amber/crimson), not arbitrary blue/purple"
   - FAIL: "Used primary blue because it's common"

2. **Squint test**: Blur eyes - hierarchy still visible without harsh lines?
   - PASS: "Hierarchy visible through scale contrast (48px → 14px), not color alone"
   - FAIL: "Relies on red text for importance"

3. **Signature test**: Can you point to 5 instances where signature appears?
   - PASS: "SLA ring appears: list cards, detail view, queue summary, dashboard widget, mobile nav"
   - FAIL: "Signature appears twice"

4. **Token test**: Read CSS variable names aloud - do they belong to this product's world?
   - PASS: "--sla-critical", "--queue-active", "--escalation-urgent"
   - FAIL: "--primary-500", "--blue-600", "--color-1"

**Enforcement**: Plugin blocks if any test explicitly fails or tests not documented.

---

## Gate 4: Variance Check (MANDATORY - CONSULTS PLUGIN)

**Before generating similar artifacts** (dashboards, cards, forms):
1. Query plugin variance history: "Check variance for [interface type]"
2. If last 2 outputs used same **Vibe + Layout** combo, BLOCK and force new selection
3. Document choice: "Vibe: [X], Layout: [Y]"

**Vibe Archetypes** (pick 1):
- **Ethereal Glass**: Translucent layers, soft gradients, floating elements
- **Editorial Luxury**: High contrast, serif headlines, generous whitespace
- **Soft Structuralism**: Rounded corners, pastel depth, gentle shadows
- **Dark Technical**: OLED blacks, neon accents, terminal aesthetics
- **Warm Minimalism**: Cream backgrounds, brown accents, flat depth
- **Industrial Monochrome**: Pure black/white, mechanical typography, technical motifs

**Layout Archetypes** (pick 1):
- **Asymmetrical Bento**: Varied card sizes, organic grid, visual tension
- **Z-Axis Cascade**: Stacked layers, scroll-triggered reveals, depth parallax
- **Editorial Split**: 60/40 content/space, vertical rhythm, chapter-like sections
- **Terminal Grid**: Fixed-width, monospace, console-style layout
- **Magazine Flow**: Multi-column, pull quotes, image-led composition
- **Dashboard Radial**: Circular arrangements, arc navigation, orbital content

**Enforcement**: Plugin tracks last 10 outputs, blocks if vibe+layout combo repeated in last 2.

---

## Gate 5: Ban List Enforcement (ABSOLUTE - BLOCKS OUTPUT)

**These patterns are FORBIDDEN. User override possible with "use [pattern] anyway":**

1. **Side-stripe borders on cards**
   - ❌ `border-left: 4px solid #primary`
   - ✅ Alternative: Full border with subtle color, or no border with shadow

2. **Gradient text as default style**
   - ❌ `background: linear-gradient(...); -webkit-background-clip: text;`
   - ✅ Alternative: Solid color with opacity variation

3. **Glassmorphism as default aesthetic**
   - ❌ `backdrop-filter: blur(10px); background: rgba(...)`
   - ✅ Alternative: Reserve for specific moments, not entire UI

4. **Hero-metric template** (big number + label + icon grid)
   - ❌ Three cards: "1,234 Users", "5,678 Revenue", "90% Satisfaction"
   - ✅ Alternative: Design unique dashboard layout from domain exploration

5. **Identical card grids** (3-across, same height, same spacing)
   - ❌ Uniform grid with `.grid-cols-3` and identical cards
   - ✅ Alternative: Asymmetrical bento, varied heights, or magazine flow

6. **Modal-first thinking** (every action opens a modal)
   - ❌ Click edit → modal opens
   - ✅ Alternative: Inline editing, slide-out drawers, expand-in-place

7. **Generic fonts without brand justification**
   - ❌ Roboto, Arial, Helvetica, generic sans-serif
   - ✅ Alternative: **Brand fonts (Inter + Fragment Mono)** or justify deviation

8. **Spring/bounce easing**
   - ❌ `transition: all 300ms ease-in-out;` or `spring` physics
   - ✅ Alternative: Custom cubic-bezier curves only

9. **Animating non-transform properties**
   - ❌ `transition: width 300ms, height 300ms, top 300ms;`
   - ✅ Alternative: Only animate transform and opacity

10. **"Clean and modern" as design descriptor**
    - ❌ "I designed a clean and modern dashboard"
    - ✅ Alternative: Use specific descriptors from intent/domain

**Override Protocol**: If user explicitly requests banned pattern:
```
"[Pattern] is on ban list because [reason]. Alternative: [specific better approach]. 
Proceeding with your override, but recommend reconsidering."
```

**Enforcement**: Plugin scans output for banned patterns, blocks and suggests alternatives.

---

## Brand Identity (MANDATORY)

**Primary Brand Fonts:**
- **Inter**: All headings, body text, UI labels
  - Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
  - Line heights: 1.2 (headings), 1.5 (body)
- **Fragment Mono**: Code blocks, data labels, technical content
  - Weights: 400 (regular), 500 (medium)
  - Use for: timestamps, IDs, API responses, terminal output

**Brand Colors (two-tone):**
- **Deep Plum #501E60** — primary brand. OKLCH `oklch(34.1% 0.119 317)`. Use for: brand identity, brand moments, primary surfaces/headers.
- **Violet #7C3AED** — interactive accent. OKLCH `oklch(54.1% 0.247 293)`. Use for: primary CTAs, active states, focus indicators, links.
- Reserve one accent; don't dilute focus.

**Enforcement**: Plugin flags non-brand fonts (Roboto, Arial, etc.) and requires justification.

---

## Premium Architecture Patterns

These patterns elevate from "AI-generated" to "senior designer made this":

### Double-Bezel Architecture
Nested containment for premium feel:
```css
/* Outer shell */
.outer-bezel {
  padding: clamp(20px, 3vw, 40px);
  background: var(--surface-elevation-1);
  border-radius: 24px;
}

/* Inner core (calculated: outer radius - 8px) */
.inner-core {
  padding: clamp(16px, 2.5vw, 32px);
  background: var(--surface-elevation-2);
  border-radius: 16px;
}
```

### Button-in-Button Pattern
Nested CTA with icon wrapper:
```css
.cta-outer {
  padding: 16px 24px;
  background: var(--primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-wrapper {
  padding: 4px;
  background: rgba(255,255,255,0.2);
  border-radius: 6px;
}
```

### Whisper-Quiet Elevation
Surface jumps by 3-5% lightness (never harsh):
```css
:root {
  /* Dark mode: progressively lighter */
  --surface-base: oklch(20% 0.01 240);
  --surface-elevated-1: oklch(23% 0.01 240); /* +3% */
  --surface-elevated-2: oklch(26% 0.01 240); /* +3% */
  --surface-elevated-3: oklch(29% 0.01 240); /* +3% */
  
  /* Light mode: progressively darker */
  --surface-base-light: oklch(98% 0.01 240);
  --surface-elevated-1-light: oklch(95% 0.01 240); /* -3% */
  --surface-elevated-2-light: oklch(92% 0.01 240); /* -3% */
}
```

### Custom Motion (Cubic-Bezier Only)
```css
/* Premium easing curves */
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
}

/* Scroll entry animation */
.fade-up-in {
  opacity: 0;
  transform: translateY(16px);
  filter: blur(4px);
  transition: 
    opacity 700ms var(--ease-out-expo),
    transform 700ms var(--ease-out-expo),
    filter 700ms var(--ease-out-expo);
}

.fade-up-in.visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}
```

**Enforcement**: If design uses linear/ease-in-out transitions or animates width/height/top/left, BLOCK.

---

## Referenced By

- **Interface Design Workflow** (workflows.md) - Requires all 5 gates
- **Design Critique Workflow** (workflows.md) - References gates 3 & 5
- **Figma Integration Workflow** (workflows.md) - Validates gates 3 & 5

## See Also

- **Ban List Details**: `design-data/references/ban-list.md` (284 lines - complete rationale)
- **Brand Guidelines**: `design-data/references/brand-identity.md` (336 lines - full guidelines)
- **Premium Patterns**: `design-data/references/premium-patterns.md` (326 lines - advanced patterns)
- **Anti-Patterns**: `standards-and-anti-patterns.md` (interface design anti-patterns)
