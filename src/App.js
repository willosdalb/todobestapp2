 
import './assets/fontawesome/css/all.css' 
import './index.css';
import {useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TaskAdd from './components/TaskAdd/TaskAdd';
import TaskInProgress from './components/TaskInProgress/TaskInProgress';
import TaskComplete from './components/TaskCompleted/TaskCompleted';
import TaskContext from './context/TaskContext';
import SideNav from './components/SideNav/SideNav';
  
const App = props => {

 const [taskData, setTaskData] = useState({
    currentPage: ''
  });
 
  return (

	<BrowserRouter>
		<TaskContext.Provider value = {{taskData, setTaskData}}>
		<div class="todolist-wrapper">
			<SideNav />
			<div class="todolist-content">
				<Switch>
					<Route exact path = '/task-inprogress'  component = {TaskInProgress}  /> 
					<Route exact path = '/task-completed'  component = {TaskComplete}  /> 
					<Route exact path = '/task-add'  component = {TaskAdd}  /> 
					<Route exact path = '/'  component = {TaskAdd}  /> 
				</Switch>
			</div>
		</div>
		</TaskContext.Provider>
	</BrowserRouter>
	
  	);
};
 
export default App;
