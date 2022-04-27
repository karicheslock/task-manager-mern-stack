import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { deleteTask } from '../features/tasks/taskSlice';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

function TaskItem({task}) {
    const [isToDoChecked, setIsToDoChecked] = useState(true);
    const [isDoingChecked, setIsDoingChecked] = useState(false);
    const [isDoneChecked, setIsDoneChecked] = useState(false);

    const dispatch = useDispatch();

    const handleToDoChange = () => {
      setIsToDoChecked(!isToDoChecked);
      setIsDoingChecked(false);
      setIsDoneChecked(false);
    }

    const handleDoingChange = () => {
      setIsDoingChecked(!isDoingChecked);
      setIsToDoChecked(false);
      setIsDoneChecked(false);
    }

    const handleDoneChange = () => {
      setIsDoneChecked(!isDoneChecked);
      setIsToDoChecked(false);
      setIsDoingChecked(false);
    }


  return (
    <div className={`container flex flex-col bg-white mb-4 font-mono border-4 ${isToDoChecked && 'border-sky-500 text-blue-700'} ${isDoingChecked && 'border-green-500 text-green-700'} ${isDoneChecked && 'border-gray-200 text-gray-300'} rounded shadow-2xl shadow-gray-900 max-w-md h-full`}>
        <p className='border-b-2 border-solid border-gray-300 px-1.5 pt-1.5'>Task: {task.taskText}</p>
        <p className='border-b-2 border-solid border-gray-300 px-1.5 pt-1.5'>Date: {format(new Date(task.date), 'MM/dd/yyyy')}</p>
        <p className= 'border-b-2 border-solid border-gray-300 px-1.5 pt-1.5'>Comments: {task.comments}</p>
      
        <div className='flex justify-between mt-2 px-1'>
          <div className='to-do'>
            <input 
              type='checkbox'
              id='to-do'
              name='to-do'
              value='to-do'
              checked={isToDoChecked}
              onChange={handleToDoChange}
            /> To Do
          </div>

          <div className='doing'>
            <input 
              type='checkbox'
              id='doing'
              name='doing'
              value='doing'
              checked={isDoingChecked}
              onChange={handleDoingChange}
            /> Doing
          </div>

          <div className='done'>
            <input 
              type='checkbox'
              id='done'
              name='done'
              value='done'
              checked={isDoneChecked}
              onChange={handleDoneChange}
            /> Done
          </div>
          <div className='flex'>
            <Link to={'/edit-task/' + task._id} className='pl-6'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
            </Link>

            <button className='px-1' onClick={() => dispatch(deleteTask(task._id))}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </button>
          </div>
        </div>
      
    </div>
  )
}

export default TaskItem;