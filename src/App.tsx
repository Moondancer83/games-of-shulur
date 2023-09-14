import React from 'react';
import './App.css';
import Arena from "./components/Arena";
import {BasicSetup} from "./config/BasicSetup";

function App() {
  return (
    <div className="App">
      <Arena config={BasicSetup} />
    </div>
  );
}

export default App;
