---
name: markdown-task-manager
description: Markdown-based Kanban task management system for project tracking. Use when user mentions task creation, tracking progress, updating tasks, or managing work items. Creates and manages tasks in kanban.md (active tasks) and archive.md (completed tasks) with strict format compatible with task-manager.html web UI. Triggers on "create task", "update TASK-XXX", "track progress", "list tasks", "archive tasks", "plan feature", or any work planning/tracking requests.
allowed-tools: Read, Write, Edit, Grep, Glob
---

# Markdown Task Manager

## Purpose
Manage project tasks using a lightweight, Git-friendly Kanban system based on plain Markdown files. This skill ensures every piece of work is planned, tracked, and documented with complete traceability.

## When to Use This Skill

Use this skill when the user requests:
- Creating a new task or work item
- Planning a feature or breaking down work
- Updating task progress or status
- Listing or searching for tasks
- Archiving completed tasks
- Tracking project status
- Documenting work results

## Key Trigger Terms
- "create task"
- "new task for [feature]"
- "update TASK-XXX"
- "plan [feature]"
- "track progress"
- "list tasks"
- "what are we working on"
- "archive completed tasks"
- "document result for TASK-XXX"

## File Structure

```
project-root/
├── kanban.md              # Active tasks (4 columns: To Do, In Progress, Review, Done)
├── archive.md             # Archived completed tasks
└── task-manager.html      # Web UI for visual Kanban board (open in Chrome/Edge)
```

## Core Workflow

### 1. Creating a New Task

**ALWAYS before starting any coding work:**

1. **Read kanban.md** to get the last task ID:
   ```
   Look for: <!-- Config: Last Task ID: 42 -->
   ```

2. **Generate new task ID**:
   ```
   New ID = Last ID + 1
   Example: If last ID is 42, new task is TASK-043
   ```

3. **Add task to "📝 To Do" section** in kanban.md:
   ```markdown
   ### TASK-043 | Implement user notifications

   **Priority**: High | **Category**: Backend | **Assigned**: @nawaf
   **Created**: 2025-11-15
   **Tags**: #feature #mvp

   Add real-time notification system for challenge updates and winner announcements.

   **Subtasks**:
   - [ ] Design notification schema
   - [ ] Create database migration
   - [ ] Implement notification service
   - [ ] Add API endpoints
   - [ ] Write unit tests
   - [ ] Update documentation
   ```

4. **Update the config comment**:
   ```markdown
   <!-- Config: Last Task ID: 43 -->
   ```

### 2. Starting Work on a Task

1. **Move task** from "📝 To Do" → "🚀 In Progress"
2. **Add Started date**:
   ```markdown
   **Started**: 2025-11-15
   ```
3. **Begin checking off subtasks** as you complete them:
   ```markdown
   - [x] Design notification schema
   - [x] Create database migration
   - [ ] Implement notification service
   ```

### 3. Completing a Task

1. **Move task** from "🚀 In Progress" → "✅ Done"
2. **Add Finished date**:
   ```markdown
   **Finished**: 2025-11-15
   ```
3. **Document the result in Notes section**:
   ```markdown
   **Notes**:

   **Result**:
   ✅ Implemented complete notification system with database schema, service layer, and API endpoints.

   **Modified files**:
   - app/models/notification.py (lines 1-45) - SQLAlchemy model
   - app/services/notification_service.py (lines 1-120) - Business logic
   - app/api/v1/notifications.py (lines 1-80) - API endpoints
   - alembic/versions/abc123_add_notifications.py - Database migration

   **Technical decisions**:
   - Used WebSocket for real-time delivery (Socket.io)
   - Added fallback to polling for unsupported clients
   - Implemented notification preferences in user settings
   - 30-day retention policy for read notifications

   **Tests performed**:
   - ✅ Unit tests: 15 tests, 100% coverage
   - ✅ Integration tests: API endpoints validated
   - ✅ Load test: 1000 concurrent connections successful
   - ✅ Manual testing: Notifications deliver < 500ms
   ```

### 4. Archiving Tasks

**CRITICAL:** Tasks are NOT archived automatically!

