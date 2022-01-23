import React from 'react';
import { size } from 'lodash'
import { deleteDocument} from '../actions';

export const ListTask = ({Tasks,setTask,setEdit,setTaskEdit}) => {

  const deleteTask = async(id)=>{
    const result = await deleteDocument('tasks',id)
    if(!result.statusResponse){
      console.error(result.error);
      return
    }
    const newTaks = Tasks.filter(ele => ele.id !== id);
    setTask(newTaks)
  }

  const handleEdit = (task)=>{
    setEdit(true)
    setTaskEdit(task)
  }
  return(
    <div className="col-8">
      <ul className='list-group'>
        {
          (size(Tasks) <= 0) ? (<li className='list-group-item'>No se restraron tareas</li>)
          :(
          Tasks.map(ele =>
            (
              <li className='list-group-item d-flex justify-content-between align-items-center' key={ele.id}>
                <span>{ele.name}</span>
                <div className="group btn">
                  <button className='btn btn-warning mr-3' onClick={()=>{handleEdit(ele)}}>Editar</button>
                  <button className='btn btn-danger' onClick={()=>{deleteTask(ele.id)}} >Eliminar</button>
                </div>
              </li>
            )
          ))
        }
      </ul>
  </div>
  )
};
