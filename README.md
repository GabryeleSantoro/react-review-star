# @gabryelesantoro/react-review-star

A small, accessible star rating component for React. It uses inline SVG (no icon font or extra icon packages), so your bundle stays lean.

Published on the **public npm registry** and on **GitHub Packages** (same version).

### Automated releases (maintainers)

Pushing or merging into **`main`** runs [semantic-release](https://semantic-release.gitbook.io/) in GitHub Actions. A **new tag and npm version are created only if** there is at least one **releasable** commit since the last tag, in [Conventional Commits](https://www.conventionalcommits.org/) form:

| Commit type | Release |
| --- | --- |
| `feat:` | minor bump |
| `fix:`, `perf:`, `revert:` | patch bump |
| `feat!:` or `BREAKING CHANGE:` | major bump |
| `chore:`, `docs:`, `test:`, … | **no** new version |

So a merge from `dev` → `main` **does nothing** if every commit on `dev` since the last tag was only `chore:` / `docs:` / etc. **Squash merges** only keep one commit: that commit’s message must be releasable (e.g. `feat: add stars`). Ensure the repo has a valid **`NPM_TOKEN`** secret for publishing.

If a push did not start the workflow, open **Actions → Release → Run workflow**. For failures, open the run log; common causes are missing `NPM_TOKEN` or no `feat`/`fix`/… commits in range.

**The job can be green but publish nothing.** Expand **Run semantic-release** and search for `There are no relevant changes` — that means no new semver and no npm tarball (no `feat`/`fix`/`perf`/`revert` since the last tag). The workflow also prints a **warning** in that case.

**Publishing to npm** requires either:

- Repository secret **`NPM_TOKEN`**: create an [npm automation token](https://docs.npmjs.com/about-access-tokens) and add it under **Settings → Secrets and variables → Actions**, or  
- **Trusted publishing (OIDC)** on npm linked to this GitHub repo (then `NPM_TOKEN` can be empty; `id-token: write` is already set in the workflow).

Without one of these, `npm publish` will fail or never run a real release.

**If the workflow fails early** (red ❌) with **`EINVALIDNPMTOKEN`**, **`401 Unauthorized`** on `npm whoami`, or **`OIDC token exchange … package not found`**, the problem is **npm authentication**, not your commit message. semantic-release stops **before** it evaluates `feat:`/`fix:`. Fix it by either:

1. **Automation token (classic)** on [npmjs.com](https://www.npmjs.com/) → Access Tokens → **Granular** or **Automation**, with permission to **write** the package `@gabryelesantoro/react-review-star`, then set repo secret **`NPM_TOKEN`** to that token value, or  
2. **[Trusted publishing](https://docs.npmjs.com/trusted-publishers)** for that package on npm (connect this GitHub repo). Until the package exists on npm and OIDC is linked, you will see `404` on OIDC and must use (1).

Until npm auth succeeds, you will **not** get a new tag or version, regardless of conventional commits.

#### Perché dopo il merge su `main` non vedo tag né pacchetto npm (IT)

Ci sono **due casi diversi**:

1. **Workflow verde** ma nessun tag/npm: nel log compare *«There are no relevant changes»* — non ci sono commit `feat:`/`fix:`/… dall’ultimo tag (non è un problema di autenticazione).

2. **Workflow rosso** con `Invalid npm token` / `401` / `OIDC … package not found`: **npm non è configurato** (token `NPM_TOKEN` mancante o non valido, oppure Trusted Publishing non collegato). semantic-release **si ferma prima** di guardare i commit: anche un `fix:` corretto **non** genera versione finché non risolvi l’auth su npm.

Serve almeno un commit in stile **Conventional Commits** dopo l’ultimo tag (`feat:`, `fix:`, `perf:`, `revert:` o breaking). Se mergi solo `chore:`, `docs:`, `ci:` ecc., **non** viene creata alcuna release.

- **Merge con squash:** conta **solo** il messaggio del commit di squash (deve essere tipo `feat: ...`). I singoli commit su `dev` non restano nella storia.
- **Merge classico (no squash):** conta la **serie di commit** portati su `main` (di solito quelli fatti su `dev`), non il messaggio tipo *Merge branch 'dev'…*. Servono `feat:` / `fix:` / … **dopo l’ultimo tag** in quella storia.

Dopo ogni run, apri il **Job summary** in alto nel job (o il log **Run semantic-release**) per l’esito chiaro.

## Installation

**From npm (default):**

```bash
npm install @gabryelesantoro/react-review-star
```

**From GitHub Packages** (configure scope + registry, then install as usual):

```bash
# one-time per project / machine — use a PAT with read:packages if the repo is private
echo "@gabryelesantoro:registry=https://npm.pkg.github.com" >> .npmrc
```

```bash
npm install @gabryelesantoro/react-review-star
```

Requires **React 17+** as a peer dependency.

## Usage

```jsx
import React from 'react';
import { Stars } from '@gabryelesantoro/react-review-star';

function App() {
  const [value, setValue] = React.useState(4);

  return (
    <div>
      <Stars value={value} onValueChange={setValue} />
    </div>
  );
}

export default App;
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | — | Current rating from **0** to **5** (steps of **0.5**). Out-of-range values are clamped. |
| `color` | `string` | `#ffc308` | Fill color for active segments. |
| `onValueChange` | `(value: number) => void` | — | Called when the user picks a new rating. |
| `size` | `'lg' \| '2x' \| '3x' \| '4x' \| '5x'` | `'2x'` | Visual size of each star. |
| `gap` | `number \| string` | — | Space between icons: number = **px**, string = any CSS length (e.g. `"0.5rem"`). Sets `--stars-gap`. |
| `icon` | `StarIconOptions` | — | Customize SVG shape, stroke, empty color, and half-star clip (see below). |
| `className` | `string` | — | Optional class on the wrapper. |
| `aria-label` | `string` | `'Rating'` | Label for the rating group (accessibility). |

### `icon` options (`StarIconOptions`)

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `path` | `string` | built-in star | SVG path `d` (outline + fill use the same path). |
| `viewBox` | `string` | `"0 0 20 20"` | Must match the coordinate system of `path`. |
| `strokeWidth` | `number` | `1.25` | Outline stroke width in SVG units (empty / half outline). |
| `emptyColor` | `string` | — | Color for unfilled outline; sets `--stars-track`. |
| `halfWidthFraction` | `number` | `0.5` | Width fraction used for the half-filled clip (left side), between **0.02** and **1**. |

The package exports **`DEFAULT_STAR_PATH`** and **`DEFAULT_STAR_VIEW_BOX`** so you can copy the default geometry or wrap it in your own assets.

```jsx
import { Stars, DEFAULT_STAR_PATH, DEFAULT_STAR_VIEW_BOX } from '@gabryelesantoro/react-review-star';

<Stars
  value={value}
  onValueChange={setValue}
  color="#e11d48"
  gap={10}
  icon={{
    path: DEFAULT_STAR_PATH,
    viewBox: DEFAULT_STAR_VIEW_BOX,
    strokeWidth: 1.5,
    emptyColor: '#cbd5e1',
    halfWidthFraction: 0.5,
  }}
/>
```

### Interaction

- Click a star to set that whole-star value.
- Click again on the same star when it is full to set a half-star for that position.
- Click again when it is half to move to the next state (first star: half clears to 0).

## Styling

The root element has the class `stars`. Useful CSS variables:

- **`--stars-fill`** — from the `color` prop (active fill).
- **`--stars-track`** — empty outline; default `#b0b8c4`, or set via `icon.emptyColor`.
- **`--stars-gap`** — spacing between icons; default `0.2em`, or set via the `gap` prop.

Remember to import the stylesheet: `import '@gabryelesantoro/react-review-star/dist/index.css'`.
