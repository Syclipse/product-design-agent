# Mentorship Frameworks (Idea → Product Concept)

Reference data for the **AI Mentor** workflow. Guides a designer from a raw idea to a
defensible product concept. Mentor by asking, not answering — surface assumptions, then
help the user converge. Never skip problem framing to jump at a solution.

---

## The Idea → Concept Journey

1. **Capture the spark** — what is the idea, in one sentence? Who is it for?
2. **Frame the problem** — restate as 5–10 *How-Might-We* questions. The idea is a
   hypothesised solution; find the problem underneath it.
3. **Find the job** — write the Job-To-Be-Done (below). Concepts that don't serve a real
   job die.
4. **Map the riskiest assumption** — what must be true for this to work? Test that first.
5. **Diverge** — generate 5+ distinct concept directions (don't anchor on the first).
6. **Converge** — score directions by impact × feasibility × desirability.
7. **Write the concept brief** (template below) — the deliverable.

---

## Jobs-To-Be-Done (JTBD)

> When **[situation]**, I want to **[motivation/forces]**, so I can **[expected outcome]**.

- Focus on the *progress* the person is trying to make, not demographics.
- Capture **push** (what frustrates them today), **pull** (what attracts them to a new
  solution), **habit** (inertia), and **anxiety** (what makes them hesitate).

**PASS:** "When a ticket SLA is about to breach, I want to see which to grab next without
reading each one, so I can avoid penalties and look in control to my team."
**FAIL:** "Millennials want a modern way to manage tasks."

---

## Lean Canvas (concept on one page)

Problem · Customer segments · Unique value proposition · Solution · Channels ·
Revenue · Cost · Key metrics · Unfair advantage.

Fill **Problem** and **Customer** before **Solution**. If those two are weak, the canvas
is fiction.

---

## Riskiest-Assumption Tests

| Assumption type | Question | Cheapest test |
|---|---|---|
| Desirability | Do they want it? | Interviews, landing-page smoke test |
| Viability | Will it sustain? | Pricing probe, willingness-to-pay |
| Feasibility | Can we build it? | Technical spike, prototype |
| Usability | Can they use it? | 5-user usability test |

Rank assumptions by **(impact if wrong) × (uncertainty)**. Test the top one first.

---

## Concept Brief (deliverable template)

```markdown
# [Concept Name]

## The Job
[JTBD statement]

## The Person
[Specific human in context — role, environment, mood; NOT "users"]

## Problem & Evidence
[The HMW it answers + what tells us it's real; confidence High/Med/Low]

## The Concept
[1 paragraph: what it is and why it fits the job]

## Riskiest Assumption
[The one thing that must be true + how we'll test it next]

## Success Signal
[The single metric/behaviour that says it's working]

## Out of Scope (for now)
[What we are deliberately NOT doing — YAGNI]
```

---

## Anti-Patterns

- ❌ Solving before framing the problem
- ❌ One idea dressed up as "options" (force 5+ genuinely different directions)
- ❌ Demographic targeting instead of a job/context
- ❌ A concept with no riskiest-assumption test
- ❌ Scope with no explicit "not now"

## See Also

- **Workflow**: `agent/modules/workflows.md` → AI Mentor
- **Strategy frameworks**: `agent/modules/frameworks-and-artifacts.md` (brainstorming techniques)
- **Flows next step**: `design-data/references/ux-flow-patterns.md`
