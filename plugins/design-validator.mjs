/**
 * Design Quality Validation Script
 * 
 * Standalone validator that tests designs against all 5 gates.
 * Can be invoked by agent, plugin, or run manually for validation.
 * 
 * Usage:
 *   import { validateDesign } from './design-validator.js';
 *   const results = await validateDesign(designArtifactText);
 *   console.log(results);
 */

import fs from 'fs';
import path from 'path';

/**
 * Main validation orchestrator
 * @param {string} designArtifact - Full text of design artifact to validate
 * @param {string} workspaceDir - Workspace directory (for loading variance history)
 * @returns {Promise<Object>} Validation results with passed flag and gate details
 */
export async function validateDesign(designArtifact, workspaceDir = process.cwd()) {
  const results = {
    passed: true,
    gates: [],
    timestamp: new Date().toISOString()
  };
  
  // Gate 1: Intent Declaration
  const intentResult = validateIntent(designArtifact);
  results.gates.push(intentResult);
  if (!intentResult.passed) results.passed = false;
  
  // Gate 2: Domain Exploration
  const domainResult = validateDomainExploration(designArtifact);
  results.gates.push(domainResult);
  if (!domainResult.passed) results.passed = false;
  
  // Gate 3: Validation Tests
  const testsResult = validateTests(designArtifact);
  results.gates.push(testsResult);
  if (!testsResult.passed) results.passed = false;
  
  // Gate 4: Variance Check
  const varianceResult = await validateVariance(designArtifact, workspaceDir);
  results.gates.push(varianceResult);
  if (!varianceResult.passed) results.passed = false;
  
  // Gate 5: Ban List
  const banResult = validateBanList(designArtifact);
  results.gates.push(banResult);
  if (!banResult.passed) results.passed = false;
  
  return results;
}

/**
 * Gate 1: Validate Intent Declaration
 */
function validateIntent(artifact) {
  const required = ['who:', 'what:', 'feel:'];
  const forbidden = ['clean', 'modern', 'intuitive', 'professional', 'sleek', 'users', 'people', 'customers'];
  
  // Check for required fields
  const missing = required.filter(r => !new RegExp(r, 'i').test(artifact));
  
  // Check for forbidden generic terms in intent section
  const violations = [];
  for (const term of forbidden) {
    const intentPattern = new RegExp(`(who|what|feel):[^\\n]*${term}`, 'i');
    if (intentPattern.test(artifact)) {
      violations.push(term);
    }
  }
  
  return {
    gate: 'Intent Declaration',
    passed: missing.length === 0 && violations.length === 0,
    details: {
      missing: missing.length > 0 ? `Missing: ${missing.join(', ')}` : null,
      violations: violations.length > 0 ? `Generic terms used: ${violations.join(', ')}` : null
    }
  };
}

/**
 * Gate 2: Validate Domain Exploration
 */
function validateDomainExploration(artifact) {
  const required = ['domain:', 'color world:', 'signature:'];
  
  // Check for required fields
  const missing = required.filter(r => !new RegExp(r, 'i').test(artifact));
  
  // Check for signature count (should appear 5+ times)
  let signatureCount = 0;
  const signatureMatch = artifact.match(/signature:\s*"?([^"\n]+)"?/i);
  if (signatureMatch) {
    const signature = signatureMatch[1].trim();
    const escapedSignature = signature.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(escapedSignature, 'gi');
    const matches = artifact.match(pattern);
    signatureCount = matches ? matches.length : 0;
  }
  
  // Check for domain concept count (should have 5+)
  const domainMatch = artifact.match(/domain:\s*([^\n]+)/i);
  let domainConceptCount = 0;
  if (domainMatch) {
    const domainText = domainMatch[1];
    // Count concepts separated by commas or newlines
    domainConceptCount = domainText.split(/[,\n]/).filter(s => s.trim().length > 0).length;
  }
  
  // Check for color count (should have 5+)
  const colorMatch = artifact.match(/color world:\s*([^\n]+)/i);
  let colorCount = 0;
  if (colorMatch) {
    const colorText = colorMatch[1];
    colorCount = colorText.split(/[,\n]/).filter(s => s.trim().length > 0).length;
  }
  
  return {
    gate: 'Domain Exploration',
    passed: missing.length === 0 && signatureCount >= 5 && domainConceptCount >= 5 && colorCount >= 5,
    details: {
      missing: missing.length > 0 ? `Missing: ${missing.join(', ')}` : null,
      signatureCount: signatureCount < 5 ? `Signature appears ${signatureCount} times (need 5+)` : `Signature appears ${signatureCount} times ✓`,
      domainConcepts: domainConceptCount < 5 ? `Found ${domainConceptCount} domain concepts (need 5+)` : `Found ${domainConceptCount} domain concepts ✓`,
      colors: colorCount < 5 ? `Found ${colorCount} colors (need 5+)` : `Found ${colorCount} colors ✓`
    }
  };
}

