# Quick start for designers

You do **not** need to be an engineer to use this tool. You need an AI app (usually **Cursor**), a one-time setup, and the habit of describing **who** you're designing for—not "users who want a clean UI."

## What this is (in one sentence)

An AI design partner that runs inside your editor and walks you through research, flows, screens, prototypes, critiques, and dev handoff—while pushing back on generic AI-looking design.

## Pick your tool

| If your team uses… | Start here |
|--------------------|------------|
| **Cursor** (most common) | Sections below — recommended |
| **Claude Code** | [handoff-guide.md](handoff-guide.md) → Claude Code |
| **Something else** | Ask your design lead; see [installation.md](installation.md) |

## One-time setup (about 15 minutes)

Do this once per laptop. If terminal commands feel uncomfortable, send this page to IT or a technical teammate—they can run the install block from [handoff-guide.md](handoff-guide.md#1-install-10-min).

### Step A — Get the agent on your Mac

1. Install **Node.js** (needed for a small quality checker): [nodejs.org](https://nodejs.org/) → LTS download, or `brew install node` if you use Homebrew.
2. Download the project (your team may already have a zip or internal fork):

```bash
git clone https://github.com/Syclipse/product-design-agent.git
cd product-design-agent
./install.sh --target cursor --yes
```

When it finishes, you should see a success message. That copies slash commands like `/interface` into Cursor.

### Step B — Turn on the design partner in your project

1. Open **your design project** in Cursor (the folder where you keep Figma exports, notes, or specs—not necessarily this repo).
2. Copy one file into your project so Cursor knows you're using the design partner:

   - From the downloaded repo, copy `cursor/rules/product-design-partner.mdc`
   - Into your project: `.cursor/rules/product-design-partner.mdc`  
     (Create the `.cursor/rules` folders if they don't exist.)

3. Restart Cursor or open a new chat in that project.

### Step C — Check that it worked

In Cursor chat, type `/` — you should see commands like `/interface`, `/research`, `/prototype`.

If you don't see them, run the install step again or ask IT to confirm `~/.cursor/commands/` contains `.md` files.

## Your first real task (5 minutes)

Open chat in Cursor and type:

```
/interface A settings page where finance admins reconcile Stripe payouts before month-end close. They need confidence nothing is missed.
```

**What should happen:**

1. The agent asks about **Who**, **What**, and **Feel** in plain language—not "modern users."
2. It pulls ideas from your product's world (finance, reconciliation)—not generic purple SaaS.
3. It shows **2–3 different layout directions** and asks you to pick one.
4. It refines the winner with accessibility and handoff detail.

If it jumps straight to one generic screen, say: *"Follow the Variant Protocol—show me three distinct directions first."*

## Daily cheat sheet

| I want to… | Type this in chat |
|------------|-------------------|
| Explore ideas early | `/brainstorm` or `/mentor` |
| Plan interviews | `/research` |
| Map a journey or flow | `/ux-flows` or `/diagram` |
| Design a new screen | `/interface` |
| See clickable options | `/prototype` |
| Review a mockup | `/critique` or `/ux-audit` |
| Write specs for dev | `/handoff` |
| Push to Figma | `/figma-export` (needs Figma connected—optional) |

More detail: [workflows-by-task.md](workflows-by-task.md) · [handoff-guide.md](handoff-guide.md)

## Where your work is saved

Ask the agent: *"Save this under design-data/projects/billing-dashboard/"*

That folder stays on **your machine** and is not uploaded to git by default—good for client work.

See [Saving your work](handoff-guide.md#4-save-your-work-5-min).

## When output feels "too AI"

The agent is built to reject vague briefs and overused patterns. Read [Quality gates in plain English](quality-gates-for-designers.md) if you want to understand *why* it asks for specificity.

## Get unstuck

| Problem | Try |
|---------|-----|
| No `/` commands | Re-run `./install.sh --target cursor --yes` |
| Agent ignores process | Confirm `.cursor/rules/product-design-partner.mdc` is in **your project** |
| Output is generic | Add Who/What/Feel; say "use domain from [industry], not generic SaaS" |
| Something broke after update | Re-run install; see [troubleshooting-for-designers.md](troubleshooting-for-designers.md) |

## Read next

- [Handoff guide](handoff-guide.md) — full onboarding for teams  
- [Workflows by task](workflows-by-task.md) — which command when  
- [Quality gates for designers](quality-gates-for-designers.md) — the 5 checks explained simply
