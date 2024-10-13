# react-review-star

This is a simple component to show a rating by using stars. The package is available for React.

## Installation

Install the package using 
```bash
npm install react-review-star
```

## Usage

```Javascript

import React from 'react';
import { Stars } from 'react-review-star';

function App() {

  const [value,setValue] = React.useState(4);

  React.useEffect(() => {

    console.log('value ' + value);

  },[value]);

  return (
    <>
      <div>
            <Stars value={value} onValueChange={setValue} />
      </div>
    </>
  );
}

export default App;
```

## Props

| Prop Name | Values  | Default | Description |
|:---:|:---:|:---:||:---:|
| Value | numbers | 0 | The value to display with the stars must be between 0 and 5. The floating point is allowed. |
| Color | string | #FFC308 | The color of the stars |
| onValueChange | void | null | The function to update the value of the rating selected |
| size | string | '2x' | The default value is set to 2x, but other values are available: 'lg' '2x' '3x' '4x' '5x' |

