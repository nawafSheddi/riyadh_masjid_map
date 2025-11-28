# Frontend Project Setup Template

> **Complete guide to setting up production-ready frontend projects**
>
> Last Updated: 2025-11-28 | Version: 1.0.0

## Overview

This template provides a comprehensive, battle-tested setup for modern frontend projects based on the Saudi Celebrity Giveaway Platform. It's optimized for:

- **Mobile-first, design-system-heavy applications** (primary use case)
- **Full-stack projects** where you control both frontend and backend
- **AI-assisted development** with Claude Code integration
- **Production deployment** with Docker and CI/CD

## What You'll Get

- ✅ Complete React 18 + TypeScript + Vite setup
- ✅ Design system with tokens, components, and validation
- ✅ Docker configuration for development and production
- ✅ Claude Code integration with 6 specialized skills
- ✅ Task management system with visual Kanban board
- ✅ ESLint rules for design token enforcement
- ✅ Deployment-ready with environment configuration
- ✅ Best practices for RTL/Arabic support (optional)
- ✅ Dark mode setup with theme persistence

## Quick Start

### For Experienced Developers
1. Read [01-prerequisites.md](01-prerequisites.md) to ensure you have required tools
2. Follow [02-initial-project-setup.md](02-initial-project-setup.md) to initialize project
3. Run through steps 03-07 sequentially
4. Verify setup with [10-post-setup-checklist.md](10-post-setup-checklist.md)
5. Start developing!

### For Claude Code
When asked to set up a new project using this template:
1. Ask user if they want the **recommended tech stack** (React + Vite + TypeScript + Tailwind + Zustand) or prefer to explore **alternatives**
2. If recommended: Follow documentation 01-10 sequentially
3. If alternatives: Review [reference/tech-stack-alternatives.md](reference/tech-stack-alternatives.md) and consult user on choices
4. Copy templates from `templates/` folder and replace `{{PLACEHOLDERS}}`
5. Install skills from `skills/` folder to `.claude/skills/`
6. Verify with checklist

## Documentation Structure

### Core Setup Guide (Read in Order)

| File | Purpose | Time |
|------|---------|------|
| [01-prerequisites.md](01-prerequisites.md) | Required tools, accounts, and installations | 10 min |
| [02-initial-project-setup.md](02-initial-project-setup.md) | npm init, folder structure, git init | 15 min |
| [03-tech-stack-configuration.md](03-tech-stack-configuration.md) | Package installation, config files | 30 min |
| [04-design-system-setup.md](04-design-system-setup.md) | Design tokens, component library foundation | 45 min |
| [05-development-tooling.md](05-development-tooling.md) | ESLint, TypeScript, formatting | 20 min |
| [06-docker-configuration.md](06-docker-configuration.md) | Dockerfile, docker-compose, nginx | 30 min |
| [07-claude-code-integration.md](07-claude-code-integration.md) | CLAUDE.md, skills system, task management | 30 min |
| [08-deployment-setup.md](08-deployment-setup.md) | CI/CD, environment variables, hosting | 20 min |
| [09-project-conventions.md](09-project-conventions.md) | Naming, file organization, git workflow | 15 min |
| [10-post-setup-checklist.md](10-post-setup-checklist.md) | Verification steps | 10 min |

**Total Setup Time**: ~3.5 hours (first time), ~1.5 hours (experienced)

### Reference Documentation (Consult as Needed)

| File | Purpose |
|------|---------|
| [reference/tech-stack-alternatives.md](reference/tech-stack-alternatives.md) | Alternative technology choices and trade-offs |
| [reference/component-patterns.md](reference/component-patterns.md) | Reusable React component patterns |
| [reference/design-token-system.md](reference/design-token-system.md) | Complete design token reference |
| [reference/troubleshooting.md](reference/troubleshooting.md) | Common issues and solutions |

### Configuration Templates

All templates are in the `templates/` folder with inline comments explaining each setting:

- `package.json.template` - npm scripts, dependencies, metadata
- `tsconfig.json.template` - TypeScript strict mode, path aliases
- `vite.config.ts.template` - Build optimizations, plugins
- `tailwind.config.js.template` - Design tokens as CSS variables
- `Dockerfile.template` - Production multi-stage build
- `Dockerfile.dev.template` - Development container
- `docker-compose.yml.template` - Docker orchestration
- `nginx.conf.template` - Web server with security headers
- `.env.example.template` - Environment variables
- `.gitignore.template` - Git exclusions
- `eslint.config.js.template` - Linting with custom rules
- `CLAUDE.md.template` - Claude Code context file

