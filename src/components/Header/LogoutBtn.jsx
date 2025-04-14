import React from 'react'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'

function LogoutBtn({className = ''}) {

  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout()
    .then(() => {
      dispatch(logout())
    }
    )
  }
  


  return (
   <button onClick={logoutHandler} className={`inline-block px-6 py-2 duration-200 rounded-full bg-red-600 text-white  hover:opacity-50 text-[22px] ${className}`}>Logout</button>
  )
}

export default LogoutBtn
