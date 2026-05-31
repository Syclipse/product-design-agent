#!/bin/bash

# Product Design Partner Agent - Installation Script
# Supports OpenCode, Claude Desktop, and custom installations

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print functions
print_header() {
    echo -e "${BLUE}================================================${NC}"
    echo -e "${BLUE}  Product Design Partner Agent - Installer${NC}"
    echo -e "${BLUE}================================================${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Detect installation target
detect_target() {
    if [ -d "$HOME/.config/opencode" ]; then
        echo "opencode"
    elif [ -d "$HOME/Library/Application Support/Claude" ]; then
        echo "claude"
    else
        echo "unknown"
    fi
}

# Get installation paths based on target
get_paths() {
    local target=$1
    case $target in
        opencode)
            AGENT_DIR="$HOME/.config/opencode/agents"
            PLUGINS_DIR="$HOME/.config/opencode/plugins"
            DATA_DIR="$HOME/.config/opencode/design-data"
            ;;
        claude)
            AGENT_DIR="$HOME/Library/Application Support/Claude/agents"
            PLUGINS_DIR="$HOME/Library/Application Support/Claude/plugins"
            DATA_DIR="$HOME/Library/Application Support/Claude/design-data"
            ;;
        *)
            if [ -n "$CUSTOM_PATH" ]; then
                AGENT_DIR="$CUSTOM_PATH/agents"
                PLUGINS_DIR="$CUSTOM_PATH/plugins"
                DATA_DIR="$CUSTOM_PATH/design-data"
            else
                print_error "No installation path provided"
                exit 1
            fi
            ;;
    esac
}

# Create directories
create_directories() {
    print_info "Creating directories..."
    mkdir -p "$AGENT_DIR/product-design-partner/modules"
    mkdir -p "$PLUGINS_DIR"
    mkdir -p "$DATA_DIR/references"
    mkdir -p "$DATA_DIR/projects"
    mkdir -p "$DATA_DIR/components"
    mkdir -p "$DATA_DIR/tokens"
    mkdir -p "$DATA_DIR/validation-history"
    print_success "Directories created"
}

# Copy agent files
copy_agent_files() {
    print_info "Copying agent files..."
    cp agent/product-design-partner.md "$AGENT_DIR/"
    cp agent/modules/*.md "$AGENT_DIR/product-design-partner/modules/"
    print_success "Agent files copied"
}

# Copy plugin files
copy_plugin_files() {
    print_info "Copying plugin files..."
    cp plugins/*.js plugins/*.mjs "$PLUGINS_DIR/" 2>/dev/null || true
    print_success "Plugin files copied"
}

# Copy reference data
copy_reference_data() {
    print_info "Copying reference data (350KB)..."
    cp design-data/references/*.md "$DATA_DIR/references/"
    cp design-data/references/*.json "$DATA_DIR/references/"
    print_success "Reference data copied"
}

# Create .gitkeep files
create_gitkeep_files() {
    print_info "Creating .gitkeep files for empty directories..."
    touch "$DATA_DIR/projects/.gitkeep"
    touch "$DATA_DIR/components/.gitkeep"
    touch "$DATA_DIR/tokens/.gitkeep"
    touch "$DATA_DIR/validation-history/.gitkeep"
    print_success ".gitkeep files created"
}

# Validate installation
validate_installation() {
    print_info "Validating installation..."
    local errors=0
    
    if [ ! -f "$AGENT_DIR/product-design-partner.md" ]; then
        print_error "Main agent file not found"
        ((errors++))
    fi
    
    if [ ! -d "$AGENT_DIR/product-design-partner/modules" ]; then
        print_error "Modules directory not found"
        ((errors++))
    fi
    
    if [ ! -d "$DATA_DIR/references" ]; then
        print_error "Reference data directory not found"
        ((errors++))
    fi
    
    if [ $errors -eq 0 ]; then
        print_success "Installation validated successfully"
        return 0
    else
        print_error "Installation validation failed with $errors errors"
        return 1
    fi
}

# Print usage instructions
print_usage_instructions() {
    local target=$1
    echo ""
    echo -e "${GREEN}================================================${NC}"
    echo -e "${GREEN}  Installation Complete!${NC}"
    echo -e "${GREEN}================================================${NC}"
    echo ""
    
    case $target in
        opencode)
            echo "Usage in OpenCode:"
            echo "  opencode"
            echo "  @product-design-partner Help me design a dashboard"
            echo ""
            echo "The agent will automatically:"
            echo "  - Route to appropriate workflows"
            echo "  - Enforce quality gates via plugins"
            echo "  - Track variance history"
            ;;
        claude)
            echo "Usage in Claude Desktop:"
            echo "  Reference the agent in your conversations:"
            echo "  'Using the product-design-partner agent, help me...'"
            echo ""
            echo "For validation without plugins:"
            echo "  node $PLUGINS_DIR/design-validator.mjs output.md"
            ;;
        *)
            echo "Installation complete at: $CUSTOM_PATH"
            echo ""
            echo "To use with your LLM:"
            echo "  1. Load agent/product-design-partner.md as system prompt"
            echo "  2. Ensure LLM can read from $DATA_DIR/references/"
            echo "  3. For validation: node plugins/design-validator.mjs output.md"
            ;;
    esac
    
    echo ""
    echo "Documentation: docs/"
    echo "Examples: examples/"
    echo ""
}

# Main installation flow
main() {
    print_header
    
    # Parse arguments
    TARGET=""
    CUSTOM_PATH=""
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --target)
                TARGET="$2"
                shift 2
                ;;
            --path)
                CUSTOM_PATH="$2"
                shift 2
                ;;
            --help|-h)
                echo "Usage: $0 [OPTIONS]"
                echo ""
                echo "Options:"
                echo "  --target <opencode|claude|custom>  Installation target"
                echo "  --path <path>                       Custom installation path (with --target custom)"
                echo "  --help, -h                          Show this help message"
                echo ""
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                exit 1
                ;;
        esac
    done
    
    # Detect or validate target
    if [ -z "$TARGET" ]; then
        print_info "No target specified, detecting environment..."
        TARGET=$(detect_target)
        if [ "$TARGET" == "unknown" ]; then
            print_warning "Could not detect environment"
            echo "Please specify target with --target <opencode|claude|custom>"
            exit 1
        fi
        print_info "Detected target: $TARGET"
    fi
    
    # Get installation paths
    get_paths "$TARGET"
    
    print_info "Installation paths:"
    print_info "  Agent: $AGENT_DIR"
    print_info "  Plugins: $PLUGINS_DIR"
    print_info "  Data: $DATA_DIR"
    echo ""
    
    # Confirm installation
    read -p "Continue with installation? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_warning "Installation cancelled"
        exit 0
    fi
    
    # Run installation steps
    create_directories
    copy_agent_files
    copy_plugin_files
    copy_reference_data
    create_gitkeep_files
    
    # Validate
    if validate_installation; then
        print_usage_instructions "$TARGET"
    else
        print_error "Installation completed with errors"
        exit 1
    fi
}

# Run main
main "$@"
