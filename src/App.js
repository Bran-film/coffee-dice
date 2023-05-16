import React, { useState } from "react";
import "./App.css";
import Dice from "./components/Dice";
import BrewMethodSelection from "./components/BrewMethodSelection";

function App() {
  const [selectedMethods, setSelectedMethods] = useState([]);

  return (
    <div className="App">
      <h1>Welcome to the Coffee Dice!</h1>
      <p>
        This application will help you decide which coffee brewing method to
        use. Simply select your available brewing methods and roll the dice! You
        need to select at least two methods. Enjoy your coffee!
      </p>
      <BrewMethodSelection
        selectedMethods={selectedMethods}
        setSelectedMethods={setSelectedMethods}
      />
      {selectedMethods.length >= 2 && <Dice options={selectedMethods} />}
    </div>
  );
}

export default App;
