import React from 'react'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'

function LogoutBtn({className = '', setVisible, visible}) {

  const dispatch = useDispatch();

  const logoutHandler = () => {
    
    if(visible){
      setVisible(false)
    }

    authService.logout()
    .then(() => {
      dispatch(logout())
    }
    )
  }
  


  return (
   <button onClick={logoutHandler} className={`inline-block xl:px-6 xl:py-2 duration-200 rounded-full bg-red-600 text-white  hover:opacity-50 xl:text-[22px] ${className}`}>Logout</button>
  )
}

export default LogoutBtn
