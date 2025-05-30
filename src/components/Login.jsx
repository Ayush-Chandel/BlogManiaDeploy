import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import {Button,  Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import  authService  from '../firebase/auth';
import {useForm} from 'react-hook-form'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    const login = async (data) => {
      
      
        setError('');
        try {
          const session =  await authService.login(data);
          if (session) {
            const userData = await authService.getCurrentUser();
          
            if(userData) dispatch(authLogin({userData}));
            
            navigate('/')
          } 
        } catch (error) {
            setError(error.message);  
        }
    }

  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto my-6 w-full max-w-sm xl:max-w-lg bg-gray-300 rounded-xl p-10 border border-black/10`}>
      <div className='mb-2 hidden xl:flex justify-center '>

        <span className='inline-block w-full max-w-[150px]'>
            <Logo  className='w-full'/>
        </span>

      </div>
      <h2 className='text-center text-2xl xl:text-3xl font-bold leading-tight'>Log in to your account</h2>
      <p className="mt-2 text-center text-sm xl:text-lg text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-red-500"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className='text-red-600 mt-3 xl:mt-8 text-center text-sm xl:text-lg'>{error}</p>}
        
        {/* Form starts from here */}
        
        <form onSubmit={handleSubmit(login)} className='mt-8'>

            <div className='space-y-5'>
              
                <Input 
                label='Email '
                placeholder= 'Enter your email'
                 type='email'
                 {...register('email',{
                  required: true,
                  validate: {
                    matchPattern: (value) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address"
                  }
                 })}
                 />

                 <Input 
                 label='Password '
                 placeholder='Enter your password'
                 type='password'
                 {...register(
                  'password',{
                    required: true,
                  }
                 )}
                  />

                  <Button 
                  type='submit' 
                  className='w-full py-2 '
                  >
                    Log In
                  </Button>

            </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