/**
 * Gate 3: Validate Validation Tests
 */
function validateTests(artifact) {
  const required = ['swap test:', 'squint test:', 'signature test:', 'token test:'];
  
  // Check for missing tests
  const missing = required.filter(r => !new RegExp(r, 'i').test(artifact));
  
  // Check if any test explicitly failed
  const failedTests = [];
  for (const test of required) {
    const testName = test.replace(':', '');
    const pattern = new RegExp(`${testName}:\\s*(?:fail|❌|✗)`, 'i');
    if (pattern.test(artifact)) {
      failedTests.push(testName);
    }
  }
  
  return {
    gate: 'Validation Tests',
    passed: missing.length === 0 && failedTests.length === 0,
    details: {
      missing: missing.length > 0 ? `Missing: ${missing.join(', ')}` : null,
      failed: failedTests.length > 0 ? `Failed: ${failedTests.join(', ')}` : null
    }
  };
}

/**
 * Gate 4: Validate Variance
 */
async function validateVariance(artifact, workspaceDir) {
  // Check if this is an interface type that needs variance checking
  const type = detectInterfaceType(artifact);
  
  if (!type) {
    return {
      gate: 'Variance Check',
      passed: true,
      details: { skipped: 'Not an interface type requiring variance check' }
    };
  }
  
  // Load variance history
  const history = await loadVarianceHistory(workspaceDir);
  const recent = history.filter(h => h.type === type).slice(0, 2);
  
  if (recent.length >= 2) {
    const [latest, previous] = recent;
    if (latest.vibeArchetype === previous.vibeArchetype &&
        latest.layoutArchetype === previous.layoutArchetype) {
      return {
        gate: 'Variance Check',
        passed: false,
        details: {
          violation: `Repetition detected: ${latest.vibeArchetype} + ${latest.layoutArchetype} used in last 2 ${type} outputs`
        }
      };
    }
  }
  
  // Extract vibe+layout from current artifact
  const vibeMatch = artifact.match(/vibe(?:\s+archetype)?:\s*([^\n]+)/i);
  const layoutMatch = artifact.match(/layout(?:\s+archetype)?:\s*([^\n]+)/i);
  
  if (!vibeMatch || !layoutMatch) {
    return {
      gate: 'Variance Check',
      passed: false,
      details: {
        missing: 'Vibe and/or Layout archetype not documented'
      }
    };
  }
  
  return {
    gate: 'Variance Check',
    passed: true,
    details: {
      type: type,
      vibe: vibeMatch[1].trim(),
      layout: layoutMatch[1].trim()
    }
  };
}

/**
 * Gate 5: Validate Ban List
 */