- Completed tasks remain in "✅ Done" section
- **ONLY archive when user explicitly requests it**
- To archive:
  1. Cut task from "✅ Done" in kanban.md
  2. Paste into "## ✅ Archives" section in archive.md
  3. Add horizontal rule separator: `---`

## Strict Format Rules

### CRITICAL FORMAT REQUIREMENTS

1. **NO `##` or `###` headings inside tasks**
   - ❌ WRONG: `## Subtasks` or `### Implementation Details`
   - ✅ CORRECT: `**Subtasks**:` or `**Implementation Details**:`

   **Why?** The HTML parser interprets `##` as new task separator, breaking the task structure.

2. **Task Header Format**:
   ```markdown
   ### TASK-XXX | Task Title
   ```
   - Must be exactly 3 hashes (`###`)
   - Task ID format: `TASK-` followed by zero-padded number (TASK-001, TASK-042)
   - Pipe separator (`|`) between ID and title

3. **Required Fields** (must be present):
   ```markdown
   **Priority**: [Critical|High|Medium|Low]
   **Category**: [Backend|Database|API|Testing|Documentation|DevOps|Security|Integrations]
   **Created**: YYYY-MM-DD
   ```

4. **Optional Fields** (use as needed):
   ```markdown
   **Assigned**: @user1, @user2
   **Started**: YYYY-MM-DD
   **Due**: YYYY-MM-DD
   **Finished**: YYYY-MM-DD
   **Tags**: #tag1 #tag2 #tag3
   ```

5. **Subtasks Format**:
   ```markdown
   **Subtasks**:
   - [ ] Incomplete subtask
   - [x] Completed subtask
   ```

6. **Notes Format**:
   ```markdown
   **Notes**:

   **Result**:
   Description of what was accomplished

   **Modified files**:
   - file/path.py (lines X-Y) - Description

   **Technical decisions**:
   - Decision 1 with rationale
   - Decision 2 with rationale

   **Tests performed**:
   - ✅ Test type: Results
   ```

### Section Separators

Between tasks in the same column, use:
```markdown
---
```

## Task Categories for This Project

- **Backend** - FastAPI endpoints, business logic, services
- **Database** - Alembic migrations, schema changes, repositories
- **API** - REST endpoints, Pydantic schemas, validation
- **Testing** - Unit tests, integration tests, pytest suites
- **Documentation** - API docs, README updates, schema documentation
- **DevOps** - Docker, deployment, Railway configuration
- **Security** - Authentication, authorization, JWT, rate limiting
- **Integrations** - Google OAuth, Snapchat OAuth, Redis, R2, Msegat

## Common Tags

- `#feature` - New functionality
- `#bug` - Bug fix
- `#enhancement` - Improvement to existing feature
- `#migration` - Database migration
- `#security` - Security-related work
- `#performance` - Performance optimization
- `#refactoring` - Code refactoring
- `#technical-debt` - Addressing technical debt
- `#mvp` - MVP phase requirement
- `#post-mvp` - Post-MVP enhancement

## Integration with Git Commits

**ALWAYS reference task IDs in commit messages:**

```bash
# Feature commits
git commit -m "feat: Add notification system (TASK-043)"

# Bug fix commits
git commit -m "fix: Resolve JWT expiration issue (TASK-012)"

# Migration commits
git commit -m "feat(db): Add notifications table (TASK-043 - 2/6)"

# Documentation commits
git commit -m "docs: Update API documentation (TASK-045)"
```

**Benefits:**
- Complete traceability from commit to task
- Easy to find all commits for a specific task
- Git history becomes self-documenting

## Integration with Other Skills

### alembic-migration Skill
When creating database migrations, the alembic-migration skill should:
1. Check if a related task exists in kanban.md
2. If not, create a task for the migration
3. Reference the task in migration description
4. Update task progress when migration is complete

### fastapi-endpoint Skill
When creating new API endpoints:
1. Create task in "📝 To Do" first
2. Move to "🚀 In Progress" when starting implementation
3. Check off subtasks (create endpoint, add tests, update docs)
4. Document result with endpoint details and examples
5. Move to "✅ Done" when complete

