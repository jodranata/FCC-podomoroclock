import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { BREAKTYPE, INCREMENT, DECREMENT } from '../constant';

const Breaks = ({ min, handleSetTime, isPlayed, isPaused }) => {
  return (
    <div className="setting-container" id="break-setting">
      <button
        type="button"
        onClick={() => {
          handleSetTime(BREAKTYPE, INCREMENT);
        }}
        className="setting-button"
        id="break-increment"
        disabled={isPaused || isPlayed || min === 60}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
      <div className="label">
        <span id="break-label">break</span>
        <span className="setting-time" id="break-length">
          {min}
        </span>
        <span>Length</span>
      </div>
      <button
        type="button"
        onClick={() => {
          handleSetTime(BREAKTYPE, DECREMENT);
        }}
        className="setting-button"
        id="break-decrement"
        disabled={isPaused || isPlayed || min === 1}
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
    </div>
  );
};

export default Breaks;
