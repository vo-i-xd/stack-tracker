import { task_form_submit } from "./form.js";



const main_projects_container = document.querySelector("#projects-container");
const main_inner_projects = document.querySelector(".main-inner-projects");

//sidebar
const sidebar_projects_container = document.querySelector(".sidebar-projects-container");

//project display
const project_tasks_div = document.querySelector(".project-display-container");

//header
const project_display_title = document.querySelector(".project-display-tittle");
const project_display_hours = document.querySelector(".project-display-hours-concluidas");
const project_display_tasks_concluidas = document.querySelector(".project-display-tasks-concluidas");
const project_display_hours_estimadas = document.querySelector(".project-display-hours-stimadas");
const project_display_tasks_estimadas = document.querySelector(".project-display-tasks-pendentes");
//form
const form_tasks = document.querySelector("#project-display-add-task");
const project_options_task_stacks = document.querySelector(".form-task-stacks");

const project_display_tasks_container = document.querySelector(".project-display-tasks-container");

const icons = {
    0: "./icons/javascript.svg",
    1: "./icons/typescript.svg",
    2: "./icons/react.svg",
    3: "./icons/angular.svg",
    4: "./icons/vue-js.svg",
    5: "./icons/tailwindcss.svg",
    6: "./icons/springboot.svg",
    7: "./icons/nodejs.svg",
    8: "./icons/mongodb.svg",
    9: "./icons/python.svg",
    10: "./icons/c.svg",
    11: "./icons/c++.svg"
};


export const displayProject = (projects) => {

    main_projects_container.innerHTML ="";
    sidebar_projects_container.innerHTML = "";
    
    projects.forEach(project => {
        
    const container = document.createElement("div");
    container.classList.add("project");

    const project_title_div = document.createElement("div");
    const project_title_span = document.createElement("span");
    const project_title_h4 = document.createElement("h4");

    const project_priority_Div = document.createElement("div");
    const project_priority_span = document.createElement("span");
    const project_priority_p = document.createElement("p");

    const project_stacks_div = document.createElement("div");
    const project_stacks_img = document.createElement("img");


    project_title_div.classList.add("project-tittle");
    project_title_span.classList.add("fa-solid", "fa-folder");
    project_title_h4.innerHTML = project.name;

    project_priority_Div.classList.add("project-priority");
    if(project.priority != ""){
        project_priority_Div.classList.add(project.priority);
        project_priority_span.classList.add(project.priority);
        project_priority_p.innerHTML = project.priority;
    }

    project_stacks_div.classList.add("project-stacks");

    project_title_div.appendChild(project_title_span);
    project_title_div.appendChild(project_title_h4);
    container.appendChild(project_title_div);

    project_priority_Div.appendChild(project_priority_span);
    project_priority_Div.appendChild(project_priority_p);
    container.appendChild(project_priority_Div);

    for(let i=0; i<project.stacks.length; i++){

        if(project.stacks[i] == true){
          let project_stacks_img_clone = project_stacks_img.cloneNode(true);
            project_stacks_div.appendChild(project_stacks_img_clone);
            //Note that if you need to append the same element multiple times, you need to clone it using cloneNode(true), as the appendChild() and append() methods move the actual node rather than making a copy
            project_stacks_img_clone.setAttribute('src', icons[i]);
            project_stacks_img_clone.setAttribute('alt', icons[i]);
        }
   }
                   //givin actions to the projects
    project_action(container, project);

displaySidebarProject(projects);
container.appendChild(project_stacks_div);
main_projects_container.appendChild(container);

});
};

