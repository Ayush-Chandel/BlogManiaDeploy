import React from 'react'
import myImage from '../assets/blogmania logo full.png';


function Logo({width = '100px'}) {
  return (
    <div >
      <img width={width} src={myImage} alt="logo" />
    </div>
  )
}

export default Logo
