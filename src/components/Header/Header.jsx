import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {

  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus
      
    },
    {
      name: 'My Posts',
      slug: '/my-posts',
      active: authStatus
      
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus
    }
  ]

  return (
    <header className='py-6  bg-[rgb(250,250,250)] border-b-[1px] border-black '>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-4'>
            <Link to='/'>
            <Logo width='300px' />
            </Link>
            
          </div>
          <ul className='flex items-center ml-auto mr-2'>
            {navItems.map((item) => item.active ? (<li key={item.name}>
                <button onClick={() => {
                  navigate(item.slug)
                }
                } className={`inline-block px-6 py-[10px] duration-200 hover:bg-blue-200 rounded-full hover:text-white mr-2 text-[22px] ${item.name === 'Signup' ? 'bg-red-600 text-white hover:bg-red-600 hover:opacity-50  ' : '' }`} >
                {item.name}
                </button>
                </li>)
                 : null
            )}
            {authStatus && (<li > <LogoutBtn /> </li>)}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
 