const displaySidebarProject = (projects) => {
    sidebar_projects_container.innerHTML = "";

    projects.forEach(project => {

    const sidebar_project_container = document.createElement("div");
    const sidebar_project_span = document.createElement("span");
    const sidebar_project_h4 = document.createElement("h4");
    const sidebar_project_priority_span = document.createElement("span");

    if(project.priority != ""){
        sidebar_project_priority_span.classList.add(project.priority);
    }
    sidebar_project_container.classList.add("project");
    sidebar_project_container.setAttribute("data-switcher", "");
    sidebar_project_container.setAttribute("data-tab", "project-display-container");
    
    sidebar_project_span.classList.add("fa-solid", "fa-folder");
    sidebar_project_h4.innerHTML = project.name;

    sidebar_project_container.appendChild(sidebar_project_span);
    sidebar_project_container.appendChild(sidebar_project_h4);
    sidebar_project_container.appendChild(sidebar_project_priority_span);

   //givin actions to the projects
    project_action(sidebar_project_container, project);

sidebar_projects_container.appendChild(sidebar_project_container);
});
tab_switchers();
}

const display_tasks = (task, project) =>{
    const task_container = document.createElement("div");
    task_container.classList.add("task");


    const project_task_checkbox_div = document.createElement("div");
    const project_task_checkbox = document.createElement("input");
    const project_task_checkbox_label = document.createElement("label");


    const project_task_title_div = document.createElement("div");
    const project_task_title_h4 = document.createElement("h4");

    const project_task_spent_hours_Div = document.createElement("div");
    const project_task_spent_hours_span = document.createElement("span");
   
    const project_task_stacks_div = document.createElement("div");
    const project_task_stacks_img = document.createElement("img");


    project_task_checkbox_div.classList.add("task-checkbox-container")
    project_task_checkbox.classList.add("task-checkbox");
    
    project_task_checkbox.id = `task-checkbox-${task.name}`;
    project_task_checkbox.setAttribute("name", "task-checkbox");
    project_task_checkbox.setAttribute("type", "checkbox");
    project_task_checkbox_label.setAttribute("for", `task-checkbox-${task.name}`);

    


    project_task_title_div.classList.add("task-tittle");
    project_task_title_h4.innerHTML = task.name;

    project_task_spent_hours_Div.classList.add("task-spent-hours-div");
    project_task_spent_hours_span.classList.add("task-spent-hours");
    project_task_spent_hours_span.innerHTML = "99";

    project_task_stacks_div.classList.add("project-display-task-stacks");

    

    project_task_checkbox_div.appendChild(project_task_checkbox);
    project_task_checkbox_div.appendChild(project_task_checkbox_label);


    project_task_title_div.appendChild(project_task_title_h4);

    project_task_spent_hours_Div.appendChild(project_task_spent_hours_span);
    for(let i=0; i<project.stacks.length; i++){
        if(task.stacks[i] == true){
           let project_task_stacks_img_clone = project_task_stacks_img.cloneNode(true);
            project_task_stacks_div.appendChild(project_task_stacks_img_clone);
            project_task_stacks_img_clone.setAttribute('src', icons[i]);
            project_task_stacks_img_clone.setAttribute('alt', icons[i]);
        }
  }

task_container.appendChild(project_task_checkbox_div);
task_container.appendChild(project_task_title_div);
task_container.appendChild(project_task_spent_hours_Div);
task_container.appendChild(project_task_stacks_div);
project_display_tasks_container.appendChild(task_container);
};

const display_tasks_stacks_options = (project)=>{

    const project_stacks_img = document.createElement("img");
    const project_tasks_stacks_label = document.createElement("label");
    const project_tasks_stacks_input = document.createElement("input");

    project_tasks_stacks_input.setAttribute( "type","checkbox");
    project_tasks_stacks_input.setAttribute( "name","stack");
    project_stacks_img.classList.add("icon");

    for(let i=0; i<project.stacks.length; i++){
        if(project.stacks[i] == true){
           let project_tasks_stacks_label_clone = project_tasks_stacks_label.cloneNode(true);
           let project_tasks_stacks_input_clone = project_tasks_stacks_input.cloneNode(true);              
           let project_stacks_img_clone = project_stacks_img.cloneNode(true);

           //when you use appendChild() or append() to add an element to the DOM, it doesn't create a new copy of the element. Instead, it moves the actual node. So, if you're trying to add 
           //the same element multiple times inside a loop, you'll end up moving the same node over and over, effectively overwriting the previous position of the node.
            project_tasks_stacks_label_clone.appendChild(project_tasks_stacks_input_clone);
            project_tasks_stacks_label_clone.appendChild(project_stacks_img_clone);

            project_stacks_img_clone.setAttribute('src', icons[i]);
            project_stacks_img_clone.setAttribute('alt', icons[i]);
            project_options_task_stacks.appendChild(project_tasks_stacks_label_clone);
        }
   }
}


