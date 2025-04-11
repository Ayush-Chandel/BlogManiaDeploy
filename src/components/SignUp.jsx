import React, {useState} from 'react';
import authService from '../appwrite/auth';
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
            if(userData) dispatch(login(userData));
            navigate('/')
          }
        } catch (error) {

            setError(error.message)
            
        }
      
    }
    

    
  return (
    <div className='flex items-center justify-center'>
      <div className={`mx-auto w-full max-w-lg  my-6 bg-gray-300 rounded-xl p-10 border border-black/10`} >

        <div className='mb-2 flex justify-center'>
        
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%'/>
                </span>
        
              </div>

              <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                                  Already have any account?&nbsp;
                                  <Link
                                      to="/login"
                                      className="font-medium text-primary transition-all duration-200 hover:underline"
                                  >
                                      Login
                                  </Link>
                      </p>
                      {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

        <form onSubmit={handleSubmit(create)}>
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
                className='w-full'
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
