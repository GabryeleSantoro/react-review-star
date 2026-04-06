# @gabryelesantoro/react-review-star

A small, accessible star rating component for React. It uses inline SVG (no icon font or extra icon packages), so your bundle stays lean.

Published on the **public npm registry** and on **GitHub Packages** (same version).

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
