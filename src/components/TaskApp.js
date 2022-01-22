import React, {useState} from 'react';
import {ListTask} from './ListTask'
import {FormTask} from './FormTask'


export const TaskApp = () => {
  const [tasks, settasks] = useState([]);
  const [edit, setedit] = useState(false);
  const [taskEdit, settaskEdit] = useState({});

  return (
    <div className="container">
        <h1 className='text-center mt-3'>Aplicaciones de tareas</h1>
        <hr />
        <div className="row">
          <ListTask Tasks = {tasks} setTask = {settasks} setEdit={setedit}  setTaskEdit = {settaskEdit} />
          <FormTask Tasks = {tasks} setTasks ={settasks} isEdit={edit} setEdit={setedit} editTask = {taskEdit} setTaskEdit = {settaskEdit}/>
        </div>
    </div>
  );
};
