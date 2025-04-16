import React, {forwardRef, useId} from 'react'

function Select({
    options,
    label,
    className = '',
    ...props
},ref) {
    const id = useId();
  return (
    <div className='w-full'>
      {label && <label htmlFor={id} className=''></label>}
      <select id={id} {...props} ref={ref} className={` px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border text-base xl:text-xl mb-8 border-gray-200 w-full  ${className}`}>
        {options?.map((item) => (<option key={item} value={item}>{item}</option>)
        )}
      </select>
    </div>
  )
}

export default forwardRef(Select)
 