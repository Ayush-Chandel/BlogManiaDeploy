import React from 'react'
import myImage from '../assets/blogmania-high-resolution-logo-transparent.png';


function Logo({width = '100px'}) {
  return (
    <div >
      <img width={width} src={myImage} alt="logo" />
    </div>
  )
}

export default Logo
