
import React from 'react'
import { Link } from 'react-router-dom'
import {Logo} from '../index'

function Footer() {
  return (
    <section className="   bg-[rgb(250,250,250)]  border-t-[1px] border-t-black mt-auto">
    <div className=" mx-auto max-w-7xl px-4">
        <div className="w-full m-6 flex flex-wrap">
            <div className="w-full p-4 ">
                <div className="w-full flex h-full  justify-center items-center">
                    <div className="mb-4 inline-flex items-center">
                        <Link to='/'>
                                    <Logo className='w-[250px]' />
                        </Link>
                    </div>
                    <div className='border-r-[2px] border-black mx-8 self-stretch'></div>
                    <div>
                        <p className="text-sm text-gray-600 ">
                            &copy; Copyright 2025 BlogMania. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</section>
  )
}

export default Footer
