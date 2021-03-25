import React, {useState, useEffect, useContext} from 'react'
import getItems from '../getLocalStorageHandler';
import TaskContext from '../../context/TaskContext';
 

export default function TaskCompleted(props) {
 
    const [tasks, setTasks] = useState([]);
    const {setTaskData} = useContext(TaskContext);
    const [isSortData, setSortData] = useState(false);

    const [searchValue, setSearchValue] = useState({
        searchInput: ''
    });

    const loadOnSearch = () =>{
        let loadTasks = getItems();

        setTasks(loadTasks);

   

        const searchQuery = new RegExp(searchValue.searchInput, 'i')

        const searchResult =  tasks.filter(item => {
        
            return item.task.search(searchQuery) > -1;
        });

        setTasks(searchResult)
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

  

    useEffect(() => {
        let isMounted = true

        const loadTasks = () => {
           let loadedTasks =  getItems();

            if(!loadedTasks){
                setTasks([]);
            }else{
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

    let renderTasks =  null;

    let defaultRenderedTask =   (<div className="todolist-item"  >
                                    <p className="item-description">
                                        No Tasks available                      
                                    </p>                     
                                </div>
                                )
 
     
    if(tasks && tasks.length > 0){
        let isFound = (tasks.find(item => item.isCompleted === true));
        if(isFound){
            renderTasks = (tasks.map(item => {                     
             
                if(item.isCompleted){           
                    return ( <div className="todolist-item" key = {item.id}>
                                <p className="item-description completed-task">
                                   { item.task}
    
                                </p>
                                
                            </div>)
                }    else{
                    return null;
                }         
            }                 
            ));
        }
    }
 
    if(!renderTasks || renderTasks == null || renderTasks.length < 1){
        renderTasks = <h1 className = "no-tasks">No Available Tasks</h1>
    }
 
    return (
        <>
            <nav className="todo-lists">
                <div className="search-wrapper">
                    <input type="text" name = 'searchInput' placeholder="Search For Tasks" onChange = {e => handleSearchOnChange(e)}  onKeyDown = {handleSearchOnKeyDown} value = {searchValue.searchInput}/>
                    <i className="fas fa-search" onClick = {handleSearchOnClick}></i>
                </div>
                <i className="fas fa-sort-alpha-up" onClick = {handleSortData}></i>
            </nav>
            <div className="todolist-lists">
                {renderTasks}
            </div>
        </>
    )
}
