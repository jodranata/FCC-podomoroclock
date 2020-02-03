/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect, useRef } from 'react';
import Breaks from './component/Breaks';
import Session from './component/Session';
import Timer from './component/Timer';
import { BREAKTYPE, SESSIONTYPE, INCREMENT, PAUSED, STOPPED } from './constant';
import './App.css';

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [timerType, setTimerType] = useState(SESSIONTYPE);
  const [timer, setTimer] = useState(1500);
  const [isPlayed, setIsPlayed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [countDown, setCountDown] = useState(null);

  const audioRef = useRef();

  const changeSetTimer = () => {
    if (timerType === SESSIONTYPE) setTimer(sessionTime * 60);
    if (timerType === BREAKTYPE) setTimer(breakTime * 60);
  };

  const handleSetTime = (type, operations) => {
    // if (isPaused || isPlayed) return;
    if (type === BREAKTYPE) {
      if (operations === INCREMENT) {
        setBreakTime(breakTime + 1);
      } else {
        setBreakTime(breakTime - 1);
      }
    } else if (operations === INCREMENT) {
      setSessionTime(sessionTime + 1);
    } else {
      setSessionTime(sessionTime - 1);
    }
  };

  const handlePlayAudio = audio => {
    audio.currentTime = 0;
    audio.play();
  };

  const handleCountDown = sec => {
    if (!isPlayed || isPaused) return;
    const now = Date.now();
    const then = now + sec * 1000;
    setCountDown(
      setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
          setTimer(
            timerType === SESSIONTYPE ? breakTime * 60 : sessionTime * 60,
          );
          setTimerType(timerType === SESSIONTYPE ? BREAKTYPE : SESSIONTYPE);
          clearInterval(countDown);
          return;
        }
        setTimer(secondsLeft);
      }, 1000),
    );
  };

  const startTimer = () => {
    setIsPlayed(true);
    setIsPaused(false);
  };

  const stopOrPauseTimer = action => {
    if (action === PAUSED) {
      setIsPaused(true);
    }
    if (action === STOPPED) {
      setBreakTime(5);
      setSessionTime(25);
      setTimerType(SESSIONTYPE);
      setTimer(1500);
      setIsPlayed(false);
      setIsPaused(false);
      setCountDown(null);
      clearInterval(countDown);
    }
  };

  useEffect(() => {
    changeSetTimer();
  }, [breakTime, sessionTime]);

  useEffect(() => {
    if (timer === 0 && audioRef.current !== null && isPlayed) {
      handlePlayAudio(audioRef.current);
    }
  }, [timer]);

  useEffect(() => {
    if (isPlayed) {
      clearInterval(countDown);
      handleCountDown(timer);
    } else {
      clearInterval(countDown);
    }
  }, [isPlayed, isPaused, timerType]);

  return (
    <div className="app-container">
      <header className="app-title">
        <h1>Podomoro Timer</h1>
      </header>
      <div className="app-content">
        <div className="app-timer-setting">
          <Breaks
            min={breakTime}
            handleSetTime={handleSetTime}
            isPlayed={isPlayed}
            isPaused={isPaused}
          />
          <Session
            min={sessionTime}
            handleSetTime={handleSetTime}
            isPlayed={isPlayed}
            isPaused={isPaused}
          />
        </div>
        <div className="app-timer-display">
          <Timer
            seconds={timer}
            timerType={timerType}
            startTimer={startTimer}
            stopOrPauseTimer={stopOrPauseTimer}
            isPlayed={isPlayed}
            isPaused={isPaused}
          />
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://goo.gl/65cBl1"
        ref={audioRef}
      />
    </div>
  );
}

export default App;
