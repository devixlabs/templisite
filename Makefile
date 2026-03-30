.PHONY: help dev build build-prod clean deploy

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

dev: ## Start development server with hot reload
	npm run dev

build: ## Build the site to dist/
	npm run build

build-prod: ## Build the site for production
	npm run build:prod

clean: ## Remove the dist/ directory
	npm run clean

deploy: ## Build for production and deploy to S3
	npm run deploy:s3
