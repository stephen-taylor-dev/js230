class Stopwatch {
  constructor() {
    this.startTime = null;
    this.pauseTime = null;
    this.cs = 0;
    this.sec = 0;
    this.min = 0;
    this.hr = 0;
  }

  tick() {
    // Initialze start time for fresh stopwatch
    if (!this.startTime) {
      this.startTime = new Date().getTime();
    }

    // Recalibrate start time if stopwatch was paused
    if (this.pauseTime) {
      this.calibrateForPausedTime();
    }

    // Calculate elapsed time
    this.calculateTimeIntervals();
  }

  state() {
    return [this.cs, this.sec, this.min, this.hr];
  }

  calibrateForPausedTime() {
    let timePaused = new Date().getTime() - this.pauseTime;
    this.startTime += timePaused;
    this.pauseTime = null;
  }

  calculateTimeIntervals() {
    let elapsedMs = new Date().getTime() - this.startTime;
    this.cs = Math.floor(elapsedMs / 10 % 100);
    this.sec = Math.floor(elapsedMs / 1000 % 60);
    this.min = Math.floor(elapsedMs / 60000 % 60);
    this.hr = Math.floor(elapsedMs / 3600000);
  }

  pause() {
    this.pauseTime = new Date().getTime();
  }

  reset() {
    this.startTime = null;
    this.pauseTime = null;
    this.cs = 0;
    this.sec = 0;
    this.min = 0;
    this.hr = 0;
  }
}

class App {
  constructor() {
    this.stopwatch = new Stopwatch();
    this.isRunning = false;
    this.intervalId = null;

    this.hrSpan = document.querySelector('#hours');
    this.minSpan = document.querySelector('#minutes');
    this.secSpan = document.querySelector('#seconds');
    this.csSpan = document.querySelector('#centiseconds');

    this.toggleBttn = document.querySelector('#toggle');
    this.resetBttn = document.querySelector('#reset');

    this.toggleBttn.addEventListener('click', this.handletoggleClick.bind(this));
    this.resetBttn.addEventListener('click', this.handleResetClick.bind(this));
  }

  renderStopwatch() {
    let [cs, sec, min, hr] = this.stopwatch.state();

    this.csSpan.innerText = this.formatTime(cs);
    this.secSpan.innerText = this.formatTime(sec);
    this.minSpan.innerText = this.formatTime(min);
    this.hrSpan.innerText = this.formatTime(hr);
  }

  handletoggleClick() {
    if (!this.isRunning) {
      this.isRunning = true;

      this.intervalId = setInterval(() => {
        this.stopwatch.tick();
        this.renderStopwatch();
      }, 10);

      this.toggleBttn.innerText = 'Stop';
    } else {
      this.isRunning = false;
      clearInterval(this.intervalId);

      this.intervalId = null;
      this.stopwatch.pause();

      this.toggleBttn.innerText = 'Start';
    }
  }

  handleResetClick() {
    this.isRunning = false;
    clearInterval(this.intervalId);

    this.intervalId = null;
    this.stopwatch.reset();
    this.renderStopwatch();

    this.toggleBttn.innerText = 'Start';
  }

  formatTime(time) {
    return time < 10 ? `0${time}` : String(time);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  new App();
});