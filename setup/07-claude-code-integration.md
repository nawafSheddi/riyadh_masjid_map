# 07 - Claude Code Integration

> **Set up AI-assisted development with Claude Code**
>
> Estimated Time: 30 minutes

## Overview

Claude Code is an AI-powered coding assistant that becomes even more powerful when properly configured for your project. This guide sets up:

1. **CLAUDE.md** - Project context file loaded automatically
2. **Skills system** - Specialized AI capabilities
3. **Task management** - Kanban workflow with Git integration
4. **Visual task board** - HTML interface for task visualization
5. **Best practices** - Effective AI-assisted development patterns

## Why Claude Code Integration?

- ✅ **AI understands your project**: Custom context, design system, conventions
- ✅ **Automated validation**: Design tokens, RTL layouts, translations
- ✅ **Task tracking**: Complete traceability from planning to commit
- ✅ **Pre-commit review**: 7-phase automated code review
- ✅ **Consistent quality**: Enforces patterns automatically
- ✅ **Faster development**: AI knows your specific requirements

## Prerequisites

- Claude Code CLI installed (see [01-prerequisites.md](01-prerequisites.md))
- Project initialized (see [02-initial-project-setup.md](02-initial-project-setup.md))
- Skills copied to project (included in `project-setup-template/skills/`)

## What You'll Learn

1. How to customize CLAUDE.md for your project
2. How to install and configure skills
3. How to set up the task management system
4. How to use the visual Kanban board
5. Best practices for AI-assisted development

---

## Step 1: Customize CLAUDE.md

CLAUDE.md is the core context file that Claude Code loads automatically when starting a conversation.

### Copy Template

```bash
# From your project root
cp /path/to/project-setup-template/templates/CLAUDE.md.template CLAUDE.md
```

### Replace Placeholders

Open `CLAUDE.md` and replace all `{{PLACEHOLDER}}` markers:

#### Required Replacements

```markdown
# Replace these in the file:

{{PROJECT_NAME}}           → "My Awesome App"
{{PROJECT_DESCRIPTION}}    → "A mobile-first web application for..."
{{CURRENT_PHASE}}          → "MVP" or "Beta" or "Production"
{{PRIMARY_LANGUAGE}}       → "en" or "ar" or "multi-language"
{{DESIGN_SYSTEM_STATUS}}   → "In Progress" or "Complete"
{{KEY_FEATURES}}           → "Feature 1, Feature 2, Feature 3"
{{DEPLOYMENT_PLATFORM}}    → "Cloudflare Pages" or "Vercel" or "Netlify"
{{LAST_UPDATED}}           → Today's date (YYYY-MM-DD)
{{API_URL}}                → "https://api.yourdomain.com"
{{WEBSOCKET_URL}}          → "wss://api.yourdomain.com/ws" (if using WebSockets)
{{DEFAULT_LANGUAGE}}       → "en" or "ar"
```

#### Optional Sections

**If supporting multiple languages**, uncomment this section:

```markdown
## Multi-Language Setup
- **Active System**: react-i18next
- **Translation Files**: `src/i18n/locales/{lang}.json`
- **Pattern**: `feature.section.element`
- **Required**: Keys must exist in ALL language files
```

**If supporting RTL languages (Arabic/Hebrew)**, uncomment this section:

```markdown
## RTL Support
- **Direction**: Fixed RTL for Arabic/Hebrew
- **Container**: MUST have `dir="rtl"`
- **Text**: MUST have `text-right`
- **Numbers**: Use Western numerals (1234) not Arabic (١٢٣٤)
```

### Verify CLAUDE.md

```bash
# Check that all placeholders are replaced
grep -n "{{" CLAUDE.md

# Should return nothing if all placeholders replaced
```

---

## Step 2: Install Skills

Skills provide specialized AI capabilities. You already have them in `project-setup-template/skills/`.

### Copy Skills to Your Project

```bash
# From your project root
cp -r /path/to/project-setup-template/skills/* .claude/skills/

# Or if template is in parent directory:
cp -r ../project-setup-template/skills/* .claude/skills/
```

### Verify Skills Installation

```bash
# Check skills are copied
ls -la .claude/skills/

# Should show:
# design-token-enforcer/
# markdown-task-manager/
# pre-commit-review/
# react-rtl-layout-validator/
# react-translation-manager/
# skill-creator/
```

### Make Scripts Executable (Linux/macOS)

```bash
# Make validation scripts executable
chmod +x .claude/skills/design-token-enforcer/scripts/*.sh
```

### Skills Overview

