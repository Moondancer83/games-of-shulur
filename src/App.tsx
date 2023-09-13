import React from 'react';
import './App.css';
import CustomGrid from "./components/CustomGrid";

function App() {
  return (
    <div className="App">
      <CustomGrid radius={5} size={5} />
    </div>
  );
}

export default App;
