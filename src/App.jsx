import { useState, useEffect } from 'react';

import {useDispatch} from 'react-redux';
import './App.css'

import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header } from './components';
import { Footer } from './components';
import {Outlet} from 'react-router-dom';
import appwriteService from './appwrite/conf';
import { where } from 'firebase/firestore';
import {updatePublic} from './store/postSlice';
import loadGif from './assets/loading-loading-forever.gif'





function App() {
 
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch()

 
  

  useEffect(() => {

    authService.getCurrentUser()
    .then((userData) => {
      
  
      if(userData){
        dispatch(login({userData}));

      }else{
        dispatch(logout())
        
      }
    }
    )
    .finally(() => {

      
      appwriteService.getPosts([where('publicPost', '==', true)]).then((posts) => {

        if(posts){
            dispatch(updatePublic([posts.length, posts]))
          setLoading(false);  
        }
            }
            );

            // setLoading(false);  

          
    }
      
    )
    
    
  },[]
  )

  
  // useEffect(() => {

  //   authService.getCurrentUser()
  //   .then((userData) => {
      
  
  //     if(userData){
  //       dispatch(login({userData}));

  //     }else{
  //       dispatch(logout())
        
  //     }
  //   }
  //   )
  //   .finally(() => setLoading(false)
  //   )
    
    
  // },[]
  // )

  
  
  return !loading ? (
    <div className=' min-h-screen flex flex-wrap content-between bg-[rgb(250,250,250)] '>
      <div className='w-full block'>

        <Header />
        <main >
         
         <Outlet />
        </main>
        <Footer/>

      </div>
      </div>
  ) : <div className='h-[100vh] flex justify-center items-center'>
    <img src={loadGif} className='w-[50px] h-[50px]' alt="" />
    
  </div>
}

export default App
 