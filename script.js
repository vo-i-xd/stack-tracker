  const timer = document.querySelector(".timer");
  const jk = document.querySelector(".jk");
  //const progressIndicator = querySelector(".progressIndicator");

  const start = document.querySelector("#start");
  const pause = document.querySelector("#pause");
  const reset = document.querySelector("#reset");

  const sec = document.querySelector("#second");
  const min = document.querySelector("#minute");
  const hour = document.querySelector("#hour");

  const semicircleOne = document.querySelector(".semicircle:nth-child(1)");
  const semicircleTwo = document.querySelector(".semicircle:nth-child(2)");
  const semicircleThree = document.querySelector(".semicircle:nth-child(3)");

  const holder = document.querySelector(".holder")

  let semigreen =0;
  let samired = 0;

  let countDown;
  let setFlow = true; //countDown = true //countUp = false;
  let toggleTimer = false; // false no toggle yet;
  
  let startTime = 0;
  let elapsedTime = 0;
  let paused = true;
  let intervalId;
  let angle = 0;


function updateTime(){

elapsedTime = (Math.floor( (Date.now() - startTime) / 1000) )*1000;

if(setFlow){         

//   if(countDown < 15*1000){
// sec.style = "color:  rgb(211, 73, 73); font-size: 2.7em;";
// min.style = "color:  rgb(211, 73, 73); font-size: 2.rem;";
// hour.style = "color:  rgb(211, 73, 73); font-size: 2.rem;";
// holder.style = "text-shadow: 0 0 20px rgb(68, 0, 255);";
//   }            

countDown =  sumDown - elapsedTime;
angle =Math.floor((elapsedTime/sumDown)*360);
}
else{                                


countDown =  elapsedTime;
angle = (Math.floor((elapsedTime/100))*3.6)/36;


}
console.log("\n\nstart:angle: " + angle);
console.log("\ncountDown: " + countDown);




 if( angle > 180 && angle<=360){
   semicircleThree.style = "display: none;";
   semicircleOne.style = `transform: rotate(180deg);`;
   semicircleTwo.style = `transform: rotate(${angle}deg);`;
 }
 else if(angle<360){

   semicircleThree.style = " display: block";
   semicircleOne.style = `transform: rotate(${angle}deg)`;
   semicircleTwo.style = `transform: rotate(${angle}deg)`;
 }
 else {

  semicircleOne.style = `transform: rotate(0deg); transition: 0s;`;
  semicircleTwo.style = `transform: rotate(0deg); transition: 0s;`;
  semicircleThree.style = "display: block;";
  console.log("test077");
 }

//  if( angle > 180){
//   semicircleThree.style.display = "none";
//   semicircleOne.style.transform = `rotate(180deg)`;
//   semicircleTwo.style.transform = `rotate(${angle}deg)`;
// }
// else{          //decrescent
//   semicircleThree.display = "block";
//   semicircleOne.style.transform = `rotate(${angle}deg)`;
//   semicircleTwo.style.transform = `rotate(${angle}deg)`;
// }





if(countDown <= 0){//stop interval

  paused = true;
  clearInterval(intervalId);


  startTime = 0;
  elapsedTime = 0;
  currentTime = 0;


setInterval(()=>{  

start.style = "display: flex;"
pause.style = "display: none;"
reset.style = "display: none;"}, 1000);


  pause.innerHTML ="pause";

  sec.value = "00";
  hour.value = "00";
  min.value = "00";

sec.style = "color: #fff ; font-size: 2.7em;";
min.style = "color: #fff ; font-size: 2.7em;";
hour.style = "color:#fff; font-size: 2.7em;";

 // window.alert("it's over");
 //countDown = Math.abs(countDown); we can work on that later put a - in front of the timer make it red, and bigger
 // and save that elapsed time when reache 0
}

    sec.value = pad(Math.floor((countDown / 1000) % 60));
    min.value = pad(Math.floor((countDown / (1000 * 60)) % 60));
    hour.value = pad(Math.floor((countDown / (1000 * 60 * 60)) % 60));

    function pad(unit){
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}

  start.addEventListener("click", () => {

    

      if(paused){
          paused = false;
          startTime = Date.now();

          if(setFlow){
            if(sec.value == 0 && min.value == 0 && hour.value == 0){
            sumDown = 30*1000*60;  
            }
            else{
            sumDown = (sec.value*1000) + (min.value*1000*60) + (hour.value*1000*60*60);
            }}

          intervalId = setInterval(updateTime, 1000);
      }

          start.style = "display: none;"
          pause.style = "display: flex;"
          reset.style = "display: flex;"
          sec.style = "color: rgb(111, 0, 255); font-size: 2.7em;";
          min.style = "color: rgb(111, 0, 255); font-size: 2.7em;";
          hour.style = "color:rgb(111, 0, 255); font-size: 2.7em;";
          semicircleThree.style.display = "block";
          semicircleOne.style.transform = `rotate(0deg)`;
          semicircleTwo.style.transform = `rotate(0deg)`;
  });

  pause.addEventListener("click", () => {

    

      if(!paused){
        pause.innerHTML ="keep";
        paused = true;
        clearInterval(intervalId);
      }
      else{
          pause.innerHTML ="pause";
          paused = false;
          startTime = Date.now() - elapsedTime;
          intervalId = setInterval(updateTime, 1000);
          }

  });

  reset.addEventListener("click", () => {
      paused = true;
      clearInterval(intervalId);

      startTime = 0;
      elapsedTime = 0;
      currentTime = 0;

      start.style = "display: flex;"
      pause.style = "display: none;"
      reset.style = "display: none;"
      sec.style = "color:  rgb(255, 255, 255);";
      min.style = "color:  rgb(255, 255, 255);";
      hour.style = "color:  rgb(255, 255, 255);";
      pause.innerHTML ="pause";
      sec.value = "00";
      hour.value = "00";
      min.value = "00";

  });




  function validDigits(text){
    return text.replace(/^(?!([0-5]?[0-9]|60)$).*$/, "");
  }

[sec, min, hour].forEach((el) => {
    el.addEventListener("input", (e) => {
      const updatedValue = validDigits(e.target.value);

      e.target.value = updatedValue;
    });
  });
////                                \\\..> > > new < < <..///


timer.addEventListener("dblclick", ()=>{



if(!toggleTimer){
  toggleTimer = true;
  timer.id = "littleTimer";
}
else{
  toggleTimer = false;
  timer.removeAttribute('id')  ;
  
  //timer.id = "bygod";
  console.log("heyy");
}








  });

  // header.classList.remove('open');
  // noScrool.classList.remove('no_scrool');