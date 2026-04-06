# react-review-star

A small, accessible star rating component for React. It uses inline SVG (no icon font or extra icon packages), so your bundle stays lean.

## Installation

```bash
npm install react-review-star
```

Requires **React 17+** as a peer dependency.

## Usage

```jsx
import React from 'react';
import { Stars } from 'react-review-star';

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
| `className` | `string` | — | Optional class on the wrapper. |
| `aria-label` | `string` | `'Rating'` | Label for the rating group (accessibility). |

### Interaction

- Click a star to set that whole-star value.
- Click again on the same star when it is full to set a half-star for that position.
- Click again when it is half to move to the next state (first star: half clears to 0).

## Styling

The root element has the class `stars`. Star color is driven by a CSS variable `--stars-fill` set from the `color` prop.
