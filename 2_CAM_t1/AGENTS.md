# AGENTS.md — 2_CAM_t1 (Vite-CAM, CAM1)

Part 2 of the Leipzig chain `1_start → 2_CAM_t1 → 3_between → 4_CAM_t2 → 5_final`.
Study rules (content, Sie-Form, privacy, Delta-CAM) live in [`../AGENTS.md`](../AGENTS.md)
and [`../_briefing/`](../_briefing/) and take precedence over this file.
Session schema and flow: [`../studienablauf.md`](../studienablauf.md).

## Role of this part
- Free CAM around the central concept `klimaneutrale Regionalentwicklung`
  (centre; `isDraggable=false`, `isDeletable=false`, `isTextChangeable=false`).
- On save: write `CAM_t1` + `meanValence_t1`, `nNodes_t1`, `nConnectors_t1` into
  `jatos.studySessionData` (merge, keep `teilnehmer_code` / consent),
  `submitResultData(cam)`, then `startNextComponent()`.
- Node/connector UUIDs (`store.cam.nodes[i].id`, `store.cam.connectors[i].id`)
  must be serialized unchanged — `4_CAM_t2` restores them for Delta-CAM.

## Sister app `4_CAM_t2`
- Same codebase. Change shared code in **both** folders.
- Intended differences only: `config/defaultCAM.js`, `CAMproject` in
  `config/configfile.js`, `index.html` (title, start dialog), `src/js/backend/Elements.js`
  (connector import), `src/js/frontend/buttons/participant/saveButton.js` (`_t1`/`_t2` keys),
  `src/js/services/jatosStub.js`, `package.json` name.
- Check: `diff -rq 2_CAM_t1 4_CAM_t2 -x node_modules -x dist`.

## Commands
- `npm install`
- `npm run dev` — local, JATOS stub (empty session).
- `npm run build:jatos` — `dist/` for JATOS upload (`vite.config.js` injects `jatos.js`).
- `npm run build` / `npm run preview` — plain build without JATOS.
- No lint, format or test scripts. Never edit `dist/` or `node_modules/` (git-ignored).

## store.cam (no global CAM)
- State lives in `src/js/app/store.js`; there is no `window.CAM` and no `store.CAM`.
- Always read `store.cam` (do not cache it); `setCam()` replaces the object.
  `store.cam === null` until `initApp()` has run.
- Mutate via existing methods / `updateUi`, `updateEnv`, `updateFlags`.
- Dev console (only `npm run dev`):
  `const { store } = await import("/src/js/app/store.js");`

## Structure
- `index.html` — entry, jQuery UI dialog markup (`#dialogStart` etc.), loads `src/js/app/main.js`.
- `src/js/app` — bootstrap (`init.js`: config → URL params → `Elements` → language → UI), `store.js`, `vendor.js`.
- `src/js/backend` — CAM data model (`Elements.js`, `nodeCAM.js`, `connectorCAM.js`), start CAM loading.
- `src/js/frontend` — drawing, event listeners, dialogs, buttons (`buttons/participant`, `buttons/researcher`).
- `src/js/processing` — pre/postprocessing, URL feature params.
- `src/js/services` — `jatosAdapter.js` (`getJatos()`, `isJatosBuild`) and `jatosStub.js`.
- `config/configfile.js` — study settings between the `MAKE CHANGES` markers; `config/defaultCAM.js` — start CAM;
  `config/languages/` — UI strings (`store.language`).
- `public/img` — node/connector icons and logo.

## JATOS and data
- Access JATOS only via `getJatos()`; it returns the stub outside `--mode jatos`.
- `defaultFlags`: `usingJATOS: true`, `usingSupabase: false`. Keep Supabase off — it is a legacy
  path that fetches config from an external URL (`?link=`) and would break the no-external-requests rule.
- `ShowResearcherButtons: false` for participant builds. Note: the URL param
  `?ShowResearcherButtons=true` can re-enable them (`featureStudies(URLparams).js`); don't use it in study links.
- Paradata modules (`paradata_focus*.js`) stay inactive (no `fullScreen` / defocus tracking).
- Config values still open (`MinNumNodes`, `enableArrows`, …): see `../toDos.md`; change only on request and mirror in `4_CAM_t2`.

## Code conventions
- ESM with explicit `.js` extensions, relative paths, no aliases.
- Vendors (`$`, `toastr`, `cytoscape`, `uuidv4`, `Base64`) only via `src/js/app/vendor.js`.
- 4 spaces, double quotes, semicolons, trailing commas; function declarations + export list at file end.
- User-facing text in German (Sie-Form) via language files where possible; hints via `toastr`,
  technical errors via `console.error` with context. No personal data in logs.
- Keep dialog IDs in `index.html` and `window.*` handlers used by inline `onclick` stable.
- Small, local changes; no reformatting of unrelated code.
