import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Dice.module.css";

function Dice({ options }) {
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    let timer;
    if (spinning) {
      const randomIndex = Math.floor(Math.random() * 6); // Always generate a number between 0 and 5
      const randomX = Math.floor(Math.random() * 4) * 90;
      const randomY = Math.floor(Math.random() * 4) * 360;
      timer = setTimeout(() => {
        setResult({ index: randomIndex, rotation: { x: randomX, y: randomY } });
        setSpinning(false);
      }, 4050);
    }
    return () => clearTimeout(timer);
  }, [spinning]);

  const spinDice = () => {
    setSpinning(true);
  };

  // Create an array of 6 elements, filled with the selected methods and "ROLL AGAIN!" if necessary
  const diceSides = [
    ...options,
    ...Array(6 - options.length).fill("ROLL AGAIN!"),
  ];

  return (
    <div className={styles.container}>
      <div
        className={`${styles.dice}${spinning ? ` ${styles.rolling}` : ""}`}
        style={
          result
            ? {
                transform: `rotateX(${result.rotation.x}deg) rotateY(${result.rotation.y}deg)`,
              }
            : {}
        }
      >
        {diceSides.map((option, index) => (
          <div
            key={index}
            className={`${styles.face} ${styles[`face-${index + 1}`]}`}
            aria-label={option}
          >
            <span>{option}</span>
          </div>
        ))}
      </div>
      <button
        className={styles.roll}
        onClick={spinDice}
        disabled={spinning}
        aria-disabled={spinning}
      >
        Roll Dice
      </button>
    </div>
  );
}

Dice.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
};

export default Dice;
