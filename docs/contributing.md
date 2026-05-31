# Contributing to Product Design Partner Agent

Thank you for your interest in contributing! This guide will help you extend and improve the agent.

## Code of Conduct

- Be respectful and professional
- Focus on technical merit
- Assume positive intent
- Provide constructive feedback
- Document your changes thoroughly

## How to Contribute

### Reporting Issues

1. Check existing issues first
2. Use the issue template
3. Provide:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OpenCode version, OS, etc.)
   - Sample design output if relevant

### Suggesting Features

1. Open a discussion (not an issue) first
2. Explain:
   - The problem you're solving
   - Why existing workflows don't address it
   - How it fits the agent's philosophy
   - Example usage

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test thoroughly (see Testing section)
5. Commit with clear messages
6. Push and create PR

## Development Setup

### Prerequisites

```bash
# Install Node.js 18+ (for plugins)
node --version

# Install development dependencies
npm install
```

### Local Testing Environment

```bash
# 1. Create test installation
mkdir -p ~/test-design-agent
export TEST_INSTALL_PATH=~/test-design-agent

# 2. Install to test location
./install.sh --target custom --path $TEST_INSTALL_PATH

# 3. Run tests
npm test

# 4. Test with OpenCode
# Update opencode config to point to test location
opencode --config test-opencode.json
```

## Architecture Rules

### Core Principles

1. **Modularity**: Keep modules focused and independent
2. **Lazy Loading**: Load only what's needed
3. **Evidence-Based**: Every recommendation must cite sources
4. **Craft-Focused**: Prevent generic AI defaults
5. **Accessibility-First**: WCAG 2.1 AA is non-negotiable

### File Structure

```
product-design--agent/
├── agent/                  [Agent definition files]
│   ├── *.md               [Markdown only, no code]
│   └── modules/           [Loadable subagents]
├── plugins/               [JavaScript/Node.js code]
│   ├── *.js              [ES modules]
│   └── *.mjs             [ES modules (explicit)]
├── design-data/
│   └── references/        [Static reference data]
├── docs/                  [Documentation (you are here)]
└── examples/              [Test cases and demos]
```

### Naming Conventions

