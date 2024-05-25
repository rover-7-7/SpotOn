import { useState, useEffect } from "react";

const Timedisplay = () => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        const newSeconds = prevTime.seconds + 1;
        const newMinutes = prevTime.minutes + Math.floor(newSeconds / 60);
        const newHours = prevTime.hours + Math.floor(newMinutes / 60);
        return {
          hours: newHours % 24,
          minutes: newMinutes % 60,
          seconds: newSeconds % 60,
        };
      });
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const formatTimeUnit = (unit) => {
    return unit < 10 ? `0${unit}` : unit;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.counter}>
        {formatTimeUnit(time.hours)}:{formatTimeUnit(time.minutes)}:
        {formatTimeUnit(time.seconds)}
      </h1>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "10vh",

    color: "white",
    fontFamily: "'Poppins', sans-serif",
  },
  counter: {
    fontSize: "2rem",
  },
};
export default Timedisplay;
