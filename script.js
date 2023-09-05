const body = document.querySelector("body");
const head = document.querySelector("head");

const holder = document.querySelector('div.holder');

const start = document.querySelector("#start");
const pause = document.querySelector("#pause");
const reset = document.querySelector('#reset');
const scale = document.querySelector("body::before");

const sec = document.querySelector("#second");
const min = document.querySelector("#minute");
const hour = document.querySelector("#hour");

const style = document.querySelector('style');
let height;

let compare;
let capareGreen;

let compareSec;
let compareMin;
let compareHour;

let intervalId = false;

const timer = () => {
     intervalId = setInterval(() => {
        if(+sec.value){
            sec.value--;
        }
//////graph part>>>>>>>>>>>>>>>>>>>>>
        compare = ( (+compareSec)  +  (+compareMin*60)  +  ((+compareHour*60)*60))
        capareGreen = ((+sec.value)  +  (+min.value*60)  +  ((+hour.value*60)*60));

        height = Math.abs((((capareGreen/compare)*100)-100));
        style.innerHTML = `
          body::before {
        
            background-color: green;
            height: ${height}vh ;
          }
        `;
//////graph part>>>>>>>>>>>>>>>>>>>>>

        if( sec.value<10 ){
            sec.value = "0" + sec.value;
        }

        if(sec.value == 0 ){
            if( min.value != 0){
                min.value--;
                sec.value = 60;

                if( min.value<10){
                    min.value = "0" + min.value;
                }
               }
               else{

            if( hour.value != 0){
                hour.value--;
                min.value = 60;
           }
           else{

            // do something when it's over///>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            clearInterval(intervalId);
           }

            if(hour.value<10){
                hour.value = "0" + hour.value;
            }
        }
    }
}, 1000);
};

function validDigits(text){
    return text.replace(/^(?!([0-5]?[0-9]|60)$).*$/, "");
  }

[sec, min, hour].forEach((el) => {
    el.addEventListener("input", (e) => {
      const updatedValue = validDigits(e.target.value);

      e.target.value = updatedValue;
    });
  });

start.addEventListener("click", () => {

start.style = "display: none;"
pause.style = "display: flex;"
reset.style = "display: flex;"

compareSec = +sec.value;
compareMin = +min.value;
compareHour = +hour.value;

if(sec.value == 0 && min.value == 0 && hour.value == 0){
   sec.value = "00";
   min.value = 30;
   hour.value = "00";
    
   compareSec = sec.value;
   compareMin = min.value;
   compareHour = hour.value;
   }

    if(!intervalId){
    timer();
    }
});

pause.addEventListener("click", ()=>{

if(!intervalId){
           
  timer();
  pause.innerHTML ="pause";
}
else{
        
    clearInterval(intervalId);
    intervalId = false;
    pause.innerHTML ="keep";
    }
})

reset.addEventListener("click", () => {

    start.style = "display: flex;"
    pause.style = "display: none;"
    reset.style = "display: none;"
    
    height = 100;
    style.innerHTML = `
    body::before {
  
    background-color: green;
    height: ${height}vh ;
    }
  `;
    pause.innerHTML ="pause";
       sec.value = "00";
       min.value = "00";
       hour.value = "00";

       clearInterval(intervalId);
       intervalId = false;
});