import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function HomeWrapper({children}) {
    
    const status = useSelector((state) => state.auth.status
    )

  return (
    <div className='w-full max-w-8xl mx-auto  '> 

     <div className='w-full  flex flex-col gap-y-10 xl:flex-row justify-between mb-14 border-b-[1px] border-black px-12 py-12 items-center'>

     <div className=' text-[50px] xl:text-[105px]  leading-none text-center text-nowrap   '>
       <p>Welcome to</p>
       <p className='[text-shadow:_2px_2px_8px_black] mt-3 text-white'>BlogMania</p>
      </div>

     <div className='border-b-[2px] xl:border-r-[2px] border-black mx-8 self-stretch'></div>

     <p className=' text-black text-center text-[16px] xl:text-[23px] '>Your go-to destination for insightful articles, fresh ideas, and engaging stories. Whether you're here for inspiration, knowledge, or just a good read, we've got something for everyone. Explore, discover, and stay curious!</p>
     </div>
      
      <div className='px-12'>
        
          <div className='flex justify-center mb-16'>
            <p className='  text-center text-3xl xl:text-6xl pb-3 border-b-2 border-slate-600 font-semibold text-slate-500'>Top Articles</p>
          </div>
          

          {children}

            {!status ? <p className=' text-[1rem] px-5 xl:px-0 xl:text-[1.5rem]'>
            <Link className='inline-block px-2 text-red-600 ' to='/login'>Login</Link>
            or 
            <Link className='inline-block px-2 text-red-600 ' to='/signup'>Signup</Link>
            to read more and create even your own articles.
          </p> : null
          }
      </div>
      
    </div>
    
  )
}

export default HomeWrapper;
