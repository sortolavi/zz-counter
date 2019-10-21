import React from 'react';
import './CounterDisplay.css';

class CounterDisplay extends React.Component {

  render() {
    const time = this.props.time;
    const seconds = ("0" + time/1000 % 60).slice(-2);
    const minutes = ("0" + Math.floor(time/1000 / 60)).slice(-2);

    return (
      <div className="display">
        <h1 className="display__time-left">{minutes}:{seconds}</h1>
      </div>
    );
  }
  
}

export default CounterDisplay;
