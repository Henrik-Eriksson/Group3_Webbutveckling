import React, { useState } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import Hello from './compenents/hello.jsx'

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App"> {/* Apply CSS class */}
      <Hello />
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default App;