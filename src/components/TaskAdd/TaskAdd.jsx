import React, {useContext, useState, useEffect} from 'react';
import {useForm, Form} from '../useForm';
import validate from '../validateValues';
import TaskContext from '../../context/TaskContext';
import {v4 as uuidv4} from 'uuid';
import setItems from '../setLocalStorage';



export default function TaskAdd(props) {

    const {setTaskData} = useContext(TaskContext);

    const initValues = {
        id: uuidv4(),
        task: '',    
        postedDate: Date.now(),
        completedDate: '',
        isCompleted: false
    }

    useEffect(() => {
        let isMounted = true
 
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

    const handlePostToContext = (values) => {
         setItems(values);          
    }
 
    const {onChange, values,errors, handleSubmit }= useForm(initValues, validate, handlePostToContext);
  
    return (
        <>
            <nav>
                <i className="fas fa-cog"></i>
            </nav>
            <Form onSubmit = {handleSubmit}>            
                <div className="todolist-add">
                    <textarea name="task" id="" cols="30" rows="10" value = {values.task} onChange = {onChange}></textarea>                     
                    {errors ? <p className = 'error-task'>{errors.task}</p> : null}
                    <div className="btn-wrapper">
                        <button type="submit" className="btn-save-task">Save Task</button>
                    </div>
                </div>
            </Form>
        </>
    )
}
