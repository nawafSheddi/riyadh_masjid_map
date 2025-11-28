# Markdown Task Manager - Technical Reference

## Complete Format Specification

### kanban.md Structure

```markdown
# Kanban Board

<!-- Config: Last Task ID: 42 -->

## ⚙️ Configuration

**Columns**: 📝 To Do | 🚀 In Progress | 👀 Review | ✅ Done
**Categories**: Backend, Database, API, Testing, Documentation, DevOps, Security, Integrations
**Users**: @nawaf (Nawaf), @team (Team Member)
**Tags**: #feature, #bug, #enhancement, #migration, #security, #performance, #refactoring, #technical-debt, #mvp, #post-mvp

---

## 📝 To Do

### TASK-001 | Task title here

**Priority**: High | **Category**: Backend | **Assigned**: @nawaf
**Created**: 2025-11-15 | **Due**: 2025-11-20
**Tags**: #feature #mvp

Task description with full Markdown support. Can include:
- Bullet points
- **Bold** and *italic*
- `Code snippets`
- [Links](https://example.com)

But NO `##` or `###` headings (breaks HTML parser).

**Subtasks**:
- [ ] First subtask
- [ ] Second subtask
- [ ] Third subtask

**Notes**:
Additional context or information.

---

## 🚀 In Progress

### TASK-002 | Another task

**Priority**: Critical | **Category**: Security | **Assigned**: @nawaf
**Created**: 2025-11-14 | **Started**: 2025-11-15 | **Due**: 2025-11-16
**Tags**: #security #bug

Description here.

**Subtasks**:
- [x] Completed subtask
- [ ] In progress subtask

---

## 👀 Review

## ✅ Done

### TASK-003 | Completed task

**Priority**: Medium | **Category**: Database | **Assigned**: @nawaf
**Created**: 2025-11-10 | **Started**: 2025-11-12 | **Finished**: 2025-11-14
**Tags**: #migration

Description here.

**Subtasks**:
- [x] All subtasks completed

**Notes**:

**Result**:
Task completed successfully with all objectives met.

**Modified files**:
- app/models/user.py (lines 10-50)
- alembic/versions/abc123.py

**Technical decisions**:
- Used async SQLAlchemy for performance
- Added composite index on (user_id, created_at)

**Tests performed**:
- ✅ Unit tests: 10/10 passed
- ✅ Integration tests: All endpoints validated

---
```

## Field Reference

### Required Fields

| Field | Format | Description | Example |
|-------|--------|-------------|---------|
| **Task Header** | `### TASK-XXX \| Title` | Task ID and title | `### TASK-042 \| Implement notifications` |
| **Priority** | `**Priority**: [Level]` | Critical, High, Medium, Low | `**Priority**: High` |
| **Category** | `**Category**: [Name]` | Project-defined category | `**Category**: Backend` |
| **Created** | `**Created**: YYYY-MM-DD` | Creation date | `**Created**: 2025-11-15` |

### Optional Fields

| Field | Format | Description | Example |
|-------|--------|-------------|---------|
| **Assigned** | `**Assigned**: @user` | Assigned user(s) | `**Assigned**: @nawaf, @team` |
| **Started** | `**Started**: YYYY-MM-DD` | When work began | `**Started**: 2025-11-15` |
| **Due** | `**Due**: YYYY-MM-DD` | Deadline | `**Due**: 2025-11-30` |
| **Finished** | `**Finished**: YYYY-MM-DD` | Completion date | `**Finished**: 2025-11-15` |
| **Tags** | `**Tags**: #tag1 #tag2` | Tags for filtering | `**Tags**: #feature #mvp` |

### Subtasks Section

```markdown
**Subtasks**:
- [ ] Incomplete subtask description
- [x] Completed subtask description
- [ ] Another incomplete subtask
```

**Rules:**
- Use `- [ ]` for incomplete (space between brackets)
- Use `- [x]` for complete (lowercase x)
- Each subtask on new line with dash and checkbox

### Notes Section (for completed tasks)

