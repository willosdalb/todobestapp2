
export default function getItems() {

    if(!localStorage.getItem('tasks')){      
        return false;
    }

    const localTasks = localStorage.getItem('tasks'); 

    const objTasks = JSON.parse(localTasks);

    if(objTasks.length < 1){
        return false;
    }
     
    return objTasks;     
}