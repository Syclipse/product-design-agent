# Troubleshooting for designers

Plain-language fixes for common setup and usage issues. For install commands, see [handoff-guide.md](handoff-guide.md) or ask IT to run them.

## Setup

### I don't see `/interface` or other commands when I type `/`

**Cause:** Slash commands weren't installed into Cursor.

**Fix:**

1. Open Terminal in the folder where you downloaded the agent.
2. Run: `./install.sh --target cursor --yes`
3. Quit and reopen Cursor.
4. Type `/` in chat again.

Commands live in `~/.cursor/commands/` on your Mac. IT can verify that folder exists and contains `.md` files.

### The agent doesn't follow the design process

**Cause:** The project rule file isn't attached to **your** project folder.

**Fix:**

1. In your project (not necessarily the agent repo), create `.cursor/rules/` if missing.
2. Copy `cursor/rules/product-design-partner.mdc` from the agent repo into that folder.
3. Start a **new** chat in that project.

### Install script says "permission denied"

**Fix:**

```bash
chmod +x install.sh scripts/test.sh
./install.sh --target cursor --yes
```

## Using the agent

### Output is generic ("clean, modern dashboard for users")

**Fix in your prompt:**

- Name a **specific role** and **moment** (on-call at 2am, standup on a laptop, etc.).
- Say what they should **feel** (in control, not overwhelmed—not "good UX").
- Ask for **three distinct directions** before picking one.

See [quality-gates-for-designers.md](quality-gates-for-designers.md).

### Agent gave one design instead of 2–3 options

Say explicitly:

> Follow the Variant Protocol: show three distinct directions with a comparison table, then stop for my choice.

Use `/interface` or `/prototype`—those commands require variants.

### I don't know where files were saved

Ask in chat:

> Save everything under design-data/projects/[project-name]/ and list the file paths.

Default layout: [design-data/projects/README.md](../design-data/projects/README.md)

## Figma export

### `/figma-export` doesn't connect to Figma

Figma export needs **Figma MCP** configured in Cursor (Settings → MCP). If your org hasn't enabled it:

- The agent should still give you a **token file** and **frame-by-frame build spec** you can paste into Figma manually.
- Ask your design ops lead about MCP setup: [installation.md](installation.md#figma-mcp-optional)

## After an update

If behavior changed after pulling a new version of the agent:

1. Re-run: `./install.sh --target cursor --yes`
2. Re-copy `product-design-partner.mdc` into your project's `.cursor/rules/` if it changed.
3. Check [CHANGELOG.md](../CHANGELOG.md) for breaking notes.

## Still stuck?

| Topic | Doc |
|-------|-----|
| Full onboarding | [handoff-guide.md](handoff-guide.md) |
| First prompts | [designer-quick-start.md](designer-quick-start.md) |
| Which command | [workflows-by-task.md](workflows-by-task.md) |
| Technical install | [installation-macos.md](installation-macos.md) |
| Extending the agent | [contributing.md](contributing.md) (for maintainers) |
