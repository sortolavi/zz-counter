import React from 'react';
import CounterDisplay from './CounterDisplay';
import './Counter.css';



class Counter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      timerBtn: null,
      timerBtnVal: 0,
      timerTime: 0
    };
  }


  startTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: true });
    
    const audioElem = document.querySelector(`audio`);
    
    this.timer = setInterval(() => {

      const newTime = this.state.timerTime - 1000;

      if (newTime >= 0) {
        this.setState({ timerTime: newTime });
      }
      else {
        clearInterval(this.timer);
        audioElem.currentTime = 0;
        audioElem.play();
        this.setState({ timerOn: false });
      }
      
    }, 1000);
  }


  eventHandler = (e) => {
    let time;
    
    // restore previous button original value after double click when another button is active
    const { timerBtn } = this.state;
    if(timerBtn){
      timerBtn.childNodes[0].data = timerBtn.dataset.val;
    }

    if(e.target.minutes) {
      e.preventDefault();
      time = parseInt(e.target.minutes.value);
      e.target.reset();
    }
    else {
      time = e.target.dataset.val;
      time = (e.type === 'dblclick') ? 2 * time : time;
      // time = e.shiftKey ? 2 * time : time;
    }

    if(!isNaN(time) && time <= 60) {
      this.setState({ timerTime: time * 1000 * 60, timerBtn: e.target, timerBtnVal: time });
      this.startTimer();
    }
  }

  render() {

    const { timerTime, timerOn, timerBtn, timerBtnVal } = this.state;

    // set button showing correct value also when double clicking
    if(timerBtn){
      timerBtn.childNodes[0].data = timerBtnVal;
    }
    
    let visState = 'visible';

    return (
      <div className="timer">
        <div className="timer__controls" style={{visibility: visState}}>
          <button onDoubleClick={this.eventHandler} onClick={this.eventHandler} data-val='5'>5</button>
          <button onDoubleClick={this.eventHandler} onClick={this.eventHandler} data-val='7'>7</button>
          <button onDoubleClick={this.eventHandler} onClick={this.eventHandler} data-val='10'>10</button>
          <button onDoubleClick={this.eventHandler} onClick={this.eventHandler} data-val='15'>15</button>
          <button onDoubleClick={this.eventHandler} onClick={this.eventHandler} data-val='20'>20</button>
          <button onDoubleClick={this.eventHandler} onClick={this.eventHandler} data-val='30'>30</button>
          {/* <form name="customForm" id="custom" onSubmit={this.eventHandler}>
            <input type="text" name="minutes" placeholder="or enter minutes"/>
          </form> */}
        </div>
  
        <CounterDisplay time={timerTime} />
        <audio src="sound/ride.wav"></audio>
  
      </div>
    );
  }
  
}

export default Counter;