const project_action = (e, project) =>{ 

    e.addEventListener("click", ()=>{
        project_options_task_stacks.innerHTML = "";
        project_display_tasks_container.innerHTML = "";

        project_display_title.innerHTML = project.name;
        project_display_hours.innerHTML = "777";//n tenho ainda kkk;
        project_display_tasks_concluidas.innerHTML = "996";
        project_display_hours_estimadas.innerHTML = "1000";
        project_display_tasks_estimadas.innerHTML = "1";

        display_tasks_stacks_options(project);

        project.tasks.forEach(task =>{
        display_tasks(task, project);
    });

        form_tasks.addEventListener("submit", e =>{
        e.preventDefault();
        task_form_submit(e, project);
        
        project_display_tasks_container.innerHTML = "";
        
         project.tasks.forEach(task =>{
         display_tasks(task, project);
         });
       });

     main_inner_projects.classList.remove("active");
     project_tasks_div.classList.add("active");
    });
}



const tab_switchers = ()=>{
    const data_switchers = document.querySelectorAll("[data-switcher]");

    data_switchers.forEach((switcher) => {
        switcher.addEventListener("click", (e) => {
            tab_cleanner();

            let targetElement = e.target; // clicked element


            console.log("targetElement: ",targetElement);


                if (!targetElement.matches("[data-switcher]")) {
                    targetElement = targetElement.parentElement;
                };
                
                let dataset_info = targetElement.dataset.tab;
                targetElement.classList.add("active-tab");

                SwitchPage(dataset_info);
//When you click on the li element, the click event is first triggered on the innermost element 
// that you clicked on. This could be the span, the h4, or the li itself if you clicked on an area 
// of the li that doesn't contain any other elements.

//  This is due to a concept in JavaScript called event bubbling. When an event happens on
//  an element, it first fires on that element, then bubbles up to its parent element, then its 
//  grandparent, and so on, until it reaches the top of the document. This means that if you click 
//  on the span, the click event will first fire on the span, then on the li, then on any other
//  parent elements.

// In your original code, you added an event listener to the li elements. However, when you 
// clicked on the span or h4, the event.target inside the event listener referred to the span or 
// h4, not the li. This is why the active-tab class was not being added to the li.
// The updated code I provided uses a while loop to handle this. When the click event fires, 
// it starts at the event.target (the element that was actually clicked) and checks if it has 
// the data-switcher attribute. If it doesn't, it moves up to the parent element and checks again.
// It continues this until it finds an element with the data-switcher attribute or it reaches the
// top of the document. Once it finds an element with the data-switcher attribute, it adds the
// active-tab class to that element.
            
        });
    });
};

function SwitchPage (dataset) {

    console.log("easy", dataset);

    if(document.querySelector('.page.active')){
        const current_page = document.querySelector('.page.active');
        current_page.classList.remove("active");
    }

    if(document.querySelector(`.page.${dataset}`)){
        const next_page = document.querySelector(`.page.${dataset}`);
        next_page.classList.add("active");
    }
};

const tab_cleanner = ()=>{
            const active_tab = document.querySelector(".active-tab");
            if (active_tab) {
                active_tab.classList.remove("active-tab");
}};