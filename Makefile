include .env
export $(shell sed 's/=.*//' .env)


# run dev server
dev:
	cd app && npm run dev

# test
test: docker-image-build docker-image-rm

# bump versions
bump:
	cd app &&\
	npm i next@latest react@latest react-dom@latest eslint-config-next@latest &&\
	npm update
# generate typesafe api schema to app/schemas/gateway-api-schema.d.ts

## Drizzle ## drizzle-kit is a tool to manage database migrations
# see: https://orm.drizzle.team/kit-docs/overview#prototyping-with-db-push
db-push:
	@echo "Pushing schema to database: ${POSTGRES_URI}"
	@read -p "Enter Y to confirm: " confirm; \
	if [ $$confirm = "Y" ]; then \
		npx drizzle-kit push; \
	fi;

db-generate:
	npx drizzle-kit generate

db-migrate:
	@echo "Migrating schema to database: ${POSTGRES_URI}"
	@read -p "Enter Y to confirm: " confirm; \
	if [ $$confirm = "Y" ]; then \
		node migrate.mjs; \
	fi;
	
db-studio:
	@echo "Opening studio to database: ${POSTGRES_URI}"
	@npx drizzle-kit studio

db-drop:
	@echo "Droping table at database: ${POSTGRES_URI}"
	@read -p "Enter Y to confirm: " confirm; \
	if [ $$confirm = "Y" ]; then \
		npx drizzle-kit drop; \
	fi;
