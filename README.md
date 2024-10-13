# react-review-star

This is a simple component to show a rating by using stars. The package is available for React.

## Installation

Install the package using 
```bash
npm install react-review-star
```

#Requirements

This package requires the installation of some FontAwesome libraries.

```bash
npm install @fortawesome/react-fontawesom @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons
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

| Prop Name      | Values                      | Default  | Description                                                                                          |
|:--------------:|:---------------------------|:--------:|:-----------------------------------------------------------------------------------------------------|
| **Value**      | numbers                    | 0        | The value to display with the stars. Must be between 0 and 5. Floating point values are allowed.    |
| **Color**      | string                     | #FFC308  | The color of the stars.                                                                              |
| **onValueChange** | function                | null     | A function to update the selected rating value.                                                      |
| **Size**       | string                     | '2x'     | The size of the stars. Default is '2x', with options: 'lg', '2x', '3x', '4x', '5x'.                |

