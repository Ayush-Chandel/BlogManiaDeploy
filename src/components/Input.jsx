import React, {forwardRef, useId} from 'react'



const Input = forwardRef(function Input (
   {
    label,
    type = 'text',
    className = '',
    ...props
   },ref
){
    const id = useId();

    return (
        <div className='w-full '>
            {label && <label 
            className='inline-block text-xl mb-4 pl-1 ' 
            htmlFor={id} >
                {label}
                </label>}
                <input 
                type={type}
                className={ ` px-5 py-[10px] text-xl rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border mb-8 border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
                 />
        </div>
    )
})

export default Input
