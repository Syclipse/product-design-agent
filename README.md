# Product Design Partner Agent

A systematic, evidence-based product design agent for AI assistants (Claude, OpenCode, and other LLMs) with strict quality enforcement gates.

## Features

- **8 Specialized Workflows**: User research, design systems, interface design, product strategy, design critique, handoff specs, accessibility audits, and Figma integration
- **5 Quality Gates**: Mandatory validation for intent declaration, domain exploration, validation tests, variance tracking, and ban list enforcement
- **Evidence-Based**: Every recommendation traces to sources with confidence levels
- **Craft-Focused**: Intent-first design with self-critique mandate to avoid generic AI defaults
- **WCAG 2.1 AA**: Accessibility built in as core requirement, not afterthought
- **Variance Tracking**: Prevents repetitive design patterns across outputs
- **DesignPrompts.dev Integration**: 350KB reference library of styles, colors, and typography

## What This Agent Does

The Product Design Partner helps with:

- **User Research**: Planning studies, conducting interviews, synthesizing findings
- **Design Systems**: Auditing token coverage, documenting components, ensuring consistency
- **Interface Design**: Dashboards, admin panels, SaaS apps, data-heavy tools
- **Product Strategy**: Brainstorming, opportunity identification, assumption testing
- **Design Critique**: Structured feedback on usability, hierarchy, consistency
- **Design Handoff**: Complete developer specs with layout, tokens, states, edge cases
- **UX Copy**: Microcopy, error messages, empty states, CTAs
- **Accessibility**: WCAG audits and remediation guidance

## Architecture

```
product-design--agent/
├── agent/
│   ├── product-design-partner.md      [Core agent definition]
│   └── modules/                       [5 modular subagents]
│       ├── INDEX.md                   [System map]
│       ├── quality-gates.md           [5 gates + brand identity]
│       ├── workflows.md               [8 complete workflows]
│       ├── standards-and-anti-patterns.md
│       └── frameworks-and-artifacts.md
│
├── plugins/
│   ├── product-design.js              [Core validation plugin for OpenCode]
│   ├── design-validator.mjs           [Standalone validator (any LLM)]
│   ├── design-migrator.js             [Legacy data migration]
│   └── csv-converter.mjs              [DesignPrompts.dev converter]
│
└── design-data/
    └── references/                    [350KB reference data]
        ├── ban-list.md                [284 lines - forbidden patterns]
        ├── brand-identity.md          [311 lines - brand guidelines]
        ├── premium-patterns.md        [326 lines - architecture patterns]
        ├── designprompts-styles.json  [191KB - style reference]
        ├── designprompts-colors.json  [91KB - color palettes]
        └── designprompts-typography.json [68KB - typography systems]
```

## Installation

### Option A: Manual Installation (All LLMs)

**For OpenCode:**
```bash
# 1. Copy agent files
cp -r agent ~/.config/opencode/agents/product-design-partner
cp agent/product-design-partner.md ~/.config/opencode/agents/

# 2. Copy plugins (optional but recommended)
cp plugins/*.js plugins/*.mjs ~/.config/opencode/plugins/

# 3. Copy reference data
cp -r design-data ~/.config/opencode/
```

**For Claude Desktop:**
```bash
# 1. Copy agent files to Claude's custom instructions directory
# (Exact path depends on your Claude Desktop configuration)
cp -r agent ~/Library/Application\ Support/Claude/agents/product-design-partner

# 2. Copy reference data
cp -r design-data ~/Library/Application\ Support/Claude/design-data
```

**For Other LLMs:**
```bash
# 1. Copy agent markdown to your LLM's custom instructions/agent directory
# 2. Reference the path in your LLM's configuration
# 3. Ensure the LLM can read from design-data/references/ for validation
```

### Option B: Automated Installation

```bash
# Run install script (interactive)
./install.sh

# Or specify installation target
./install.sh --target opencode
./install.sh --target claude
./install.sh --target custom --path /your/custom/path
```

The install script will:
- Detect your environment (OpenCode, Claude Desktop, or custom)
- Copy files to appropriate locations
- Create necessary directories with proper permissions
- Validate installation completeness
- Provide usage instructions

## Quick Start

### OpenCode

1. After installation, start OpenCode in your project:
   ```bash
   opencode
   ```

