# Paths
webpack_build := webpack/webpack.config.js
webpack_dev := webpack/webpack.dev.js

# NPX functions
tsc := node_modules/.bin/tsc
webpack := node_modules/.bin/webpack
webpack_dev_server := node_modules/.bin/webpack-dev-server
mocha := node_modules/.bin/mocha
eslint := node_modules/.bin/eslint

.IGNORE: clean-linux

main: run

run:
	@echo "[INFO] Starting development"
	@PORTAL_PATH=$(PP) \
	TEST_SERVER_PATH=$(TSP) \
	NODE_ENV=development \
	$(webpack_dev_server) --config $(webpack_dev) --open

build: clean-linux
	@echo "[INFO] Starting build"
	@NODE_ENV=production $(webpack) --config $(webpack_build)

tests:
	@echo "[INFO] Testing with Mocha"
	@NODE_ENV=test \
	$(mocha) --config test/.mocharc.json

cov:
	@echo "[INFO] Testing with Nyc and Mocha"
	@NODE_ENV=test \
	nyc $(mocha) --config test/.mocharc.json

lint:
	@echo "[INFO] Linting"
	@NODE_ENV=production \
	$(eslint) . --ext .ts,.tsx \
	--config ./typescript/.eslintrc.json

lint-fix:
	@echo "[INFO] Linting and Fixing"
	@NODE_ENV=development \
	$(eslint) . --ext .ts,.tsx \
	--config ./typescript/.eslintrc.json --fix

install:
	@echo "[INFO] Installing dev Dependencies"
	@yarn install --production=false

refresh-install:
	@echo "[INFO] Removing Lockfile"
	@rm yarn.lock
	@echo "[INFO] Installing dev Dependencies"
	@yarn install --production=false

install-prod:
	@echo "[INFO] Installing Dependencies"
	@yarn install --production=true

clean-linux:
	@echo "[INFO] Cleaning dist files"
	@rm -rf dist
	@rm -rf .nyc_output
	@rm -rf coverage
