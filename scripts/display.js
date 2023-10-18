

// const main_projects_container = document.querySelector("#projects-container");




// const main_inner_projects = document.querySelector(".main-inner-projects");

// //sidebar
// const sidebar_projects_container = document.querySelector(".sidebar-projects-container");










// export const displayProject = (projects) => {



//     main_projects_container.innerHTML ="";
//     sidebar_projects_container.innerHTML = "";


//     projects.forEach(project => {

//     const container = document.createElement("div");
//     container.classList.add("project");

//     const project_title_div = document.createElement("div");
//     const project_title_span = document.createElement("span");
//     const project_title_h4 = document.createElement("h4");

//     const project_priority_Div = document.createElement("div");
//     const project_priority_span = document.createElement("span");
//     const project_priority_p = document.createElement("p");

//     const project_stacks_div = document.createElement("div");
//     const project_stacks_img = document.createElement("img");





//     project_title_div.classList.add("project-tittle")
    
//     project_title_span.classList.add("fa-solid", "fa-folder");
//     project_title_h4.innerHTML = project.name;


//     project_priority_Div.classList.add("project-priority");
//     if(project.priority != ""){
//         project_priority_Div.classList.add(project.priority);
//         project_priority_span.classList.add(project.priority);
//         project_priority_p.innerHTML = project.priority;
//     }

//     project_stacks_div.classList.add("project-stacks");


//     project_title_div.appendChild(project_title_span);
//     project_title_div.appendChild(project_title_h4);
//     container.appendChild(project_title_div);

//     project_priority_Div.appendChild(project_priority_span);
//     project_priority_Div.appendChild(project_priority_p);
//     container.appendChild(project_priority_Div);


//     for(let i=0; i<project.stacks.length; i++){

//         if(project.stacks[i] == true){
//             project_stacks_img_clone = project_stacks_img.cloneNode(true);
//             project_stacks_div.appendChild(project_stacks_img_clone);
//             //Note that if you need to append the same element multiple times, you need to clone it using cloneNode(true), as the appendChild() and append() methods move the actual node rather than making a copy
//             project_stacks_img_clone.setAttribute('src', icons[i]);
//             project_stacks_img_clone.setAttribute('alt', icons[i]);
//         }
//    }

//                    //givin actions to the projects
//     project_action(container, project);


// displaySidebarProject();
// container.appendChild(project_stacks_div);
// main_projects_container.appendChild(container);

// });
// };