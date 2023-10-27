import { taskFormSubmit } from "./form.js";


const mainProjectsContainer = document.querySelector("#projects-container");
const mainInnerProjects = document.querySelector(".main-inner-projects");

//sidebar
const sidebarProjectsContainer = document.querySelector(".sidebar-projects-container");

//project display
const projectTasksDiv = document.querySelector(".project-page-container");

//header
const projectPageTitle = document.querySelector(".project-page-title");
const projectPageHours = document.querySelector(".project-page-hours-concluidas");
const projectPageTasksConcluidas = document.querySelector(".project-page-tasks-concluidas");
const projectPageHoursEstimadas = document.querySelector(".project-page-hours-stimadas");
const projectPageTasksEstimadas = document.querySelector(".project-page-tasks-pendentes");
//form
const formTasks = document.querySelector("#project-page-add-task");
const formTaskStacks = document.querySelector(".form-task-stacks");

const tasksContainer = document.querySelector(".project-page-tasks-container");

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


const displaySidebarProject = (projects) => {
    sidebarProjectsContainer.innerHTML = "";

        projects.forEach(project => {

            const sidebarProjectContainer = document.createElement("div");
            const sidebarProjectSpan = document.createElement("span");
            const sidebarProjectH4 = document.createElement("h4");
            const sidebarProjectPrioritySpan = document.createElement("span");

            if(project.priority != ""){
                sidebarProjectPrioritySpan.classList.add(project.priority);
            }
            sidebarProjectContainer.classList.add("project");
            sidebarProjectContainer.setAttribute("data-switcher", "");
            sidebarProjectContainer.setAttribute("data-tab", "project-page-container");
            
            sidebarProjectSpan.classList.add("fa-solid", "fa-folder");
            sidebarProjectH4.innerHTML = project.name;

            sidebarProjectContainer.appendChild(sidebarProjectSpan);
            sidebarProjectContainer.appendChild(sidebarProjectH4);
            sidebarProjectContainer.appendChild(sidebarProjectPrioritySpan);
            
            projectAction(sidebarProjectContainer, project);//#just make a label the points to the project;

            sidebarProjectsContainer.appendChild(sidebarProjectContainer);
        });
        tabSwitchers();
}

