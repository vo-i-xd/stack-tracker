  const start = document.querySelector("#start");
  const pause = document.querySelector("#pause");
  const reset = document.querySelector("#reset");

  const sec = document.querySelector("#second");
  const min = document.querySelector("#minute");
  const hour = document.querySelector("#hour");
  
  let countDown;
  let setFlow = true; //countDown = true //countUp = false;
  
  let startTime = 0;
  let elapsedTime = 0;
  let paused = true;
  let intervalId;

function updateTime(){

    elapsedTime = Date.now() - startTime;
    countDown = setFlow ?  sumDown - elapsedTime : elapsedTime;//it gonna be a if, else statement later because we need the graph
    
    if(countDown < 0){
         paused = true;
         clearInterval(intervalId);
         window.alert("it's over");
        
        //countDown = Math.abs(countDown); we can work on that later put a - in front of the timer make it red, and bigerr
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
            }
          }
          intervalId = setInterval(updateTime, 1000);
      }
          start.style = "display: none;"
          pause.style = "display: flex;"
          reset.style = "display: flex;"
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