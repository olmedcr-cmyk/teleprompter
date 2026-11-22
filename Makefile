# Teleprompter · tareas habituales. `make help` para verlas.
PROJECT ?= teleprompter
PORT    ?= 8765
HAIRLINE ?= $(HOME)/.claude/skills/hairline-create

.PHONY: help dev check deploy capturas hairline hairline-look

help:            ## Lista las tareas
	@grep -E '^[a-z-]+:.*##' $(MAKEFILE_LIST) | awk -F':.*## ' '{printf "  %-14s %s\n", $$1, $$2}'

dev:             ## Sirve public/ en http://localhost:$(PORT)
	python3 -m http.server $(PORT) -d public

check:           ## Comprobaciones estáticas (las mismas que la CI)
	node scripts/check.mjs

deploy: check    ## Despliega public/ en Cloudflare Pages (necesita wrangler con sesión)
	npx wrangler pages deploy public --project-name $(PROJECT) --branch main

capturas:        ## Regenera las capturas y la cabecera del README (necesita Chrome)
	node scripts/capturas.mjs

hairline:        ## Reconstruye public/hairline.html desde docs/hairline/teleprompter.js
	cd docs/hairline && node $(HAIRLINE)/build.mjs teleprompter.js && cp hairline-teleprompter.html ../../public/hairline.html

hairline-look:   ## Valida la figura y saca su hoja de revisión
	cd docs/hairline && node $(HAIRLINE)/look.mjs teleprompter.js --answer 40,44,10 --edge 105,62,10
