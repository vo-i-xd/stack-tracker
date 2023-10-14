const sidebar_title = document.querySelector(".inner-sidebar-title");
const sidebar = document.querySelector("#sidebar");

const form_header = document.querySelector(".form-header");
const tag_button = document.querySelector(".tag-button");
const tag_span = document.querySelector(".project-tag");

//main projects
const main_inner_projects = document.querySelector(".main-inner-projects");


//form
const form = document.querySelector("#new-todo-form");
const content = document.querySelector("#content");
const form_options = document.querySelector(".form-options");


//toglle main
const project_header_tempo_total_container = document.querySelector(".project-header-tempo-container");
const project_header_tasks_container = document.querySelector(".project-header-tasks-container");
const project_header_tempo_total_toggle = document.querySelector(".project-header-tempo");
const project_header_tasks_toggle = document.querySelector(".project-header-tasks");




//display projects
const main_projects_container = document.querySelector("#projects-container");
const sidebar_projects_container = document.querySelector(".sidebar-projects-container");


//display tasks
const project_display_title = document.querySelector(".project-display-tittle");

const project_display_hours = document.querySelector(".project-display-hours-concluidas");
const project_display_tasks_concluidas = document.querySelector(".project-display-tasks-concluidas");
const project_display_hours_estimadas = document.querySelector(".project-display-hours-stimadas");
const project_display_tasks_estimadas = document.querySelector(".project-display-tasks-pendentes");

const project_options_task_stacks = document.querySelector(".form-task-stacks");
const project_display_tasks_container = document.querySelector(".project-display-tasks-container");

const project_tasks_div = document.querySelector(".project-display-container")
const form_tasks = document.querySelector("#project-display-add-task");
const form_tasks_options = document.querySelector(".form-tasks-options");

//display tasks toglle 
const tag_span_tasks = document.querySelector(".tag-button-task-span");
//const tag_span_tasks = document.querySelector(".tag-task-span");

const project_display_header_tempo_total_container = document.querySelector(".project-display-header-tempo-container")
const project_display_header_tasks_container = document.querySelector(".project-display-header-tasks-container");
const project_display_header_tempo_total_toggle = document.querySelector(".project-display-header-tempo");
const project_display_header_tasks_toggle = document.querySelector(".project-display-header-tasks");

const project_display_close_button = document.querySelector(".project-close");

//alert
const alert = document.querySelector(".alert");
const alert_msg = document.querySelector(".alert-msg");

let arrayStacks = [];


//toglle/project-display

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
}


//toggles:
sidebar_title.addEventListener("click", ()=>{
sidebar.classList.toggle("open");
});

tag_button.addEventListener("click", (e)=>{
    e.stopPropagation();
    form_options.classList.toggle("close");
})

tag_span_tasks.addEventListener("click", ()=>{
    form_tasks_options.classList.toggle("close");
})

project_display_close_button.addEventListener("click", ()=>{
    project_options_task_stacks.innerHTML = "";
    project_display_tasks_container.innerHTML = "";
    main_inner_projects.classList.remove("hide");
    project_tasks_div.classList.add("hide");
});


 onClickOutside(form_options, tag_span, ()=>{
     form_options.classList.add("close");
 })

 onClickOutside(form_tasks_options, tag_span_tasks,  ()=>{
     form_tasks_options.classList.add("close");
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










window.addEventListener("load", ()=>{
    projects = JSON.parse(localStorage.getItem("projects")) || [];
    displayProject();
})

const displaySidebarProject = () => {
    sidebar_projects_container.innerHTML = "";

    projects.forEach(project => {

    const container = document.createElement("div");
    container.classList.add("project-sidebar");

    const sidebar_project_container = document.createElement("div");
    const sidebar_project_span = document.createElement("span");
    const sidebar_project_h4 = document.createElement("h4");
    const sidebar_project_priority_span = document.createElement("span");

    if(project.priority != ""){
        sidebar_project_priority_span.classList.add(project.priority);
    }
    sidebar_project_container.classList.add("project");
    sidebar_project_span.classList.add("fa-solid", "fa-folder");
    sidebar_project_h4.innerHTML = project.name;

    sidebar_project_container.appendChild(sidebar_project_span);
    sidebar_project_container.appendChild(sidebar_project_h4);
    sidebar_project_container.appendChild(sidebar_project_priority_span);

   //givin actions to the projects
    project_action(sidebar_project_container, project);

sidebar_projects_container.appendChild(sidebar_project_container);
});
}











const displayProject = () => {

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





    project_title_div.classList.add("project-tittle")
    
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
            project_stacks_img_clone = project_stacks_img.cloneNode(true);
            project_stacks_div.appendChild(project_stacks_img_clone);
            //Note that if you need to append the same element multiple times, you need to clone it using cloneNode(true), as the appendChild() and append() methods move the actual node rather than making a copy
            project_stacks_img_clone.setAttribute('src', icons[i]);
            project_stacks_img_clone.setAttribute('alt', icons[i]);
        }
   }

                   //givin actions to the projects
    project_action(container, project);


displaySidebarProject();
container.appendChild(project_stacks_div);
main_projects_container.appendChild(container);

});
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
    
            form_tasks.addEventListener("submit", (e) =>{
            e.preventDefault();
            task_form_submit(e, project);
            
            project_display_tasks_container.innerHTML = "";
            project.tasks.forEach(task =>{
            display_tasks(task, project);
            });
           });
        
        main_inner_projects.classList.add("hide");
        project_tasks_div.classList.remove("hide");
        });
}



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
             project_task_stacks_img_clone = project_task_stacks_img.cloneNode(true);
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