| Skill | Purpose | When It Activates |
|-------|---------|-------------------|
| **design-token-enforcer** | Prevents hardcoded values | Creating/reviewing components |
| **react-rtl-layout-validator** | Validates RTL layouts | Components with Arabic text |
| **react-translation-manager** | Manages translation keys | Adding UI text |
| **markdown-task-manager** | Task tracking with Git | "create task", planning features |
| **pre-commit-review** | Automated code review | Before git commits |
| **skill-creator** | Creates new skills | "create skill" |

**Detailed skill documentation**: See [skills/README.md](skills/README.md)

---

## Step 3: Set Up Task Management System

The task management system provides complete traceability from planning to deployment.

### Create kanban.md

Create `kanban.md` in your project root:

```markdown
# Project Tasks - Kanban Board

<!-- Config: Last Task ID: 0 -->

## 📝 To Do

<!-- Tasks that are planned but not started -->

## 🚀 In Progress

<!-- Tasks currently being worked on -->

## 👀 Review

<!-- Tasks awaiting review or testing -->

## ✅ Done

<!-- Tasks completed in current sprint -->

---

## Archive Notes

Tasks are archived to `archive.md` after:
- Completing a sprint/milestone
- Task is deployed to production
- End of week/month cleanup

To archive: Move completed tasks from "✅ Done" → archive.md
```

### Create archive.md

Create `archive.md` in your project root:

```markdown
# Archived Tasks

<!-- Tasks archived from kanban.md -->

## Archive Format

Tasks are organized by completion date and include:
- Full task documentation
- Results and outcomes
- Modified files
- Technical decisions
- Tests written
```

### Create Your First Task

```bash
# In Claude Code CLI
> create task for setting up the project structure
```

Claude Code will:
1. Read `kanban.md` to get last task ID (0)
2. Create `TASK-001` in "📝 To Do" section
3. Update config comment to `<!-- Config: Last Task ID: 1 -->`
4. Add task metadata (priority, category, dates, tags)

**Example task format**:

```markdown
### TASK-001 | Set up project structure

**Priority**: High | **Category**: Setup | **Assigned**: @you
**Created**: 2025-11-28
**Tags**: #setup #infrastructure

Initialize project with recommended folder structure following atomic design principles.

**Subtasks**:
- [ ] Create src/components/ folders (ui, molecules, organisms, templates)
- [ ] Create src/pages/ folder
- [ ] Create src/design-tokens/ folder
- [ ] Create src/contexts/, constants/, hooks/ folders
- [ ] Initialize Git repository
- [ ] Create initial commit
```

---

## Step 4: Set Up Visual Task Board

The visual task board provides a drag-and-drop Kanban interface.

### Copy task-manager.html

```bash
# Copy from template or create manually
cp /path/to/project-setup-template/assets/task-manager.html .

# Or download from the MarkdownTaskManager GitHub repo
```

### Open Task Board

```bash
# macOS
open task-manager.html

# Linux
xdg-open task-manager.html

# Windows
start task-manager.html
```

### How It Works

1. **Auto-reads kanban.md**: Parses tasks from your Markdown file
2. **Drag & drop**: Move tasks between columns visually
3. **Auto-updates kanban.md**: Writes changes back to Markdown
4. **Real-time sync**: Refreshes when file changes

**Features**:
- Visual Kanban columns (To Do, In Progress, Review, Done)
- Task filtering by category, priority, tags
- Progress indicators (subtask completion percentage)
- Search functionality
- Export to JSON

**Note**: task-manager.html is client-side only. Your data stays local in kanban.md.

---

## Step 5: Configure Git Integration

Task management integrates with Git for complete traceability.

### Commit Message Convention

**ALWAYS reference task IDs in commits**:

```bash
# Good commit messages
git commit -m "feat: add user authentication (TASK-042)"
git commit -m "fix: resolve RTL layout issue in header (TASK-038)"
git commit -m "docs: update API documentation (TASK-051)"

# Bad commit messages (no task reference)
git commit -m "fix stuff"
git commit -m "updates"
```

### Task Documentation in Archive

When a task is completed and archived, it should include:

