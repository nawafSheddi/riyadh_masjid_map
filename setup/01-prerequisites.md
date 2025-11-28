# 01 - Prerequisites

> **Ensure you have all required tools and accounts before starting**
>
> Estimated Time: 10 minutes

## Overview

This guide covers all the tools, software, and accounts you need to have installed and configured before setting up your frontend project.

## Required Software

### 1. Node.js & npm

**Version Required**: Node.js 20+ (LTS recommended)

**Why**: Runtime for JavaScript and package management

**Installation**:
```bash
# Check if already installed
node --version  # Should be v20.x.x or higher
npm --version   # Should be 10.x.x or higher

# If not installed, download from:
# https://nodejs.org/ (choose LTS version)

# Alternative: Use nvm (Node Version Manager) - recommended
# macOS/Linux:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20

# Windows:
# Download nvm-windows from https://github.com/coreybutler/nvm-windows
```

**Verification**:
```bash
node --version
npm --version
```

---

### 2. Git

**Version Required**: Git 2.x+

**Why**: Version control and code collaboration

**Installation**:
```bash
# Check if already installed
git --version  # Should be 2.x.x or higher

# macOS:
brew install git
# or download from https://git-scm.com/

# Linux (Ubuntu/Debian):
sudo apt-get update
sudo apt-get install git

# Windows:
# Download from https://git-scm.com/download/win
```

**Configuration** (replace with your details):
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Verification**:
```bash
git --version
git config --global user.name
git config --global user.email
```

---

### 3. Docker & Docker Compose

**Version Required**: Docker 20+, Docker Compose 2.0+

**Why**: Containerization for development and production

**Installation**:
```bash
# Check if already installed
docker --version         # Should be 20.x.x or higher
docker compose version   # Should be 2.x.x or higher

# macOS:
# Download Docker Desktop from https://www.docker.com/products/docker-desktop

# Linux (Ubuntu):
sudo apt-get update
sudo apt-get install docker.io docker-compose-plugin

# Windows:
# Download Docker Desktop from https://www.docker.com/products/docker-desktop
```

**Post-Installation** (Linux only):
```bash
# Add your user to docker group to run without sudo
sudo usermod -aG docker $USER
# Log out and log back in for changes to take effect
```

**Verification**:
```bash
docker --version
docker compose version
docker ps  # Should not error (may show no containers)
```

---

### 4. Code Editor

**Recommended**: Visual Studio Code (VS Code)

**Why**: Best TypeScript/React support, extensive extension ecosystem

**Installation**:
- Download from https://code.visualstudio.com/

**Required VS Code Extensions**:
```
- ESLint (dbaeumer.vscode-eslint)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
- TypeScript Vue Plugin (Vue.volar) [if using Vue]
- Prettier - Code formatter (esbenp.prettier-vscode)
- Docker (ms-azuretools.vscode-docker)
- GitLens (eamodio.gitlens)
```

**Install Extensions via Command Line**:
```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
code --install-extension ms-azuretools.vscode-docker
code --install-extension eamodio.gitlens
```

---

## Optional but Recommended

### 5. Claude Code CLI

**Version**: Latest

**Why**: AI-assisted development with specialized skills

**Installation**:
```bash
# Install via npm (if available)
npm install -g @anthropic/claude-code

# Or download from official Anthropic sources
```

**Verification**:
```bash
claude --version
```

---

### 6. GitHub CLI (gh)

**Why**: Easier pull request creation and GitHub operations

**Installation**:
```bash
# macOS:
brew install gh

# Linux:
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

# Windows:
# Download from https://cli.github.com/
```

**Authentication**:
```bash
gh auth login
```

**Verification**:
```bash
gh --version
```

---

## Required Accounts

### 1. GitHub Account

**Why**: Code hosting, version control, CI/CD

**Sign Up**: https://github.com/signup

**Setup SSH Keys** (recommended):
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Start ssh-agent
eval "$(ssh-agent -s)"

# Add key to agent
ssh-add ~/.ssh/id_ed25519

