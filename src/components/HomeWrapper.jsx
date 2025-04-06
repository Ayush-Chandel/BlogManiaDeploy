import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function HomeWrapper({children}) {
    
    const status = useSelector((state) => state.auth.status
    )

  return (
    <div className='w-full max-w-7xl mx-auto px-4'> 
       
      <p className='bg-white text-black'>Welcome to <span className='text-blue-500'>BlogMania</span>, your go-to destination for insightful articles, fresh ideas, and engaging stories. Whether you're here for inspiration, knowledge, or just a good read, we've got something for everyone. Explore, discover, and stay curious!</p>

      <p>Read some of our posts</p>

      {children}

        {!status ? <p>
        <Link className='inline-block px-1 text-white' to='/login'>Login</Link>
         or 
         <Link className='inline-block px-1 text-white' to='/signup'>Signup</Link>
         to read more and create even your own articles
      </p> : null
     }
      
    </div>
    
  )
}

export default HomeWrapper;