```markdown
### TASK-042 | Implement user authentication

**Priority**: High | **Category**: Feature | **Assigned**: @you
**Created**: 2025-11-15 | **Started**: 2025-11-16 | **Completed**: 2025-11-18
**Tags**: #feature #mvp #security

**Result**:
Implemented JWT-based authentication with refresh token support. Users can now sign up, log in, and maintain sessions across browser restarts.

**Modified Files**:
- `src/services/auth.service.ts` (new)
- `src/contexts/AuthContext.tsx` (new)
- `src/hooks/useAuth.ts` (new)
- `src/components/organisms/LoginForm.tsx` (new)
- `src/pages/Login.tsx` (new)

**Technical Decisions**:
- Used JWT tokens stored in httpOnly cookies (prevents XSS)
- Refresh token rotation for security
- Zustand store for auth state management
- Protected route wrapper component

**Tests**:
- Unit tests for auth service (12 tests)
- Integration tests for login/logout flow
- E2E tests for complete authentication journey

**Git Commits**:
- abc1234: feat: add JWT authentication service (TASK-042)
- def5678: feat: create auth context and hooks (TASK-042)
- ghi9012: feat: build login form component (TASK-042)
- jkl3456: test: add auth tests (TASK-042)
```

---

## Step 6: Best Practices for AI-Assisted Development

### 1. Always Start with a Task

**Before coding**:
```
User: "create task for implementing dark mode"
Claude: [Creates TASK-XXX with subtasks]
User: "start TASK-XXX"
Claude: [Moves to In Progress, begins implementation]
```

### 2. Use Skills Proactively

**Don't wait for errors**:
```
User: "create a new Button component, validate design tokens"
Claude: [Activates design-token-enforcer automatically]
```

### 3. Pre-Commit Review

**Before committing**:
```
User: "review my staged changes"
Claude: [Activates pre-commit-review skill]
        [Runs 7-phase validation]
        [Provides categorized feedback]
```

### 4. Leverage Context

**Claude knows your project**:
```
User: "add a success notification"
Claude: "I'll create a notification using your design tokens:
        - Color: success token from @/design-tokens/colors
        - Icon: CheckCircle from @/design-tokens/icons
        - Following your notification pattern in organisms/
```

### 5. Document Decisions

**Use task documentation**:
```
User: "document why we chose Zustand over Redux"
Claude: [Updates TASK-XXX with technical decisions section]
```

---

## Skill Activation Examples

### Design Token Enforcement

**Automatic activation when creating components**:

```
User: "create a Badge component with success and error variants"

Claude:
1. Activates design-token-enforcer skill
2. Uses semantic colors: bg-success, bg-error (not bg-green-500)
3. Imports icons from @/design-tokens/icons
4. Validates no hardcoded values
5. Provides checklist before completion
```

### RTL Layout Validation

**Automatic activation for Arabic text**:

```
User: "create an Arabic notification component"

Claude:
1. Activates react-rtl-layout-validator skill
2. Ensures dir="rtl" on container
3. Adds text-right to text elements
4. Validates icon mirroring for directional icons
5. Tests with actual Arabic text
```

### Translation Management

**Automatic activation when adding UI text**:

```
User: "add a welcome message to the dashboard"

Claude:
1. Activates react-translation-manager skill
2. Creates translation key: dashboard.welcome.message
3. Adds to BOTH ar and en translation objects
4. Uses proper hook (useLanguage or useTranslation)
5. Prevents white screen from missing keys
```

### Task Management

**Explicit user request**:

```
User: "create task for API integration"

Claude:
1. Activates markdown-task-manager skill
2. Reads kanban.md for last task ID
3. Creates TASK-XXX with subtasks
4. Adds to "📝 To Do" column
5. Updates task ID counter
```

### Pre-Commit Review

**Before committing code**:

```
User: "review my changes before I commit"

Claude:
1. Activates pre-commit-review skill
2. Analyzes git staged files
3. Runs 7-phase review:
   ✅ Design system compliance (20%)
   ✅ Code quality (25%)
   ✅ Component architecture (20%)
   ✅ Documentation alignment (15%)
   ✅ Testing coverage (10%)
   ✅ Final verification (5%)
4. Provides categorized feedback
```

---

## Customizing Skills for Your Project

Each skill can be customized by editing its `SKILL.md` file.

### Example: Customize Design Token Enforcer

Edit `.claude/skills/design-token-enforcer/SKILL.md`:

```markdown
# Add custom anti-patterns for your project

## Custom Anti-Patterns

### Spacing
- ❌ Direct spacing classes: `m-4`, `p-8`
- ✅ Semantic spacing: Use spacing tokens from design-tokens/spacing.ts

### Border Radius
- ❌ Arbitrary values: `rounded-[12px]`
- ✅ Design system values: `rounded-card`, `rounded-button`
```

### Example: Add Project-Specific Validation Script

Create `.claude/skills/design-token-enforcer/scripts/validate-spacing.sh`:

