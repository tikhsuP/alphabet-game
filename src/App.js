import { useState, useEffect, useRef } from "react";
import "./App.css";
import Timer from "./Timer";

const App = () => {
  const [randomAlphabet, setRandomAlphabet] = useState("");
  const [enteredString, setEnteredString] = useState("");

  const [milliSeconds, setMilliSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const timerOn = useRef(true);

  let displayText = randomAlphabet;
  let myBestTime = localStorage?.getItem?.("MY_BEST_TIME")
    ? localStorage?.getItem?.("MY_BEST_TIME")
    : Infinity;

  const myTimer = useRef(null);

  const getRandomAlphabet = () => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var charactersLength = characters.length;

    return (result += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    ));
  };

  const handleKeyPress = (event) => {
    const { key } = event;

    if (key?.length === 1 && key?.match(/[a-z]/i) && key === randomAlphabet) {
      setEnteredString(`${enteredString}${key}`);
    } else setMilliSeconds((prevMilliSeconds) => prevMilliSeconds + 500);
  };

  const convertToMilliSeconds = (
    minutes = 0,
    seconds = 0,
    milliSeconds = 0
  ) => {
    return minutes * 60000 + seconds * 1000 + milliSeconds;
  };

  useEffect(() => {
    setRandomAlphabet(getRandomAlphabet());
  }, [enteredString]);

  if (enteredString?.length === 1) {
    timerOn.current = false;
    const myTime = convertToMilliSeconds(minutes, seconds, milliSeconds);
    if (myTime < myBestTime) {
      console.log("here 1");
      displayText = "Success";
      localStorage?.setItem?.("MY_BEST_TIME", myTime);
    }
    // else {
    //   console.log("here 2", myTime, myBestTime);

    //   displayText = "Failure";
    // }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Type The Alphabet</h1>
        <p>Typing game to see how fast you type. Timer starts when you do :)</p>
      </header>

      <div className="alphabet-container">
        <h1 className="alphabet">{displayText}</h1>
      </div>

      <div className="app-header">
        <Timer
          milliSeconds={milliSeconds}
          setMilliSeconds={setMilliSeconds}
          seconds={seconds}
          setSeconds={setSeconds}
          minutes={minutes}
          setMinutes={setMinutes}
          timerOn={timerOn}
          myTimer={myTimer}
        />
        <p>My best time:</p>
      </div>

      <form className="footer-form">
        <input
          className="app-input"
          placeholder="Type here"
          onKeyPress={handleKeyPress}
        />
        <input className="reset-button" type="submit" value="Reset" />
      </form>
    </div>
  );
};

export default App;
