# Design Converter: Sketch / Screenshot → UI

Reference data for the **Design Converter** workflow. Turn a hand sketch, wireframe, or
screenshot into structured, production-minded UI. Reverse-engineering an image is **not**
an excuse to skip the gates — infer intent and domain, then rebuild with craft and brand.

---

## Conversion Pipeline

1. **Observe** the image precisely. Describe what's actually there before interpreting:
   regions, repeated elements, alignment, density, evident hierarchy.
2. **Infer intent (Gate 1)** — from the content, state a plausible Who/What/Feel. If the
   image is ambiguous, ask one question rather than guessing wildly.
3. **Infer domain (Gate 2)** — what world is this (finance, health, logistics…)? Derive a
   color world and a signature element from it, not from the screenshot's arbitrary colors.
4. **Extract structure** — translate pixels into a layout grid + regions (header, nav,
   content, aside, footer) and a component list.
5. **Map to tokens** — convert observed values into a token system (don't hardcode):
   - Spacing → 4/8pt scale (`--space-1…6`)
   - Type → role scale (display / h1–h3 / body / caption) in Inter + Fragment Mono
   - Color → semantic, domain-named (`--status-overdue`, not `--red-500`)
   - Radius / elevation → whisper-quiet steps; double-bezel where nesting appears
6. **Complete the states** the static image can't show: hover/active/focus/disabled/
   loading/error/empty.
7. **Run ban-list + validation tests (Gates 3 & 5)** before emitting code.
8. **Emit** semantic, accessible HTML/CSS (or the requested framework) + a short token
   sheet and a note of every assumption made.

---

## Reading Hierarchy From an Image

| Cue in image | Likely meaning | Token/decision |
|---|---|---|
| Largest text, top-left/centre | Primary heading | `--text-display` |
| Repeated equal blocks | Collection/list | List or bento (avoid identical-grid ban) |
| Boxed number + word | Metric | Re-design — avoid hero-metric trio |
| Colored pill | Status | Semantic status token + icon (not color alone) |
| Bottom bar (mobile) | Primary nav | Hub-and-spoke, 44px targets |

---

## Output Template

```markdown
# Converted UI: [source]

## Observed
[Plain description of the image]

## Inferred Intent & Domain
**Who/What/Feel**: …
**Domain / color world / signature**: …
**Assumptions**: [explicit list]

## Token Sheet
[spacing, type, color, radius, elevation, motion]

## Components & States
[list with all 8 states]

## Implementation
```html
<!-- semantic, accessible markup -->
```

## Accessibility Notes
[contrast results, roles, keyboard]
```

---

## Anti-Patterns

- ❌ Copying the screenshot's arbitrary palette as the "design"
- ❌ Pixel-matching a banned pattern (e.g. side-stripe cards) instead of improving it
- ❌ Hardcoded values instead of tokens
- ❌ Shipping only the default state
- ❌ Silent guessing — always list assumptions

## See Also

- **Workflow**: `agent/modules/workflows.md` → Design Converter
- **Gates**: `agent/modules/quality-gates.md` (all 5 apply)
- **Premium patterns**: `design-data/references/premium-patterns.md`
- **To Figma**: `agent/modules/workflows.md` → Figma Export