function validateBanList(artifact) {
  const bans = [
    {
      pattern: /border-(left|right):\s*\d+px\s+solid/i,
      name: 'side-stripe borders',
      alternative: 'Use full border with subtle color or shadow'
    },
    {
      pattern: /background:\s*linear-gradient.*-webkit-background-clip:\s*text/i,
      name: 'gradient text',
      alternative: 'Use solid color with opacity variation'
    },
    {
      pattern: /backdrop-filter:\s*blur/i,
      name: 'glassmorphism as default',
      alternative: 'Reserve for specific moments, not entire UI'
    },
    {
      pattern: /font-family:\s*['"]?(roboto|arial|helvetica)['";\s]/i,
      name: 'generic fonts without justification',
      alternative: 'Use brand fonts (Inter + Fragment Mono)'
    },
    {
      pattern: /transition:.*\b(width|height|top|left|bottom|right)\b/i,
      name: 'animating non-transform properties',
      alternative: 'Only animate transform and opacity'
    },
    {
      pattern: /transition:.*\b(ease-in-out|ease-in|ease-out\b(?!-)|linear)\b/i,
      name: 'generic easing',
      alternative: 'Use custom cubic-bezier curves'
    },
    {
      pattern: /\b(clean|modern|intuitive|professional|sleek)\s+(design|interface|UI)/i,
      name: '"clean and modern" descriptor',
      alternative: 'Use specific descriptors from intent/domain'
    }
  ];
  
  const violations = [];
  for (const ban of bans) {
    if (ban.pattern.test(artifact)) {
      violations.push({
        name: ban.name,
        alternative: ban.alternative
      });
    }
  }
  
  return {
    gate: 'Ban List',
    passed: violations.length === 0,
    details: {
      violations: violations.length > 0 ? violations : null
    }
  };
}

/**
 * Helper: Detect interface type
 */
function detectInterfaceType(text) {
  if (/dashboard/i.test(text)) return 'dashboard';
  if (/admin panel/i.test(text)) return 'adminPanel';
  if (/form/i.test(text)) return 'form';
  if (/table|grid/i.test(text)) return 'table';
  if (/card grid|card layout/i.test(text)) return 'card';
  return null;
}

/**
 * Helper: Load variance history
 */
async function loadVarianceHistory(workspaceDir) {
  try {
    const historyPath = path.join(workspaceDir, '.config', 'opencode', 'design-data', 'variance-history.json');
    if (fs.existsSync(historyPath)) {
      const data = fs.readFileSync(historyPath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.warn('Failed to load variance history:', error.message);
  }
  return [];
}

/**
 * Format validation report for display
 * @param {Object} results - Validation results from validateDesign
 * @returns {string} Formatted report
 */
export function formatValidationReport(results) {
  const header = results.passed 
    ? '✅ ALL GATES PASSED' 
    : '❌ VALIDATION FAILED';
  
  const lines = [header, ''];
  
  for (const gate of results.gates) {
    const status = gate.passed ? '✅' : '❌';
    lines.push(`${status} **${gate.gate}**`);
    
    if (gate.details) {
      for (const [key, value] of Object.entries(gate.details)) {
        if (value) {
          if (key === 'violations' && Array.isArray(value)) {
            lines.push(`  - Violations found:`);
            for (const v of value) {
              lines.push(`    • ${v.name}`);
              lines.push(`      Alternative: ${v.alternative}`);
            }
          } else {
            lines.push(`  - ${key}: ${value}`);
          }
        }
      }
    }
    
    lines.push('');
  }
  
  return lines.join('\n');
}

/**
 * Save validation results to history
 * @param {Object} results - Validation results
 * @param {string} workspaceDir - Workspace directory
 */
export async function saveValidationHistory(results, workspaceDir = process.cwd()) {
  try {
    const historyDir = path.join(workspaceDir, '.config', 'opencode', 'design-data', 'validation-history');
    if (!fs.existsSync(historyDir)) {
      fs.mkdirSync(historyDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `${timestamp}.json`;
    const filepath = path.join(historyDir, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(results, null, 2));
    
    return filepath;
  } catch (error) {
    console.warn('Failed to save validation history:', error.message);
    return null;
  }
}

// Export for CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const artifactPath = process.argv[2];
  
  if (!artifactPath) {
    console.error('Usage: node design-validator.js <path-to-design-artifact>');
    process.exit(1);
  }
  
  const artifact = fs.readFileSync(artifactPath, 'utf8');
  const results = await validateDesign(artifact);
  
  console.log(formatValidationReport(results));
  
  const savedPath = await saveValidationHistory(results);
  if (savedPath) {
    console.log(`\nValidation results saved to: ${savedPath}`);
  }
  
  process.exit(results.passed ? 0 : 1);
}
