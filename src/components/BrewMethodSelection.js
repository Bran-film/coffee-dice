import React, { useState, useEffect } from "react";
import styles from "./BrewMethodSelection.module.css";

const initialMethods = [
  "Aeropress",
  "Chemex",
  "Cold Brew",
  "French Press",
  "Hario Switch",
  "Kalita Wave",
  "Moka Pot",
  "Portafilter",
  "Syphon",
  "Turkish Coffee",
  "V60",
];

function BrewMethodSelection({ selectedMethods, setSelectedMethods }) {
  const [allMethods, setAllMethods] = useState(initialMethods);
  const [customMethod, setCustomMethod] = useState("");
  const [error, setError] = useState(null);

  // Save selectedMethods to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedMethods", JSON.stringify(selectedMethods));
  }, [selectedMethods]);

  // Load selectedMethods from localStorage when component mounts
  useEffect(() => {
    const loadedMethods = localStorage.getItem("selectedMethods");
    if (loadedMethods) {
      setSelectedMethods(JSON.parse(loadedMethods));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      // Add the custom method to the selected methods
      toggleMethod(customMethod);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // If a custom method is entered, add it
    if (customMethod) {
      addCustomMethod();
    }

    // Then check if enough methods are selected
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
          className={styles.customMethodInput}
        />
        <button type="submit" className={styles.submitButton}>
          Add
        </button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}

export default BrewMethodSelection;
