import React from 'react';
import {Editor} from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import config from '../config/config';

export default function RTE({name, control, label, defaultValue = ''}) {
  return (
    <div className='w-full'>
      {label && <label  className='inline-block  text-base xl:text-xl mb-3 xl:mb-5 pl-1'>{label}</label>}

        <Controller 
        name={name || 'content'}
        control={control}
        render={
          ({field: {onChange}}) => (
           <div className=' h-[350px] xl:h-[500px]'>
             <Editor 
            initialValue={defaultValue}
            apiKey={config.tinyMceApiKey}
            init={{
                
                height: '100%',
                menubar: true,
                plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                ],
                toolbar:
                "undo redo | blocks | fontsize|  bold italic forecolor | image | alignleft aligncenter  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help"
                
            }}
            onEditorChange={onChange}
            />
           </div>
        )} 

         />

       
    </div>
  )
}


