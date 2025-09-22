const MStoSEC = 100;
const SECtoMIN = 60;
const MINtoHR = 60;

class Stopwatch {
  constructor() {
    this.id = null;
    this.startTime = null;
    this.cs = 0;
    this.sec = 0;
    this.min = 0;
    this.hr = 0;
  }

  start(app) {
    this.startTime = new Date().getTime();

    this.id = setInterval(() => {
      let elapsedTime = new Date().getTime() - this.startTime;
      this.cs += 1;

      if (this.cs > 0 && this.cs % MStoSEC === 0) {
        this.sec += 1;
        this.cs = 0;
      }

      if (this.sec > 0 && this.sec % SECtoMIN === 0) {
        this.min += 1;
        this.sec = 0;
      }

      if (this.min > 0 && this.min % MINtoHR === 0) {
        this.hr += 1;
        this.min = 0;
      }

      app.renderStopwatch(this.cs, this.sec, this.min, this.hr);
    }, 10);
  }

  calculateTimes(ms) {
    
    this.sec = 
  }

  stop() {
    clearInterval(this.id);
    this.id = null;
  }

  reset(app) {
    clearInterval(this.id);
    this.id = null;
    this.cs = 0;
    this.sec = 0;
    this.min = 0;
    this.hr = 0;

    app.renderStopwatch(this.cs, this.sec, this.min, this.hr);
  }

  formatTime(time) {
    return time < 10 ? `0${time}` : String(time);
  }
}

class App {
  constructor() {
    this.stopwatch = new Stopwatch();

    this.hrSpan = document.querySelector('#hours');
    this.minSpan = document.querySelector('#minutes');
    this.secSpan = document.querySelector('#seconds');
    this.csSpan = document.querySelector('#centiseconds');

    this.startStopBttn = document.querySelector('#start-stop');
    this.resetBttn = document.querySelector('#reset');

    this.startStopBttn.addEventListener('click', this.handleStartStopClick.bind(this));
    this.resetBttn.addEventListener('click', this.handleResetClick.bind(this));
  }

  renderStopwatch(cs, sec, min, hr) {
    this.csSpan.innerText = this.stopwatch.formatTime(cs);
    this.secSpan.innerText = this.stopwatch.formatTime(sec);
    this.minSpan.innerText = this.stopwatch.formatTime(min);
    this.hrSpan.innerText = this.stopwatch.formatTime(hr);
  }

  handleStartStopClick() {
    if (this.startStopBttn.innerText === 'Start') {
      this.stopwatch.start(this);
      this.startStopBttn.innerText = 'Stop';
    } else {
      this.stopwatch.stop();
      this.startStopBttn.innerText = 'Start';
    }
  }

  handleResetClick() {
    this.stopwatch.reset(this);
    this.startStopBttn.innerText = 'Start';
  }
}


document.addEventListener('DOMContentLoaded', () => {
  new App();
});