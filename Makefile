gn-mg:
	npx typeorm-ts-node-commonjs migration:generate ./src/database/migrations/$(name) -d ./src/database/data-source.ts

mg-run:
	npx typeorm-ts-node-commonjs migration:run -d ./src/database/data-source.ts