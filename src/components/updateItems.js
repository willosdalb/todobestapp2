 

export default function updateItems(id, itemToUpdate, updateValue) {

    if (localStorage.getItem('tasks')) {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        
        tasks.forEach((item, index) => {
            if (item.id === id) {
                tasks[index][itemToUpdate] = updateValue;
            }
        });

        localStorage.removeItem('tasks');

        localStorage.setItem('tasks', JSON.stringify(tasks));

        console.log(tasks);

        return tasks;

    }


}
