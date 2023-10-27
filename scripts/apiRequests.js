
//import { projects } from "./management.js";






export const fetchData = async () => {
    //console.log(projects, "f7");
      try {
        const response = await fetch('http://localhost:3000/project/');
        const data = await response.json();
    
        //const {name, stacks, priority, tasks, createdAt} = data;
        //console.log(name, priority, tasks, createdAt);
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      };
    };
   //fetchData();
  
  
//  export const synchronization = async (projectsJson) =>{
//   console.log("inside: ", projectsJson);
//      try {    
//        const response = await fetch('http://localhost:3000/synchronization', {
//          method: 'PATCH', // or 'PUT'
//          headers: {
//            'Content-Type': 'application/json',
//          },
//          body: projectsJson,
//        });
  
//        const data = await response.json();
//        console.log(data);
  
//      } catch (error) {
//        console.error('Error:', error);
//      }
//   }

export const synchronization = async (projectsJson) =>{



  console.log("inside: ", projectsJson);
     try {    
       const response = await fetch('http://localhost:3000/synchronization', {
         method: 'PATCH', // or 'PUT'
         headers: {
           'Content-Type': 'application/json',
         },
         body: projectsJson,
       });
  
       const data = await response.json();
       console.log(data);
  
     } catch (error) {
       console.error('Error:', error);
     }
  };



  
   export async function createProject(projectName, arrayStacks, projectPriority) {
       try {    
         const response = await fetch('http://localhost:3000/project', {
           method: 'POST', // or 'PUT'
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
    "name": projectName,
    "stacks": arrayStacks,
    "priority": projectPriority,
    "tasks": [],
    createdAt: new Date().toISOString()
}),
         });
         const data = await response.json();
         console.log(data);
  
       } catch (error) {
         console.error('Error:', error);
       }
     }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    // fetch('http://localhost:3000/project/Jane%20Doe')
  //   .then(response => response.json())
  //   .then(data => {
  //     const {name, stacks, priority, tasks, createdAt} = data;
  //     console.log(name, stacks, priority, tasks, createdAt);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });