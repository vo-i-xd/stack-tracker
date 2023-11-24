import { projects } from "./management.js";

const clockDisplay = document.querySelector("#ClockDisplay");
const sidebarStartButton = document.querySelector("#startButton");
const sidebarPlayButton = document.querySelector('.button--play');
const webPageTitle = document.querySelector(".web-page-title");

const projectsPageName = "stack time tracker";
const oneMinute = 1000*60;

sidebarStartButton.addEventListener('click', () => timer.pomodoroOnOff(sidebarPlayButton));

let lastProject;
let lastTask;
let lastTaskName;
let lastPlayButton;
let activetaskLabel;


const pad = (unit) => {
  return (("0") + unit).length > 2 ? unit : "0" + unit;
}

export const ToHrMin = (ms, pHr=false, pMin=false, PSec=false )=>{
  const sec = PSec?
  pad(Math.floor(ms/1000 %60)) :
  "";

  const min = pMin?
  pad(Math.floor(ms/(1000 * 60)%60)) +
  (sec?":":"") :
  "";

  const hr = pHr?
  pad(Math.floor( ms/(1000 * 60 * 60))) + 
  (min?":":"") :
  "";

  return  `${hr}${min}${sec}`;
};

export const autoActiveTaskClock = ()=>{

  const isInPage = document.querySelector(`.${activetaskLabel}`);

  if(!isInPage) return;  

  lastPlayButton = isInPage.querySelector('.button--play');

  if(!timer.paused) lastPlayButton.classList.add('button--active');
};



export const timer = {
  intervalId: null,
  startTime: 0,
  elapsedTime: 0,
  countDown: 0,
  sumDown: 0,
  paused: true,
  pomodoro: true,
  pomodoroLength: 30,
  minutsToUpdade: 1,

  updateTime: function (task, project) {
    this.elapsedTime = (Math.floor((Date.now() - this.startTime) / 1000)) * 1000;
    console.log()

    this.countDown = this.pomodoro ? this.sumDown - this.elapsedTime : this.elapsedTime;

    if(this.elapsedTime%(this.minutsToUpdade * oneMinute) === 0) {

     const minutsToPush = this.minutsToUpdade *oneMinute;


      task.timeLog.push({
        time: minutsToPush,
        createAt: new Date().getTime()
        });



      // task.spentTime += this.minutsToUpdade * oneMinute;
      // project.spentTime += this.minutsToUpdade * oneMinute;
      console.log(project.spentTime);

      localStorage.setItem("projects", JSON.stringify(projects));
      console.log(task);
    }


    if (this.countDown <= 0) this.stop();

    const innerTimer = ToHrMin(this.countDown, true, true, true);


    clockDisplay.innerText = innerTimer;
    const tabText = `${innerTimer} | ${projectsPageName}`;
    webPageTitle.innerText = tabText;
  },

  stop: function() {
    this.paused = true;
    this.startTime = 0;
    this.elapsedTime = 0;
    this.countDown = Math.abs(this.countDown);
  },

  start: function (task, project) {
    this.paused = false;

    this.startTime = this.elapsedTime && this.pomodoro === false ? Date.now() - this.elapsedTime : Date.now();
    this.elapsedTime = this.elapsedTime || 0;
    this.sumDown = this.sumDown - this.elapsedTime || this.pomodoroLength * oneMinute;
    this.intervalId = setInterval(() => this.updateTime(task, project), 1000);
  },

  pomodoroOnOff: function(playButton, task, taskName, project){
    

sidebarPlayButton.classList.contains("button--active");


const activetask = document.querySelectorAll(".button--active")[1];

if(!this.paused && activetask !== playButton && playButton !== sidebarPlayButton){
  //make a funtion here called taskchanger
    if(activetask) activetask.classList.remove('button--active');  
    playButton.classList.add('button--active');

    clearInterval(this.intervalId);
    this.start(task, project);
    activetaskLabel = taskName;
    lastPlayButton = playButton;
    lastProject = project;
    lastTask = task;
    lastTaskName = taskName;
    return;
  };

  if(sidebarPlayButton === playButton){
  playButton = lastPlayButton;
  project = lastProject;
  task = lastTask;
  taskName = lastTaskName;
  };


    if (this.paused) {
      this.paused = false;
      playButton.classList.add('button--active');
      sidebarPlayButton.classList.add('button--active');
      this.start(task, project);
      
    } else {
      this.paused = true;
      clearInterval(this.intervalId);
      if(activetask) activetask.classList.remove('button--active');
      sidebarPlayButton.classList.remove('button--active');
    }

    activetaskLabel = taskName;
    lastPlayButton = playButton;
    lastProject = project;
    lastTask = task;
    lastTaskName = taskName;
  }
}