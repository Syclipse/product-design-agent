# Installation Guide

This guide covers installation for OpenCode, Claude Desktop, and other LLM environments.

## Prerequisites

### For OpenCode
- OpenCode v1.0 or higher
- Plugin support enabled

### For Claude Desktop
- Claude Desktop app installed
- Custom instructions/agents support

### For Other LLMs
- LLM that supports custom system prompts (required)
- File reading capability for reference data (recommended)
- Tool/function calling for validation (optional)

## Quick Start

### Automated Installation (Recommended)

The easiest way to install is using the provided script:

```bash
# Clone or download the repository
cd product-design--agent

# Run installer (auto-detects environment)
./install.sh

# Or specify target explicitly
./install.sh --target opencode
./install.sh --target claude
./install.sh --target custom --path /your/path
```

The script will:
1. Detect your environment (OpenCode, Claude, or ask for custom path)
2. Create necessary directories
3. Copy all files to appropriate locations
4. Validate the installation
5. Display usage instructions

### Manual Installation

#### OpenCode

```bash
# 1. Copy agent files
cp agent/product-design-partner.md ~/.config/opencode/agents/
cp -r agent/modules ~/.config/opencode/agents/product-design-partner/

# 2. Copy plugins (enables automatic validation)
cp plugins/*.js plugins/*.mjs ~/.config/opencode/plugins/

# 3. Copy reference data
mkdir -p ~/.config/opencode/design-data/references
cp design-data/references/*.md ~/.config/opencode/design-data/references/
cp design-data/references/*.json ~/.config/opencode/design-data/references/

# 4. Create runtime directories
mkdir -p ~/.config/opencode/design-data/{projects,components,tokens,validation-history}
touch ~/.config/opencode/design-data/{projects,components,tokens,validation-history}/.gitkeep
```

#### Claude Desktop

```bash
# 1. Copy agent files
mkdir -p ~/Library/Application\ Support/Claude/agents/product-design-partner
cp agent/product-design-partner.md ~/Library/Application\ Support/Claude/agents/
cp -r agent/modules ~/Library/Application\ Support/Claude/agents/product-design-partner/

# 2. Copy plugins (optional - for standalone validation)
mkdir -p ~/Library/Application\ Support/Claude/plugins
cp plugins/*.js plugins/*.mjs ~/Library/Application\ Support/Claude/plugins/

# 3. Copy reference data
mkdir -p ~/Library/Application\ Support/Claude/design-data/references
cp design-data/references/*.md ~/Library/Application\ Support/Claude/design-data/references/
cp design-data/references/*.json ~/Library/Application\ Support/Claude/design-data/references/

# 4. Create runtime directories
mkdir -p ~/Library/Application\ Support/Claude/design-data/{projects,components,tokens,validation-history}
```

#### Custom Path (Any LLM)

```bash
# Set your installation path
INSTALL_PATH="/your/custom/path"

# 1. Copy agent files
mkdir -p $INSTALL_PATH/agents/product-design-partner
cp agent/product-design-partner.md $INSTALL_PATH/agents/
cp -r agent/modules $INSTALL_PATH/agents/product-design-partner/

# 2. Copy plugins
mkdir -p $INSTALL_PATH/plugins
cp plugins/*.js plugins/*.mjs $INSTALL_PATH/plugins/

# 3. Copy reference data
mkdir -p $INSTALL_PATH/design-data/references
cp design-data/references/* $INSTALL_PATH/design-data/references/

# 4. Create runtime directories
mkdir -p $INSTALL_PATH/design-data/{projects,components,tokens,validation-history}
```

## Verification

### Test OpenCode Installation

```bash
# Start OpenCode
opencode

# In OpenCode, type:
@product-design-partner Hello
```

If installed correctly, the agent will respond and be ready to work.

### Test Claude Desktop Installation

1. Open Claude Desktop
2. Start a new conversation
3. Type: "Using the product-design-partner agent, help me design a simple button component"
4. The agent should engage with the design workflow

### Test Standalone Validator

```bash
# Create a test file
echo "Test design output" > test-design.md

# Run validator
node plugins/design-validator.mjs test-design.md

# Should output validation results
```

## Configuration

### Path Dependencies

The plugins reference paths like:
```javascript
path.join(directory, '.config', 'opencode', 'design-data', ...)
```

If you install to a custom location, you may need to update these paths in:
- `plugins/product-design.js`
- `plugins/design-validator.mjs`

### Environment Variables (Optional)

You can set these to customize behavior:

```bash
# Override default data directory
export DESIGN_DATA_DIR="/custom/design-data"

# Disable variance tracking (not recommended)
export DISABLE_VARIANCE_TRACKING=true
```

## Troubleshooting

### Agent Not Found (OpenCode)

**Problem**: `@product-design-partner` doesn't autocomplete

**Solutions**:
1. Verify file location: `~/.config/opencode/agents/product-design-partner.md`
2. Restart OpenCode
3. Check OpenCode logs for errors

### Reference Data Not Loading

**Problem**: Agent can't access ban-list.md or other references

**Solutions**:
1. Verify files exist: `ls ~/.config/opencode/design-data/references/`
2. Check file permissions: `chmod 644 ~/.config/opencode/design-data/references/*`
3. Ensure path matches what plugins expect

### Plugin Validation Errors

**Problem**: Validator fails with "Cannot find module"

**Solutions**:
1. Ensure Node.js is installed: `node --version`
2. Check plugin paths are correct
3. Run from the plugins directory: `cd ~/.config/opencode/plugins && node design-validator.mjs`

### Variance History Not Saving

**Problem**: Repeated designs with same patterns

**Solutions**:
1. Check write permissions: `ls -la ~/.config/opencode/design-data/`
2. Manually create variance-history.json: `echo '[]' > ~/.config/opencode/design-data/variance-history.json`
3. Verify plugin is loaded by OpenCode

## Updating

To update to a new version:

```bash
# Backup your runtime data first
cp -r ~/.config/opencode/design-data/projects ~/backup-projects
cp -r ~/.config/opencode/design-data/components ~/backup-components

# Run install script again
./install.sh --target opencode

# Restore your data
cp -r ~/backup-projects/* ~/.config/opencode/design-data/projects/
cp -r ~/backup-components/* ~/.config/opencode/design-data/components/
```

## Uninstalling

### OpenCode

```bash
rm ~/.config/opencode/agents/product-design-partner.md
rm -r ~/.config/opencode/agents/product-design-partner/
rm ~/.config/opencode/plugins/product-design.js
rm ~/.config/opencode/plugins/design-validator.mjs
rm ~/.config/opencode/plugins/design-migrator.js
rm ~/.config/opencode/plugins/csv-converter.mjs

# Optional: Remove reference data (keeps your generated content)
rm -r ~/.config/opencode/design-data/references/

# Optional: Remove ALL design data (deletes your projects/components)
rm -r ~/.config/opencode/design-data/
```

### Claude Desktop

```bash
rm -r ~/Library/Application\ Support/Claude/agents/product-design-partner/
rm -r ~/Library/Application\ Support/Claude/plugins/product-design*
rm -r ~/Library/Application\ Support/Claude/plugins/design-*
rm -r ~/Library/Application\ Support/Claude/plugins/csv-converter*

# Optional: Remove data directories
rm -r ~/Library/Application\ Support/Claude/design-data/
```

## Next Steps

After installation:
1. Read the [Architecture Overview](architecture.md) to understand how the system works
2. Review [Workflow Reference](workflows.md) for usage patterns
3. Try the [Examples](../examples/) to see the agent in action
4. Check [Contributing Guide](contributing.md) if you want to extend functionality
