import { projectCreator, tabCleanner, updateHeader} from "./display.js";
import { formSubmit } from "./form.js";
//import { fetchData } from "./httpsRequests.js";
// import { dates } from './management';wtf

const optionsButton = document.querySelector("#options-button");
const optionsButtonLabel = document.querySelector(".options-button-label");

// Main projects
const mainInnerProjects = document.querySelector(".main-inner-projects");

// Form
const form = document.querySelector("#new-todo-form");

// Form display-task
const projectOptionsTaskStacks = document.querySelector(".form-task-stacks");

// Toggle main
const projectHeaderTempoTotalContainer = document.querySelector(".project-header-tempo-container");
const projectHeaderTasksContainer = document.querySelector(".project-header-tasks-container");
const projectHeaderTempoTotalToggle = document.querySelector(".project-header-tempo");
const projectHeaderTasksToggle = document.querySelector(".project-header-tasks");

const projectPageTasksContainer = document.querySelector(".project-page-tasks-container");

const projectTasksDiv = document.querySelector(".project-page-container");

// Sidebar toggle
const sidebarTitle = document.querySelector(".inner-sidebar-title");
const sidebar = document.querySelector("#sidebar");

// Display tasks toggle
const projectPageCloseButton = document.querySelector(".project-close");

const projectPageButtonTasksOptions = document.querySelector(".input-button-tasks-tag-options");
const projectPageButtonTasksOptionsLabel = document.querySelector(".input-button-tasks-tag-options-label");

const formOptions = document.querySelector(".form-options");
const formTasksOptions = document.querySelector(".form-tasks-options");

const projectPageHeaderTempoTotalContainer = document.querySelector(".project-page-header-tempo-container");
const projectPageHeaderTasksContainer = document.querySelector(".project-page-header-tasks-container");
const projectPageHeaderTempoTotalToggle = document.querySelector(".project-page-header-tempo");
const projectPageHeaderTasksToggle = document.querySelector(".project-page-header-tasks");




let now = new Date();
let startDay = new Date().setHours(0,0,0,0);
let timePassedSinceStart = new Date() - startDay;

let dateOfMonth = now.getDate();

let dayOfWeek = now.getDay();
let startOfWeek = new Date(now);//creates a copy of the now date object so it does not afect the original one
startOfWeek.setDate(dateOfMonth - dayOfWeek)
startOfWeek.setHours(0,0,0,0);



function datesUpdate() {
    now = new Date();
    startDay = new Date();
    startDay.setHours(0,0,0,0);
    timePassedSinceStart = new Date() - startDay;

    dateOfMonth = now.getDate();

    dayOfWeek = now.getDay();
    startOfWeek = new Date(now);
    startOfWeek.setDate(dateOfMonth - dayOfWeek);
    startOfWeek.setHours(0,0,0,0);
    console.log("7");
};

export const dates = {

    update: datesUpdate,

    startDay: startDay,

    startOfWeek: startOfWeek,

    dayOfWeek: dayOfWeek,
    
    dateOfMonth: dateOfMonth,
    
    timePassedSinceStart: timePassedSinceStart,
}















// window.addEventListener('beforeunload', (event) => {
//     event.preventDefault();
//     event.returnValue = '';
// });




export let projects;
window.addEventListener("load", () => {
    projects = JSON.parse(localStorage.getItem("projects")) || [];


    form.addEventListener("submit", e => {
        e.preventDefault();
        formSubmit(e);
    });
    projectCreator.display(projects);


});


// Toggles:
sidebarTitle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

closeOnClickOutside(optionsButton, formOptions, optionsButtonLabel, "close");
closeOnClickOutside(projectPageButtonTasksOptions, formTasksOptions, projectPageButtonTasksOptionsLabel, "close");

projectPageCloseButton.addEventListener("click", () => {
projectOptionsTaskStacks.innerHTML = "";
projectPageTasksContainer.innerHTML = "";
mainInnerProjects.classList.add("active");
projectTasksDiv.classList.remove("active");
tabCleanner()
});

toggleTempoTask(
    projectHeaderTempoTotalToggle,
    projectHeaderTempoTotalContainer,
    projectHeaderTasksContainer,
    projectHeaderTasksToggle );

toggleTempoTask( 
    projectHeaderTasksToggle,
    projectHeaderTasksContainer,
    projectHeaderTempoTotalContainer,
    projectHeaderTempoTotalToggle );

toggleTempoTask(
    projectPageHeaderTempoTotalToggle,
    projectPageHeaderTempoTotalContainer,
    projectPageHeaderTasksContainer,
    projectPageHeaderTasksToggle );

toggleTempoTask (
    projectPageHeaderTasksToggle,
    projectPageHeaderTasksContainer,
    projectPageHeaderTempoTotalContainer,
    projectPageHeaderTempoTotalToggle );


function toggleTempoTask (button, buttonContainer, otherContainer, otherButton){

    button.addEventListener("click", ()=>{
        buttonContainer.classList.remove("hide");
        otherContainer.classList.add("hide");
    
        otherButton.classList.remove("selected");
        button.classList.add("selected");
    })
};




const onClickOutside = (e, popUp, label, cb, listener) => {


    let targetElement = e.target;

    if (label.contains(targetElement)) return; 
    if (!popUp.contains(targetElement)){
        cb();
        document.removeEventListener("click", listener);
        isOnClickOutsideTrigged = false;
        return;
    };
};

let isOnClickOutsideTrigged = false;

const clickListener = (popUp, label, cb) => {

    if(!isOnClickOutsideTrigged){
        const listener = (e) => onClickOutside(e, popUp, label, cb, listener);//passing a funtion as an argument of the own funtion really don't thought that that was going to work
        document.addEventListener('click', listener);
        isOnClickOutsideTrigged = true;
    }
};


export function closeOnClickOutside(button, popUp, label, toggle ){

    button.addEventListener("click", ()=>{

        popUp.classList.toggle(toggle);
        clickListener(popUp, label, ()=> popUp.classList.toggle(toggle));
    });
    };