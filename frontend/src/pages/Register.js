import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        password2: ''
    });

    const {firstName, lastName, email, username, password, password2} = formData;

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

        if(password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                lastName, firstName, email, username, password
            }

            dispatch(register(userData))
        }
    }

    if(isLoading) {
        return <Spinner />
    }

  return (
    <div className='container flex flex-col items-center mx-auto h-screen justify-center max-w-screen bg-sky-200'>
        <Navbar />
        <div className='container flex flex-col items-center mx-auto h-screen justify-center max-w-screen'>
            <div className='border-4 rounded border-sky-500 shadow-2xl shadow-gray-900 h-7/8 w-1/4 bg-gray-100'>
                <p className='mb-1 text-xl p-4 text-blue-800 font-bold text-center font-mono'>Please create an account</p> 
                <form className='flex flex-col' onSubmit={onSubmit}>
                    <div>
                        <label className='text-center text-blue-800 font-mono' htmlFor='firstName'>First Name</label>
                        <input 
                            type="text" 
                            className="px-2 pt-3 font-mono w-full border-dashed border-blue-800 border-b-2 mb-2" 
                            id="firstName" 
                            name="firstName" 
                            value={firstName} 
                            placeholder='Enter your first name' 
                            onChange={onChange} 
                        />
                    </div>
                    
                    <div>
                    <label className='text-center text-blue-800 font-mono' htmlFor='lastName'>Last Name</label>
                        <input 
                            type="text" 
                            className="px-2 pt-3 font-mono w-full border-dashed border-blue-800 border-b-2 mb-2" 
                            id="lastName" 
                            name="lastName" 
                            value={lastName} 
                            placeholder='Enter your last name' 
                            onChange={onChange} 
                        />
                    </div>
                    
                    <div>
                        <label className='text-center text-blue-800 font-mono' htmlFor='email'>Email</label>
                        <input 
                            type="email" 
                            className="px-2 pt-3 font-mono w-full border-dashed border-blue-800 border-b-2 mb-2"
                            id="email" 
                            name="email" 
                            value={email} 
                            placeholder='Enter your email' 
                            onChange={onChange} 
                        />
                    </div>
                    
                    <div>
                        <label className='text-center text-blue-800 font-mono' htmlFor='username'>Username</label>
                        <input 
                            type="text" 
                            className="px-2 pt-3 font-mono w-full border-dashed border-blue-800 border-b-2 mb-2" 
                            id="username" 
                            name="username" 
                            value={username} 
                            placeholder='Create a username' 
                            onChange={onChange} 
                        />
                    </div>
                    
                    <div>
                        <label className='text-center text-blue-800 font-mono' htmlFor='password'>Password</label>
                        <input 
                            type="password" 
                            className="px-2 pt-3 font-mono w-full border-dashed border-blue-800 border-b-2 mb-2" 
                            id="password" 
                            name="password" 
                            value={password} 
                            placeholder='Create a password' 
                            onChange={onChange} 
                        />
                    </div>
                    
                    <div>
                    <label className='text-center text-blue-800 font-mono' htmlFor='password2'>Confirm Password</label>
                        <input 
                            type="password" 
                            className="px-2 pt-3 font-mono w-full border-dashed border-blue-800 border-b-2 mb-2" 
                            id="password2" 
                            name="password2" 
                            value={password2} 
                            placeholder='Confirm your password' 
                            onChange={onChange} 
                        />
                    </div>
                    
                    <button className='font-mono w-1/2 mx-auto font-bold text-blue-800 border-4 rounded border-sky-500 shadow-sm shadow-gray-900 py-2 bg-white hover:w-2/3 hover:py-3 hover:bg-blue-500 hover:text-white hover:border-blue-500 mt-2' type='submit'>
                        Submit
                    </button>
                </form>
                <p className='mt-4 text-center text-blue-800 font-mono'>Already have an account?</p>
                <p className='text-center text-blue-800 font-mono mb-1'> Click <Link to='/login' className='text-sky-500 hover:font-bold hover:text-sky-700'>here</Link> to login.</p>
            </div>
        </div>
    </div>
  )
}

export default Register;