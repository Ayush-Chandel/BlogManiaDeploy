import React from 'react'

function Button({
    children,
    type = 'button', 
    bgColor = 'bg-blue-700',
    textColor = 'text-white',
    className = '',
    ...props

}) {

 
  
  return (
    <button type={type} className={`  xl:py-2 text-[12px] xl:text-xl rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