```bash
#!/bin/bash
# Validate spacing token usage

echo "Checking for hardcoded spacing..."

# Find hardcoded spacing in components
if grep -r "m-[0-9]\|p-[0-9]\|gap-[0-9]" src/components/ --include="*.tsx"; then
    echo "❌ Found hardcoded spacing. Use spacing tokens instead."
    exit 1
else
    echo "✅ No hardcoded spacing found."
    exit 0
fi
```

Make executable:
```bash
chmod +x .claude/skills/design-token-enforcer/scripts/validate-spacing.sh
```

Reference in SKILL.md:
```markdown
## Bundled Resources

### Scripts
- `scripts/validate-tokens.sh` - Validates design token usage
- `scripts/validate-spacing.sh` - Validates spacing token usage
```

---

## Task Management Workflows

### Daily Workflow

```
Morning:
1. Open task-manager.html to view board
2. Pick task from "📝 To Do"
3. Tell Claude: "start TASK-XXX"
4. Begin work with subtask checklist

During Work:
5. Check off subtasks as completed
6. Update task notes if needed
7. Use Claude for implementation with skills active

Before Committing:
8. Tell Claude: "review my staged changes"
9. Fix any critical issues
10. Commit with task reference: "feat: description (TASK-XXX)"

End of Day:
11. Move completed work to "✅ Done"
12. Update progress in kanban.md
```

### Weekly Workflow

```
End of Week:
1. Review "✅ Done" column
2. Archive completed tasks to archive.md:
   - Copy full task documentation
   - Add completion details (results, files, decisions)
   - Clear from kanban.md Done column
3. Review "📝 To Do" priorities for next week
4. Update task board in team meeting (if applicable)
```

### Sprint/Milestone Workflow

```
End of Sprint:
1. Archive all completed tasks
2. Review incomplete tasks:
   - Move to next sprint, or
   - Close as won't-fix, or
   - Break down if too large
3. Create new tasks for next sprint
4. Update project status in CLAUDE.md
```

---

## Troubleshooting

### Issue: Claude not loading CLAUDE.md

**Solution**:
```bash
# Check file exists in project root
ls -la CLAUDE.md

# Check file is valid Markdown
head -20 CLAUDE.md

# Restart Claude Code CLI
exit
claude-code
```

### Issue: Skills not activating

**Check 1: Skills directory structure**:
```bash
# Verify structure
ls -la .claude/skills/

# Should show skill folders with SKILL.md files
ls -la .claude/skills/design-token-enforcer/
```

**Check 2: SKILL.md frontmatter**:
```yaml
# Must have valid YAML frontmatter
---
name: skill-name
description: Description here...
---
```

**Check 3: Trigger keywords**:
- Skills activate based on description keywords
- Update description to include trigger terms
- Example: "Use when user mentions task creation, tracking progress..."

### Issue: task-manager.html not working

**Chrome/Edge required**:
```
The task board uses modern browser APIs (File System Access API)
- ✅ Works: Chrome, Edge, Opera
- ❌ Doesn't work: Firefox, Safari (yet)
```

**Alternative**: Edit kanban.md directly in your editor

### Issue: Task IDs not incrementing

**Solution**:
```bash
# Check config comment in kanban.md
grep "Last Task ID" kanban.md

# Should show: <!-- Config: Last Task ID: X -->
# If missing, add it:
echo "<!-- Config: Last Task ID: 0 -->" >> kanban.md
```

### Issue: Validation scripts not running

**Solution**:
```bash
# Make scripts executable
chmod +x .claude/skills/*/scripts/*.sh

# Test script manually
.claude/skills/design-token-enforcer/scripts/validate-tokens.sh
```

---

## Advanced: Creating Custom Skills

Use the `skill-creator` skill to create project-specific skills.

### Example: Create API Validation Skill

```
User: "create a skill for validating API endpoint patterns"

Claude (using skill-creator):
1. Step 1: Understand requirements
   - What patterns to validate?
   - When should it activate?
   - What tools are needed?

2. Step 2: Plan skill structure
   - Name: api-endpoint-validator
   - Triggers: "validate API", "create endpoint"
   - Resources: Validation script, endpoint patterns reference

3. Step 3: Create SKILL.md
   [Creates .claude/skills/api-endpoint-validator/SKILL.md]

4. Step 4: Add validation logic
   [Defines patterns, anti-patterns, examples]

5. Step 5: Create bundled resources
   [Creates scripts/validate-endpoints.sh]
   [Creates references/endpoint-patterns.md]

6. Step 6: Test and iterate
   [Tests skill activation]
   [Refines triggers and validation rules]
```

**Result**: Custom skill that activates when creating API endpoints and validates:
- RESTful naming conventions
- HTTP method usage
- Response format consistency
- Error handling patterns

