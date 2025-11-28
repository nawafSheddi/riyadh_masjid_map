# Claude Code Skills System

> **Specialized AI skills for enhanced development workflow**
>
> Last Updated: 2025-11-28

## Overview

This folder contains 6 specialized skills that enhance Claude Code's ability to assist with your frontend project. Skills provide domain-specific knowledge, validation workflows, and automation.

## What Are Skills?

Skills are modular AI capabilities that:
- Activate automatically based on triggers (e.g., "create task", "validate design tokens")
- Provide specialized knowledge and workflows
- Include bundled resources (scripts, references)
- Support progressive disclosure (load only when needed)

## Available Skills

### 1. design-token-enforcer

**Purpose**: Prevents hardcoded values and ensures semantic token usage

**Activates When**:
- Creating or reviewing React components
- Adding styling to components
- Performing design system audits

**Key Features**:
- Detects hardcoded Tailwind colors (bg-red-500)
- Enforces icon imports from token system
- Validates opacity usage (8-digit hex vs utilities)
- Includes `validate-tokens.sh` automation script

**Anti-Patterns Detected**:
- ❌ Direct lucide-react imports
- ❌ Hardcoded colors (bg-green-500, text-red-600)
- ❌ Magic numbers without constants
- ❌ Opacity utilities with CSS variables

---

### 2. react-rtl-layout-validator

**Purpose**: Validates RTL (Right-to-Left) layout patterns for Arabic/Hebrew support

**Activates When**:
- Creating components with Arabic text
- Reviewing layout for RTL support
- Debugging layout issues

**Key Features**:
- Enforces `dir="rtl"` on containers
- Validates `text-right` on text elements
- Checks icon mirroring for directional icons
- Provides RTL-specific Tailwind patterns

**Critical Rule**: Both `dir="rtl"` AND `text-right` are required (not either/or)

---

### 3. react-translation-manager

**Purpose**: Manages translation keys and prevents localization errors

**Activates When**:
- Adding new UI text
- Creating components with translatable content
- Debugging white screen errors

**Key Features**:
- Dual translation system support (LanguageContext + react-i18next infrastructure)
- Ensures keys exist in BOTH ar and en objects
- Naming convention: `feature.section.element`
- Prevents missing translation key errors

**Common Fix**: White screen → Missing translation key

---

### 4. markdown-task-manager

**Purpose**: Kanban-based task management with Git integration

**Activates When**:
- User says "create task"
- Planning a feature
- Updating task progress
- Tracking project status

**Key Features**:
- Zero-padded task IDs (TASK-001, TASK-042)
- Visual Kanban board (task-manager.html)
- Complete task documentation (Result, Modified files, Technical decisions, Tests)
- Git commit integration (every commit references TASK-XXX)

**Format Rules**:
- ❌ NO `##` headings inside tasks (breaks HTML parser)
- ✅ Use `**Field**:` format instead

---

### 5. pre-commit-review

**Purpose**: 7-phase automated code review before commits

**Activates When**:
- Before git commits
- Reviewing code changes
- Validating pull requests

**Review Phases**:
1. Staged changes analysis
2. Design system compliance (20%)
3. Code quality (25%)
4. Component architecture (20%)
5. Documentation alignment (15%)
6. Testing coverage (10%)
7. Final verification (5%)

**Output**: Success/Critical/Warning categories with actionable feedback

---

### 6. skill-creator

**Purpose**: Meta-skill for creating new specialized skills

**Activates When**:
- User wants to create a new skill
- Updating an existing skill
- Packaging skills for distribution

**Workflow**:
1. Step 1: Understand requirements
2. Step 2: Plan skill structure
3. Step 3: Initialize SKILL.md
4. Step 4: Edit and refine
5. Step 5: Package resources
6. Step 6: Iterate and test

**Progressive Disclosure**: Metadata → SKILL.md → bundled resources

---

## Installation

### Step 1: Copy Skills to Your Project

```bash
# From your project root
cp -r /path/to/project-setup-template/skills/* .claude/skills/
```

### Step 2: Verify Installation

```bash
# Check skills are copied
ls .claude/skills/

# Should show:
# design-token-enforcer/
# react-rtl-layout-validator/
# react-translation-manager/
# markdown-task-manager/
# pre-commit-review/
# skill-creator/
```

### Step 3: Activate Skills in CLAUDE.md

Add to your `CLAUDE.md`:

```markdown
## Skills Catalog

### Project-Local Skills (`.claude/skills/`)
- `design-token-enforcer` - Design system compliance
- `react-rtl-layout-validator` - RTL layout validation
- `react-translation-manager` - Translation workflow
- `markdown-task-manager` - Task tracking with Git integration
- `pre-commit-review` - Automated code review
- `skill-creator` - Create new skills
```

---

## Skill Activation

Skills activate automatically based on:

### Trigger Keywords
- "create task" → markdown-task-manager
- "validate design tokens" → design-token-enforcer
- "check RTL layout" → react-rtl-layout-validator
- "add translation" → react-translation-manager
- "review code" → pre-commit-review
- "create skill" → skill-creator

