import { projectCreator, tabCleanner } from "./display.js";
import { form_submit } from "./form.js";
//import { fetchData } from "./httpsRequests.js";

const options_button = document.querySelector("#options-button");
const options_button_label = document.querySelector(".options-button-label")

//main projects
const main_inner_projects = document.querySelector(".main-inner-projects");

//form
const form = document.querySelector("#new-todo-form");


//form display-task
const project_options_task_stacks = document.querySelector(".form-task-stacks");

//toglle main
const project_header_tempo_total_container = document.querySelector(".project-header-tempo-container");
const project_header_tasks_container = document.querySelector(".project-header-tasks-container");
const project_header_tempo_total_toggle = document.querySelector(".project-header-tempo");
const project_header_tasks_toggle = document.querySelector(".project-header-tasks");

const project_page_tasks_container = document.querySelector(".project-page-tasks-container");

const project_tasks_div = document.querySelector(".project-page-container")


//sidebar toggle
const sidebar_title = document.querySelector(".inner-sidebar-title");
const sidebar = document.querySelector("#sidebar");

//display tasks toglle 
const project_page_close_button = document.querySelector(".project-close");

const projectPageTaskPopUp = document.querySelector(".task-pop-up");
const projectPageTaskEditButton = document.querySelector(".task-edit-button");
const projectPageTaskEditlabel = document.querySelector(".task-edit-label");

const project_page_button_tasks_options = document.querySelector(".input-button-tasks-tag-options");
const project_page_button_tasks_options_label = document.querySelector(".input-button-tasks-tag-options-label");

const form_options = document.querySelector(".form-options");
const form_tasks_options = document.querySelector(".form-tasks-options");







const project_page_header_tempo_total_container = document.querySelector(".project-page-header-tempo-container")
const project_page_header_tasks_container = document.querySelector(".project-page-header-tasks-container");
const project_page_header_tempo_total_toggle = document.querySelector(".project-page-header-tempo");
const project_page_header_tasks_toggle = document.querySelector(".project-page-header-tasks");




export let projects;
window.addEventListener("load", () => {
  projects = JSON.parse(localStorage.getItem("projects")) || [];
  console.log(typeof projects);

  
  //displayProject(projects);
  projectCreator.display(projects);
  //fetchData();

  form.addEventListener("submit", e => {
    e.preventDefault(); 
    form_submit(e);
  })
});




//toggles:
sidebar_title.addEventListener("click", ()=>{
sidebar.classList.toggle("open");
});







closeOnClickOutside(options_button, form_options, options_button_label);

closeOnClickOutside(projectPageTaskEditButton, projectPageTaskPopUp, projectPageTaskEditlabel);

closeOnClickOutside(project_page_button_tasks_options, form_tasks_options, project_page_button_tasks_options_label);






project_page_close_button.addEventListener("click", ()=>{

    project_options_task_stacks.innerHTML = "";
    project_page_tasks_container.innerHTML = "";
    main_inner_projects.classList.add("active");
    project_tasks_div.classList.remove("active");
    tabCleanner();
});

project_header_tempo_total_toggle.addEventListener("click", ()=>{
    project_header_tempo_total_container.classList.remove("hide");
    project_header_tasks_container.classList.add("hide");
    project_header_tempo_total_toggle.classList.add("selected");
    project_header_tasks_toggle.classList.remove("selected");
 });

project_header_tasks_toggle.addEventListener("click", ()=>{
    project_header_tempo_total_container.classList.add("hide");
    project_header_tasks_container.classList.remove("hide");
    project_header_tempo_total_toggle.classList.remove("selected");
    project_header_tasks_toggle.classList.add("selected");
});

project_page_header_tempo_total_toggle.addEventListener("click", ()=>{

    project_page_header_tempo_total_container.classList.remove("hide");
    project_page_header_tasks_container.classList.add("hide");
    project_page_header_tempo_total_toggle.classList.add("selected");
    project_page_header_tasks_toggle.classList.remove("selected");
 });
 
project_page_header_tasks_toggle.addEventListener("click", ()=>{
    project_page_header_tempo_total_container.classList.add("hide");
    project_page_header_tasks_container.classList.remove("hide");
    project_page_header_tempo_total_toggle.classList.remove("selected");
    project_page_header_tasks_toggle.classList.add("selected");
});






function closeOnClickOutside(button, popUp, label){
button.addEventListener("click", ()=>{
    popUp.classList.toggle("close");

    console.log("popUP",popUp);

    onClickOutside(popUp, label, ()=>{
    popUp.classList.add("close");

    })
});
}

const onClickOutside = (ele, prevent, cb) => {


        const listener = (e) => clickListener(e, ele, prevent, cb);
        document.addEventListener('click', listener);



const clickListener = (e, ele, prevent, cb) => {
    let targetElement = e.target;

    console.log(e.target);

    if (prevent.contains(targetElement)) return;
    
    if (!ele.contains(targetElement)){
        cb();
        document.removeEventListener("click", listener);
        return;
    };
};
};