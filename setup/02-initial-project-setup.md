# 02 - Initial Project Setup

> **Initialize your project structure, install base dependencies, and configure Git**
>
> Estimated Time: 15 minutes

## Overview

This guide walks you through creating a new frontend project from scratch, setting up the initial folder structure, and configuring version control.

## Prerequisites

✅ Completed [01-prerequisites.md](01-prerequisites.md)
✅ Node.js 20+ installed
✅ Git configured
✅ GitHub account ready

---

## Step 1: Create Project Directory

Choose a meaningful project name (lowercase, hyphens for spaces):

```bash
# Navigate to your projects folder
cd ~/Dev_projects  # or wherever you keep projects

# Create project directory
mkdir my-frontend-project
cd my-frontend-project
```

---

## Step 2: Initialize npm Project

```bash
# Initialize package.json
npm init -y

# This creates package.json with default values
```

### Update package.json Metadata

Edit `package.json` to update these fields:

```json
{
  "name": "my-frontend-project",
  "version": "1.0.0",
  "description": "My awesome frontend project",
  "type": "module",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "keywords": ["react", "typescript", "vite"],
  "directories": {
    "doc": "docs"
  }
}
```

**Important**: Set `"type": "module"` for ES module support (required for Vite).

---

## Step 3: Create Folder Structure

Create the recommended project structure:

```bash
# Create main directories
mkdir -p src/{components/{ui,molecules,organisms,templates},pages,design-tokens,contexts,constants,hooks,lib,services,stores,styles}

# Create docs directory
mkdir -p docs

# Create public directory for static assets
mkdir public

# Create .claude directory for AI integration
mkdir -p .claude/{skills,agents}
```

### Folder Structure Explanation

```
my-frontend-project/
├── src/                      # Source code
│   ├── components/           # React components
│   │   ├── ui/              # Atomic design system components
│   │   ├── molecules/       # Composed components
│   │   ├── organisms/       # Complex components
│   │   └── templates/       # Page layouts
│   ├── pages/               # Route components
│   ├── design-tokens/       # Colors, typography, spacing, icons
│   ├── contexts/            # React Context providers
│   ├── constants/           # Constants and configuration
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── services/            # API calls, external services
│   ├── stores/              # State management (Zustand stores)
│   └── styles/              # Global CSS
├── public/                   # Static assets
├── docs/                     # Documentation
├── .claude/                  # Claude Code configuration
│   ├── skills/              # AI skills
│   └── agents/              # AI agents
└── [config files]           # Root config files (coming next)
```

---

## Step 4: Initialize Git Repository

```bash
# Initialize Git
git init

# Create initial .gitignore (basic version)
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json

# Build outputs
dist/
build/
.vite/

# Environment variables
.env
.env.local
.env.*.local
.env.docker

# IDE
.vscode/
.idea/
*.swp
*.swo
.DS_Store

# Logs
*.log
logs/

# Testing
coverage/

# Temporary files
*.tmp
*.temp
.cache/
EOF
```

**Note**: A more comprehensive `.gitignore` is available in `templates/.gitignore.template`.

---

## Step 5: Create Initial Files

### Create `src/main.tsx` (Entry Point)

```bash
cat > src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF
```

### Create `src/App.tsx` (Root Component)

```bash
cat > src/App.tsx << 'EOF'
function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold text-center py-8">
        Welcome to Your New Project
      </h1>
    </div>
  )
}

export default App
EOF
```

### Create `src/vite-env.d.ts` (Vite Types)

```bash
cat > src/vite-env.d.ts << 'EOF'
/// <reference types="vite/client" />
EOF
```

### Create `public/index.html` (HTML Entry)

```bash
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#000000" />
    <title>My Frontend Project</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF
```

### Create `src/styles/globals.css` (Global Styles)

```bash
mkdir -p src/styles
cat > src/styles/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-background: #ffffff;
    --color-foreground: #000000;
  }

  [data-theme="dark"] {
    --color-background: #000000;
    --color-foreground: #ffffff;
  }
}
EOF
```

---

## Step 6: Create README.md

