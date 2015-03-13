NPM=./node_modules/.bin

build: test min lint

test: dependencies
	@echo "start testing..."
	@$(NPM)/mocha \
		--reporter $(if $(or $(TEST),$(V)),spec,dot) \
		--slow 600 --timeout 2000 \
		--grep '$(TEST)'
	@echo "end test."


lint: dependencies
	@echo "start linting..."
	@$(NPM)/jshint --config .jshintrc \
		web-errors.js test/*.js
	@echo "end lint."

dependencies: node_modules

node_modules:
	@echo "Installing dependencies.."
	@npm install

coverage: dependencies
	@$(NPM)/istanbul cover $(NPM)/mocha -- --reporter spec
	@open coverage/lcov-report/validator.js/validator.js.html

clean:
	@rm -rf coverage

distclean: clean
	@rm -rf node_modules

min: web-errors.min.js

%.min.js: %.js dependencies
	@echo "start uglifying..."
	@$(NPM)/uglifyjs --compress --mangle --comments '/Copyright/' $< > $@
	@echo "end uglification"

check: test
deps: dependencies