**Agent Files** (agent/*.md):
- Lowercase with hyphens: `product-design-partner.md`
- Module names match purpose: `quality-gates.md`, `workflows.md`

**Plugin Files** (plugins/*.js):
- Lowercase with hyphens: `design-validator.mjs`
- Descriptive: what it does, not how it works

**Reference Data** (design-data/references/*.md):
- Lowercase with hyphens: `ban-list.md`, `premium-patterns.md`
- JSON files: `designprompts-{category}.json`

## Adding New Features

### Adding a New Workflow

**Example**: Adding a "Design System Audit" workflow

1. **Define the workflow** in `agent/modules/workflows.md`:

```markdown
### 8. Design System Audit

**Trigger**: "audit design system", "check for inconsistencies", "hardcoded values"

**Mandatory Intent Declaration**:
- Who: Design system maintainers and engineers using the system
- What: Identify token coverage gaps, hardcoded values, naming inconsistencies
- Feel: Confident in system health, clear on what needs fixing

**Steps**:
1. Scope Definition
   - Which components to audit?
   - Which properties matter? (colors, typography, spacing, shadows)
   - Any suspected problem areas?

2. Token Inventory
   [Scan through component code/designs]
   - List all unique values (colors, font sizes, spacing values)
   - Categorize: "uses token" vs "hardcoded"

3. Gap Analysis
   [For each hardcoded value]
   - Should this be a token? (used 2+ places? semantic meaning?)
   - If yes, suggest token name + add to backlog
   - If no, document why it's intentionally hardcoded

4. Inconsistency Detection
   - Multiple tokens for same visual purpose? (brand-blue vs primary-blue)
   - Similar values that should be unified? (#333 and #444 both for body text)

5. Recommendations
   - P0: Breaks without fix (missing required tokens)
   - P1: High-impact inconsistencies
   - P2: Nice-to-have consolidations

**Output Format**:
- Summary: X components, Y tokens, Z hardcoded values
- Token coverage: XX% (with breakdown by category)
- Top 5 issues ranked by impact
- Recommended token additions (with names + values)
```

2. **Update core router** in `agent/product-design-partner.md`:

```markdown
## Request Router

[Analysis of request]

If request involves:
...
- Auditing design system, checking tokens, finding hardcoded values
  → Load workflows.md section 8 (Design System Audit)
...
```

3. **Add reference data** if needed (optional):

```bash
# Create design-data/references/token-patterns.json
{
  "recommended_structure": {
    "color": ["primary", "secondary", "accent", "neutral"],
    "typography": ["heading", "body", "label", "mono"],
    "spacing": ["xs", "sm", "md", "lg", "xl"]
  },
  "anti_patterns": [
    "color-1, color-2, color-3",
    "font-big, font-medium, font-small"
  ]
}
```

4. **Add example** in `examples/`:

```markdown
<!-- examples/design-system-audit.md -->
# Example: Design System Audit

## Request
@product-design-partner Audit our button components for token coverage

## Intent
- Who: Frontend engineers using our React component library
- What: Check if buttons use design tokens consistently
- Feel: Confident that all buttons render correctly and updates are easy

## Output
[Full audit with findings and recommendations]
```

5. **Update documentation** in `docs/workflows.md`

6. **Test**:

```bash
# Test with OpenCode
@product-design-partner Audit design system for my project

# Test with standalone validator
node plugins/design-validator.mjs examples/design-system-audit.md
```

### Adding a New Quality Gate

**Example**: Adding a "Readability Gate"

1. **Define gate** in `agent/modules/quality-gates.md`:

```markdown
### Gate 6: Readability Test

**Purpose**: Ensure text is readable at typical viewing distances

**Validation**:
- [ ] Body text: minimum 16px (1rem) on web, 14pt on mobile
- [ ] Contrast: minimum 4.5:1 for body, 3:1 for large text (WCAG AA)
- [ ] Line length: 50-75 characters per line for body text
- [ ] Line height: 1.5-1.7 for body, 1.2-1.4 for headings

**Test Method**:
1. View design at actual size (100% zoom, not scaled)
2. Stand 20-24 inches from screen (typical viewing distance)
3. Check all text is comfortably readable without squinting

**Automatic Checks** (validator):
```javascript
function validateReadability(design) {
  const bodySize = extractFontSize(design, 'body');
  if (bodySize < 16) {
    return fail(`Body text too small: ${bodySize}px (min 16px)`);
  }
  
  const contrast = extractContrast(design);
  if (contrast < 4.5) {
    return fail(`Contrast too low: ${contrast}:1 (min 4.5:1)`);
  }
  
  return pass();
}
```

**Remediation**:
If fails → Increase font size, improve contrast, adjust line length
```

2. **Implement in OpenCode plugin** (`plugins/product-design.js`):

```javascript
async function validateReadability(design) {
  const gates = {
    fontSize: false,
    contrast: false,
    lineLength: false,
    lineHeight: false
  };
  
  // Extract font sizes
  const fontSizes = design.match(/font-size:\s*(\d+)px/g) || [];
  const bodySizes = fontSizes.filter(s => {
    const size = parseInt(s.match(/\d+/)[0]);
    return size >= 14 && size <= 18; // Likely body text
  });
  
  gates.fontSize = bodySizes.every(s => {
    const size = parseInt(s.match(/\d+/)[0]);
    return size >= 16;
  });
  
  // Extract contrasts (simplified - real version would use color library)
  const contrasts = design.match(/contrast:\s*([\d.]+):1/g) || [];
  gates.contrast = contrasts.every(c => {
    const ratio = parseFloat(c.match(/([\d.]+)/)[0]);
    return ratio >= 4.5;
  });
  
  // Check line lengths (in component specs)
  const maxChars = design.match(/max-width:\s*(\d+)ch/g) || [];
  gates.lineLength = maxChars.every(m => {
    const chars = parseInt(m.match(/\d+/)[0]);
    return chars >= 50 && chars <= 75;
  });
  
  // Check line heights
  const lineHeights = design.match(/line-height:\s*([\d.]+)/g) || [];
  gates.lineHeight = lineHeights.every(lh => {
    const height = parseFloat(lh.match(/([\d.]+)/)[0]);
    return height >= 1.5 && height <= 1.7;
  });
  
  const allPass = Object.values(gates).every(g => g);
  
  return {
    pass: allPass,
    gates,
    message: allPass 
      ? "Readability gate passed"
      : `Readability issues: ${Object.entries(gates)
          .filter(([k,v]) => !v)
          .map(([k]) => k)
          .join(', ')}`
  };
}

// Add to main validation flow
async function runAllGates(design) {
  const results = {
    intent: await validateIntent(design),
    domain: await validateDomain(design),
    validation: await validateTests(design),
    variance: await validateVariance(design),
    banlist: await validateBanList(design),
    readability: await validateReadability(design)  // NEW
  };
  
  return results;
}
```

3. **Implement in standalone validator** (`plugins/design-validator.mjs`):

```javascript
function validateReadability(designContent) {
  // Similar logic to OpenCode plugin
  // But can be more sophisticated since it's not real-time
  
  const issues = [];
  
  // Font size check
  const bodyFonts = extractBodyFontSizes(designContent);
  bodyFonts.forEach(font => {
    if (font.size < 16) {
      issues.push({
        type: 'font-size',
        location: font.location,
        actual: `${font.size}px`,
        expected: 'minimum 16px',
        severity: 'error'
      });
    }
  });
  
  // Contrast check (requires color library)
  const colorPairs = extractColorPairs(designContent);
  colorPairs.forEach(pair => {
    const contrast = calculateContrast(pair.foreground, pair.background);
    if (contrast < 4.5) {
      issues.push({
        type: 'contrast',
        location: pair.location,
        actual: `${contrast.toFixed(2)}:1`,
        expected: 'minimum 4.5:1',
        severity: 'error'
      });
    }
  });
  
  return {
    pass: issues.length === 0,
    issues
  };
}
```

4. **Add tests**:

```javascript
// tests/readability-gate.test.js
describe('Readability Gate', () => {
  test('passes with 16px body text', () => {
    const design = `
      Body text: 16px Inter
      Contrast: 7:1
      Max width: 65ch
      Line height: 1.6
    `;
    const result = validateReadability(design);
    expect(result.pass).toBe(true);
  });
  
  test('fails with 14px body text', () => {
    const design = `
      Body text: 14px Inter
    `;
    const result = validateReadability(design);
    expect(result.pass).toBe(false);
    expect(result.issues[0].type).toBe('font-size');
  });
  
  test('fails with low contrast', () => {
    const design = `
      Text: #888 on #ccc
      Contrast: 2.8:1
    `;
    const result = validateReadability(design);
    expect(result.pass).toBe(false);
    expect(result.issues[0].type).toBe('contrast');
  });
});
```

5. **Update documentation**:
   - Add to README.md quality gates section
   - Document in docs/architecture.md
   - Create example in examples/

### Adding Reference Data

**Example**: Adding animation timing reference

1. **Create JSON file** `design-data/references/animation-timings.json`:

```json
{
  "durations": {
    "instant": "100ms",
    "fast": "200ms",
    "normal": "300ms",
    "slow": "500ms",
    "very_slow": "800ms"
  },
  "easings": {
    "standard": "cubic-bezier(0.4, 0.0, 0.2, 1)",
    "decelerate": "cubic-bezier(0.0, 0.0, 0.2, 1)",
    "accelerate": "cubic-bezier(0.4, 0.0, 1, 1)",
    "bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
  },
  "use_cases": {
    "button_press": {
      "duration": "100ms",
      "easing": "standard"
    },
    "page_transition": {
      "duration": "300ms",
      "easing": "decelerate"
    },
    "modal_open": {
      "duration": "200ms",
      "easing": "decelerate"
    }
  }
}
```

2. **Reference in workflow** (agent/modules/workflows.md):

```markdown
### Animation Specifications

When specifying animations, reference `animation-timings.json`:

**Duration Selection**:
- Micro-interactions (button press, checkbox toggle): instant (100ms)
- UI updates (dropdown, tooltip): fast (200ms)
- View transitions (page change, modal): normal (300ms)
- Loading states: slow (500ms)

**Easing Selection**:
[Reference animation-timings.json for specific curves]

**Output Format**:
```css
.button {
  transition: transform 100ms cubic-bezier(0.4, 0.0, 0.2, 1);
}
```
```

3. **Use in validation** (optional):

```javascript
// plugins/product-design.js
import animationTimings from '../design-data/references/animation-timings.json';

function validateAnimationTiming(design) {
  const durations = design.match(/transition:\s*[^;]+\s+(\d+)ms/g);
  const warnings = [];
  
  durations.forEach(d => {
    const ms = parseInt(d.match(/(\d+)ms/)[1]);
    const standard = Object.values(animationTimings.durations)
      .map(v => parseInt(v));
    
    if (!standard.includes(ms)) {
      warnings.push(`Non-standard duration: ${ms}ms`);
    }
  });
  
  return { pass: warnings.length === 0, warnings };
}
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suite
npm test plugins/design-validator.test.js

# Run with coverage
npm test -- --coverage

# Watch mode during development
npm test -- --watch
```

### Writing Tests

**Unit Tests** (individual functions):

```javascript
// tests/ban-list.test.js
import { checkBanList } from '../plugins/product-design.js';

describe('Ban List Validation', () => {
  test('detects generic gradient', () => {
    const design = 'background: linear-gradient(to right, #667eea, #764ba2)';
    const result = checkBanList(design);
    expect(result.violations).toContain('generic-gradient');
  });
  
  test('passes custom gradient', () => {
    const design = 'background: linear-gradient(135deg, #501E60, #7C3F92)';
    const result = checkBanList(design);
    expect(result.violations).toHaveLength(0);
  });
});
```

**Integration Tests** (full workflows):

```javascript
// tests/integration/interface-design.test.js
import { runWorkflow } from '../agent/workflow-runner.js';

describe('Interface Design Workflow', () => {
  test('completes dashboard design', async () => {
    const request = 'Design a dashboard for API monitoring';
    const result = await runWorkflow(request);
    
    expect(result.intent).toBeDefined();
    expect(result.intent.who).toBeTruthy();
    expect(result.intent.what).toBeTruthy();
    expect(result.intent.feel).toBeTruthy();
    
    expect(result.domain.concepts.length).toBeGreaterThanOrEqual(5);
    expect(result.domain.colors.length).toBeGreaterThanOrEqual(5);
    expect(result.domain.signature).toBeTruthy();
    
    expect(result.gates.allPassed).toBe(true);
  });
});
```

**Manual Testing Checklist**:

- [ ] Test with OpenCode: `@product-design-partner [your request]`
- [ ] Test standalone validator: `node plugins/design-validator.mjs example.md`
- [ ] Check validation history: `cat design-data/validation-history/*.json`
- [ ] Verify variance tracking: `cat design-data/variance-history.json`
- [ ] Test on multiple platforms (macOS, Linux, Windows if possible)

## Documentation

### Updating Documentation

When adding features, update:

1. **README.md**: If it changes user-facing behavior
2. **docs/architecture.md**: If it changes internal structure
3. **docs/workflows.md**: If adding/changing workflows
4. **docs/installation.md**: If it affects installation
5. **CHANGELOG.md**: Always (see versioning section)

### Documentation Style

- Use clear, concise language
- Include examples for every feature
- Provide both conceptual explanation and technical details
- Use diagrams for complex architectures
- Keep code examples up-to-date

## Versioning

We use [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.x.x): Breaking changes to agent API or plugin interface
- **MINOR** (x.1.x): New workflows, gates, or features (backward compatible)
- **PATCH** (x.x.1): Bug fixes, documentation, reference data updates

### Changelog Format

```markdown
## [1.1.0] - 2026-06-15

### Added
- Design System Audit workflow
- Readability quality gate
- Animation timing reference data

### Changed
- Improved ban list detection (now catches variations)
- Updated DesignPrompts.dev data (new color palettes)

### Fixed
- Variance tracking now handles edge case with empty history
- Plugin path resolution on Windows

### Deprecated
- Old validation history format (use migrator to update)
```

## Review Process

### Pull Request Checklist

Before submitting PR:

- [ ] Code follows existing style
- [ ] All tests pass: `npm test`
- [ ] New features have tests
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Examples provided for new features
- [ ] Commit messages are clear

### Review Criteria

Reviewers check for:

1. **Functionality**: Does it work as intended?
2. **Design Alignment**: Follows agent's philosophy?
3. **Code Quality**: Readable, maintainable, efficient?
4. **Testing**: Adequate test coverage?
5. **Documentation**: Clear and complete?
6. **Breaking Changes**: If yes, is it justified and documented?

## Getting Help

- **Questions**: Open a discussion
- **Bugs**: Open an issue
- **Chat**: [Link to community chat if available]
- **Email**: [Maintainer email]

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Thanked in README.md acknowledgments

Thank you for helping make this agent better!
