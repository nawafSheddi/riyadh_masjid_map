# Markdown Task Manager - Real-World Examples

This document provides practical examples of tasks from the Saudi Celebrity Giveaway Platform project.

## Table of Contents

1. [Simple Feature Task](#example-1-simple-feature-task)
2. [Complex Task with Subtasks](#example-2-complex-task-with-subtasks)
3. [Completed Task with Full Documentation](#example-3-completed-task-with-full-documentation)
4. [Bug Fix Task](#example-4-bug-fix-task)
5. [Database Migration Task](#example-5-database-migration-task)
6. [API Endpoint Task](#example-6-api-endpoint-task)
7. [Testing Task](#example-7-testing-task)
8. [Documentation Task](#example-8-documentation-task)
9. [Security Enhancement Task](#example-9-security-enhancement-task)
10. [Performance Optimization Task](#example-10-performance-optimization-task)

---

## Example 1: Simple Feature Task

**Location:** 📝 To Do

```markdown
### TASK-015 | Add email notification preferences

**Priority**: Medium | **Category**: Backend | **Assigned**: @nawaf
**Created**: 2025-11-15 | **Due**: 2025-11-18
**Tags**: #feature #enhancement

Allow users to configure which email notifications they want to receive (challenge updates, winner announcements, participation confirmations).

**Subtasks**:
- [ ] Add preferences column to users table
- [ ] Create Pydantic schema for preferences
- [ ] Add update preferences endpoint
- [ ] Update notification service to check preferences
- [ ] Write unit tests
```

**Notes:**
- Simple task with clear objective
- 5 subtasks, each achievable in 15-30 minutes
- Total estimated time: 2-3 hours

---

## Example 2: Complex Task with Subtasks

**Location:** 🚀 In Progress

```markdown
### TASK-042 | Implement real-time notification system

**Priority**: High | **Category**: Backend | **Assigned**: @nawaf
**Created**: 2025-11-10 | **Started**: 2025-11-12 | **Due**: 2025-11-20
**Tags**: #feature #mvp #websocket

Build comprehensive notification system for challenge updates, winner announcements, and participation confirmations. Support both WebSocket (real-time) and polling (fallback).

**Subtasks**:
- [x] Design notification data model
- [x] Create database migration
- [x] Implement NotificationService (business logic)
- [ ] Add WebSocket endpoint with Socket.io
- [ ] Create REST API endpoints (list, mark as read)
- [ ] Add background task for cleanup (30-day retention)
- [ ] Write unit tests (service layer)
- [ ] Write integration tests (API endpoints)
- [ ] Update API documentation

**Notes**:
Dependencies: Requires TASK-038 (User schema update) completed first.

WebSocket library options considered:
- Socket.io (chosen for auto-reconnect, room support)
- python-socketio
- WebSocket native (too low-level)
```

**Notes:**
- Complex task broken into 9 manageable subtasks
- Shows progress: 3/9 completed
- Documents dependencies and technical research
- Estimated total time: 1-2 days

---

## Example 3: Completed Task with Full Documentation

**Location:** ✅ Done

```markdown
### TASK-038 | Add Snapchat OAuth integration

**Priority**: Critical | **Category**: Integrations | **Assigned**: @nawaf
**Created**: 2025-11-05 | **Started**: 2025-11-06 | **Finished**: 2025-11-08
**Tags**: #feature #mvp #oauth #influencer

Integrate Snapchat OAuth to verify influencer accounts and upgrade user role from participant to influencer.

**Subtasks**:
- [x] Register app with Snapchat Developer Portal
- [x] Add Snapchat OAuth credentials to .env
- [x] Create OAuth flow endpoints (initiate, callback)
- [x] Store Snapchat user data in database
- [x] Implement role upgrade logic (participant → influencer)
- [x] Add error handling for failed OAuth
- [x] Write unit tests for OAuth service
- [x] Write integration tests for endpoints
- [x] Update API documentation
- [x] Test with real Snapchat account

**Notes**:

**Result**:
✅ Successfully implemented Snapchat OAuth integration with automatic role upgrade from participant to influencer. System handles OAuth errors gracefully and stores Snapchat profile data (username, display name, bitmoji avatar) for influencer verification.

**Modified files**:
- app/integrations/snapchat_oauth.py (lines 1-150) - OAuth service with token exchange
- app/api/v1/auth.py (lines 100-180) - OAuth endpoints (initiate, callback)
- app/models/user.py (lines 60-75) - Added snapchat_id, snapchat_username fields
- app/services/user_service.py (lines 200-250) - Role upgrade logic with validation
- alembic/versions/f3a2b1c_add_snapchat_fields.py - Database migration
- tests/integration/test_snapchat_oauth.py (lines 1-120) - Integration tests
- tests/unit/test_snapchat_service.py (lines 1-80) - Unit tests
- docs/api/authentication.md - Updated with Snapchat OAuth flow

**Technical decisions**:
- Store Snapchat access token encrypted in database (for future API calls)
- Automatic role upgrade on successful OAuth (no manual approval needed)
- Snapchat username must be unique across system (prevents duplicate influencers)
- Token refresh logic for long-lived access (Snapchat tokens expire in 60 days)
- Store bitmoji avatar URL for future profile display

**Tests performed**:
- ✅ Unit tests: 15 tests, 100% coverage on OAuth service
- ✅ Integration tests: Full OAuth flow from initiate to callback with mock Snapchat API
- ✅ Manual testing: Verified with real Snapchat developer account
- ✅ Error scenarios: Invalid code, expired token, network errors all handled
- ✅ Security: CSRF protection via state parameter, token encryption at rest
- ✅ Edge cases: Existing Snapchat account, role already influencer, disconnected OAuth

**Deployment notes**:
- Added SNAPCHAT_CLIENT_ID and SNAPCHAT_CLIENT_SECRET to Railway environment variables
- Updated CORS to allow Snapchat OAuth redirect origin
- Verified SNAPCHAT_REDIRECT_URI points to production frontend

---
```

**Notes:**
- Comprehensive documentation of completed work
- Lists all 8 modified files with line numbers
- Documents 5 technical decisions with rationale
- Details 6 types of tests performed
- Includes deployment considerations
- Serves as reference for future OAuth integrations

---

## Example 4: Bug Fix Task

**Location:** 🚀 In Progress

```markdown
### TASK-067 | Fix JWT token expiration edge case

**Priority**: High | **Category**: Security | **Assigned**: @nawaf
**Created**: 2025-11-14 | **Started**: 2025-11-14
**Tags**: #bug #security #jwt

Users receiving 401 errors when making API calls within 1 minute of token expiry. Appears to be clock skew or timezone issue in JWT validation.

**Reproduction steps**:
1. Login and get JWT token (15-min expiry)
2. Wait exactly 14 minutes
3. Make API call
4. Observe: Sometimes succeeds, sometimes fails with 401

**Subtasks**:
- [x] Reproduce bug locally
- [x] Add detailed logging to JWT validation
- [x] Identify root cause (clock skew vs timezone)
- [ ] Implement fix (add clock tolerance)
- [ ] Write regression test
- [ ] Verify fix in staging
- [ ] Update JWT validation documentation

**Notes**:

**Root cause identified**:
JWT library using strict expiry check without clock tolerance. When server clock and client clock differ by even 1 second, tokens fail validation near expiry boundary.

**Proposed fix**:
Add 30-second clock tolerance (leeway) to JWT decode. Industry standard practice.

**References**:
- PyJWT documentation: https://pyjwt.readthedocs.io/en/stable/usage.html#expiration-time-claim-exp
- RFC 7519 (JWT spec): Section 4.1.4 recommends clock tolerance
```

**Notes:**
- Bug task includes reproduction steps
- Shows investigative progress in Notes
- Documents root cause before implementing fix
- References external documentation
- Will include regression test to prevent recurrence

---

## Example 5: Database Migration Task

**Location:** ✅ Done

```markdown
### TASK-055 | Add audit_logs table for compliance

**Priority**: Critical | **Category**: Database | **Assigned**: @nawaf
**Created**: 2025-11-08 | **Started**: 2025-11-09 | **Finished**: 2025-11-10
**Tags**: #migration #security #compliance #mvp

Create comprehensive audit logging system to track all administrative actions, challenge state changes, and winner selections for compliance and debugging.

**Subtasks**:
- [x] Design audit_logs table schema
- [x] Define audit action enum (24 action types)
- [x] Create Alembic migration
- [x] Create SQLAlchemy model
- [x] Add indexes for performance
- [x] Test migration (up and down)
- [x] Update database schema documentation
- [x] Create AuditService for logging

**Notes**:

**Result**:
✅ Created audit_logs table with 9 indexes for optimal query performance. Supports 24 action types covering all administrative operations, challenge lifecycle, and winner selection. Immutable logging (no updates/deletes) ensures audit trail integrity.

**Modified files**:
- alembic/versions/995b23423057_add_audit_logs.py - Migration file
- app/models/audit_log.py (lines 1-50) - SQLAlchemy model
- app/services/audit_service.py (lines 1-80) - Audit logging service
- docs/database/DATABASE-SCHEMA-DOCUMENTATION.md - Updated with audit_logs table details

**Technical decisions**:
- Immutable logs (no UPDATE or DELETE allowed) for compliance
- Store both user_id and admin_id (tracks who acted on whose behalf)
- JSON metadata field for flexible action-specific data
- 9 indexes for common query patterns (by user, by action, by timestamp, by resource)
- Separate enum for action types (easier to extend, better type safety)
- Automatic timestamp with timezone for accurate event tracking

**Schema details**:
```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    admin_id UUID REFERENCES users(id),
    action VARCHAR(50) NOT NULL,  -- Enum: 'user.created', 'challenge.approved', etc.
    resource_type VARCHAR(50),    -- 'user', 'challenge', 'participation', 'winner'
    resource_id UUID,
    metadata JSONB,               -- Action-specific details
    ip_address VARCHAR(45),       -- IPv4 or IPv6
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes created**:
- idx_audit_logs_user_id (user_id)
- idx_audit_logs_admin_id (admin_id)
- idx_audit_logs_action (action)
- idx_audit_logs_resource (resource_type, resource_id)
- idx_audit_logs_created_at (created_at DESC)
- idx_audit_logs_user_action (user_id, action)
- idx_audit_logs_resource_created (resource_type, resource_id, created_at)
- idx_audit_logs_admin_created (admin_id, created_at)
- idx_audit_logs_metadata (metadata) USING GIN  -- For JSON queries

**Tests performed**:
- ✅ Migration up: Successfully creates table and indexes
- ✅ Migration down: Successfully drops table (rollback tested)
- ✅ Model validation: All fields working correctly
- ✅ Index verification: EXPLAIN ANALYZE shows indexes being used
- ✅ Performance test: 10k log inserts in <2 seconds
- ✅ Query performance: Recent logs by user < 10ms

**Database documentation updated**:
- Section 4: Added audit_logs to Core Tables
- Section 8: Documented all 9 indexes
- Section 10: Added AuditAction enum with 24 values
- Section 11: Added migration to history
- Section 12.2: Added change log entry

---
```

**Notes:**
- Database migration task with comprehensive schema documentation
- Includes SQL schema in task for reference
- Documents all 9 indexes and their purposes
- Shows performance test results
- Confirms DATABASE-SCHEMA-DOCUMENTATION.md was updated (critical!)
- Migration tested both up and down (rollback)

---

## Example 6: API Endpoint Task

**Location:** 👀 Review

```markdown
### TASK-072 | Create challenge participation endpoints

**Priority**: High | **Category**: API | **Assigned**: @nawaf
**Created**: 2025-11-12 | **Started**: 2025-11-13 | **Finished**: 2025-11-15
**Tags**: #feature #mvp #api

Create REST API endpoints for users to participate in challenges: submit answer, view participation history, check participation status.

**Subtasks**:
- [x] Create Pydantic request/response schemas
- [x] Implement POST /api/v1/challenges/{id}/participate
- [x] Implement GET /api/v1/challenges/{id}/my-participation
- [x] Implement GET /api/v1/users/me/participations
- [x] Add rate limiting (max 10 participations per minute)
- [x] Write OpenAPI documentation
- [x] Write unit tests for endpoints
- [x] Write integration tests with real database
- [x] Manual testing with Postman

**Notes**:

**Result**:
✅ Implemented 3 participation endpoints with comprehensive validation, rate limiting, and privacy controls. Participants cannot see is_correct field (prevents gaming), only is_winner after challenge ends.

**Endpoints created**:

1. **POST /api/v1/challenges/{challenge_id}/participate**
   - Submit answer for a challenge
   - Validates: challenge exists, is active, user not already participated, answer required if type is quiz
   - Returns: participation_id, created_at, is_winner (always false until challenge ends)
   - Rate limit: 10 requests/minute per user

2. **GET /api/v1/challenges/{challenge_id}/my-participation**
   - Get user's participation status for specific challenge
   - Returns: participation details with privacy (no is_correct field)
   - 404 if not participated

3. **GET /api/v1/users/me/participations**
   - List all user's participations across all challenges
   - Supports pagination (limit, offset)
   - Filters: status (pending/winner/loser), challenge_id
   - Ordered by created_at descending

**Modified files**:
- app/schemas/participation.py (lines 1-80) - Request/response schemas
- app/api/v1/participations.py (lines 1-150) - API endpoints
- app/services/participation_service.py (lines 50-100) - Enhanced business logic
- app/core/rate_limiter.py (lines 1-40) - Rate limiting middleware
- tests/api/test_participations.py (lines 1-200) - Comprehensive API tests
- docs/api/participations.md - API documentation

**Technical decisions**:
- Separate schemas for public (ParticipationStatusPublic) and owner (ParticipationStatus) views
- is_correct never exposed to participants (maintains contest integrity)
- is_winner only true after challenge ends (builds suspense)
- Rate limiting per user (prevents spam participations)
- Idempotent participation (duplicate attempts return 409 with existing participation)
- Answer stored hashed for quiz challenges (privacy + validation)

**Request/Response examples**:

Submit participation:
```json
POST /api/v1/challenges/uuid-here/participate
{
  "answer": "Paris"  // Optional, required for quiz type
}

Response 201:
{
  "id": "uuid",
  "challenge_id": "uuid",
  "user_id": "uuid",
  "answer_hash": "sha256-hash",
  "is_winner": false,
  "created_at": "2025-11-15T10:30:00Z"
}
```

**Tests performed**:
- ✅ Unit tests: 25 tests covering all validation scenarios
- ✅ Integration tests: Full request/response cycle with database
- ✅ Rate limit test: Verified 10/min limit, 429 on excess
- ✅ Privacy test: Confirmed is_correct never in response
- ✅ Edge cases: Already participated (409), challenge ended (400), invalid answer
- ✅ Pagination: Tested with 100+ participations
- ✅ Manual Postman: All endpoints working as expected

**Ready for code review.**

---
```

**Notes:**
- API task with detailed endpoint specifications
- Includes request/response examples (JSON)
- Documents privacy/security considerations
- Shows rate limiting implementation
- Comprehensive test coverage
- Status: Ready for review (awaiting PR approval)

---

## Example 7: Testing Task

**Location:** ✅ Done

```markdown
### TASK-089 | Add integration tests for winner selection

**Priority**: Critical | **Category**: Testing | **Assigned**: @nawaf
**Created**: 2025-11-16 | **Started**: 2025-11-16 | **Finished**: 2025-11-17
**Tags**: #testing #mvp #winner-selection

Create comprehensive integration test suite for all 4 winner selection methods (first_correct, random_correct, random, all_correct) with edge cases.

**Subtasks**:
- [x] Setup test fixtures (challenges, users, participations)
- [x] Test first_correct method (single winner)
- [x] Test random_correct method (multiple winners)
- [x] Test random method (no correct answers required)
- [x] Test all_correct method (unlimited winners, prize split)
- [x] Test edge cases (no participations, all wrong answers, tie-breakers)
- [x] Test prize distribution calculations
- [x] Test atomic transaction rollback on errors
- [x] Achieve 100% coverage on WinnerService

**Notes**:

**Result**:
✅ Created comprehensive integration test suite with 45 tests covering all winner selection scenarios, edge cases, and error conditions. Achieved 100% code coverage on WinnerService.

**Modified files**:
- tests/integration/test_winner_selection.py (lines 1-500) - Complete test suite
- tests/fixtures/challenges.py (lines 1-100) - Reusable test fixtures
- app/services/winner_service.py (lines 200-210) - Fixed edge case bug found during testing

**Test coverage breakdown**:

1. **first_correct method (8 tests)**:
   - ✅ Single correct answer → winner selected
   - ✅ Multiple correct answers → first timestamp wins
   - ✅ No correct answers → no winner, challenge ends
   - ✅ All wrong answers → no winner
   - ✅ Timestamp tie → user_id tiebreaker
   - ✅ Winner already exists → idempotent (no duplicate)
   - ✅ Challenge already ended → raises error
   - ✅ Invalid challenge state → raises error

2. **random_correct method (10 tests)**:
   - ✅ 5 correct, select 3 → 3 random winners
   - ✅ 3 correct, select 5 → all 3 win (not enough)
   - ✅ 10 correct, select 1 → single random winner
   - ✅ No correct answers → no winners
   - ✅ Randomness verified (multiple runs, different winners)
   - ✅ Prize split equally among winners
   - ✅ Prize remainder to last winner
   - ✅ All winners marked is_winner=true
   - ✅ Audit log created for each winner
   - ✅ Transaction rollback on error

3. **random method (8 tests)**:
   - ✅ 10 participants, select 3 → 3 random winners (regardless of correctness)
   - ✅ 2 participants, select 5 → all 2 win
   - ✅ 100 participants, select 1 → single winner
   - ✅ No participations → no winners, challenge ends
   - ✅ Randomness verified
   - ✅ Prize distribution correct
   - ✅ All participants eligible (correct or wrong)
   - ✅ Transaction atomic

4. **all_correct method (12 tests)**:
   - ✅ 5 correct answers → all 5 win
   - ✅ 1 correct answer → 1 winner gets full prize
   - ✅ 10 correct, 10,000 SAR → each gets 1,000 SAR
   - ✅ Prize doesn't divide evenly → remainder to last
   - ✅ No correct answers → no winners
   - ✅ All wrong answers → no winners
   - ✅ 100 correct answers → all win (scales correctly)
   - ✅ winners_count must be 0 (validation)
   - ✅ Audit logs for all winners
   - ✅ is_winner set to true for all
   - ✅ Challenge status → ENDED
   - ✅ Transaction rollback on any error

5. **Edge cases (7 tests)**:
   - ✅ Empty participations list → graceful handling
   - ✅ Database error during selection → full rollback
   - ✅ Invalid winner_method → raises ValidationError
   - ✅ Negative winners_count → raises ValidationError
   - ✅ Challenge already has winners → idempotent
   - ✅ Concurrent winner selection → locks prevent race condition
   - ✅ Prize_amount = 0 → allowed, winners still selected

**Bug found and fixed**:
During testing, discovered that `all_correct` method wasn't validating `winners_count = 0` requirement. Added validation in WinnerService.select_winners() at line 205.

**Technical decisions**:
- Used pytest fixtures for reusable test data
- Factory pattern for creating test challenges/participations
- Randomness tests run 100 iterations to verify distribution
- Transaction rollback tests use pytest.raises() context manager
- Database state verified after each test (no side effects)
- Separate test database (not production!)

**Tests performed**:
- ✅ pytest tests/integration/test_winner_selection.py → 45/45 passed
- ✅ Coverage report: WinnerService 100% (all lines executed)
- ✅ Performance: Full suite runs in <30 seconds
- ✅ Isolation: Each test independent, can run in any order
- ✅ CI/CD: All tests pass in Docker container

**Code coverage report**:
```
Name                                 Stmts   Miss  Cover
--------------------------------------------------------
app/services/winner_service.py        150      0   100%
tests/integration/test_winner...      500      0   100%
--------------------------------------------------------
TOTAL                                 650      0   100%
```

---
```

**Notes:**
- Testing task with comprehensive coverage metrics
- Documents bug found during testing (common benefit of testing!)
- Breaks down tests by category (45 total tests)
- Shows coverage report
- Includes performance metrics (suite runs in <30s)
- Demonstrates value of thorough testing

---

## Example 8: Documentation Task

**Location:** ✅ Done

```markdown
### TASK-095 | Update database schema documentation

**Priority**: Medium | **Category**: Documentation | **Assigned**: @nawaf
**Created**: 2025-11-17 | **Started**: 2025-11-17 | **Finished**: 2025-11-17
**Tags**: #documentation #database

Update DATABASE-SCHEMA-DOCUMENTATION.md with recent schema changes: audit_logs table, winner selection enums, and new indexes.

**Subtasks**:
- [x] Document audit_logs table (all fields)
- [x] Add AuditAction enum (24 action types)
- [x] Document 9 new indexes on audit_logs
- [x] Update WinnerMethod enum with all_correct
- [x] Add migration history entries (last 5 migrations)
- [x] Update change log with version and date
- [x] Verify all table relationships documented
- [x] Review for accuracy and completeness

**Notes**:

**Result**:
✅ Fully updated database schema documentation (v1.9) with all recent changes. Documentation now accurately reflects production schema.

**Modified files**:
- docs/database/DATABASE-SCHEMA-DOCUMENTATION.md (v1.7 → v1.9)

**Changes made**:

1. **Section 4.8 - Added audit_logs Table**:
   - Complete field reference table (10 fields)
   - Field types, constraints, descriptions
   - Relationships to users table
   - Immutability notes for compliance

2. **Section 8 - Indexes & Performance**:
   - Documented all 9 audit_logs indexes
   - Included index types (B-tree, GIN)
   - Explained query patterns each index supports
   - Performance impact notes

3. **Section 10.2 - Enumerations**:
   - Added AuditAction enum with all 24 values
   - Updated WinnerMethod enum (added all_correct)
   - Organized enums by category

4. **Section 11 - Migration History**:
   - Added last 5 migrations with dates
   - Revision hashes and descriptions
   - Dependencies between migrations

5. **Section 12.2 - Change Log**:
   - 2025-11-17: Added audit_logs table, indexes, enums
   - 2025-11-15: Added all_correct winner method
   - Updated version to 1.9

**Quality checks performed**:
- ✅ All table names match actual database
- ✅ All field types match SQLAlchemy models
- ✅ All enums match Python enums
- ✅ All indexes verified with `\di` in psql
- ✅ Markdown formatting valid (no broken links)
- ✅ Table of contents updated
- ✅ Version incremented (1.7 → 1.9)
- ✅ Last Updated date changed to 2025-11-17

**Documentation coverage**:
- Tables documented: 8/8 (100%)
- Enums documented: 6/6 (100%)
- Indexes documented: 23/23 (100%)
- Migrations documented: Last 10 (100%)

---
```

**Notes:**
- Documentation task with clear scope
- Lists specific sections updated
- Shows version increment (v1.7 → v1.9)
- Includes quality checks performed
- Coverage metrics show completeness
- Critical for maintaining schema as source of truth

---

## Example 9: Security Enhancement Task

**Location:** 🚀 In Progress

```markdown
### TASK-101 | Implement rate limiting middleware

**Priority**: High | **Category**: Security | **Assigned**: @nawaf
**Created**: 2025-11-18 | **Started**: 2025-11-18
**Tags**: #security #performance #mvp

Add Redis-based rate limiting middleware to prevent API abuse and DDoS attacks. Apply different limits for authentication, participation, and general endpoints.

**Subtasks**:
- [x] Design rate limiting strategy (sliding window)
- [x] Implement RateLimiter middleware class
- [x] Add Redis client configuration
- [ ] Apply to authentication endpoints (5 req/min)
- [ ] Apply to participation endpoints (10 req/min)
- [ ] Apply to general API endpoints (100 req/min)
- [ ] Add rate limit headers (X-RateLimit-*)
- [ ] Write unit tests for middleware
- [ ] Write integration tests
- [ ] Update API documentation with rate limits

**Notes**:

**Rate limiting strategy**:
- Sliding window algorithm (more accurate than fixed window)
- Redis sorted sets for efficient time-based cleanup
- Per-user limits (identified by user_id or IP for anonymous)
- Different limits per endpoint category:
  - Auth endpoints: 5 requests/minute (prevent brute force)
  - Participation: 10 requests/minute (prevent spam)
  - General API: 100 requests/minute (prevent abuse)
  - Admin endpoints: 1000 requests/minute (high limit for admin tools)

**Response format on rate limit exceeded**:
```json
HTTP 429 Too Many Requests
{
  "detail": "Rate limit exceeded. Try again in 45 seconds.",
  "retry_after": 45
}

Headers:
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1699999999
```

**References**:
- Redis sliding window: https://redis.io/commands/zadd/
- RFC 6585: Additional HTTP Status Codes (429)
```

**Notes:**
- Security task in progress
- Shows research in Notes section
- Documents strategy before implementation
- Includes response format examples
- References external standards

---

## Example 10: Performance Optimization Task

**Location:** 📝 To Do

```markdown
### TASK-110 | Optimize challenge list query performance

**Priority**: Medium | **Category**: Backend | **Assigned**: @nawaf
**Created**: 2025-11-19 | **Due**: 2025-11-25
**Tags**: #performance #optimization

Challenge list endpoint (GET /api/v1/challenges) is slow with 1000+ challenges. Response time ~2 seconds. Target: <200ms for 95th percentile.

**Performance profiling results**:
- Query time: 1800ms (90% of total)
- Serialization: 150ms
- Network: 50ms

**Problem identified**:
- N+1 query problem loading challenge owner (influencer)
- No index on (status, created_at) for filtering
- Loading all fields when only subset needed for list view

**Subtasks**:
- [ ] Add composite index on (status, created_at)
- [ ] Use joinedload() for challenge owner (eager loading)
- [ ] Create slim ChallengeListItem schema (only needed fields)
- [ ] Add Redis caching for active challenges (5-min TTL)
- [ ] Implement pagination (limit 50 per page)
- [ ] Add performance test to CI/CD
- [ ] Measure improvement (target: <200ms)
- [ ] Update API documentation with pagination

**Notes**:

**Expected improvements**:
- Composite index: ~500ms reduction (1800ms → 1300ms)
- Eager loading: ~300ms reduction (1300ms → 1000ms)
- Slim schema: ~100ms reduction (1000ms → 900ms)
- Redis caching: ~800ms reduction for cache hits (900ms → 100ms)
- Total: 2000ms → 100-900ms (50-95% improvement)

**Caching strategy**:
- Key: `challenges:list:{status}:{page}`
- TTL: 5 minutes (balance between freshness and performance)
- Invalidate on: challenge create, update, delete
- Cache hit rate expected: ~80% (most users browse same pages)
```

**Notes:**
- Performance task with specific metrics
- Documents profiling results
- Identifies root causes before proposing solutions
- Shows expected improvements for each optimization
- Sets clear success criteria (<200ms target)
- Plans for measurement and validation

---

## Common Patterns Across Examples

### Task Lifecycle
1. **Created** → 📝 To Do (with subtasks)
2. **Started** → 🚀 In Progress (add Started date, check off subtasks)
3. **Completed** → ✅ Done (add Finished date, document in Notes)
4. **Archived** → archive.md (only when user requests)

### Documentation Quality
- **Result**: What was accomplished (specific, measurable)
- **Modified files**: All files changed with line numbers
- **Technical decisions**: Why choices were made (rationale)
- **Tests performed**: Types of testing and results

### Subtask Granularity
- Each subtask: 15-60 minutes of work
- Total task: 1-8 hours of work
- If longer: Break into multiple tasks (TASK-050 [EPIC] pattern)

### Integration with Git
- Reference TASK-XXX in commit messages
- Use task ID in branch names
- Link PRs to tasks
- Full traceability from code to task

---

## Tips for Writing Great Tasks

1. **Start with clear objective** - One sentence summary
2. **Break down into subtasks** - Granular, actionable steps
3. **Set realistic priorities** - Not everything is Critical
4. **Add relevant tags** - Helps filtering and discovery
5. **Document as you go** - Update Notes section during work
6. **Be specific in completion** - Detailed Result section
7. **List all modified files** - Complete audit trail
8. **Explain decisions** - Why you chose this approach
9. **Validate with tests** - Document test results
10. **Keep it readable** - Future you will thank you!

---

These examples demonstrate the full range of task types you'll encounter in the Saudi Celebrity Giveaway Platform project. Use them as templates for creating your own tasks!