```markdown
**Notes**:

**Result**:
What was accomplished. Be specific and comprehensive.

**Modified files**:
- path/to/file1.py (lines 10-50) - Description of changes
- path/to/file2.py (lines 100-120) - Description of changes
- path/to/file3.md - Documentation updates

**Technical decisions**:
- Decision 1: Rationale and trade-offs considered
- Decision 2: Why this approach over alternatives
- Decision 3: Future considerations

**Tests performed**:
- ✅ Unit tests: Coverage percentage, test count
- ✅ Integration tests: What was validated
- ✅ Manual tests: Scenarios tested
- ✅ Performance tests: Metrics and results
```

## Column Meanings

| Column | Icon | Purpose | Tasks Stay Until |
|--------|------|---------|------------------|
| **To Do** | 📝 | Planned work not yet started | Work begins |
| **In Progress** | 🚀 | Actively being worked on | Work completed |
| **Review** | 👀 | Needs code review or testing | Approved/merged |
| **Done** | ✅ | Completed and approved | User archives them |

## Configuration Section

### Customizing Columns

Edit the Configuration section in kanban.md:

```markdown
**Columns**: 📝 To Do | 🚀 In Progress | 👀 Review | ✅ Done
```

You can customize:
- Column names (but keep 2-4 columns recommended)
- Column emojis
- Column order

**Note:** Changing columns requires updating section headers (`## 📝 To Do`) to match.

### Managing Categories

```markdown
**Categories**: Backend, Database, API, Testing, Documentation, DevOps, Security, Integrations
```

**Best Practices:**
- Keep 5-10 categories
- Align with your project structure
- Use consistent naming
- Categories help filter in HTML viewer

### Managing Users

```markdown
**Users**: @nawaf (Nawaf Alsharhan), @alice (Alice Smith), @bob (Bob Johnson)
```

**Format:** `@handle (Full Name)`

**Best Practices:**
- Use short, memorable handles
- Include full names for clarity
- Add users as team grows

### Managing Tags

```markdown
**Tags**: #feature, #bug, #enhancement, #migration, #security, #performance
```

**Best Practices:**
- Lowercase with hyphens for multi-word tags
- Keep 10-15 core tags
- Use consistently across tasks
- Tags enable powerful filtering in HTML viewer

## Task ID Management

### Last Task ID Comment

```markdown
<!-- Config: Last Task ID: 42 -->
```

**Critical Rules:**
1. **ALWAYS read this before creating a task**
2. **ALWAYS increment after creating a task**
3. Format: `<!-- Config: Last Task ID: [NUMBER] -->`
4. Placed at top of kanban.md after title

### Task ID Format

**Pattern:** `TASK-` + zero-padded 3-digit number

**Examples:**
- `TASK-001` - First task
- `TASK-042` - 42nd task
- `TASK-123` - 123rd task

**Why zero-padded?**
- Consistent length for visual alignment
- Sorts correctly alphabetically
- Professional appearance

## archive.md Structure

```markdown
# Task Archive

> Archived completed tasks from Saudi Celebrity Giveaway Platform project

## ✅ Archives

### TASK-042 | Notification system

**Priority**: High | **Category**: Backend | **Assigned**: @nawaf
**Created**: 2025-01-15 | **Started**: 2025-01-18 | **Finished**: 2025-01-22
**Tags**: #feature #mvp

Real-time notification system for challenge updates.

**Subtasks**:
- [x] Design notification schema
- [x] Create database migration
- [x] Implement notification service
- [x] Add API endpoints
- [x] Write unit tests
- [x] Update documentation

**Notes**:

**Result**:
✅ Implemented complete notification system with WebSocket real-time delivery, REST API fallback, and comprehensive testing.

**Modified files**:
- app/models/notification.py (lines 1-45) - SQLAlchemy model with enum types
- app/services/notification_service.py (lines 1-120) - Business logic and WebSocket handling
- app/api/v1/notifications.py (lines 1-80) - REST API endpoints
- alembic/versions/abc123_notifications.py - Database migration

**Technical decisions**:
- Socket.io for WebSocket (production-ready, auto-reconnect)
- 30-day retention policy (balance between history and storage)
- User preferences for notification types (respect user control)
- Fallback to polling for unsupported browsers (Safari, older Firefox)

**Tests performed**:
- ✅ Unit tests: 15 tests, 100% coverage on service layer
- ✅ Integration tests: All API endpoints validated with realistic data
- ✅ Load test: 1000 concurrent WebSocket connections, <500ms latency
- ✅ Manual testing: Verified on Chrome, Firefox, Safari, Mobile

---

### TASK-041 | Another archived task

[Task details...]

---
```

