# Task Template

Use this template when creating new tasks in kanban.md.

## Basic Task Template

```markdown
### TASK-XXX | [Task title]

**Priority**: [Critical|High|Medium|Low] | **Category**: [Backend|Database|API|Testing|Documentation|DevOps|Security|Integrations] | **Assigned**: @[username]
**Created**: YYYY-MM-DD | **Due**: YYYY-MM-DD
**Tags**: #[tag1] #[tag2] #[tag3]

[Description of the task with full details. Can include lists, code snippets, and links.]

**Subtasks**:
- [ ] Subtask 1
- [ ] Subtask 2
- [ ] Subtask 3

**Notes**:
[Additional context or information]
```

## Completed Task Template

When marking a task as done, add comprehensive documentation:

```markdown
### TASK-XXX | [Task title]

**Priority**: [Level] | **Category**: [Category] | **Assigned**: @[username]
**Created**: YYYY-MM-DD | **Started**: YYYY-MM-DD | **Finished**: YYYY-MM-DD
**Tags**: #[tags]

[Description]

**Subtasks**:
- [x] All subtasks completed
- [x] With checkmarks

**Notes**:

**Result**:
[Comprehensive description of what was accomplished. Be specific about outcomes, metrics, and deliverables.]

**Modified files**:
- path/to/file1.py (lines X-Y) - Description of changes made
- path/to/file2.py (lines X-Y) - Description of changes made
- docs/file.md - Documentation updates

**Technical decisions**:
- Decision 1: Rationale and alternatives considered
- Decision 2: Why this approach was chosen
- Decision 3: Trade-offs and future considerations

**Tests performed**:
- ✅ Unit tests: Coverage and results
- ✅ Integration tests: What was validated
- ✅ Manual testing: Scenarios tested
- ✅ Performance tests: Metrics and benchmarks
```

## Quick Reference

### Priority Levels
- **Critical**: Production outages, security vulnerabilities, blocking issues, MVP launch blockers
- **High**: MVP features, important bugs, time-sensitive work
- **Medium**: Post-MVP features, improvements, minor bugs with workarounds
- **Low**: Nice-to-have features, code cleanup, future considerations

### Categories (for this project)
- **Backend**: FastAPI endpoints, business logic, services
- **Database**: Alembic migrations, schema changes, repositories
- **API**: REST endpoints, Pydantic schemas, validation
- **Testing**: Unit tests, integration tests, pytest suites
- **Documentation**: API docs, README updates, schema documentation
- **DevOps**: Docker, deployment, Railway configuration
- **Security**: Authentication, authorization, JWT, rate limiting
- **Integrations**: Google OAuth, Snapchat OAuth, Redis, R2, Msegat

### Common Tags
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

### Date Format
Always use ISO format: `YYYY-MM-DD` (e.g., 2025-11-15)

### Subtask Guidelines
- 3-8 subtasks optimal
- Each subtask: 15-60 minutes of work
- Total task: 1-8 hours of work
- If longer: Break into multiple tasks or create EPIC

## Format Rules (CRITICAL)

### ❌ NEVER DO THIS
```markdown
**Notes**:

## Implementation Details
This breaks the HTML parser!

### Subsection
Also breaks it!
```

### ✅ ALWAYS DO THIS
```markdown
**Notes**:

**Implementation Details**:
Use bold with colon instead of headings.

**Subsection**:
This works perfectly!
```

## Git Integration

### Branch Names
```bash
git checkout -b feature/TASK-042-notifications
git checkout -b bugfix/TASK-067-jwt-expiry
git checkout -b refactor/TASK-089-cleanup
```

### Commit Messages
```bash
# Feature
git commit -m "feat: Add notification system (TASK-042)"

# Bug fix
git commit -m "fix: Resolve JWT expiration issue (TASK-067)"

# With progress indicator
git commit -m "feat: Implement notification service (TASK-042 - 3/6)"

# Documentation
git commit -m "docs: Update API documentation (TASK-095)"
```

### Pull Request Titles
```
feat: Implement notification system (TASK-042)
fix: Resolve JWT token expiry bug (TASK-067)
docs: Update database schema documentation (TASK-095)
```