export const projectCreator = {

    container: function() {
        const container = document.createElement("div");
        container.classList.add("project");
        return container;
    },

    title: function(project) {
        const projectTitleDiv = document.createElement("div");
        const projectTitleSpan = document.createElement("span");
        const projectTitleH4 = document.createElement("h4");

        projectTitleDiv.classList.add("project-title");
        projectTitleSpan.classList.add("fa-solid", "fa-folder");
        projectTitleH4.innerHTML = project.name;

        projectTitleDiv.appendChild(projectTitleSpan);
        projectTitleDiv.appendChild(projectTitleH4);

        return projectTitleDiv;
    },

    priority: function(project) {
        const projectPriorityDiv = document.createElement("div");
        const projectPrioritySpan = document.createElement("span");
        const projectPriorityP = document.createElement("p");

        projectPriorityDiv.classList.add("project-priority");
        if(project.priority != ""){
            projectPriorityDiv.classList.add(project.priority);
            projectPrioritySpan.classList.add(project.priority);
            projectPriorityP.innerHTML = project.priority;
        }

        projectPriorityDiv.appendChild(projectPrioritySpan);
        projectPriorityDiv.appendChild(projectPriorityP);

        return projectPriorityDiv;
    },

    stacks: function(project) {
        const projectStacksDiv = document.createElement("div");
        const projectStacksImg = document.createElement("img");

        projectStacksDiv.classList.add("project-stacks");

        for(let i=0; i<project.stacks.length; i++){
            if(project.stacks[i] == true){
                let projectStacksImgClone = projectStacksImg.cloneNode(true);
                projectStacksDiv.appendChild(projectStacksImgClone);
                projectStacksImgClone.setAttribute('src', icons[i]);
                projectStacksImgClone.setAttribute('alt', icons[i]);
            }
        }
        return projectStacksDiv;
    },

    display: function(projects) {
        mainProjectsContainer.innerHTML ="";
        sidebarProjectsContainer.innerHTML = "";

        projects.forEach(project => {
            const container = this.container();
            container.appendChild(this.title(project));
            container.appendChild(this.priority(project));
            container.appendChild(this.stacks(project));

            projectAction(container, project);

            displaySidebarProject(projects);
            mainProjectsContainer.appendChild(container);
        });
    }
};























  const taskCreator = {

    checkbox: function(task) {
        const taskCheckboxDiv = document.createElement("div");
        const taskCheckbox = document.createElement("input");
        const taskCheckboxLabel = document.createElement("label");
    
        taskCheckboxDiv.classList.add("task-checkbox-container")
        taskCheckbox.classList.add("task-checkbox");
        taskCheckbox.checked = true;///       mecher aki

        taskCheckbox.id = `task-checkbox-${task.name}`;
        taskCheckbox.setAttribute("name", "task-checkbox");
        taskCheckbox.setAttribute("type", "checkbox");
        taskCheckboxLabel.setAttribute("for", `task-checkbox-${task.name}`);
    
        taskCheckboxDiv.appendChild(taskCheckbox);
        taskCheckboxDiv.appendChild(taskCheckboxLabel);
    
        return taskCheckboxDiv;
    },
  
    title: function(task) {
        const taskTitleDiv = document.createElement("div");
        const taskTitleH4 = document.createElement("h4");
    
        taskTitleDiv.classList.add("task-title");
        taskTitleH4.innerHTML = task.name;
    
        taskTitleDiv.appendChild(taskTitleH4);
    
        return taskTitleDiv;
    },
  
    spentHours: function() {
        const taskSpentHoursDiv = document.createElement("div");
        const taskSpentHoursSpan = document.createElement("span");
    
        taskSpentHoursDiv.classList.add("task-spent-hours-div");
        taskSpentHoursSpan.classList.add("task-spent-hours");
        taskSpentHoursSpan.innerHTML = "99";
    
        taskSpentHoursDiv.appendChild(taskSpentHoursSpan);
    
        return taskSpentHoursDiv;
    },

    stacks: function(task) {
        const taskStacksDiv = document.createElement("div");
        const taskStacksImg = document.createElement("img");
    
        taskStacksDiv.classList.add("project-page-task-stacks");

        for(let i=0; i<task.stacks.length; i++){
            if(task.stacks[i] == true){
               let taskStacksImgClone = taskStacksImg.cloneNode(true);
                taskStacksDiv.appendChild(taskStacksImgClone);
    
                taskStacksImgClone.setAttribute('src', icons[i]);
                taskStacksImgClone.setAttribute('alt', icons[i]);
            }
        }    
        return taskStacksDiv; 
    },

    editButton: function() {
        const editLabel = document.createElement("label");
        editLabel.setAttribute("for", "task-edit-button");
        editLabel.classList.add("task-edit-label");

        const editSpan = document.createElement("span");
        editSpan.classList.add("fa-solid", "fa-ellipsis");

        const editButton = document.createElement("button");
        editButton.setAttribute("id", "task-edit-button");
        editButton.setAttribute("type", "button");
        editButton.setAttribute("name", "task-edit-button");
        editButton.classList.add("task-edit-button");

        editLabel.appendChild(editSpan);
        editLabel.appendChild(editButton);

        return editLabel;
    },

    popUp: function(task) {
        const popUpDiv = document.createElement("div");
        popUpDiv.classList.add("task-pop-up", "close");

        const ul = document.createElement("ul");

        const deleteLi = document.createElement("li");
        const deleteLabel = document.createElement("label");
        deleteLabel.setAttribute("for", `${task.name}-task-pop-up-delete-button`);
        deleteLabel.classList.add("task-pop-up-delete-button-label");

        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("id", `${task.name}-task-pop-up-delete-button`);
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("name", `${task.name}-task-pop-up-delete-button`);
        deleteButton.classList.add(`${task.name}-task-pop-up-delete-button`);

        const deleteSpan = document.createElement("span");
        deleteSpan.textContent = "delete";

        deleteLabel.appendChild(deleteButton);
        deleteLabel.appendChild(deleteSpan);
        deleteLi.appendChild(deleteLabel);

        const editLi = document.createElement("li");
        const editLabelPopUp = document.createElement("label");
        editLabelPopUp.setAttribute("for", "task-pop-up-edit-button");
        editLabelPopUp.classList.add("task-pop-up-edit-button-label");

        const editButtonPopUp = document.createElement("button");
        editButtonPopUp.setAttribute("id", "task-pop-up-edit-button");
        editButtonPopUp.setAttribute("type", "button");
        editButtonPopUp.setAttribute("name", "task-pop-up-edit-button");
        editButtonPopUp.classList.add("task-pop-up-edit-button");

        const editSpanPopUp = document.createElement("span");
        editSpanPopUp.textContent = "edit";

        editLabelPopUp.appendChild(editButtonPopUp);
        editLabelPopUp.appendChild(editSpanPopUp);
        editLi.appendChild(editLabelPopUp);

        ul.appendChild(deleteLi);
        ul.appendChild(editLi);

        popUpDiv.appendChild(ul);

        return popUpDiv;
    },

    createTask: function(task, project) {
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task");

        taskContainer.appendChild(this.checkbox(task));
        taskContainer.appendChild(this.title(task));
        taskContainer.appendChild(this.spentHours());
        taskContainer.appendChild(this.stacks(task));
        taskContainer.appendChild(this.editButton(task));
        taskContainer.appendChild(this.popUp(task));
        

       // taskAction(taskContainer, task, project);

        tasksContainer.appendChild(taskContainer);
    },

    updateTask: function(taskContainer, task, project) {
        // Remove old task elements
        while (taskContainer.firstChild) {
            taskContainer.removeChild(taskContainer.firstChild);
        }

        // Add updated task elements
        taskContainer.appendChild(this.checkbox(task));
        taskContainer.appendChild(this.title(task));
        taskContainer.appendChild(this.spentHours());
        taskContainer.appendChild(this.stacks(task));
        taskContainer.appendChild(this.editButton());
        taskContainer.appendChild(this.popUp());

        //taskAction(taskContainer, task, project);
    },

    deleteTask: function(taskContainer) {
        tasksContainer.removeChild(taskContainer);
    },

    displayTasks: function(project) {
        tasksContainer.innerHTML = "";
        const tasks = project.tasks;

        tasks.forEach(task => {
            this.createTask(task);
        });
    }
};



