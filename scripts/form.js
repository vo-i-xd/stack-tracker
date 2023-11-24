import { fetchData, createProject, synchronization } from "./apiRequests.js";
import { projectCreator } from "./display.js";
import { projects } from "./management.js";


const alert = document.querySelector(".alert");
const alertMsg = document.querySelector(".alert-msg");
let errorMessage = [];
let arrayStacks = [];


export const formSubmit = (e) =>{
    
    //fetchData();
    //console.log( " projects before: ", projects);
    
    const projectName = e.target.elements.content.value;
    const projectPriority = e.target.elements.priority.value;

    arrayStacks = [];
    for(let i=0; i<e.target.elements.stack.length; i++){
        arrayStacks.push(e.target.elements.stack[i].checked);
    }
    if(formValidation(e, projects,  arrayStacks, "project")){


    const project = {
        name: projectName,
        stacks: arrayStacks,
        priority: projectPriority,
        tasks: [],
        createAt: new Date().getTime(),
        spentTime: 0,
       //estimatedTime: 0
    };

    console.log(project);
    
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));

    // createProject(
    //     projectName,
    //     arrayStacks,
    //     projectPriority,
    //     );

    e.target.reset();
    projectCreator.display(projects);
}};



const maxLengthName = 18;
const maxStacks = 5;

export const formValidation = (event, parentObject, tasksArray, itemType) => {

    alertMsg.innerHTML = "";
    errorMessage = [];
    
    let tasksArrayTrueLength = tasksArray.filter(Boolean => Boolean == true);

    const name = event.target.elements.content.value;//ask someone why it dont work properly when this two lines is inverted

    if(name.length > maxLengthName){
        errorMessage.push(`The name of the ${itemType} must have less than ${maxLengthName} characters`);

        callAlert();
        return false;
    }

    if(!name){
        errorMessage.push(`${itemType} name required`);

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

    if(items.length === 0) return false;
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