import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { SESSIONTYPE, INCREMENT, DECREMENT } from '../constant';

const Session = ({ min, handleSetTime, isPlayed, isPaused }) => {
  return (
    <div className="setting-container" id="session-setting">
      <button
        type="button"
        className="setting-button"
        id="session-increment"
        onClick={() => {
          if (min >= 60) return;
          handleSetTime(SESSIONTYPE, INCREMENT);
        }}
        disabled={isPaused || isPlayed || min === 60}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
      <div className="label">
        <span id="break-label">session</span>
        <span className="setting-time" id="session-length">
          {min}
        </span>
        <span> Length</span>
      </div>
      <button
        type="button"
        className="setting-button"
        id="session-decrement"
        onClick={() => {
          handleSetTime(SESSIONTYPE, DECREMENT);
        }}
        disabled={isPaused || isPlayed || min === 1}
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
    </div>
  );
};

export default Session;