## HTML Viewer (task-manager.html)

### Opening the Viewer

1. Copy `task-manager.html` to your project root
2. Open in Chrome, Edge, Opera, or Brave
3. Click "Select Folder" and choose your project directory
4. Grant file system access permission

### Features

**Kanban Board:**
- Visual columns with drag-and-drop
- Task cards with color-coded priorities
- Progress bars for subtasks
- Task counters per column

**Filtering:**
- Filter by priority (Critical, High, Medium, Low)
- Filter by category (Backend, API, Database, etc.)
- Filter by tags (#feature, #bug, etc.)
- Filter by assigned user (@nawaf, etc.)
- Filters are cumulative (can combine multiple)

**Archive View:**
- Toggle to view archived tasks
- Search archived tasks by keyword
- Restore tasks from archive to kanban

**Project Management:**
- Remembers last 10 projects
- Quick project switcher in header
- Custom project names

### Color Coding

**Priorities:**
- 🔴 Critical - Red
- 🟠 High - Orange
- 🟡 Medium - Yellow
- 🟢 Low - Green

**Subtask Progress:**
- 0-33% complete - Red bar
- 34-66% complete - Orange bar
- 67-99% complete - Yellow bar
- 100% complete - Green bar

### Browser Limitations

**Supported:**
- Chrome 86+ ✅
- Edge 86+ ✅
- Opera 72+ ✅
- Brave 1.17+ ✅

**NOT Supported:**
- Firefox ❌ (File System Access API not implemented)
- Safari ❌ (File System Access API not implemented)

## Advanced Patterns

### Breaking Down Large Features

For features requiring 5+ subtasks:

```markdown
### TASK-050 | Implement challenge system [EPIC]

**Priority**: Critical | **Category**: Backend | **Assigned**: @nawaf
**Created**: 2025-11-15 | **Due**: 2025-12-01
**Tags**: #feature #mvp #epic

Complete challenge management system for influencers.

**Subtasks**:
- [ ] TASK-051: Database schema and migrations
- [ ] TASK-052: Challenge CRUD endpoints
- [ ] TASK-053: Participation system
- [ ] TASK-054: Winner selection algorithms
- [ ] TASK-055: Challenge lifecycle management
- [ ] TASK-056: Testing suite
```

Then create separate tasks (TASK-051, TASK-052, etc.) with detailed subtasks.

### Dependency Tracking

Show task dependencies in description:

```markdown
### TASK-060 | Implement OAuth callback

**Priority**: High | **Category**: API | **Assigned**: @nawaf
**Created**: 2025-11-16
**Tags**: #feature

Implement Google OAuth callback endpoint.

**Dependencies**:
- ⏸️ TASK-058: Database user schema (in progress)
- ✅ TASK-055: JWT token generation (completed)

**Subtasks**:
[...]
```

### Recurring Patterns

For tasks that repeat (weekly reports, deployments):

```markdown
### TASK-070 | Weekly deployment - Week 46

**Priority**: Medium | **Category**: DevOps | **Assigned**: @nawaf
**Created**: 2025-11-15 | **Due**: 2025-11-16
**Tags**: #deployment #recurring

Weekly production deployment following standard checklist.

**Subtasks**:
- [ ] Run full test suite
- [ ] Build Docker image
- [ ] Push to Railway
- [ ] Run smoke tests
- [ ] Monitor error rates for 1 hour
- [ ] Update deployment log

**Notes**:
See TASK-065 (Week 45) for previous deployment notes.
```

## Best Practices

### Task Granularity

**Too Large (Bad):**
```markdown
### TASK-100 | Build entire authentication system
```

**Too Small (Bad):**
```markdown
### TASK-101 | Add import statement for JWT library
```

**Just Right (Good):**
```markdown
### TASK-102 | Implement JWT token generation and validation

**Subtasks**:
- [ ] Install and configure JWT library
- [ ] Create token generation function
- [ ] Create token validation function
- [ ] Add token refresh logic
- [ ] Write unit tests
```

**Guideline:** 3-8 subtasks, completable in 1-4 hours.

### Documentation Quality

**Poor Documentation:**
```markdown
**Notes**:

**Result**:
Done.

**Modified files**:
- some files
```

**Excellent Documentation:**
```markdown
**Notes**:

**Result**:
✅ Implemented complete JWT authentication system with token generation (15-min expiry), refresh tokens (7-day expiry), and automatic token rotation. System handles expired tokens gracefully with 401 responses and supports token blacklisting for logout.

**Modified files**:
- app/core/security.py (lines 45-120) - JWT generation and validation functions
- app/api/deps.py (lines 15-30) - get_current_user dependency
- app/api/v1/auth.py (lines 50-85) - Login and refresh endpoints
- tests/test_auth.py (lines 1-150) - Comprehensive test suite

**Technical decisions**:
- HS256 algorithm (symmetric, simpler for single backend)
- 15-minute access token expiry (security vs UX balance)
- 7-day refresh token (reasonable re-login frequency)
- Token stored in httpOnly cookie (XSS protection)
- Redis for token blacklist (fast lookups, automatic expiry)

**Tests performed**:
- ✅ Unit tests: 25 tests covering all edge cases (expired, invalid, malformed tokens)
- ✅ Integration tests: Full auth flow (login → access → refresh → logout)
- ✅ Security tests: Attempted token tampering, replay attacks
- ✅ Performance: 10k token validations in <500ms
```

### Priority Guidelines

**Critical:**
- Production outages
- Security vulnerabilities
- Blocking other team members
- MVP launch blockers

**High:**
- MVP features
- Important bugs affecting users
- Time-sensitive deliverables

**Medium:**
- Post-MVP features
- Non-blocking improvements
- Minor bugs with workarounds

**Low:**
- Nice-to-have features
- Code cleanup
- Documentation improvements
- Future considerations

### Git Integration Examples

**Feature Branch Naming:**
```bash
git checkout -b feature/TASK-042-notifications
git checkout -b bugfix/TASK-067-jwt-expiry
git checkout -b refactor/TASK-089-cleanup
```

**Commit Messages:**
```bash
# During development (progress indicator)
git commit -m "feat: Add notification model (TASK-042 - 1/6)"
git commit -m "feat: Implement notification service (TASK-042 - 3/6)"

# Final commit
git commit -m "feat: Complete notification system (TASK-042)"

# Multiple related tasks
git commit -m "test: Add test suite for notifications (TASK-042, TASK-043)"
```

**Pull Request Titles:**
```
feat: Implement notification system (TASK-042)
fix: Resolve JWT token expiry bug (TASK-067)
docs: Update API documentation (TASK-071, TASK-072)
```

## Troubleshooting Common Issues

### Issue: Tasks appear broken in HTML viewer

**Symptoms:** Task cards cut off mid-content, missing fields

**Cause:** Used `##` or `###` heading inside task

**Solution:**
```markdown
# ❌ WRONG
**Notes**:

## Implementation Details
The system uses...

# ✅ CORRECT
**Notes**:

**Implementation Details**:
The system uses...
```

### Issue: Task ID conflicts

**Symptoms:** Two tasks with same ID

**Cause:** Didn't update or read config comment

**Solution:**
1. Always read `<!-- Config: Last Task ID: XXX -->` before creating task
2. Always update comment after creating task
3. If conflict exists, renumber newer task

### Issue: Subtasks not rendering as checkboxes

**Symptoms:** Plain text instead of checkboxes

**Cause:** Incorrect checkbox format

**Solution:**
```markdown
# ❌ WRONG
**Subtasks**:
[ ] Task one
-[ ] Task two
- [] Task three

# ✅ CORRECT
**Subtasks**:
- [ ] Task one (note the space: dash, space, bracket, space, bracket)
- [x] Task two (lowercase x for completed)
```

### Issue: Can't find task with Grep

**Symptom:** Search returns no results

**Solution:**
```bash
# Search both files
grep -r "TASK-042" kanban.md archive.md

# Or use Grep tool
pattern: "TASK-042"
# (automatically searches current directory)
```

### Issue: HTML viewer won't load files

**Symptoms:** "Permission denied" or "No files found"

**Cause:** Browser File System Access API not granted permission

**Solution:**
1. Ensure using Chrome/Edge/Opera/Brave (not Firefox/Safari)
2. Click "Select Folder" button
3. Navigate to project root (containing kanban.md)
4. Click "Select" and grant permission when prompted
5. Refresh page if needed

## Version History

- v1.0.0 (2025-11-15): Initial technical reference for Saudi Celebrity Giveaway Platform
