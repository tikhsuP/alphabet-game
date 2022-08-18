import React, { useState, useEffect } from "react";

const Timer = (props) => {
  const {
    milliSeconds = 0,
    setMilliSeconds = null,
    seconds = 0,
    setSeconds = null,
    minutes = 0,
    setMinutes = null,
    myTimer = null,
    timerOn = { current: true },
  } = props;

  // Similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    if (timerOn.current) {
      myTimer.current = setInterval(() => {
        setMilliSeconds((prevMilliSeconds) => prevMilliSeconds + 1);
        if (milliSeconds > 999) {
          setMilliSeconds(0);
          setSeconds((prevSeconds) => prevSeconds + 1);
        }
        if (seconds > 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          setSeconds(0);
        }
      }, 1);
    } else clearInterval(myTimer.current);

    return () => clearInterval(myTimer.current);
  });

  const min = minutes < 10 ? `0${minutes}` : minutes;
  const sec = seconds < 10 ? `0${seconds}` : seconds;
  let milSec;

  if (milliSeconds < 10) {
    milSec = `00${milliSeconds}`;
  } else if (milliSeconds < 100) {
    milSec = `0${milliSeconds}`;
  } else milSec = milliSeconds;

  return (
    <div>
      Time: {min} m {sec}.{milSec} s
    </div>
  );
};

export default Timer;
