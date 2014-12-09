# Module management.
BUNDLER      = ./$(NODE_MODULES)/.bin/browserify
BUNDLE       = $(PATH_BASE)js/mastery.$(VERSION).dbg.js
BUNDLE_DIR   = $(dir $(BUNDLE))

# Code optimization.
MINIFIER     = ./$(NODE_MODULES)/.bin/uglifyjs
MINIFIED     = $(BUNDLE_DIR)mastery.$(VERSION).min.js

# Unit test runner.
TESTER       = ./$(NODE_MODULES)/.bin/nodeunit

# HTML template.
HTMLT_INPUT  = templates/index.t.html
HTMLT_OUTPUT = $(PATH_BASE)index.html

# Dockerfile template.
DOCKR_INPUT  = templates/Dockerfile.t
DOCKR_OUTPUT = $(PATH_BASE)Dockerfile

# GNU tools.
RM           = rm -f
MKDIR        = mkdir -p
CP           = cp
SED          = sed
AWK          = awk

# Other utilities.
GIT          = git
NPM          = npm
DOCKER       = docker
HTTPD        = python -m SimpleHTTPServer 8080

ASSET_FILES  = $(addprefix $(PATH_BASE),$(shell find assets/ -type f))
GARBAGE      = $(shell find build/ -type f)
NODE_MODULES = node_modules
PATH_DEBUG   = build/debug/
PATH_RELEASE = build/release/
SOURCE_FILES = $(shell find js/ -type f -iname '*.js*')
SOURCE_MAIN  = js/main.js
TEST_FILES   = $(shell find test/ -type f -iname '*.js')
VERSION      = $(shell $(GIT) describe --tags | $(SED) "s/[^0-9]/ /g" | \
			   $(AWK) '{printf "%d.%d.%d", $$1, $$2, $$3}')

ifeq (,$(shell which $(GIT)))
$(error Cannot find "git" in PATH. Please install it and try again)
endif

ifeq (,$(shell which $(NPM)))
$(error Cannot find "npm" in PATH. Please install node.js and try again)
endif

# User commands.

release:
	@$(MAKE) auto-release PATH_BASE="$(PATH_RELEASE)" \
		SCRIPT_ATTRIBUTES="src=\"$(MINIFIED)\"" --no-print-directory

debug:
	@$(MAKE) auto-debug BFLAGS="$(BFLAGS) --debug" PATH_BASE="$(PATH_DEBUG)" \
		SCRIPT_ATTRIBUTES="src=\"$(BUNDLE)\" data-mode=\"debug\"" \
		--no-print-directory

clean:
	@$(MAKE) auto-clean --no-print-directory

version:
	@echo $(VERSION)

test:
	@echo "Running unit tests ..."
	@$(foreach FILE,$(TEST_FILES),$(TESTER) $(FILE))

run: debug
	cd build/debug/ && $(HTTPD)

docker:
ifeq (,$(shell which docker))
	@echo "Docker not installed. Please install it and try again."
else
	@$(MAKE) auto-docker PATH_BASE="$(PATH_RELEASE)" --no-print-directory
endif

help:
	@echo "make release - Builds using release configuration."
	@echo "make debug   - Builds using development configuration."
	@echo "make clean   - Removes existing builds."
	@echo "make version - Prints current application version."
	@echo "make test    - Runs unit tests."
	@echo "make run     - Serves development version of game on port 8080."
	@echo "make docker  - Creates docker image of game release version."
	@echo "make help    - Displays this help message."

# Automatic commands. Don't use these directly.

auto-release: $(MINIFIED) $(HTMLT_OUTPUT)

auto-debug: $(BUNDLE) $(HTMLT_OUTPUT)

auto-clean:
	$(foreach FILE,$(wildcard $(GARBAGE)),$(RM) $(FILE)$(\n))

auto-docker: auto-clean auto-release $(DOCKR_OUTPUT)
	cd $(PATH_BASE) && sudo docker build -t mastery-client:v$(VERSION) .

$(PATH_BASE):
	@$(MKDIR) $@

$(PATH_BASE)assets/%: assets/%
	@$(MKDIR) $(dir $@)
	$(CP) $(subst $(PATH_BASE),,$@) $@

$(NODE_MODULES):
	$(NPM) install

$(HTMLT_OUTPUT): $(HTMLT_INPUT) $(PATH_BASE) $(BUNDLE)
	$(SED) 's/{{script.attributes}}/$(subst /,\/,$(SCRIPT_ATTRIBUTES))/' < $< > $@

$(DOCKR_OUTPUT): $(DOCKR_INPUT) $(PATH_BASE)
	$(CP) $< $@

$(BUNDLE_DIR):
	$(MKDIR) $@

$(BUNDLER): $(NODE_MODULES)

$(BUNDLE): $(SOURCE_FILES) $(ASSET_FILES) $(BUNDLE_DIR) $(BUNDLER)
	$(BUNDLER) $(SOURCE_MAIN) $(BFLAGS) -o $@

$(MINIFIER): $(NODE_MODULES)

$(MINIFIED): $(BUNDLE) $(MINIFIER)
	$(MINIFIER) $< --mangle --compress "drop_console=true,warnings=false" -o $@

.PHONY: auto-debug auto-release auto-clean debug release clean version test run

define \n


endef

