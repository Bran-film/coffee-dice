import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Dice.module.css";

const options = [
  "Cold Brew",
  "French Press",
  "V60",
  "Switch",
  "AeroPress",
  "Espresso",
];

function Dice() {
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    let timer;
    if (spinning) {
      const randomIndex = Math.floor(Math.random() * options.length);
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
        {options.map((option, index) => (
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
