import React,{useState} from 'react';
import { isEmpty } from 'lodash'
import { addDocument, updateDocument } from '../actions';

export const FormTask = ({Tasks,setTasks,isEdit,setEdit,editTask,setTaskEdit}) => {
  const [task, settask] = useState('');
  const [error, setError] = useState(null);

  const validForm = (taskflag)=>{
      let validate = true
      setError(null)
      if(isEmpty(taskflag)){
        setError('Debes Digitar una tarea valida')
        validate = false
      }
      return validate
  }
  const handleTask = (e)=>{
      e.preventDefault();
      settask(e.target.value)
  }
  const handleSave = async(e)=>{
    e.preventDefault()
    if(!validForm(task)) return
    const result = await addDocument('tasks',{name:task})
    if(!result.statusResponse){
      setError(result.error)
      return
    }
    setTasks(ele => [...ele,{id:result.data.id, name:task}])
    settask('')
  }

  const handleSaveEdit = async(e)=>{
    e.preventDefault();
    if(!validForm(editTask.name)) return
    const result = await updateDocument('tasks',editTask.id,editTask)
    if(result.error){
      setError(result.error)
      return
    }
    const index = Tasks.findIndex(ele => ele.id === editTask.id)
    Tasks[index] = editTask;
    setEdit(false);
  }
  const handleEdit = (e)=>{
    setTaskEdit( ele => ele = {...ele, name:e.target.value} )
  }
  return(
    <div className="col-4">
        <h3 className='text-center'> { isEdit? 'Editar Tarea' :'Agregar Tarea'}</h3>
        <form action="#" onSubmit={isEdit?  handleSaveEdit:handleSave}>
            <div className="form-group">
                { error && <span className='text-danger'>{error}</span> }
                <input
                  type="text" name="name" id="name" value={isEdit? editTask.name:task} placeholder="Escribe la tarea"
                  className='form-control mb-2' autoComplete='off' onChange={isEdit?handleEdit:handleTask} />
                <button type="submit" className={isEdit? 'btn btn-warning btn-lg btn-block' :'btn btn-dark btn-lg btn-block'}>{isEdit? 'Guardar' :'Agregar'}</button>
            </div>
        </form>
    </div>
  );
};
