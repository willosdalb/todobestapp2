 
import { NavLink} from 'react-router-dom';
import React, {useContext} from 'react';
import TaskContext from '../../context/TaskContext';


export default function SideNav(props) {
 
    const {taskData} = useContext(TaskContext);

    const taskCompletedStyle = taskData.currentPage !== '/task-completed' ? 'nav-link' : 'active';
    const taskInProgressStyle = taskData.currentPage !== '/task-inprogress' ? 'nav-link' : 'active';
    const taskAddedStyle = taskData.currentPage !== '/task-add' || '/' ? 'nav-link' : 'active';
   
    return (
        <div class="todolist-sidebar">
				<h2 class="menu-title">Menu</h2>
				<ul class="menu">
					<NavLink to = '/task-add' className ='nav-link'   >
						<li>
							<div className= {taskAddedStyle}><i class="fa fa-plus-circle" aria-hidden="true"></i> Add Task</div>
						</li>
					</NavLink>
					<NavLink to = '/task-inprogress' className =  'nav-link' activeClassName = 'current-page'  exact = {true}>
						<li>
                            <div className= {taskInProgressStyle}><i class="fa fa-arrow-right" aria-hidden="true"></i> In Progress</div>
						</li>
					</NavLink>
					<NavLink to = '/task-completed' className = 'nav-link' activeClassName = 'current-page'  exact = {true}>
						<li>
                        <div className= {taskCompletedStyle}><i class="fa fa-tasks" aria-hidden="true"></i> Completed Tasks</div>
							
						</li>
					</NavLink>
				</ul>
			</div>
    )
}
