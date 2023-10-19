import { displayProject } from "./display.js";
import { projects } from "./management.js";


const alert = document.querySelector(".alert");
const alert_msg = document.querySelector(".alert-msg");
let error_message = [];
let arrayStacks = [];


export const form_submit = (e) =>{
    
    console.log( " projects: ", projects);

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
    displayProject(projects);
}};

export const task_form_submit = (e, project) =>{


    let array_task_true_false = [];

    if(e.target.elements.stack){
        for(let i=0; i<e.target.elements.stack.length; i++){
            array_task_true_false.push(e.target.elements.stack[i].checked);
        };
    };

 if(form_validation(e, project, array_task_true_false, "task")){

    let array_task_stacks = [...project.stacks];
    let task_stacks_index = [];



    for(let i =0; i <project.stacks.length; i++){
    if(project.stacks[i]){
        task_stacks_index.push(i);/// pega o index da array
    }};

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
}};

const max_length_name = 18;
const max_staks = 5;

const form_validation = (event, parentObject, tasks_array, itemType) => {

    alert_msg.innerHTML = "";
    error_message = [];

    const name = event.target.elements.content.value;
    let tasks_array_true_length = tasks_array.filter( Boolean => Boolean == true);

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

    if(helper_form_validation_task_project(itemType, name, parentObject)){
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
    };
    return true;
};

const callAlert = ()=>{
    alert_msg.innerHTML = error_message[0];
    alert_msg_function();
};


const helper_form_validation_task_project = (itemType, name, parentObject) => {
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