import React from 'react'
import myImage from '../assets/blogmania logo full.png';


function Logo({className = 'w-[100px]'}) {
  return (
    <div >
      <img className={className} src={myImage} alt="logo" />
    </div>
  )
}

export default Logo