form.addEventListener("submit",  e =>{
    e.preventDefault();

    arrayStacks = []; 
    for(let i=0; i<e.target.elements.stack.length; i++){
        arrayStacks.push(e.target.elements.stack[i].checked);
  }
    if(form_validation(e, projects,  arrayStacks, "project")){

    arrayStacks = []; 
     for(let i=0; i<e.target.elements.stack.length; i++){
         arrayStacks.push(e.target.elements.stack[i].checked);
   }
    const project = {
         name: e.target.elements.content.value,
         stacks: arrayStacks,
         priority: e.target.elements.priority.value,
         tasks: [],
         createAt: new Date().getTime()
    };
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));

    e.target.reset();
    displayProject(); 
}});


const task_form_submit = (e, project) =>{


    let array_task_true_false = [];

    if(e.target.elements.stack != undefined){
        for(let i=0; i<e.target.elements.stack.length; i++){
            array_task_true_false.push(e.target.elements.stack[i].checked);
        };
    }


 if(form_validation(e, project, array_task_true_false, "task")){

    let array_task_stacks = [...project.stacks];
    let task_stacks_index = [];
    // why changing the value of array_task_stacks also changes the value of project.stacks in JavaScript. This is because in JavaScript,
    // when you assign an array to another variable, it doesn't create a new copy of the array, but rather it creates a reference to the 
    // original array. 

  

    for(let i =0; i <project.stacks.length; i++){
    if(project.stacks[i]){
        task_stacks_index.push(i);/// pega o index da array
    }}

    for(let i =0; i<array_task_true_false.length; i++){
     array_task_stacks[task_stacks_index[i]] = array_task_true_false[i];    
    };

     const task = {
         name: e.target.elements.content.value,
         stacks: array_task_stacks,
         createAt: new Date().getTime()
    };
    project.tasks.push(task);
    localStorage.setItem("projects", JSON.stringify(projects));

    e.target.reset();
    displayProject();
}};


const max_length_name = 18;
const max_staks = 5;

const form_validation = (event, parentObject, tasks_array, itemType) => {

    alert_msg.innerHTML = "";
    let error_message = [];
    const name = event.target.elements.content.value;
    let tasks_array_true_length = tasks_array.filter( Boolean => Boolean == true);

    console.log(tasks_array_true_length)

    const callAlert = ()=>{
        alert_msg.innerHTML = error_message[0];
        alert_msg_function();
    }

    if(!name){
        error_message.push(`${itemType} name required`);

        callAlert();
        return false;
    }

    if(name.length > max_length_name){
        error_message.push(`The name of the ${itemType} must have less than ${max_length_name} characters`);

        callAlert();
        return false;
    }

    if(helper_form_task_project(itemType, name, parentObject)){
        error_message.push(`${itemType} "${name}" already exists`);

        callAlert();
        return false;
    }

    if(tasks_array_true_length.length > max_staks){
        error_message.push(`${max_staks} is maximum number of stacks`);

        callAlert();
        return false;
     }

    if(itemType === "project" && !event.target.elements.priority.value){
        error_message.push(`${itemType} priority required`);

        callAlert();
        return false;
    }

    return true;
};

const helper_form_task_project = (itemType, name, parentObject) => {
    const items = itemType === 'task' ? parentObject.tasks : parentObject;
    return items.find(obj => obj.name === name);
}

const alert_msg_function = ()=>{

        alert.classList.add("show");
        alert.classList.remove("hide");
        alert.classList.add("showAlert");
        
        setTimeout(function(){
          alert.classList.remove("show");
          alert.classList.add("hide");
        },5000);
    };



function onClickOutside(ele, prevent, cb) {
    document.addEventListener('click', e => {
        console.log(e.target);


        console.log("e.target:", (prevent.contains(e.target)));

        if (prevent.contains(e.target)) return;

        if (!ele.contains(e.target)) cb();
    });
};

