import React,{useState} from 'react';
import { isEmpty } from 'lodash'
import {nanoid} from 'nanoid'

export const FormTask = ({Tasks,setTasks,isEdit,setEdit,editTask,setTaskEdit}) => {
  const [task, settask] = useState('');
  const [error, setError] = useState(null);

  const validForm = ()=>{
      let validate = true
      setError(null)
      if(isEmpty(task)){
        setError('Debes Digitar una tarea valida')
        validate = false
      }
      return validate
  }
  const handleTask = (e)=>{
      e.preventDefault();
      settask(e.target.value)
  }
  const handleSave = (e)=>{
    e.preventDefault()
    if(!validForm()) return
    const newTask = {nombre:task, id:nanoid()}
    setTasks(ele => [...ele,newTask])
    settask('')
  }

  const handleSaveEdit = (e)=>{
    e.preventDefault();
    if(!validForm()) return
    const index = Tasks.findIndex(ele => ele.id === editTask.id)
    Tasks[index] = editTask;
    setEdit(false);
  }
  const handleEdit = (e)=>{
    setTaskEdit( ele => ele = {...ele, nombre:e.target.value} )
  }
  return(
    <div className="col-4">
        <h3 className='text-center'> { isEdit? 'Editar Tarea' :'Agregar Tarea'}</h3>
        <form action="#" onSubmit={isEdit?  handleSaveEdit:handleSave}>
            <div className="form-group">
                { error && <span className='text-danger'>{error}</span> }
                <input
                  type="text" name="nombre" id="nombre" value={isEdit? editTask.nombre:task} placeholder="Escribe la tarea"
                  className='form-control mb-2' autoComplete='off' onChange={isEdit?handleEdit:handleTask} />
                <button type="submit" className={isEdit? 'btn btn-warning btn-lg btn-block' :'btn btn-dark btn-lg btn-block'}>{isEdit? 'Guardar' :'Agregar'}</button>
            </div>
        </form>
    </div>
  );
};