# Copy public key to clipboard
# macOS:
pbcopy < ~/.ssh/id_ed25519.pub
# Linux:
cat ~/.ssh/id_ed25519.pub
# Windows:
clip < ~/.ssh/id_ed25519.pub

# Add to GitHub: https://github.com/settings/ssh/new
```

---

### 2. Hosting Platform Account (Choose One)

**Option A: Cloudflare Pages** (Recommended for this stack)
- Sign up: https://pages.cloudflare.com/
- Why: Free tier, global CDN, automatic deployments

**Option B: Vercel**
- Sign up: https://vercel.com/signup
- Why: Excellent React/Next.js support, easy deployment

**Option C: Netlify**
- Sign up: https://app.netlify.com/signup
- Why: Simple setup, generous free tier

---

## System Requirements

### Minimum Hardware
- **CPU**: 2 cores
- **RAM**: 8 GB (16 GB recommended)
- **Disk**: 10 GB free space
- **Internet**: Stable connection for npm packages

### Operating System
- **macOS**: 11.0 (Big Sur) or later
- **Linux**: Ubuntu 20.04+, Debian 11+, or equivalent
- **Windows**: Windows 10/11 with WSL2 (for Docker)

---

## Environment Setup

### macOS Specific

**Install Homebrew** (package manager):
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

---

### Linux Specific

**Update package list**:
```bash
sudo apt-get update
sudo apt-get upgrade
```

---

### Windows Specific

**Install WSL2** (for Docker and better development experience):
```bash
# Run in PowerShell as Administrator
wsl --install
```

**Restart** your computer after WSL2 installation.

---

## Verification Checklist

Run through this checklist to ensure everything is ready:

```bash
# Node.js & npm
node --version    # ✓ v20.x.x or higher
npm --version     # ✓ 10.x.x or higher

# Git
git --version     # ✓ 2.x.x or higher
git config --global user.name   # ✓ Your name set
git config --global user.email  # ✓ Your email set

# Docker
docker --version           # ✓ 20.x.x or higher
docker compose version     # ✓ 2.x.x or higher
docker ps                  # ✓ No errors

# GitHub SSH (optional but recommended)
ssh -T git@github.com      # ✓ "Hi username! You've successfully authenticated"

# GitHub CLI (optional)
gh --version              # ✓ 2.x.x or higher
```

### Full Verification Script

Run this one-liner to check all prerequisites:

```bash
echo "Node: $(node --version) | npm: $(npm --version) | Git: $(git --version) | Docker: $(docker --version) | Compose: $(docker compose version)"
```

---

## Common Issues & Solutions

### Issue: npm command not found
**Solution**:
```bash
# Ensure Node.js is in PATH
export PATH=$PATH:/usr/local/bin

# Or reinstall Node.js
```

### Issue: Docker permission denied (Linux)
**Solution**:
```bash
sudo usermod -aG docker $USER
# Log out and log back in
```

### Issue: Git authentication failed
**Solution**:
```bash
# Use SSH instead of HTTPS
gh auth login
# Or set up SSH keys as shown above
```

### Issue: WSL2 not working (Windows)
**Solution**:
```bash
# Enable virtualization in BIOS
# Run in PowerShell as Admin:
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
# Restart computer
```

---

## Next Steps

Once all prerequisites are verified:

1. ✅ All required software installed
2. ✅ All accounts created
3. ✅ Git and GitHub configured
4. ✅ Docker running successfully
5. ✅ Code editor ready

**→ Proceed to**: [02-initial-project-setup.md](02-initial-project-setup.md)

---

## Additional Resources

- **Node.js Documentation**: https://nodejs.org/docs
- **Git Documentation**: https://git-scm.com/doc
- **Docker Documentation**: https://docs.docker.com/
- **VS Code Documentation**: https://code.visualstudio.com/docs
- **GitHub Documentation**: https://docs.github.com/

---

**Estimated Setup Time**: 10-30 minutes (depending on internet speed and existing installations)
