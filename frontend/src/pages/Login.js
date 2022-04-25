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
    <div className='container flex flex-col items-center mx-auto h-screen justify-center max-w-screen bg-teal-500'>
        <Navbar />
        <div className='container flex flex-col items-center mx-auto h-screen justify-center max-w-screen'>
            <div className='border-dashed border-sky-300 border-2 rounded h-2/3 w-1/4 bg-amber-50'>
                <p className='mb-6 text-xl p-4 text-slate-400 text-center font-mono'>Login and continue creating your reading journal</p>
                <form className='flex flex-col' onSubmit={onSubmit}>
                    <input 
                        type="text"
                        className="px-3 pt-5 font-mono"
                        id="username" 
                        name="username" 
                        value={username} 
                        placeholder='Enter your username' 
                        onChange={onChange} 
                    />
                    <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' htmlFor='username'>Username</label>
                    <input 
                        type="password" 
                        className="px-3 pt-5 font-mono" 
                        id="password" 
                        name="password" 
                        value={password} 
                        placeholder='Enter your password' 
                        onChange={onChange} 
                    />
                    <label className='text-center text-slate-400 border-t-2 border-dashed border-sky-200 font-mono' htmlFor='password'>Password</label>               
                    <button className='font-mono w-1/2 mx-auto py-2 border-solid border-slate-300 border-2 rounded mt-12 text-teal-700 font-bold bg-slate-50 hover:w-2/3 hover:py-3 hover:bg-slate-100' type='submit'>
                        Login
                    </button>   
                </form>
                <p className='mt-8 text-center text-slate-400 font-mono'>Need an account? Click <Link to='/register' className='text-teal-500 hover:font-bold hover:text-teal-700'>here</Link> to register.</p>
            </div>
        </div>
    </div>
  )
}

export default Login;