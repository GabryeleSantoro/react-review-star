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

| Prop Name | Values | Default |
|:---------:|:------:|:-------:|
