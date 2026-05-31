# UX Audit: Usability Heuristics + Accessibility Checklist

Reference data for the **UX Audit** workflow — a combined **usability** (Nielsen) and
**accessibility** (WCAG 2.1 AA) review. Every finding needs: location, the heuristic/
criterion it violates, **severity**, and a concrete fix. Calculate; don't estimate.

---

## Nielsen's 10 Usability Heuristics

1. **Visibility of system status** — timely feedback for every action.
2. **Match between system and the real world** — user's language, natural order.
3. **User control and freedom** — undo/redo, clear exits ("emergency exit").
4. **Consistency and standards** — platform conventions; same word = same thing.
5. **Error prevention** — prevent slips/mistakes before they happen.
6. **Recognition rather than recall** — show options; don't make users remember.
7. **Flexibility and efficiency** — accelerators for experts, simple for novices.
8. **Aesthetic and minimalist design** — no competing, irrelevant content.
9. **Help users recognize, diagnose, recover from errors** — plain language + a way out.
10. **Help and documentation** — findable, task-focused, concise.

---

## WCAG 2.1 AA Checklist (high-frequency)

- **Contrast**: text ≥ 4.5:1 (large text ≥ 3:1); UI components & graphics ≥ 3:1. *Measure it.*
- **Keyboard**: every interactive element reachable & operable; no traps; visible focus.
- **Focus order**: logical, follows reading order; focus not lost on update.
- **Semantics**: landmarks, one `h1`, ordered headings, real `button`/`a`, `label` for inputs.
- **Names/roles/values**: icon-only controls have accessible names; ARIA only when needed.
- **Images**: meaningful `alt`; decorative images `alt=""`.
- **Forms**: persistent labels (not placeholder-only), errors identified in text + how to fix.
- **Color**: never the *only* means of conveying information (add icon/text/pattern).
- **Targets**: ≥ 44×44pt (iOS) / 48×48dp (Android).
- **Motion**: honour `prefers-reduced-motion`; nothing flashes > 3×/sec.

---

## Severity Scale

| Severity | Meaning | Examples |
|---|---|---|
| **Critical** | Blocks a core task or fails legal a11y | Keyboard trap; submit unreachable; 2.1:1 body text |
| **Major** | Significantly impairs; workaround exists | Weak focus ring; inconsistent nav; vague errors |
| **Minor** | Friction / polish | Tight spacing; redundant label; small icon target |

**Priority = frequency × severity.** A minor issue on the most-used screen can outrank a
critical issue on a rarely-seen one.

---

## Audit Report Template

```markdown
# UX Audit: [Target]

## Scope & Method
[What was reviewed; heuristic walkthrough + WCAG AA pass]

## Summary
[Score / overall health, top themes]

## Findings
### F1 — [Title]  · Severity: Critical · Heuristic/Criterion: [#]
- Where: [screen/element]
- Issue: [what + why it matters]
- Evidence: [measured contrast / steps to reproduce]
- Fix: [specific, actionable]

[repeat]

## Top 3–5 Priorities
1. [Finding] — [impact rationale]
```

---

## Anti-Patterns

- ❌ Estimating contrast instead of measuring
- ❌ Findings with no severity or no fix
- ❌ Vague notes ("confusing layout") — name the element and the heuristic
- ❌ Only criticism — note what works and is worth keeping
- ❌ Stage-inappropriate nitpicks on an early exploration

## See Also

- **Workflow**: `agent/modules/workflows.md` → UX Audit (and Accessibility Audit)
- **Validation tests / ban list**: `agent/modules/quality-gates.md` (Gates 3 & 5)
- **Critique frameworks**: `agent/modules/frameworks-and-artifacts.md`
