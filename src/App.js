import React, { useState } from "react";
import "./App.css";
import Dice from "./components/Dice";
import BrewMethodSelection from "./components/BrewMethodSelection";

function App() {
  const [selectedMethods, setSelectedMethods] = useState([]);

  return (
    <div className="App">
      <BrewMethodSelection
        selectedMethods={selectedMethods}
        setSelectedMethods={setSelectedMethods}
      />
      {selectedMethods.length >= 2 && <Dice options={selectedMethods} />}
    </div>
  );
}

export default App;
