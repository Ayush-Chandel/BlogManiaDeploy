import { useState, useEffect } from 'react';

import {useDispatch} from 'react-redux';
import './App.css'

import authService from './firebase/auth';
import { login, logout } from './store/authSlice';
import { Header } from './components';
import { Footer } from './components';
import {Outlet} from 'react-router-dom';
import firebaseService from './firebase/conf';
import {  collection, onSnapshot, query, where } from 'firebase/firestore';

import {createPublic,updatePublic, deletePublic} from './store/postSlice';
import loadGif from './assets/loading-loading-forever.gif'
import config from "./config/config";





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

      const q = query(collection(firebaseService.db, config.firebaseCollectionId), where("publicPost", "==", true));

      onSnapshot(q, (documents) => {

        
        
        
      documents.docChanges().forEach(change => {

        const post = {
          $id: change.doc.id,
          ...change.doc.data()
        }

        if (change.type === "added") {
          dispatch(createPublic(post));
        } else if (change.type === "modified") {
          dispatch(updatePublic(post));
        } else if (change.type === "removed") {
          dispatch(deletePublic(post));
        }
        
      });;
      
        setLoading(false);
      }
      )
      
    

          
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
      <div className='w-full  min-h-screen flex flex-col'>

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
 