// const taskAction = (taskContainer, task, project) => {

//     const taskCheckbox = taskContainer.querySelector(".task-checkbox");

//     const taskEditLabel = taskContainer.querySelector(".task-edit-label")

//     const taskPopUp = taskContainer.querySelector(".task-pop-up")

    

//         taskCheckbox.addEventListener("click", ()=> {
//             if(taskCheckbox.checked === true){
//                 task.name += "+";//

//                 taskCreator.updateTask(taskContainer, task, project);
//             }
//         })


//         taskEditLabel.addEventListener("click", ()=>{
//             taskPopUp.classList.toggle("close");
            
//             onClickOutside(taskPopUp, taskEditLabel, ()=>{
//             taskPopUp.classList.add("close");
//             })
//          })

// }










const projectAction = (container, project) => {
    container.addEventListener("click", () => {
        formTaskStacks.innerHTML = "";
        tasksContainer.innerHTML = "";

        projectPageTitle.innerHTML = project.name;
        projectPageHours.innerHTML = "777";
        projectPageTasksConcluidas.innerHTML = "996";
        projectPageHoursEstimadas.innerHTML = "1000";
        projectPageTasksEstimadas.innerHTML = "1";

        displayTasksStacksOptions(project);

        // project.tasks.forEach(task => {
        //     taskCreator.displayTasks(task, project);
        // })


        taskCreator.displayTasks(project);











        formTasks.addEventListener("submit", e => {
            e.preventDefault();

            taskFormSubmit(e, project);

            tasksContainer.innerHTML = "";

            taskCreator.displayTasks(project);




        });

        mainInnerProjects.classList.remove("active");
        projectTasksDiv.classList.add("active");
    });

    // Add other functions here
};












const displayTasksStacksOptions = (project) => {
    const stacksImg = document.createElement("img");
    const tasksStacksLabel = document.createElement("label");
    const tasksStacksInput = document.createElement("input");

    tasksStacksInput.setAttribute("type", "checkbox");
    tasksStacksInput.setAttribute("name", "stack");
    stacksImg.classList.add("icon");

    for (let i = 0; i < project.stacks.length; i++) {
        if (project.stacks[i] == true) {
            const tasksStacksLabelClone = tasksStacksLabel.cloneNode(true);
            const tasksStacksInputClone = tasksStacksInput.cloneNode(true);
            const stacksImgClone = stacksImg.cloneNode(true);

            tasksStacksLabelClone.appendChild(tasksStacksInputClone);
            tasksStacksLabelClone.appendChild(stacksImgClone);

            stacksImgClone.setAttribute("src", icons[i]);
            stacksImgClone.setAttribute("alt", icons[i]);
            formTaskStacks.appendChild(tasksStacksLabelClone);
        }
    }
}





const tabSwitchers = ()=>{
    const dataSwitchers = document.querySelectorAll("[data-switcher]");

    dataSwitchers.forEach((switcher) => {
        switcher.addEventListener("click", (e) => {
            tabCleanner();

            let targetElement = e.target; // clicked element


            console.log("targetElement: ",targetElement);


                if (!targetElement.matches("[data-switcher]")) {
                    targetElement = targetElement.parentElement;
                };
                
                let datasetInfo = targetElement.dataset.tab;
                targetElement.classList.add("active-tab");

                SwitchPage(datasetInfo);
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
        const currentPage = document.querySelector('.page.active');
        currentPage.classList.remove("active");
    }

    if(document.querySelector(`.page.${dataset}`)){
        const nextPage = document.querySelector(`.page.${dataset}`);
        nextPage.classList.add("active");
    }
};


export const tabCleanner = ()=>{
            const activeTab = document.querySelector(".active-tab");
            if (activeTab) {
                activeTab.classList.remove("active-tab");
}};