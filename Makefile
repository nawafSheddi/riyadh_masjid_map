# Masjid Map - Makefile
# Docker-first development workflow

COMPOSE = docker-compose -f docker-compose.yml
CONTAINER = masjid-map-dev

# ─── Development ──────────────────────────────────────────────

.PHONY: dev
dev: ## Start development server (port 5173)
	$(COMPOSE) up dev

.PHONY: dev-d
dev-d: ## Start development server in background
	$(COMPOSE) up -d dev

.PHONY: stop
stop: ## Stop all containers
	$(COMPOSE) down

.PHONY: restart
restart: ## Restart development server
	$(COMPOSE) down
	$(COMPOSE) up dev

.PHONY: logs
logs: ## Tail container logs
	$(COMPOSE) logs -f dev

.PHONY: shell
shell: ## Open shell in dev container
	$(COMPOSE) exec dev sh

# ─── Code Quality ─────────────────────────────────────────────

.PHONY: lint
lint: ## Run ESLint
	$(COMPOSE) run --rm dev npm run lint:local

.PHONY: typecheck
typecheck: ## Run TypeScript type checking
	$(COMPOSE) run --rm dev tsc --noEmit

.PHONY: check
check: typecheck lint ## Run typecheck + lint

# ─── Build ────────────────────────────────────────────────────

.PHONY: build
build: ## Production build
	$(COMPOSE) run --rm dev npm run build:local

.PHONY: prod
prod: ## Start production test server (port 8080)
	$(COMPOSE) --profile production up prod-test

.PHONY: prod-d
prod-d: ## Start production test server in background
	$(COMPOSE) --profile production up -d prod-test

.PHONY: prod-stop
prod-stop: ## Stop production test server
	$(COMPOSE) down

# ─── Dependencies ─────────────────────────────────────────────

.PHONY: install
install: ## Install npm dependencies
	$(COMPOSE) run --rm dev npm install

.PHONY: add
add: ## Add a package (usage: make add p=<package>)
	$(COMPOSE) run --rm dev npm add $(p)

.PHONY: add-dev
add-dev: ## Add a dev package (usage: make add-dev p=<package>)
	$(COMPOSE) run --rm dev npm add -D $(p)

# ─── Docker ───────────────────────────────────────────────────

.PHONY: docker-build
docker-build: ## Rebuild Docker images
	$(COMPOSE) build

.PHONY: docker-build-no-cache
docker-build-no-cache: ## Rebuild Docker images without cache
	$(COMPOSE) build --no-cache

.PHONY: clean
clean: ## Stop containers and prune Docker resources
	$(COMPOSE) down -v
	docker system prune -f

.PHONY: status
status: ## Show container status
	$(COMPOSE) ps

# ─── Local (no Docker) ───────────────────────────────────────

.PHONY: local-dev
local-dev: ## Start local dev server (no Docker)
	npx vite

.PHONY: local-build
local-build: ## Local production build (no Docker)
	npx tsc && npx vite build

.PHONY: local-preview
local-preview: ## Preview local build (no Docker)
	npx vite preview

.PHONY: local-lint
local-lint: ## Run ESLint locally (no Docker)
	npx eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0

.PHONY: local-typecheck
local-typecheck: ## Run TypeScript type checking locally (no Docker)
	npx tsc --noEmit

# ─── Help ─────────────────────────────────────────────────────

.PHONY: help
help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
