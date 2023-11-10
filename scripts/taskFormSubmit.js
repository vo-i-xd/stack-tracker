import { taskCreator } from "./display.js";
import { projects } from "./management.js";
import { formValidation } from "./form.js";




export const taskFormSubmit = (e, project) => {


    let array_task_true_false = [];

    if (e.target.elements.stack) {
        for (let i = 0; i < e.target.elements.stack.length; i++) {
            array_task_true_false.push(e.target.elements.stack[i].checked);
        };
    };

    if (formValidation(e, project, array_task_true_false, "task")) {

        let array_task_stacks = [...project.stacks];
        let task_stacks_index = [];

        for (let i = 0; i < project.stacks.length; i++) {
            if (project.stacks[i]) {
                task_stacks_index.push(i); /// pega o index da array
            }
        };

        for (let i = 0; i < array_task_true_false.length; i++) {
            array_task_stacks[task_stacks_index[i]] = array_task_true_false[i];
        };

        const task = {
            name: e.target.elements.content.value,
            stacks: array_task_stacks,
            done: false,
            spentTime: 0,
            createAt: new Date().getTime()
        };

        project.tasks.push(task);
        localStorage.setItem("projects", JSON.stringify(projects));

        e.target.reset();

        taskCreator.create(task, project);
    }
};
