// setting task to the local storage //

let insertTask = (obj) => {
    if (localStorage.getItem("task")) {
        let arr = JSON.parse(localStorage.getItem("task"))

        // update id of object
        obj.taskId = arr.length == 0 ? 1 : arr[arr.length - 1].taskId + 1

        arr.push(obj)
        localStorage.setItem("task", JSON.stringify(arr))
    } else {
        let arr = []
        obj.taskId = 1;
        arr.push(obj)
        localStorage.setItem("task", JSON.stringify(arr))
    }
}


// reading all the task from the local storage

let readTask = () => {
    if(localStorage.getItem("task")){
        let arr = JSON.parse(localStorage.getItem("task"))
        if(arr.length==0){
            return false;
        }else{
            return arr;
        }
    }else{
        return false;
    }
}

// update any task from the local storage

let updateTask = (x , y , z) => {
    if (localStorage.getItem("task")) {
        let arr = JSON.parse(localStorage.getItem("task"))
        let t = false

        for (let i = 0; i < arr.length; i++) {
            if(arr[i].taskId == x){
                arr[i].taskTitle = y
                localStorage.setItem("task",JSON.stringify(arr))
            }
        }
    }
}

updateTask()

let markDone = (x , y) => {
    if (localStorage.getItem("task")) {
        let arr = JSON.parse(localStorage.getItem("task"))
        let t = false

        for (let i = 0; i < arr.length; i++) {
            if(arr[i].taskId == x){
                arr[i].taskStatus = y
                localStorage.setItem("task",JSON.stringify(arr))
            }
        }
    }
}

markDone()


// delete any task based on the taskId

let deletTask = (x) => {
    console.log(x)
    if (localStorage.getItem("task")) {
        let arr = JSON.parse(localStorage.getItem("task"))
        let isdelete = false;

        let temp = []

        for(let i= 0;i<arr.length;i++){
            if(arr[i].taskId==x){
                //console.log(arr[i])
                isdelete = true;
            }else{
                temp.push(arr[i])
            }
        }
        localStorage.setItem("task",JSON.stringify(temp))
        
        
       
    }

}


// deletTask(5)



export { insertTask, readTask, updateTask, deletTask, markDone };