import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

import { verifyToken } from '../../hooks/useLocalStorage'
import TodoItem from './item'
import TodoCreate from './create'
import TodoFilter from './filters'

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");
    const verifiedtoken = verifyToken();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const getTasksUrl = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/tasks`;
      
        const requestConfg = {
            headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY
            }
        }
        const requestBody = {
            token: token
        }

        axios.post(getTasksUrl, requestBody, requestConfg).then(response => {
            setTasks(response.data.tasks)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const deleteHandler = (id) => {

        if(verifiedtoken){
            const token = localStorage.getItem('token');
            const deleteTasksUrl = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/task/${id}?token=${token}`;

            const requestConfg = {
                headers: {
                    'x-api-key': process.env.NEXT_PUBLIC_API_KEY
                }
            }
    
            axios.delete(deleteTasksUrl, requestConfg).then(response => {
                if(response.data.deletion){
                    const remainingTasks = tasks.filter(task => task.ID !== id);
                    setTasks(remainingTasks);
                }
            }).catch(error => {
                console.log(error)
            })
        }
       
    }

    const statusHandler = (id, task) => {

        if(verifiedtoken){
            const token = localStorage.getItem('token');
            const updateTasksUrl = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/task/${id}`;

            const requestConfg = {
                headers: {
                    'x-api-key': process.env.NEXT_PUBLIC_API_KEY
                }
            }

            const requestBody = {
                name: task.name,
                status: (task.status) ? false : true,
                token: token
            }

            axios.patch(updateTasksUrl, requestBody, requestConfg).then(response => {
                const newArr = tasks.map(obj => {
                    if (obj.ID === task.ID) {
                      return {...obj, status: (task.status) ? false : true};
                    }
                    return obj;
                });

                setTasks(newArr);
            }).catch(error => {
                console.log(error)
            })
        }
       
    }

    const createHandler = (data) => {
        const token = localStorage.getItem('token');
        const createTaskUrl = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/task`;

        if(token){
            const requestConfg = {
                headers: {
                    'x-api-key': process.env.NEXT_PUBLIC_API_KEY
                }
            }

            const requestBody = {
                name: data.task,
                token: token
            }
        
            if(data.task || data.task !== '' || token){
                axios.post(createTaskUrl, requestBody, requestConfg).then(response => {
                    setTasks([...tasks, { ID: response.data.task.ID, name: response.data.task.name, status: response.data.task.status, userId: response.data.task.userId }]);
                }).catch(error => {
                    console.log(error);
                })
            }else{
                console.log('All fields are required !');
            }
        }else{
            console.log('Token not found !');
        }
    }

    const filterHandler = (type) => {
        setFilter(type);
    }

    const renderItem = () => {
        if(filter == "all"){
            const _task = tasks
            return (_task) ? _task.map((item, i) => (
                <TodoItem key={i} item={item} deleteHandler={deleteHandler} statusHandler={statusHandler} />
            )) : ''
        }
        if(filter == "todo"){
            const _task = tasks.filter(task => task.status == false)
            return (_task) ? _task.map((item, i) => (
                <TodoItem key={i} item={item} deleteHandler={deleteHandler} statusHandler={statusHandler} />
            )) : ''
        }
        if(filter == "done"){
            const _task = tasks.filter(task => task.status == true)
            return (_task) ? _task.map((item, i) => (
                <TodoItem key={i} item={item} deleteHandler={deleteHandler} statusHandler={statusHandler} />
            )) : ''
        }
      };

    return (
        <>
            <div className="max-w-7xl md:px-4 mt-10 mx-auto">
                <TodoFilter filterHandler={filterHandler} type={filter} tasks={tasks} />
                <TodoCreate createHandler={createHandler} />
                
                {renderItem()}
            </div>
        </>
    );
};

export default Todo;