---

## Integration with Development Tools

### VS Code Integration

Add to `.vscode/settings.json`:

```json
{
  "files.associations": {
    "kanban.md": "markdown",
    "archive.md": "markdown",
    "CLAUDE.md": "markdown"
  },
  "markdown.preview.breaks": true,
  "markdown.preview.linkify": true
}
```

### Git Hooks (Optional)

Create `.git/hooks/commit-msg`:

```bash
#!/bin/bash
# Enforce task ID in commit messages

commit_msg=$(cat "$1")

if ! echo "$commit_msg" | grep -qE "TASK-[0-9]{3}"; then
    echo "Error: Commit message must reference a task (TASK-XXX)"
    echo "Example: feat: add user auth (TASK-042)"
    exit 1
fi
```

Make executable:
```bash
chmod +x .git/hooks/commit-msg
```

### Claude Code CLI Aliases (Optional)

Add to `~/.bashrc` or `~/.zshrc`:

```bash
alias task='claude-code "create task for"'
alias start-task='claude-code "start TASK-"'
alias review='claude-code "review my staged changes"'
```

Usage:
```bash
task "implementing dark mode"
start-task 042
review
```

---

## Security Best Practices

### What Goes in CLAUDE.md

**✅ Safe to include**:
- Project structure
- Development commands
- Design system patterns
- Component conventions
- File organization

**❌ Never include**:
- API keys or secrets
- Database credentials
- Production URLs with sensitive paths
- User data or PII
- Internal security policies

### Skills Security

**Built-in restrictions**:
- Skills have limited tool access (defined in `allowed-tools`)
- Cannot execute arbitrary system commands
- Cannot modify git history
- Cannot access files outside project directory

**Custom restrictions**:
```yaml
# In SKILL.md frontmatter
allowed-tools: Read, Grep  # Only allow reading files
```

---

## Performance Optimization

### Progressive Disclosure

Skills use progressive disclosure to minimize context:
- **Metadata** (YAML frontmatter): Always loaded
- **SKILL.md content**: Loaded when skill activates
- **Bundled resources**: Loaded on demand

**Benefits**:
- Faster Claude Code startup
- Lower token usage
- Better focus on active tasks

### Context Management

**Keep CLAUDE.md lean**:
- Core context: ~200-300 lines
- Detailed procedures: In skills
- Reference docs: Separate files linked from CLAUDE.md

**Example structure**:
```markdown
## Design System

**Overview**: Component-driven with design tokens
**Details**: See `design-token-enforcer` skill
**Reference**: docs/design-system.md
```

---

## Measuring Success

### Task Management Metrics

Track these in your kanban.md:

```markdown
## Metrics (Optional)

- **Total Tasks Created**: 156
- **Tasks Completed**: 142
- **Average Completion Time**: 2.3 days
- **Tasks in Current Sprint**: 12
```

### Skills Usage

Monitor skill activation:
- Which skills activate most often?
- Which prevent the most errors?
- Which need customization?

### Code Quality

Track improvements:
- Design token compliance rate
- RTL validation pass rate
- Pre-commit review scores
- Bug count reduction

---

## Next Steps

After setting up Claude Code integration:

1. **Create your first task**: Plan a feature or component
2. **Test skill activation**: Create a component and validate
3. **Review workflow**: Try pre-commit review on test changes
4. **Customize skills**: Add project-specific patterns
5. **Explore task board**: Use visual Kanban interface

---

## Quick Reference

### Essential Commands

```bash
# Task Management
"create task for [feature]"
"start TASK-XXX"
"update TASK-XXX progress"
"mark TASK-XXX as done"

# Skills Usage
"validate design tokens"
"check RTL layout"
"review my staged changes"
"create a new skill for [purpose]"

# File Locations
CLAUDE.md                    # Project context (root)
kanban.md                    # Active tasks (root)
archive.md                   # Completed tasks (root)
task-manager.html            # Visual board (root)
.claude/skills/              # Skills directory
```

### File Checklist

- [x] `CLAUDE.md` - Customized with project details
- [x] `.claude/skills/` - Skills installed
- [x] `kanban.md` - Created with initial config
- [x] `archive.md` - Created for completed tasks
- [x] `task-manager.html` - Copied for visual board
- [x] Skills listed in CLAUDE.md

---

**Congratulations!** Claude Code is now fully integrated with your project. You have:
- Custom project context loaded automatically
- Specialized skills for validation and automation
- Complete task tracking with Git integration
- Visual Kanban board for task management
- Best practices established for AI-assisted development

**Next**: [08-deployment-setup.md](08-deployment-setup.md)