```bash
cat > README.md << 'EOF'
# My Frontend Project

> A modern React + TypeScript + Vite application

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3
- **State Management**: Zustand 5
- **Routing**: React Router 7

## Project Structure

See `docs/` folder for detailed documentation.

## Development

- Development server runs on `http://localhost:5173`
- Hot module replacement (HMR) enabled
- TypeScript strict mode enabled

## License

MIT
EOF
```

---

## Step 7: First Git Commit

```bash
# Stage all files
git add .

# Create initial commit
git commit -m "chore: initial project setup

- Initialize npm project
- Create folder structure
- Add basic React setup
- Configure Git

Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Step 8: Create GitHub Repository (Optional)

### Option A: Using GitHub CLI

```bash
# Create GitHub repository
gh repo create my-frontend-project --public --source=. --remote=origin

# Push to GitHub
git branch -M main
git push -u origin main
```

### Option B: Manual Setup

1. Go to https://github.com/new
2. Repository name: `my-frontend-project`
3. Description: "My awesome frontend project"
4. Choose Public or Private
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

Then push your code:

```bash
# Add remote
git remote add origin git@github.com:YOUR_USERNAME/my-frontend-project.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Verification Checklist

After completing this setup, verify:

```bash
# ✓ Project directory created
pwd  # Should show your project path

# ✓ package.json exists
cat package.json | grep "type"  # Should show "module"

# ✓ Folder structure created
ls -la src/  # Should show components/, pages/, etc.

# ✓ Git initialized
git status  # Should show "On branch main"

# ✓ Initial commit created
git log --oneline  # Should show "chore: initial project setup"

# ✓ GitHub repository created (if using)
git remote -v  # Should show origin pointing to GitHub
```

---

## Project Structure at This Point

```
my-frontend-project/
├── .git/                     # Git repository
├── .gitignore                # Git exclusions
├── README.md                 # Project documentation
├── package.json              # npm configuration
├── index.html                # HTML entry point
├── public/                   # Static assets (empty)
├── docs/                     # Documentation (empty)
├── .claude/                  # Claude Code config (empty)
│   ├── skills/
│   └── agents/
└── src/
    ├── main.tsx              # Entry point
    ├── App.tsx               # Root component
    ├── vite-env.d.ts         # Vite types
    ├── styles/
    │   └── globals.css       # Global CSS
    ├── components/           # (empty folders created)
    │   ├── ui/
    │   ├── molecules/
    │   ├── organisms/
    │   └── templates/
    ├── pages/
    ├── design-tokens/
    ├── contexts/
    ├── constants/
    ├── hooks/
    ├── lib/
    ├── services/
    └── stores/
```

---

## Common Issues & Solutions

### Issue: npm init fails
**Solution**:
```bash
# Ensure you're in the correct directory
pwd

# Try with force flag
npm init --yes
```

### Issue: Git commit fails
**Solution**:
```bash
# Ensure Git is configured
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Try commit again
git commit -m "Initial commit"
```

### Issue: GitHub push fails (permission denied)
**Solution**:
```bash
# Check SSH key is added to GitHub
ssh -T git@github.com

# Or use HTTPS instead
git remote set-url origin https://github.com/YOUR_USERNAME/my-frontend-project.git
```

### Issue: Cannot create folders (permission denied)
**Solution**:
```bash
# Check directory permissions
ls -la

# Use sudo only if necessary (not recommended for project files)
# Better: Change ownership
sudo chown -R $USER:$USER .
```

---

## Next Steps

You now have:
- ✅ Project directory structure
- ✅ Basic file scaffolding
- ✅ Git repository initialized
- ✅ GitHub repository created (optional)

**→ Proceed to**: [03-tech-stack-configuration.md](03-tech-stack-configuration.md) to install dependencies and configure your build tools.

---

## Quick Reference Commands

```bash
# Project initialization
npm init -y
git init

# Folder creation
mkdir -p src/{components,pages,design-tokens,contexts,constants,hooks,lib,services,stores,styles}

# Initial commit
git add .
git commit -m "chore: initial project setup"

# GitHub setup
gh repo create my-frontend-project --public --source=. --remote=origin
git push -u origin main
```

---

**Estimated Time**: 15 minutes
**Next Step**: [03-tech-stack-configuration.md](03-tech-stack-configuration.md)