2. Invoke the agent:
   ```
   @product-design-partner Help me design a dashboard for monitoring API usage
   ```

3. The agent will route to the appropriate workflow and guide you through:
   - Intent declaration (who/what/feel)
   - Domain exploration
   - Validation tests
   - Final output with all gates passed

### Claude Desktop / Other LLMs

1. Load the agent as a custom instruction or system prompt
2. Reference the agent in your conversation:
   ```
   Using the product-design-partner agent, help me audit my design system for hardcoded values
   ```

3. For validation without plugins:
   ```bash
   # Use standalone validator
   node plugins/design-validator.mjs your-design-artifact.md
   ```

## Usage Examples

### User Research
```
@product-design-partner I need to plan user interviews for understanding
how data analysts use our dashboard
```

### Interface Design
```
@product-design-partner Design a settings page for a SaaS analytics platform.
Users are data team leads who need to manage team permissions and API keys.
```

### Design Critique
```
@product-design-partner Review this dashboard design [attach screenshot or Figma URL]
```

### Accessibility Audit
```
@product-design-partner Run a WCAG 2.1 AA audit on this component
```

## Quality Gates

All design output passes through 5 mandatory gates:

1. **Intent Declaration**: Who (specific human) / What (specific task) / Feel (specific emotion)
2. **Domain Exploration**: 5+ domain concepts, 5+ natural colors, 1 signature element
3. **Validation Tests**: Swap test, squint test, signature test, token test
4. **Variance Check**: No repeat vibe+layout combos in last 2 outputs
5. **Ban List**: 10 forbidden patterns that signal generic AI output

**Plugins automatically enforce these gates in OpenCode.**  
**For other LLMs, use the standalone validator:**

```bash
node plugins/design-validator.mjs design-output.md
```

## Documentation

- [Installation Guide](docs/installation.md) - Detailed installation for all environments
- [Architecture Overview](docs/architecture.md) - System design and module dependencies
- [Workflow Reference](docs/workflows.md) - All 8 workflows with examples
- [Contributing](docs/contributing.md) - How to extend and improve the agent

## Brand Identity

The agent uses its own design system as a demonstration:

- **Fonts**: Inter (headings/body), Fragment Mono (code/labels/data)
- **Color**: Purple #501E60 (primary accent)
- **Architecture**: Double-Bezel, Button-in-Button, Whisper-Quiet Elevation, Custom Motion

See `design-data/references/brand-identity.md` for complete guidelines.

## How It Works

**Modular Loading**: The core agent (product-design-partner.md) is a lightweight router (~200 lines) that dynamically loads specialized modules as needed. This keeps context usage low while providing comprehensive guidance.

**Plugin Validation** (OpenCode): The product-design.js plugin runs automatically on every design output, blocking responses that violate quality gates. It also tracks variance history and suggests skills proactively.

**Standalone Validation** (Other LLMs): Use design-validator.mjs to validate design artifacts manually. Results are saved to validation-history/ for review.

**DesignPrompts.dev Integration**: The agent includes 350KB of curated reference data from DesignPrompts.dev, covering:
- 50+ visual styles
- 161 color palettes
- 57 font pairings
- 99 UX guidelines

## Requirements

- **For OpenCode**: OpenCode v1.0+ with plugin support
- **For Claude Desktop**: Claude Desktop app with custom instructions
- **For Other LLMs**: Any LLM that supports:
  - Custom system prompts (required)
  - File reading for reference data (recommended)
  - Tool/function calling for validation (optional)

## License

Licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Contributing

Contributions welcome! See [CONTRIBUTING.md](docs/contributing.md) for guidelines.

Key areas for contribution:
- Additional workflow templates
- More banned pattern detection
- Integration with other design tools
- Translations for international teams

## Changelog

### v1.0.0 (2026-05-31)
- Initial release
- 8 complete workflows
- 5 quality gates with automatic enforcement
- OpenCode plugin with variance tracking
- DesignPrompts.dev reference data (350KB)
- Standalone validator for any LLM

## Support

- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Share usage patterns and feedback via GitHub Discussions
- **Documentation**: Full docs at [docs/](docs/)

## Credits

Built by Dan for evidence-based, craft-focused product design with AI assistance.

Inspired by:
- DesignPrompts.dev (style reference data)
- WCAG 2.1 AA standards
- Double Diamond design process
- Jobs-to-be-Done framework
