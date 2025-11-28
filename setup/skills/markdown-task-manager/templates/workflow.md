# Markdown Task Manager - Quick Workflow Reference

## Daily Workflow

### Morning: Plan Your Day
1. Open `kanban.md`
2. Review "📝 To Do" column
3. Move 1-3 tasks to "🚀 In Progress"
4. Add `**Started**: YYYY-MM-DD` to each

### During Work: Track Progress
1. Check off subtasks as you complete them: `- [x]`
2. Add notes in `**Notes**:` section as you work
3. Reference TASK-XXX in git commits

### End of Day: Document Completion
1. Move completed tasks to "✅ Done"
2. Add `**Finished**: YYYY-MM-DD`
3. Fill out comprehensive `**Notes**:` section
4. Push code with task references in commits

### Weekly: Archive and Review
1. Archive completed tasks to `archive.md` (user requested)
2. Review "📝 To Do" for priority adjustments
3. Check progress on long-running tasks

---

## Quick Commands

### Create New Task
```
Read kanban.md → Get last ID
Create task in "📝 To Do"
Update: <!-- Config: Last Task ID: XXX -->
```

### Start Task
```
Move task: "📝 To Do" → "🚀 In Progress"
Add: **Started**: YYYY-MM-DD
```

### Complete Task
```
Move task: "🚀 In Progress" → "✅ Done"
Add: **Finished**: YYYY-MM-DD
Document in **Notes**: Result, Files, Decisions, Tests
```

### Archive Tasks
```
Cut from "✅ Done" in kanban.md
Paste to "## ✅ Archives" in archive.md
Add: ---
```

---

## Format Quick Reference

### Task Header
```markdown
### TASK-XXX | Task title
```

### Required Fields
```markdown
**Priority**: High | **Category**: Backend | **Assigned**: @nawaf
**Created**: 2025-11-15
```

### Optional Fields
```markdown
**Started**: 2025-11-15
**Due**: 2025-11-20
**Finished**: 2025-11-15
**Tags**: #feature #mvp
```

### Subtasks
```markdown
**Subtasks**:
- [ ] Incomplete
- [x] Complete
```

### Notes (for completed tasks)
```markdown
**Notes**:

**Result**:
What was accomplished.

**Modified files**:
- path/file.py (lines X-Y) - Changes

**Technical decisions**:
- Why this approach

**Tests performed**:
- ✅ What was tested
```

---

## Critical Rules

### ✅ DO
- Create task BEFORE coding
- Use `**Field**:` format (not `##` headings)
- Break down complex work (3+ steps)
- Check off subtasks progressively
- Document comprehensively in Notes
- Reference TASK-XXX in git commits
- Increment task ID in config comment

### ❌ DON'T
- Use `##` or `###` inside tasks (breaks HTML parser)
- Code without creating task first
- Forget to update task ID counter
- Archive tasks immediately (leave in Done)
- Skip documentation in Notes section
- Commit without referencing task

---

## Status Column Flow

```
📝 To Do
   ↓ (Start work, add Started date)
🚀 In Progress
   ↓ (Complete work, add Finished date + Notes)
👀 Review (optional)
   ↓ (Approved)
✅ Done
   ↓ (User requests archiving)
archive.md
```

---

## Git Integration

### Branch Naming
```bash
feature/TASK-042-notifications
bugfix/TASK-067-jwt-expiry
refactor/TASK-089-cleanup
```

### Commit Messages
```bash
feat: Add feature (TASK-042)
fix: Fix bug (TASK-067)
docs: Update docs (TASK-095)
test: Add tests (TASK-089)
```

### Pull Requests
```
Title: feat: Feature name (TASK-042)
Body: Closes TASK-042
      See kanban.md for full task details.
```

---

## Keyboard Shortcuts (in VS Code)

When editing kanban.md:

- `Cmd/Ctrl + F` - Find task by ID
- `Cmd/Ctrl + Shift + F` - Find across kanban.md and archive.md
- `Opt/Alt + Up/Down` - Move task between sections
- `Cmd/Ctrl + D` - Select next occurrence (for editing multiple tasks)

---

## HTML Viewer Usage

1. **Open**: Double-click `task-manager.html`
2. **Select folder**: Click "Select Folder" → Choose project root
3. **Grant permission**: Allow file system access
4. **View**: See visual Kanban board
5. **Drag & drop**: Move tasks between columns
6. **Filter**: Use priority/category/tag/user filters
7. **Archive**: Toggle archive view

---

## Integration with Other Skills

### alembic-migration
```
Migration creates task automatically
Task updated when migration completes
Task references migration file
```

### fastapi-endpoint
```
Create task first (planning)
Move to In Progress (implementation)
Check off subtasks (endpoint, tests, docs)
Document result (endpoint details)
```

### test-suite
```
Check for related task
Update subtask: "Write tests"
Document coverage in Notes
```

---

## Troubleshooting

| Issue | Quick Fix |
|-------|-----------|
| Task broken in HTML | Remove `##` headings inside task |
| Can't find task | Use Grep: `pattern: "TASK-XXX"` |
| ID conflict | Always read last ID from config comment |
| Checkbox not rendering | Use `- [ ]` not `[ ]` or `-[ ]` |
| HTML won't load | Use Chrome/Edge, grant file permission |

---

## Example Task (Copy-Paste Ready)

```markdown
### TASK-001 | Example task title

**Priority**: High | **Category**: Backend | **Assigned**: @nawaf
**Created**: 2025-11-15 | **Due**: 2025-11-20
**Tags**: #feature #mvp

Description of what needs to be done. Can include technical details, requirements, and context.

**Subtasks**:
- [ ] First subtask
- [ ] Second subtask
- [ ] Third subtask

**Notes**:
Any additional information or context.
```

---

## Pro Tips

1. **Plan before coding** - Tasks help you think through the work
2. **Small, focused tasks** - 1-8 hours of work per task
3. **Update as you go** - Don't wait until end of day
4. **Be specific in Notes** - Your future self will thank you
5. **Reference tasks everywhere** - Commits, PRs, Slack, documentation
6. **Archive regularly** - Keep kanban.md clean and fast
7. **Use tags liberally** - Makes filtering in HTML viewer powerful
8. **Visual feedback** - Open HTML viewer to see progress
9. **Team visibility** - Share kanban.md in git for transparency
10. **Continuous improvement** - Reflect on completed tasks weekly

---

**Remember**: Every piece of work = One documented task!

This ensures complete traceability, helps with planning, and provides valuable historical context for the project.
