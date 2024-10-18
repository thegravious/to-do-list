import { insertTask, readTask, updateTask, deletTask, markDone } from "./todofuncation.js";




let inp1 = document.querySelector("#inp1")
let inp2 = document.querySelector("#inp2")
let btnsubmit = document.querySelector("#btnsubmit")
let btninnerupdate = document.querySelector("#btninnerupdate")
let ntask = document.querySelector("#notask")
let alltaskdiv = document.querySelector("#alltaskdiv")
let btnupdate = document.querySelector("#btn-update")
let inputsubmint = document.querySelector("#inputsubmit")
let updatetask = document.querySelector("#updatetask")
let taskm = document.querySelector("#taskmanager")



let hidenotask = () => {
    let alltask = readTask()
    if (alltask) {
        ntask.classList.add("d-none")
        alltaskdiv.classList.remove("d-none")
    } else {
        alltaskdiv.classList.add("d-none")
    }

}
hidenotask()


let appendtask = () => {
    let alltask = readTask();
    alltaskdiv.innerHTML = ""
    if (alltask) {

        for (let i in alltask) {
            let newdiv = document.createElement("div")
            newdiv.classList.add("task-item")
            newdiv.setAttribute("id", `task-item${alltask[i].taskId}`)
            newdiv.innerHTML = `
                <p id="taskitem${alltask[i].taskId}" class="task-text mb-0">${alltask[i].taskTitle}</p>
                <div>
                    <button id="done-todo-${alltask[i].taskId}" class="btn btn-success btn-sm me-1">Done</button>
                    <button id="undo-todo-${alltask[i].taskId}" class="btn btn-success d-none btn-sm me-1">Pending</button>
                    <button id="update-todo-${alltask[i].taskId}" class="btn btn-warning btn-sm me-1">Update</button>
                    <button id="del-todo-${alltask[i].taskId}" class="btn btn-danger btn-sm">Delete</button>
                </div>
            `

            //to update any task //

            newdiv.querySelector(`#update-todo-${alltask[i].taskId}`).addEventListener("click", () => {
                alltaskdiv.classList.add("d-none")
                inputsubmint.classList.add("d-none")
                updatetask.classList.remove("d-none")
                taskm.innerText = "Update task"
                inp2.value = `${alltask[i].taskTitle}`

                btninnerupdate.addEventListener("click", () => {
                    alltaskdiv.classList.remove("d-none");
                    inputsubmint.classList.remove("d-none"); // corrected 'inputsubmint' to 'inputsubmit'
                    updatetask.classList.add("d-none");

                    let y = inp2.value
                    updateTask(alltask[i].taskId, y)
                    appendtask()
                });
            })

            // to make any task as completed //

            let changebg = () => {

                if (alltask[i].taskStatus) {
                    newdiv.classList.add("bg-green")
                    newdiv.querySelector(`#undo-todo-${alltask[i].taskId}`).classList.remove("d-none")
                    newdiv.querySelector(`#done-todo-${alltask[i].taskId}`).classList.add("d-none")
                    newdiv.querySelector(`#update-todo-${alltask[i].taskId}`).classList.add("d-none")

                } else {
                    newdiv.classList.remove("bg-green")
                }

                newdiv.querySelector(`#done-todo-${alltask[i].taskId}`).addEventListener("click", () => {
                    let z = true
                    markDone(alltask[i].taskId, z)

                    appendtask()


                })

                newdiv.querySelector(`#undo-todo-${alltask[i].taskId}`).addEventListener("click", () => {
                    let z = false
                    markDone(alltask[i].taskId, z)
                    appendtask()
                })

            }

            // to delete any task //

            newdiv.querySelector(`#del-todo-${alltask[i].taskId}`).addEventListener("click", () => {
                deletTask(alltask[i].taskId)

                appendtask()
            })

            alltaskdiv.appendChild(newdiv)

            changebg()

        }
    }
}
appendtask()



btnsubmit.addEventListener("click", () => {

    if (inp1.value.length == 0) {
        alert("field can not be emply")
    } else {
        let tobj = {
            taskId: "",
            taskTitle: inp1.value,
            taskStatus: false
        }
        inp1.value = ""
        insertTask(tobj)
        appendtask()
    }
    hidenotask()
})


