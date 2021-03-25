import React, { useEffect, useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import getItems from '../getLocalStorageHandler'; 
import deleteItems from '../deleteItems';
import updateItems from '../updateItems';
import validate from '../validateValues';
import { useForm, Form } from '../useForm';
import TaskContext from '../../context/TaskContext';
import moment from 'moment';

export default function TaskInProgress(props) {

    const {taskData, setTaskData} = useContext(TaskContext);
 
    let renderTasks = null;

    let initValues = {
        id: uuidv4(),
        task: '',
        postedDate: Date.now(),
        completedDate: '',
        isCompleted: false
    }

    const [searchValue, setSearchValue] = useState({
        searchInput: ''
    });

    const [tasks, setTasks] = useState([]);
    const [isSortData, setSortData] = useState(false);


    const [edit, setEdit] = useState({
        isEdit: false,
        taskId: 0
    });


    

    useEffect(() => {
        let isMounted = true

        const loadTasks = () => {
            let loadedTasks = getItems();

            if (!loadedTasks) {
                setTasks([]);
            } else {
                setTasks(loadedTasks);
            }
        }

        loadTasks();

        const settingTaskData = () => {
            setTaskData({
                currentPage: props.location.pathname
            });
        }

        settingTaskData();
       
        return () => {
            isMounted = false;
        }
    }, []);

    const loadOnSearch = () =>{
            let loadTasks = getItems();

            setTasks(loadTasks);
 
            const searchQuery = new RegExp(searchValue.searchInput, 'i')
    
            const searchResult =  tasks.filter(item => {
            
                return item.task.search(searchQuery) > -1;
            });
    
            setTasks(searchResult)
    }

    const deleteTaskHandler = (id) => {

        let tasks = deleteItems(id);
        setTasks(tasks);

    }
    const completeTaskHandler = (id) => {
        let tasks = updateItems(id, 'isCompleted', true);
        setTasks(tasks);
    }

    const handletEdit = (id) => {

        values = { ...initValues };

        setEdit({
            isEdit: true,
            taskId: id
        });
    }

    const handleUpdate = (id, valueToUpdate) => {

        let tasks = updateItems(id, 'task', valueToUpdate);
        setTasks(tasks);

        setEdit({
            isEdit: false,
            taskId: 0
        });
    }

    const handleSearchOnChange = (e) => {         
        const {value, name} = e.target;

        setSearchValue({
            [name] : value
        });      
    }

    const handleSearchOnClick = (e) => {
        loadOnSearch();        
    }

    const handleSearchOnKeyDown = (e) => {
 
        if(e.key === 'Enter'){

            loadOnSearch();
        }                

        if(e.keyCode === 8){
            if(searchValue.searchInput.length < 2){
                let loadTasks = getItems();
                setTasks(loadTasks);
            }
        }
    }

    const handleSortData = () => {
        setSortData(!isSortData)

        if(isSortData){
           
            const sortedTasks = tasks.sort((a, b) => a.postedDate < b.postedDate ? 1 : -1);
            
            setTasks(sortedTasks)
        } else{
            setTasks(getItems())
        }
    }

    let { onChange, values, errors, handleSubmit } = useForm(initValues, validate, handleUpdate);

    if (tasks && tasks.length > 0) {
        let isFound = (tasks.find(item => !item.isCompleted === true));

        if (isFound) {
            renderTasks = (tasks.map(item => {

                if (!item.isCompleted) {
                    return (
                        <Form onSubmit={handleSubmit} key={item.id}>

                            <div className="todolist-item" >
                              
                                <p className="item-description">
                                    <p className = 'item-postedDate'>
                                    {moment(item.postedDate).format('MM/DD/YYYY - h:mm:ss')}
                                        
                                    </p>
                                    <p className = 'item-task'>
                                        {edit.isEdit && edit.taskId === item.id ?
                                        <input type="text" name="task" placeholder={item.task} value={values.task} className='edit-task-input' onChange={onChange} /> :
                                        item.task}
                                    </p>
                                    
                                </p>
                                <p className="item-edit">
                                    <i className="fas fa-check" onClick={e => completeTaskHandler(item.id)}></i>
                                    {edit.isEdit && edit.taskId === item.id ? <i className="fas fa-save" onClick={e => handleUpdate(item.id, values.task)} ></i> :
                                        <i className="fas fa-pencil-alt" onClick={e => handletEdit(item.id)}></i>}
                                    <i className="fas fa-times" onClick={e => deleteTaskHandler(item.id)}></i>
                                </p>
                            </div>

                        </Form>
                    );
                }
                return null;
            }
            ));
        }


    }

    if (!renderTasks || renderTasks == null || renderTasks.length < 1) {
        renderTasks = <h1 className="no-tasks">No Available Tasks</h1>
    }

    return (
        <>
            <nav className="todo-lists">
                <div className="search-wrapper">
                    <input type="text" name = 'searchInput' placeholder="Search For Tasks" onChange = {e => handleSearchOnChange(e)}  onKeyDown = {handleSearchOnKeyDown} value = {searchValue.searchInput}/>
                    <i className="fas fa-search" onClick = {handleSearchOnClick}></i>
                </div>
                <i className={isSortData ? "fas fa-sort-alpha-up" : "fas fa-sort-alpha-down"} onClick = {handleSortData}></i>
            </nav>
            <div className="todolist-lists">

                {renderTasks}

            </div>
        </>
    )
}