### test-suite Skill
When writing tests:
1. Check for related task
2. Update subtask checkbox for "Write tests"
3. Document test coverage in task Notes

## User Commands and Responses

### "Create a task to implement [feature]"
1. Read kanban.md to get last task ID
2. Analyze feature requirements
3. Break down into subtasks if complex (3+ steps)
4. Create task in "📝 To Do" section
5. Increment task ID in config comment
6. Respond: "Created TASK-XXX in kanban.md with [N] subtasks. Ready to start?"

### "Update TASK-XXX with progress"
1. Read kanban.md and locate TASK-XXX
2. Ask what progress to update (subtasks, status, notes)
3. Update the task accordingly
4. Move between columns if status changed
5. Respond: "Updated TASK-XXX: [summary of changes]"

### "List all tasks in progress"
1. Read kanban.md
2. Extract all tasks from "🚀 In Progress" section
3. Format as numbered list with ID, title, and progress
4. Respond with list and summary

### "Archive completed tasks"
1. Read kanban.md "✅ Done" section
2. Read archive.md
3. Move all done tasks to archive.md
4. Add separator between tasks
5. Respond: "Archived [N] completed tasks to archive.md"

### "What are we working on?"
1. Read kanban.md
2. Count tasks in each column
3. List tasks in "🚀 In Progress" with details
4. Show high-priority tasks in "📝 To Do"
5. Provide status summary

## Visual Kanban Board (task-manager.html)

Users can visualize tasks by opening `task-manager.html` in:
- Chrome 86+
- Edge 86+
- Opera 72+
- Brave 1.17+

**Features:**
- Drag and drop between columns
- Filter by priority, category, tags, users
- Visual progress bars for subtasks
- Color-coded priorities
- Task counters per column
- Archive view and search

**NOT supported:**
- Firefox (File System Access API unavailable)
- Safari (File System Access API unavailable)

## Golden Rules

### ✅ ALWAYS

1. **Create task BEFORE coding** - Planning first, execution second
2. **Use strict format** - No `##` inside tasks, use `**Field**:` format
3. **Break down complex work** - If 3+ steps, create subtasks
4. **Update progress in real-time** - Check off subtasks as you complete them
5. **Document comprehensively** - Fill **Notes** section with Result, Modified files, Technical decisions, Tests
6. **Reference tasks in commits** - Include TASK-XXX in commit messages
7. **Increment task ID** - Update `<!-- Config: Last Task ID: XXX -->` after creating task
8. **Leave in Done** - Don't archive unless user explicitly requests

### ❌ NEVER

1. **Use `## Heading` inside tasks** - Breaks HTML parser
2. **Code without creating task** - No undocumented work
3. **Forget subtask checkboxes** - Always track granular progress
4. **Archive immediately** - Tasks stay in Done until user requests archiving
5. **Skip result documentation** - Always fill **Notes** section
6. **Forget to increment task ID** - Prevents ID conflicts

## Troubleshooting

| Issue | Solution |
|-------|----------|
| HTML viewer shows broken tasks | Check for `##` headings inside tasks - replace with `**Heading**:` |
| Task ID conflicts | Always read current last ID from config comment before creating task |
| Subtasks not rendering | Ensure checkbox format is `- [ ]` not `[ ]` or `-[ ]` |
| Can't find tasks | Use Grep tool: `pattern: "TASK-XXX" path: kanban.md` |
| Task not in expected column | Read kanban.md and search for task ID to find current location |

## Examples

See [examples.md](examples.md) for detailed real-world task examples including:
- Simple feature task
- Complex task with subtasks
- Completed task with full documentation
- Bug fix task
- Database migration task
- API endpoint task

## Related Skills
- `alembic-migration` - Database schema changes (creates migration tasks)
- `fastapi-endpoint` - API endpoint creation (uses tasks for planning)
- `test-suite` - Test writing (updates task progress)
- `feature-implementation` - Complete feature development (orchestrates multiple tasks)

## Version History
- v1.0.0 (2025-11-15): Initial release for Saudi Celebrity Giveaway Platform
