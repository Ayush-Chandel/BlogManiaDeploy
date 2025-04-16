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
            className='inline-block text-base xl:text-xl mb-3  xl:mb-4 pl-1 ' 
            htmlFor={id} >
                {label}
                </label>}
                <input 
                type={type}
                className={ `px-3 py-[7px] xl:px-5 xl:py-[10px] text-base xl:text-xl rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border mb-2 xl:mb-4 border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
                 />
        </div>
    )
})

export default Input
