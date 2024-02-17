BLACK ?= \033[0;30m
RED ?= \033[0;31m
GREEN ?= \033[0;32m
YELLOW ?= \033[0;33m
BLUE ?= \033[0;34m
PURPLE ?= \033[0;35m
CYAN ?= \033[0;36m
GRAY ?= \033[0;37m
COFF ?= \033[0m

branch_name := $(shell git rev-parse --abbrev-ref HEAD)
commit := $(shell git rev-parse HEAD)

all: help
help: ## Display help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(CYAN)%-30s$(COFF) %s\n", $$1, $$2}'

check: ## Run linters
	@echo "$(GREEN)Running Linter, hope you got the time...$(COFF)"
	@npx eslint ./src

test: ## Run tests
	@echo "$(GREEN)Running Tests...$(COFF)"
	@npm test

deps: ## Install dependencies
	@echo "$(YELLOW)Gathering Libraries...$(COFF)"
	npm install

server: ## Run the application
	@echo "$(GREEN)Starting API Server... $(COFF)"
	npx json-server db.json -p 8000 -h localhost

app: ## Run the application
	@echo "$(GREEN)Starting App... $(COFF)"
	REACT_APP_VERSION=$(commit) \
	npm start

local: ## Run the application
	@echo "$(GREEN)Starting App... $(COFF)"
	REACT_APP_VERSION=$(commit) \
	npm start & \
	npx json-server db.json -p 8000 -h localhost

build: ## Build the application
	@echo "$(GREEN)Building App... $(COFF)"
	REACT_APP_VERSION=$(commit) \
	npm run build

run: ## Run the application
	@echo "$(GREEN)Running App... $(COFF)"
	# npm install serve
	serve -s build & \
	npx json-server db.json -p 8000 -h localhost
