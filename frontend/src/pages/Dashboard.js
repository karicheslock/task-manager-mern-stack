import {useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import TaskItem from '../components/TaskItem';
import Spinner from '../components/Spinner';
import {getTasks, reset} from '../features/tasks/taskSlice';
import Navbar from '../components/Navbar';

function Dashboard() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth);
  const {tasks, isLoading, isError, message} = useSelector((state) => state.tasks); 

  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getTasks());

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner />
  }
  
  return (
    <div className='container flex flex-col items-center mx-auto justify-center max-w-screen bg-sky-200'>
      <Navbar />
      <div className='container flex flex-col items-center mx-auto min-h-screen max-w-screen'>
        <div className='mt-8 mb-8 text-4xl text-blue-700 font-mono font-bold whitespace-nowrap border-4 rounded border-sky-500 shadow-2xl shadow-gray-900 bg-white px-4 py-3 font-bold'>
          <p className='mb-4'>📋  Welcome to your Personal Task Manager, {user && user.firstName}! 📋 </p>
        </div>
        
      
        {tasks.length > 0 ? (
          <div>
            <div className='container flex flex-wrap justify-center items-center'>
              {tasks.map((task) => (
                <div className='w-1/4 m-1.5 h-48'>
                <TaskItem key={task._id} task={task} />
                </div>
              ))}
            </div>
            <div className='flex justify-center'>
              <p className='border-4 rounded border-sky-500 shadow-lg shadow-gray-900 py-2 ml-5 bg-white px-4 mb-2 text-blue-700 font-bold font-mono text-xl mr-4 hover:px-6 hover:py-4 hover:text-2xl mt-4 text-center w-1/4'><Link to='/create-task'>Add another task</Link></p>
            </div>
          </div>
        ) : (
          <div className='container flex flex-col items-center justify-center'>
            
            <div className='text-xl text-blue-700 font-mono font-bold whitespace-nowrap border-4 rounded border-sky-500 shadow-2xl shadow-gray-900 bg-white px-4 py-3 font-bold flex flex-col items-center mt-4'>
            <p className='font-mono text-2xl mb-2 px-6 py-8 text-blue-700 font-bold'>Time to start getting organized!</p>
              <p className='border-4 rounded border-sky-500 shadow-lg shadow-gray-900 py-2 ml-5 bg-white px-4 mb-2 text-blue-700 font-bold font-mono text-xl mr-4 hover:px-6 hover:py-4 hover:text-2xl'><Link to='/create-task'>Add a task</Link></p> <p className='mt-6'>to get started.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard;