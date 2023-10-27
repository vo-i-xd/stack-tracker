import { fetchData, createProject, synchronization } from "./apiRequests.js";
import { projectCreator } from "./display.js";
import { projects } from "./management.js";


const alert = document.querySelector(".alert");
const alertMsg = document.querySelector(".alert-msg");
let errorMessage = [];
let arrayStacks = [];


export const form_submit = (e) =>{
    
    //fetchData();
    //console.log( " projects before: ", projects);


    const projectName = e.target.elements.content.value;
    const projectPriority = e.target.elements.priority.value;

    arrayStacks = [];
    for(let i=0; i<e.target.elements.stack.length; i++){
        arrayStacks.push(e.target.elements.stack[i].checked);
  }
    if(formValidation(e, projects,  arrayStacks, "project")){

    arrayStacks = [];
     for(let i=0; i<e.target.elements.stack.length; i++){
         arrayStacks.push(e.target.elements.stack[i].checked);
   }

    const project = {
         name: projectName,
         stacks: arrayStacks,
         priority: projectPriority,
         tasks: [],
         createAt: new Date().getTime()
    };

    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));

    createProject(
        projectName,
        arrayStacks,
        projectPriority,
        );

    e.target.reset();
    projectCreator.display(projects);
}};




export const taskFormSubmit = (e, project) =>{


    let array_task_true_false = [];

    if(e.target.elements.stack){
        for(let i=0; i<e.target.elements.stack.length; i++){
            array_task_true_false.push(e.target.elements.stack[i].checked);
        };
    };

 if(formValidation(e, project, array_task_true_false, "task")){

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


const maxLengthName = 18;
const maxStacks = 5;

const formValidation = (event, parentObject, tasksArray, itemType) => {

    alertMsg.innerHTML = "";
    errorMessage = [];

    const name = event.target.elements.content.value;

    let tasksArrayTrueLength = tasksArray.filter(Boolean => Boolean == true);

    if(!name){
        errorMessage.push(`${itemType} name required`);

        callAlert();
        return false;
    }

    if(name.length > maxLengthName){
        errorMessage.push(`The name of the ${itemType} must have less than ${maxLengthName} characters`);

        callAlert();
        return false;
    }

    if(helperFormValidationTaskProject(itemType, name, parentObject)){
        errorMessage.push(`${itemType} "${name}" already exists`);

        callAlert();
        return false;
    }

    if(tasksArrayTrueLength.length > maxStacks){
        errorMessage.push(`${maxStacks} is maximum number of stacks`);

        callAlert();
        return false;
     }

    if(itemType === "project" && !event.target.elements.priority.value){
        errorMessage.push(`${itemType} priority required`);

        callAlert();
        return false;
    };
    return true;
};












const callAlert = ()=>{
    alertMsg.innerHTML = errorMessage[0];
    alertMsgFunction();
};


const helperFormValidationTaskProject = (itemType, name, parentObject) => {
    const items = itemType === 'task' ? parentObject.tasks : parentObject;

    return items.find(obj => obj.name === name);
}

const alertMsgFunction = ()=>{

        alert.classList.add("show");
        alert.classList.remove("hide");
        alert.classList.add("showAlert");
        
        setTimeout(function(){
          alert.classList.remove("show");
          alert.classList.add("hide");
        },5000);
};