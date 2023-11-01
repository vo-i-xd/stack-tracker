
const clockDisplay = document.querySelector("#ClockDisplay");
const startButton = document.querySelector("#startButton");
const playButton = document.querySelector('.button--play');
const webPageTitle = document.querySelector(".web-page-title");

const projectsPageName = "stack time tracker";
const oneMinute = 1000*60;

startButton.addEventListener('click', () => timer.pomodoroOnOff());

const timer = {
  intervalId: null,
  startTime: 0,
  elapsedTime: 0,
  countDown: 0,
  sumDown: 0,
  paused: true,
  pomodoro: true,
  pomodoroLength: 30,
  minutsToUpdade: 1,

  pad: function(unit) {
    return (("0") + unit).length > 2 ? unit : "0" + unit;
  },


  updateTime: function () {
    this.elapsedTime = (Math.floor((Date.now() - this.startTime) / 1000)) * 1000;
    console.log()

    this.countDown = this.pomodoro ? this.sumDown - this.elapsedTime : this.elapsedTime;


    if(this.elapsedTime%(this.minutsToUpdade * oneMinute) === 0) console.log("1min passed");




    if (this.countDown <= 0) this.stop();

    const sec = this.pad(Math.floor((this.countDown / 1000) % 60));
    const min = this.pad(Math.floor((this.countDown / (1000 * 60)) % 60));
    const hour = this.pad(Math.floor((this.countDown / (1000 * 60 * 60)) % 60));

    const innerTimer = `${this.pad(hour)}:${this.pad(min)}:${this.pad(sec)}`;

    clockDisplay.innerText = innerTimer;
    const tabText = `${innerTimer} | ${projectsPageName}`;
    webPageTitle.innerText = tabText;
  },

  stop: function() {
    this.paused = true;
    this.startTime = 0;
    this.elapsedTime = 0;
    this.countDown = Math.abs(this.countDown);
    clearInterval(this.intervalId);
    alert("it's over");
  },


  start: function () {
    this.paused = false;

    this.startTime = this.elapsedTime && this.pomodoro === false ? Date.now() - this.elapsedTime : Date.now();
    this.elapsedTime = this.elapsedTime || 0;
    this.sumDown = this.sumDown - this.elapsedTime || this.pomodoroLength * oneMinute;
    this.intervalId = setInterval(() => this.updateTime(), 1000);
  },


  pomodoroOnOff: function() {

    if (this.paused) {
      this.paused = false;      
      playButton.classList.add('button--active');
      this.start();

    } else {

      console.log(this.elapsedTime);
      this.paused = true;
      clearInterval(this.intervalId);
      playButton.classList.remove('button--active');
    }
  }
}