
export default function setItems(obj){
    
    let tasksArr = [];
     
    if(!localStorage.getItem('tasks')){
        tasksArr.push(obj);
        localStorage.setItem('tasks', JSON.stringify(tasksArr));
    }else{
        let localTasks = localStorage.getItem('tasks'); 
        tasksArr = JSON.parse(localTasks);   
        tasksArr.push(obj)     
        localStorage.setItem('tasks', JSON.stringify(tasksArr));
    }
}