### Context Detection
- Creating React components → design-token-enforcer
- Arabic text in components → react-rtl-layout-validator
- Before git commits → pre-commit-review

### Explicit Invocation
```
User: "Use the design-token-enforcer skill to validate this component"
```

---

## Customizing Skills for Your Project

Each skill can be customized by editing its SKILL.md file:

### 1. Update Triggers (YAML Frontmatter)

```yaml
---
name: your-skill-name
description: Your skill description. This skill should be used when...
---
```

### 2. Modify Validation Rules

Edit the content sections to match your project's patterns.

### 3. Add Project-Specific Resources

Add files to `scripts/`, `references/`, or `assets/` subdirectories.

---

## Skill Structure

Each skill follows this structure:

```
skill-name/
├── SKILL.md              # Main skill documentation
├── scripts/              # Optional automation scripts
│   └── *.sh
├── references/           # Optional reference docs
│   └── *.md
└── assets/              # Optional images/examples
    └── *
```

### SKILL.md Format

```markdown
---
name: skill-name
description: Skill description and triggers
allowed-tools: Read, Write, Edit  # Optional: restrict tools
---

# Skill Name

## Purpose
Brief description

## When to Use This Skill
Activation triggers

## Workflow
Step-by-step process

## Examples
Real-world examples

## Resources
Links to bundled resources
```

---

## Skill Workflow Examples

### Example 1: Using design-token-enforcer

```
User: "Create a new Button component"

Claude Code:
1. Detects component creation
2. Activates design-token-enforcer skill
3. Validates against anti-patterns during implementation
4. Ensures semantic colors, icon tokens, no magic numbers
5. Provides validation checklist before completion
```

### Example 2: Using markdown-task-manager

```
User: "Plan the user authentication feature"

Claude Code:
1. Detects feature planning request
2. Activates markdown-task-manager skill
3. Reads kanban.md to get last task ID
4. Creates TASK-XXX with subtasks
5. Adds to "📝 To Do" column
6. Updates task ID counter
```

### Example 3: Using pre-commit-review

```
User: "Review my staged changes before committing"

Claude Code:
1. Activates pre-commit-review skill
2. Runs 7-phase review:
   - Analyzes git staged files
   - Checks design system compliance
   - Validates code quality
   - Reviews component architecture
   - Verifies documentation
   - Checks test coverage
   - Final verification
3. Provides categorized feedback (Success/Critical/Warning)
```

---

## Creating New Skills

Use the `skill-creator` skill to create custom skills:

```
User: "Create a new skill for API endpoint validation"

Claude Code:
1. Activates skill-creator
2. Step 1: Understands requirements
3. Step 2: Plans skill structure
4. Step 3: Creates SKILL.md
5. Step 4: Adds validation logic
6. Step 5: Packages resources
7. Step 6: Tests and iterates
```

---

## Best Practices

### 1. Skill Loading (Progressive Disclosure)

Skills are loaded only when needed to minimize context usage:
- **Metadata** (YAML frontmatter): Always loaded
- **SKILL.md content**: Loaded when skill activates
- **Bundled resources**: Loaded on demand

### 2. Skill Combination

Multiple skills can work together:
```
design-token-enforcer → Validates tokens
    ↓
react-rtl-layout-validator → Validates RTL
    ↓
pre-commit-review → Final review before commit
```

### 3. Skill Maintenance

- Review skills quarterly for updates
- Update triggers as project evolves
- Add new skills for recurring patterns
- Archive unused skills

---

## Troubleshooting

### Issue: Skill not activating
**Solution**:
- Check YAML frontmatter syntax
- Verify description includes trigger keywords
- Ensure skill is in `.claude/skills/` directory
- Confirm skill is listed in CLAUDE.md

### Issue: Skill validation too strict
**Solution**:
- Edit SKILL.md to adjust rules
- Update anti-pattern definitions
- Modify allowed exceptions

### Issue: Script not executing
**Solution**:
- Ensure script is executable: `chmod +x scripts/*.sh`
- Check script path in SKILL.md
- Verify script dependencies installed

---

## Skill Versions

All skills in this template are version 1.0.0 and compatible with:
- Claude Code CLI v1.x+
- React 18+
- TypeScript 5+
- Vite 7+

---

## Contributing New Skills

Have a useful skill? Consider:
1. Using skill-creator to package it properly
2. Testing with multiple projects
3. Documenting activation triggers clearly
4. Including example workflows

---

## Additional Resources

- **Skill Creation Guide**: See `skill-creator/SKILL.md`
- **Design Token Reference**: See `design-token-enforcer/references/`
- **Task Management Examples**: See `markdown-task-manager/SKILL.md`

---

## Summary

Skills transform Claude Code from a general-purpose assistant into a specialized team member who:
- ✅ Knows your project's design system
- ✅ Enforces architectural patterns
- ✅ Manages tasks with complete traceability
- ✅ Validates code before commits
- ✅ Supports RTL layouts
- ✅ Prevents localization errors

Install these skills to unlock the full potential of AI-assisted development!

---

**Last Updated**: 2025-11-28
**Skills Included**: 6 specialized skills
**Ready to Use**: Copy to `.claude/skills/` and reference in CLAUDE.md
