

export function getItems() {

    const localTasks = localStorage.getItem('tasks'); 

    if(!localTasks){
        return false;
    }

    const objTasks = JSON.parse(localTasks);

    if(objTasks.length < 1){
        return false;
    }
     
    return objTasks;     
}

export function setItems(obj){
    let localTasks = localStorage.getItem('tasks'); 

    let tasksArr = [];
    tasksArr.push(obj);

    if(!localTasks){
        localStorage.setItem('tasks', tasksArr);
    }else{
        tasksArr = JSON.parse(localTasks);        
        localStorage.setItem('tasks', tasksArr);
    }
}
