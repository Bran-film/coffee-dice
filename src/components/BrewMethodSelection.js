import React, { useState } from "react";
import styles from "./BrewMethodSelection.module.css";

const initialMethods = [
  "V60",
  "Hario Switch",
  "French Press",
  "Aeropress",
  "Delter Press",
  "Chemex",
  "Kalita Wave",
  "Moka Pot",
  "Clever Dripper",
  "Syphon",
  "Percolator",
  "Melitta",
  "Bonavita",
  "Blue Bottle Dripper",
  "Turkish Coffee",
  "Timemore",
  "Espresso",
  "Cold Brew",
  "Gina",
  "Kono",
  "Origami",
  "Cafelat",
  "Orea",
  "Fellow Stagg",
  "Moccamaster",
];

function BrewMethodSelection({ selectedMethods, setSelectedMethods }) {
  const [allMethods, setAllMethods] = useState(initialMethods);
  const [customMethod, setCustomMethod] = useState("");
  const [error, setError] = useState(null);

  const toggleMethod = (method) => {
    if (selectedMethods.includes(method)) {
      setSelectedMethods(selectedMethods.filter((m) => m !== method));
    } else if (selectedMethods.length < 6) {
      setSelectedMethods([...selectedMethods, method]);
    }
  };

  const handleCustomMethodChange = (event) => {
    setCustomMethod(event.target.value);
  };

  const addCustomMethod = () => {
    if (customMethod && !allMethods.includes(customMethod)) {
      setAllMethods([...allMethods, customMethod]);
      setCustomMethod("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedMethods.length < 2) {
      setError("Please select at least 2 methods");
      return;
    }
    setError(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Coffee Dice</h1>
      <p className={styles.introText}>
        Choose your brew methods, roll the dice, and enjoy your coffee!
      </p>
      <form onSubmit={handleSubmit} className={styles.options}>
        {allMethods.map((method) => (
          <label key={method} className={styles.option}>
            <input
              type="checkbox"
              id={method}
              checked={selectedMethods.includes(method)}
              onChange={() => toggleMethod(method)}
            />
            {method}
          </label>
        ))}
        <input
          type="text"
          value={customMethod}
          onChange={handleCustomMethodChange}
          placeholder="Add your custom method..."
        />
        <button type="button" onClick={addCustomMethod}>
          Add Custom Method
        </button>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default BrewMethodSelection;
