export default function deleteItems(id) {
   
    if(localStorage.getItem('tasks')){
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      console.log('delete something');
      tasks.forEach((item, index) => {
         if(item.id === id){
            tasks.splice(index, 1);
         }
      });

      localStorage.removeItem('tasks');

      localStorage.setItem('tasks', JSON.stringify(tasks));

      return tasks;
 
   }
 
}