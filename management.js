const sidebar_title = document.querySelector(".inner-sidebar-title");
const sidebar = document.querySelector("#sidebar");

const form_header = document.querySelector(".form-header");
const tag = document.querySelector("#tag");
const form_options = document.querySelector(".form_options"); 



//form
const form = document.querySelector("#new-todo-form");


//display projects


const main_projects_container = document.querySelector("#projects-container");
const sidebar_projects_container = document.querySelector(".sidebar-projects-container")



//toggles:
sidebar_title.addEventListener("click", ()=>{
sidebar.classList.toggle("open");
});

tag.addEventListener("click", ()=>{
    form_options.classList.toggle("close");
})





window.addEventListener("load", ()=>{

    projects = JSON.parse(localStorage.getItem("projects")) || [];
    displayProject();
})
//projects = JSON.parse(localStorage.getItem("projects")) || [];





//const stacks = document.querySelectorAll("input[type=checkbox]:checked");
const content = document.querySelector("#content");
let arrayStacks = [];


form.addEventListener("submit",  e =>{
    e.preventDefault();

    arrayStacks = [];
    for(let i=0; i<e.target.elements.stack.length; i++){
        arrayStacks.push(e.target.elements.stack[i].checked);
   }

    const project = {
         name: e.target.elements.content.value,
         stacks: arrayStacks,
         priority: e.target.elements.priority.value,
         createAt: new Date().getTime()
    };



    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));

    //console.log(project);
    e.target.reset();
    displayProject(); 
});





const displayProject = () => {

    main_projects_container.innerHTML ="";

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

    const sidebar_project_container = document.createElement("div");
    const sidebar_project_span = document.createElement("span");
    const sidebar_project_h4 = document.createElement("h4");
    const sidebar_project_priority_span = document.createElement("span");



    project_title_div.classList.add("project-tittle")
    project_title_span.classList.add("fa-solid", "fa-folder");
    project_title_h4.innerHTML = project.name;


    project_priority_Div.classList.add("project-priority");
    if(project.priority != ""){
        project_priority_Div.classList.add(project.priority);
        project_priority_span.classList.add(project.priority);
        project_priority_p.innerHTML = project.priority;
        sidebar_project_priority_span.classList.add(project.priority);
    }

    project_stacks_div.classList.add("project-stacks");

    sidebar_project_container.classList.add("project");
    sidebar_project_span.classList.add("fa-solid", "fa-folder");
    sidebar_project_h4.innerHTML = project.name;

    project_title_div.appendChild(project_title_span);
    project_title_div.appendChild(project_title_h4);
    container.appendChild(project_title_div);

    project_priority_Div.appendChild(project_priority_span);
    project_priority_Div.appendChild(project_priority_p);
    container.appendChild(project_priority_Div);

    sidebar_project_container.appendChild(sidebar_project_span);
    sidebar_project_container.appendChild(sidebar_project_h4);
    sidebar_project_container.appendChild(sidebar_project_priority_span);


    for(let i=0; i<project.stacks.length; i++){
        if(project.stacks[i] == true){
      
            project_stacks_img_clone = project_stacks_img.cloneNode(true);
            project_stacks_div.appendChild(project_stacks_img_clone);
//            project_stacks_img_clone.classList.add(`${i}`);

            //Note that if you need to append the same element multiple times, you need to clone it using cloneNode(true), as the appendChild() and append() methods move the actual node rather than making a copy
            switch (i) {

                case 0:
                    project_stacks_img_clone.setAttribute('src', "./icons/javascript.svg");
                    break;
                case 1:
                    project_stacks_img_clone.setAttribute('src', "./icons/typescript.svg");
                    break;
                case 2:
                    project_stacks_img_clone.setAttribute('src', "./icons/react.svg");
                    break;
                case 3:
                    project_stacks_img_clone.setAttribute('src', "./icons/angular.svg");
                    break;
                case 4:
                    project_stacks_img_clone.setAttribute('src', "./icons/vue-js.svg");
                    break;
                case 5:
                    project_stacks_img_clone.setAttribute('src', "./icons/tailwindcss.svg");
                    break;
                case 6:
                    project_stacks_img_clone.setAttribute('src', "./icons/springboot.svg");
                    break;
                case 7:
                    project_stacks_img_clone.setAttribute('src', "./icons/nodejs.svg");
                    break;
                case 8:
                    project_stacks_img_clone.setAttribute('src', "./icons/mongodb.svg");
                    break;
                case 9:
                    project_stacks_img_clone.setAttribute('src', "./icons/python.svg");
                    break;
                case 10:
                    project_stacks_img_clone.setAttribute('src', "./icons/c.svg");
                    break;
                case 11:
                    project_stacks_img_clone.setAttribute('src', "./icons/c++.svg");
                    break;
                default:
                    break;///todo: meke a funtion that uses a object(hashmap) to return the value using the index as kays;
                    //aways make it like that, switch is just used when we need an action;
            }
        }
   }

container.appendChild(project_stacks_div);
main_projects_container.appendChild(container);

sidebar_projects_container.appendChild(sidebar_project_container);

});
}