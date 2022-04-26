import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getSingleTask} from '../features/tasks/taskSlice';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

function EditTaskForm() {
    const [newTaskData, setNewTaskData] = useState({
        taskText: '',
        date: new Date(),
        comments: '',
    });

    const {taskText, date, comments} = newTaskData;

    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(getSingleTask(id))
          .then(res => {
              setNewTaskData(res.payload)
          })
    }, [id, dispatch]);

    const onChange = (e) => {
        setNewTaskData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const newTaskData = {
            taskText,
            date,
            comments,
        }

        const token = user.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    
        await axios.put(`/api/tasks/edit-task/${id}`, newTaskData, config);

        navigate('/');
    }

    return (
        <div className='container flex flex-col items-center mx-auto h-screen justify-center max-w-screen bg-sky-100'>
            <Navbar/>
            <div className='container flex flex-col items-center mx-auto h-screen justify-center max-w-screen'>
                <div className='border-4 rounded border-sky-500 shadow-2xl shadow-gray-900 h-3/4 w-1/4 bg-gray-50'>
                    <form onSubmit={onSubmit} className='flex flex-col'>
                        
                        <label className='text-blue-800 font-mono pl-2 mt-2' htmlFor='taskText'>Task</label>
                        <input 
                            type='text' 
                            className="px-2 pt-3 font-mono w-full border-dashed border-blue-800 border-b-2 mb-2"
                            name='taskText'
                            id='taskText'
                            value={taskText}
                            onChange={onChange}
                        />
                        
                        <label className='text-blue-800 font-mono pl-2 mt-2' htmlFor='date'>Date</label>
                        <input 
                            type='date' 
                            className="px-2 pt-3 font-mono w-full border-dashed border-blue-800 border-b-2 mb-2"
                            name='date'
                            id='date'
                            value={date}
                            onChange={onChange}
                        />
                        
                        <label className='text-blue-800 font-mono pl-2 mt-2' htmlFor='comments'>Comments</label>
                        <textarea 
                            type='text'
                            className='px-2 pt-3 font-mono w-full border-dashed border-blue-800 border-b-2 mb-2 h-32' 
                            name='comments'
                            id='comments'
                            value={comments}
                            onChange={onChange}
                        />
                        
                        
                        
                        <button type='submit' className='border-4 rounded border-sky-500 py-2 ml-5 bg-white px-4 mb-8 text-blue-700 font-bold font-mono text-lg mt-2 mr-4 hover:px-6 hover:py-4 hover:text-2xl'>
                            Save Changes
                        </button>
                        <div className='mx-auto'><Link to='/'><p className='text-rose-500 hover:text-lg'>Cancel</p></Link></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditTaskForm;