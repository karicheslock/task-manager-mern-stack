import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {logout, reset} from '../features/auth/authSlice';


function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

  return (    
        <div className='container flex bg-gray-50 h-28 items-center'>  
            <div  className='px-10 text-4xl text-blue-700 font-mono font-bold whitespace-nowrap border-4 rounded border-sky-500 shadow-2xl shadow-gray-900 py-3 ml-5 bg-white mb-2'>             
                <Link to='/'>Task Manager ✔️</Link>
            </div>
                {user ? (
                    <div className='container flex px-10 items-center justify-end'>
                        <p className='border-4 rounded border-sky-500 shadow-2xl shadow-gray-900 py-2 ml-5 bg-white px-4 mb-2 text-blue-700 font-bold text-lg mt-2 mr-4'><Link to='/create-book'>Add a task</Link></p>
                        <button onClick={onLogout}>
                            <div className='flex px-5 items-center'>
                                <FaSignOutAlt className='text-blue-700' /> 
                                <p className='px-1 text-blue-800'>Logout</p>
                                
                            </div>
                        </button>
                    </div>
                ) : (
                    <div className='container flex justify-end px-10'>
                                                    
                        <Link to='/login'>
                            <div className='flex px-5 items-center font-mono font-bold whitespace-nowrap border-4 rounded border-sky-500 shadow-2xl shadow-gray-900 py-3 ml-5 bg-white'>
                                <FaSignInAlt className='text-blue-800' />
                                <p className='px-2 text-blue-600'>Login</p>
                            </div>
                        </Link>
                        
                        
                        <Link to='/register'>
                            <div className='flex px-5 items-center font-mono font-bold whitespace-nowrap border-4 rounded border-sky-500 shadow-2xl shadow-gray-900 py-3 ml-5 bg-white'>
                                <FaUser className='text-blue-800' /> 
                                <p className='px-2 text-blue-600'>Register</p>
                            </div>
                        </Link>
                        
                    </div>   
                )}
        </div>
    
  )
}

export default Navbar;