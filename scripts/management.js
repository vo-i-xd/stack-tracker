import { displayProject } from "./display.js";
import { form_submit } from "./form.js";

const options_button = document.querySelector("#options-button");
const options_button_label = document.querySelector(".options-button-label")

//main projects
const main_inner_projects = document.querySelector(".main-inner-projects");

//form
const form = document.querySelector("#new-todo-form");
const form_options = document.querySelector(".form-options");
const project_options_task_stacks = document.querySelector(".form-task-stacks");

//toglle main
const project_header_tempo_total_container = document.querySelector(".project-header-tempo-container");
const project_header_tasks_container = document.querySelector(".project-header-tasks-container");
const project_header_tempo_total_toggle = document.querySelector(".project-header-tempo");
const project_header_tasks_toggle = document.querySelector(".project-header-tasks");

const project_display_tasks_container = document.querySelector(".project-display-tasks-container");

const project_tasks_div = document.querySelector(".project-display-container")
const form_tasks_options = document.querySelector(".form-tasks-options");

//sidebar toggle
const sidebar_title = document.querySelector(".inner-sidebar-title");
const sidebar = document.querySelector("#sidebar");

//display tasks toglle 
const project_display_close_button = document.querySelector(".project-close");

const project_display_button_tasks_options = document.querySelector(".input-button-tasks-tag-options");
const project_display_button_tasks_options_label = document.querySelector(".input-button-tasks-tag-options-label");

const project_display_header_tempo_total_container = document.querySelector(".project-display-header-tempo-container")
const project_display_header_tasks_container = document.querySelector(".project-display-header-tasks-container");
const project_display_header_tempo_total_toggle = document.querySelector(".project-display-header-tempo");
const project_display_header_tasks_toggle = document.querySelector(".project-display-header-tasks");



export let projects;
window.addEventListener("load", () => {
  projects = JSON.parse(localStorage.getItem("projects")) || [];
  console.log(typeof projects);

  displayProject(projects);


  form.addEventListener("submit", e => {
    e.preventDefault(); 
    form_submit(e);
  })
});





//toggles:
sidebar_title.addEventListener("click", ()=>{
sidebar.classList.toggle("open");
});

options_button.addEventListener("click", ()=>{
    form_options.classList.toggle("close");

    onClickOutside(form_options, options_button_label, ()=>{
    form_options.classList.add("close");
    })
});

project_display_button_tasks_options.addEventListener("click", (e)=>{
    form_tasks_options.classList.toggle("close");

    onClickOutside(form_tasks_options, project_display_button_tasks_options_label,  ()=>{
    form_tasks_options.classList.add("close");
});

});

project_display_close_button.addEventListener("click", ()=>{

    project_options_task_stacks.innerHTML = "";
    project_display_tasks_container.innerHTML = "";
    main_inner_projects.classList.add("active");
    project_tasks_div.classList.remove("active");
    tab_cleanner();
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

project_display_header_tempo_total_toggle.addEventListener("click", ()=>{

    project_display_header_tempo_total_container.classList.remove("hide");
    project_display_header_tasks_container.classList.add("hide");
    project_display_header_tempo_total_toggle.classList.add("selected");
    project_display_header_tasks_toggle.classList.remove("selected");
 });
project_display_header_tasks_toggle.addEventListener("click", ()=>{
    project_display_header_tempo_total_container.classList.add("hide");
    project_display_header_tasks_container.classList.remove("hide");
    project_display_header_tempo_total_toggle.classList.remove("selected");
    project_display_header_tasks_toggle.classList.add("selected");
});











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