### Skills System

The `skills/` folder contains 6 specialized skills for AI-assisted development:

1. **design-token-enforcer** - Prevents hardcoded values, ensures semantic tokens
2. **react-rtl-layout-validator** - Validates RTL/Arabic layout patterns
3. **react-translation-manager** - Manages translation keys and localization
4. **markdown-task-manager** - Kanban task management with Git integration
5. **pre-commit-review** - 7-phase automated code review
6. **skill-creator** - Meta-skill for creating new skills

See [skills/README.md](skills/README.md) for installation and activation instructions.

## Recommended Tech Stack

This template uses a modern, production-tested stack:

```
Frontend Framework:     React 18
Build Tool:             Vite 7
Language:               TypeScript 5
Styling:                Tailwind CSS 3
UI Components:          shadcn/ui (customizable)
State Management:       Zustand 5
Icons:                  Lucide React
Routing:                React Router 7
Localization:           React I18Next 16
Container:              Docker (multi-stage)
Web Server:             Nginx (production)
```

**Want different choices?** See [reference/tech-stack-alternatives.md](reference/tech-stack-alternatives.md) for alternatives.

## Key Features & Best Practices

### Design System First
- Semantic color tokens (no hardcoded values)
- Typography, spacing, and icon systems
- Component variants with CVA
- Dark mode with theme persistence
- Automated validation scripts

### Claude Code Optimized
- Lean CLAUDE.md (400 lines) with modular skills
- Task management with complete traceability
- Pre-commit review automation
- Design token enforcement
- Progressive skill disclosure

### Production Ready
- Multi-stage Docker builds with security best practices
- Nginx with gzip compression and security headers
- Hash-based asset filenames for long-term caching
- Environment variable management
- Non-root container user

### Developer Experience
- Fast HMR with Vite
- Strict TypeScript with path aliases
- ESLint custom rules
- Visual Kanban board for task tracking
- Git workflow integration

## Project Philosophy

This setup follows these principles:

1. **Component-Driven Development** - Atomic design with reusable components
2. **Design Tokens First** - No hardcoded values, semantic naming
3. **Constants Over Magic Numbers** - Extracted and documented
4. **Mobile-First** - Touch-friendly, responsive design
5. **AI-Assisted** - Optimized for Claude Code workflow
6. **Production Quality** - Security, performance, maintainability

## Use Cases

### Perfect For:
- ✅ Mobile-first web applications
- ✅ Design-system-heavy projects
- ✅ E-commerce platforms
- ✅ SaaS applications
- ✅ Admin dashboards with custom design
- ✅ Full-stack projects (frontend part)
- ✅ Projects with AI-assisted development

### Not Ideal For:
- ❌ Static content sites (use Astro, Next.js static)
- ❌ Server-side rendering requirements (use Next.js, Remix)
- ❌ Simple landing pages (too much overhead)
- ❌ Legacy browser support (uses modern ES2020)

## Next Steps

1. **Start Setup**: Go to [01-prerequisites.md](01-prerequisites.md)
2. **Explore Alternatives**: Read [reference/tech-stack-alternatives.md](reference/tech-stack-alternatives.md)
3. **Review Components**: Check [reference/component-patterns.md](reference/component-patterns.md)
4. **Understand Tokens**: Study [reference/design-token-system.md](reference/design-token-system.md)

## Future Enhancements

🚧 **Coming Soon** (not yet implemented):
- Interactive CLI tool for automated scaffolding
- Additional skills for specific domains
- Testing setup documentation
- CI/CD pipeline templates
- Performance optimization guide

## Support & Contribution

This template is based on the Saudi Celebrity Giveaway Platform project. It represents battle-tested patterns from a production application.

**Questions?** Review the troubleshooting guide: [reference/troubleshooting.md](reference/troubleshooting.md)

**Want to customize?** All templates have inline comments explaining what to modify.

**Using Claude Code?** The entire setup is optimized for AI-assisted development.

---

**Version**: 1.0.0
**Last Updated**: 2025-11-28
**Maintained By**: Project extracted from Saudi Celebrity Giveaway Platform
**License**: Use freely for your own projects

Ready to build something amazing? Start with [01-prerequisites.md](01-prerequisites.md)! 🚀
