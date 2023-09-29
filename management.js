const sidebartitle = document.querySelector(".inner-sidebar-title");
const sidebar = document.querySelector("#sidebar");

let sidebarOpen = true;



sidebartitle.addEventListener("click", ()=>{

    if(!sidebarOpen){
        sidebarOpen = true;
        sidebar.classList.add("open");
    }
    else{
        sidebarOpen = false;
        sidebar.classList.remove("open");
    }
});
