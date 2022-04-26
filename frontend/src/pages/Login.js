import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const {username, password} = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message} = useSelector( (state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset());

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            username,
            password
        }

        dispatch(login(userData));
    }

    if(isLoading) {
        return <Spinner />
    }

  return (
    <div className='container flex flex-col items-center mx-auto h-screen justify-center max-w-screen bg-sky-100'>
        <Navbar />
        <div className='container flex flex-col items-center mx-auto h-screen justify-center max-w-screen'>
            <div className='border-4 rounded border-sky-500 shadow-2xl shadow-gray-900 h-2/3 w-1/4 bg-gray-50'>
                <p className='mb-6 text-xl p-4 text-blue-700 text-center font-mono font-bold text-3xl'>Login to continue adding tasks</p>
                <form className='flex flex-col' onSubmit={onSubmit}>
                <label className='text-blue-800 font-mono pl-2' htmlFor='username'>Username</label>
                    <input 
                        type="text"
                        className="px-2 pt-3 font-mono w-full border-dashed border-blue-800 border-b-2 mb-2"
                        id="username" 
                        name="username" 
                        value={username} 
                        placeholder='Enter your username' 
                        onChange={onChange} 
                    />
                    <label className='text-blue-800 font-mono mt-2 pl-2' htmlFor='password'>Password</label> 
                    <input 
                        type="password" 
                        className="px-2 pt-3 font-mono w-full border-dashed border-blue-800 border-b-2 mb-2" 
                        id="password" 
                        name="password" 
                        value={password} 
                        placeholder='Enter your password' 
                        onChange={onChange} 
                    />
                                  
                    <button className='font-mono w-1/2 mx-auto font-bold text-blue-800 border-4 rounded border-sky-500 shadow-sm shadow-gray-900 py-2 bg-white hover:w-2/3 hover:py-3 hover:bg-blue-500 hover:text-white hover:border-blue-500 mt-2' type='submit'>
                        Login
                    </button>   
                </form>
                <p className='mt-8 text-center text-blue-800 font-mono'>Need an account? Click <Link to='/register' className='text-sky-500 hover:font-bold hover:text-sky-700'>here</Link> to register.</p>
            </div>
        </div>
    </div>
  )
}

export default Login;