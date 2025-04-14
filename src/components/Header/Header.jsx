import React,{useState} from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {

  const authStatus = useSelector((state) => state.auth.status);

  const [visible, setVisible] = useState(false);

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
        
        <nav>
           {/* Mavbar for Mobile */}

        <div className={ `w-full h-screen  bg-[rgba(150,150,150,0.5)]  ${visible ? 'left-0 '  : ' -left-full' } top-0 transition-all duration-200  xl:hidden fixed z-10`} >
          
          <div className='w-4/5  bg-slate-400' >

          <div className='mr-4'>
            <Link to='/'>
            <Logo className=' w-[200px] '/>
            </Link>
            
          </div>
          <div  onClick={() => {

           setVisible(false)

          }
          } >
           
            <svg className='w-[60px] h-[60px] text-white'  id="Layer_1"  version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path fill='currentColor' d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/>
            </svg>

          </div>

          <div  >  
          <ul className='flex-col items-center ml-auto mr-2'>
            {navItems.map((item) => item.active ? (<li key={item.name}>
                <button onClick={() => {
                  navigate(item.slug)
                }
                } className={`inline-block px-6 py-[10px] duration-200 hover:bg-blue-200 rounded-full hover:text-white mr-2 text-[22px] `} >
                {item.name}
                </button>
                </li>)
                 : null
            )}
            {authStatus && (<li > <LogoutBtn className='ml-4' /> </li>)}
          </ul>
          </div>
          </div>
         
        </div>

        {/* Mavbar for Pc */}
        <div className='flex items-center justify-between'>
          <div className='mr-4'>
            <Link to='/'>
            <Logo className=' w-[200px] xl:w-[300px]'/>
            </Link>
            
          </div>
          <div className='  xl:hidden ' onClick={() => {

           setVisible(true)

          }
          } >
            <svg className='w-[60px] h-[60px] pr-4' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  viewBox="0 0 50 50">
              <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
            </svg>
          </div>

          <div className='w-full hidden   xl:flex items-center'>  
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
          </div>
        </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header
 