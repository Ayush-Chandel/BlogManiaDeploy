import React, {useState} from 'react';
import authService from '../firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../store/authSlice';
import {Button, Logo, Input } from './index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function SignUp() {

    const [error, setError] = useState('');
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const create = async (data) => {

        setError('');

        try {
          const sessionData =  await authService.createAccount(data);

          if(sessionData){
            const userData = await authService.getCurrentUser();
            if(userData) dispatch(login({userData}));
            navigate('/')
          }
        } catch (error) {

            setError(error.message)
            
        }
      
    }
    

    
  return (
    <div className='flex items-center justify-center'>
      <div className={`mx-auto w-full max-w-sm xl:max-w-lg  my-6 bg-gray-300 rounded-xl p-10 border border-black/10`} >

        <div className='mb-2 hidden xl:flex justify-center'>
        
                <span className='inline-block w-full max-w-[150px]'>
                    <Logo className='w-full'/>
                </span>
        
              </div>

              <h2 className='text-center text-2xl xl:text-3xl font-bold leading-tight'>Sign up to create account</h2>
                    <p className="mt-2 text-center text-sm xl:text-lg text-black/60">
                                  Already have any account?&nbsp;
                                  <Link
                                      to="/login"
                                      className="font-medium text-primary transition-all duration-200 hover:underline text-red-500"
                                  >
                                      Login
                                  </Link>
                      </p>
                      {error && <p className='text-red-600 mt-3 xl:mt-8 text-sm xl:text-lg text-center'>{error}</p>}

        <form onSubmit={handleSubmit(create)} className='mt-8'>
            <div className='space-y-5'>

                {/* <Input 
                label='Full Name: ' 
                placeholder='Enter your full name'
                {...register('name',{
                    required: true
                })}
                 /> */}

                <Input
                 label='Email '
                 placeholder= 'Enter your email'
                 type='email' 
                 {...register('email',{
                    required: true,
                    validate: {
                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address"
                }
                })} />

                <Input 
                label='Password '
                placeholder='Enter your password'
                type='password' 
                {...register('password' , {
                required: true
                })} />

                <Button
                type='submit' 
                className='w-full py-2'
                >
                Sign Up
                </Button>
            </div>
            

        </form>

            
      </div>
    </div>
  )
}

export default SignUp
