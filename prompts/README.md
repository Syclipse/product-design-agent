# Goal-Mode Prompt

`goal-mode.md` is a **portable, self-contained system prompt** that distills the entire
Product Design Partner into a single field of **≤4000 characters**. Unlike the modular
`agent/` system (which reads local module files on demand), this prompt stands alone — it
needs no file access — so you can paste it anywhere you only get one instruction box.

## Where to use it

- A **Claude Project** → *Custom instructions*
- A custom **agent "goal" / system-prompt** field
- A GPT-style **builder** "Instructions" field
- Any other LLM's **system prompt**

## What it encodes

- Identity + the anti-generic stance
- The full **capability menu** (incl. Mentor, UX Flows, UX Audit, Design Converter, Figma export, Portfolio)
- The **5 quality gates** (condensed)
- **Brand**: Inter + Fragment Mono; `#501E60` plum (brand) / `#7C3AED` violet (accent); premium patterns
- The **6 Vibes × 6 Layouts** archetypes
- A compact **method** for design, audit, mentoring, flows, and portfolios

## Verify the character budget

```bash
wc -m prompts/goal-mode.md   # must be ≤ 4000
```

The file contains **only** the prompt (this README holds the notes) so the count is exact.

## Relationship to the full system

The goal-mode prompt is the **portable** entry point. When you have file access
(OpenCode, Claude Code with this repo, etc.), prefer the richer modular agent in `agent/`
plus the slash commands in `commands/` (Claude Code) or `opencode/command/` (OpenCode),
which load the detailed workflows and reference data.
