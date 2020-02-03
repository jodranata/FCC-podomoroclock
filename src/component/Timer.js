import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons';
import { SESSIONTYPE, PAUSED, STOPPED } from '../constant';

const Timer = ({
  seconds,
  timerType,
  startTimer,
  stopOrPauseTimer,
  isPlayed,
  isPaused,
}) => {
  const timerHeader =
    timerType === SESSIONTYPE ? "Let's sweat!" : 'Rest for a bit';

  const displayTimes = sec => {
    const minutes = Math.floor(sec / 60);
    const remainderSeconds = sec % 60;
    const display = `${minutes < 10 ? '0' : ''}${minutes}  ${
      remainderSeconds < 10 ? '0' : ''
    }${remainderSeconds}`;
    return display;
  };

  const timeRun = displayTimes(seconds);

  return (
    <>
      <p id="timer-label">{timerHeader}</p>
      <p id="time-left">{timeRun}</p>
      <div className="timer-buttons">
        <button
          type="button"
          onClick={startTimer}
          disabled={isPlayed && !isPaused}
          className="timer-button"
          id="start_stop"
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button
          type="button"
          onClick={() => stopOrPauseTimer(PAUSED)}
          disabled={isPaused || !isPlayed}
          className="timer-button"
          id="pause"
        >
          <FontAwesomeIcon icon={faPause} />
        </button>
        <button
          type="button"
          onClick={() => stopOrPauseTimer(STOPPED)}
          className="timer-button"
          id="reset"
        >
          <FontAwesomeIcon icon={faStop} />
        </button>
      </div>
    </>
  );
};

export default Timer;
