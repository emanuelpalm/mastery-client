# Module management.
BUNDLER      = ./$(NODE_MODULES)/.bin/browserify
BUNDLE       = $(PATH_BASE)js/mastery.$(VERSION).js
BUNDLE_DIR   = $(dir $(BUNDLE))

# Code optimization.
MINIFIER     = ./$(NODE_MODULES)/.bin/uglifyjs
MINIFIED     = $(BUNDLE_DIR)mastery.$(VERSION).min.js

# Compile-time template.
TEMPL_INPUT  = templates/index.t.html
TEMPL_OUTPUT = $(PATH_BASE)index.html
TEMPL_DIR    = $(dir $(TEMPL_OUTPUT))

# Unit test runner.
TESTER       = ./$(NODE_MODULES)/.bin/nodeunit

RM           = rm -f
MKDIR        = mkdir -p
CP           = cp

ASSET_FILES  = $(addprefix $(PATH_BASE),$(shell find assets/ -type f))
GARBAGE      = $(TEMPL_OUTPUT) $(BUNDLE) $(MINIFIED) $(ASSET_FILES)
NODE_MODULES = node_modules
PATH_DEBUG   = build/debug/
PATH_RELEASE = build/release/
SOURCE_FILES = $(shell find js/ -type f -iname '*.js*')
SOURCE_MAIN  = js/main.js
TEST_FILES   = $(shell find test/ -type f -iname '*.js*')
VERSION      = $(shell git describe --tags | sed "s/[^0-9]/ /g" | awk '{printf "%d.%d.%d", $$1, $$2, $$3}')

# User commands.

release:
	@$(MAKE) auto-release PATH_BASE="$(PATH_RELEASE)" JS_MASTERY="$(MINIFIED)" --no-print-directory

debug:
	@$(MAKE) auto-debug BFLAGS="$(BFLAGS) --debug" PATH_BASE="$(PATH_DEBUG)" JS_MASTERY="$(BUNDLE)" --no-print-directory

clean:
	@$(MAKE) auto-clean PATH_BASE="$(PATH_RELEASE)" --no-print-directory
	@$(MAKE) auto-clean PATH_BASE="$(PATH_DEBUG)" --no-print-directory

version:
	@echo $(VERSION)

test:
	@echo "Running unit tests ..."
	@$(foreach FILE,$(TEST_FILES),$(TESTER) $(FILE))

help:
	@echo "make release - Builds using release configuration."
	@echo "make debug   - Builds using development configuration."
	@echo "make clean   - Removes existing builds."
	@echo "make version - Prints current application version."
	@echo "make test    - Runs unit tests."

# Automatic commands. Don't use these directly.

auto-release: $(MINIFIED) $(TEMPL_OUTPUT)
auto-debug: $(BUNDLE) $(TEMPL_OUTPUT)
auto-clean:
	$(foreach FILE,$(wildcard $(GARBAGE)),$(RM) $(FILE)$(\n))

$(PATH_BASE)assets/%: assets/%
	@$(MKDIR) $(dir $@)
	$(CP) $(subst $(PATH_BASE),,$@) $@

$(NODE_MODULES):
	npm install

$(TEMPL_DIR):
	$(MKDIR) $@

$(TEMPL_OUTPUT): $(TEMPL_INPUT) $(TEMPL_DIR) $(BUNDLE)
	sed s/{{js.mastery}}/$(subst /,\\/,$(JS_MASTERY))/ < $< > $@

$(BUNDLE_DIR):
	$(MKDIR) $@

$(BUNDLER): $(NODE_MODULES)

$(BUNDLE): $(SOURCE_FILES) $(ASSET_FILES) $(BUNDLE_DIR) $(BUNDLER)
	$(BUNDLER) $(SOURCE_MAIN) $(BFLAGS) -o $@

$(MINIFIER): $(NODE_MODULES)

$(MINIFIED): $(BUNDLE) $(MINIFIER)
	$(MINIFIER) $< --mangle --compress "drop_console=true,warnings=false" -o $@

.PHONY: auto-debug auto-release auto-clean debug release clean version test

define \n


endef
