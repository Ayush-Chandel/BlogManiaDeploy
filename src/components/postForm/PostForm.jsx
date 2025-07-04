import React, {useCallback, useEffect,useState} from 'react';
import { useForm } from 'react-hook-form';
import {Input, Select, Button, RTE} from '../index';
import firebaseService from '../../firebase/conf';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';



function PostForm({post}) {
 
  const [error, setError] = useState('');
  const dispatch = useDispatch();

    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || ''

        }
    });

  
    

    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    let publicCount = useSelector((state) => state.post.publicCount);
    
 
    

    const submit = async (data) => {
  
      
  
        if (post) {
         
          
           const fileId =  data.image[0] ? await firebaseService.uploadFile(data.image[0]) : null;

           if(fileId){ 
            await firebaseService.deleteFile(post.featuredImage)
           }

           

           const dbPost = await firebaseService.updatePost(
            post.$id,{
              ...data,
              featuredImage: fileId ? fileId : undefined
            }
           )

           if(dbPost){
               
                  navigate(`/post/${post.$id}`);
                
                
           }

           }else{

          
            setError('');

            const fileId = await firebaseService.uploadFile(data.image[0]);

            if(fileId){
              
              publicCount < 8 ? data.publicPost = true : data.publicPost = false
             
             

              data.featuredImage = fileId;
              const dbPost = await firebaseService.createPost({
                ...data,
                userId:  userData.uid
              });

              if(dbPost === 'same slug error'){
                 setError('Error!! : Please enter different slug either directly in slug field or by changing title')
              }else if(dbPost ){

                    
                      navigate(`/post/${data.slug}`)
                    

                
              }
              
            }
               
           }

    }


    const slugTransform = useCallback((value) => {

     
      
      if (value && typeof value === 'string') 
        return (
      value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d]+/g,'_')
      )
        
           
      

      return ''
      
    },[]);

    useEffect(() => {

      
      
      const subscription = watch((value,{name}) => {
        
       
        
        if (post === undefined && name === 'title') {
         
          
          setValue('slug', slugTransform(value.title), {
            shouldValidate: true
          });
        }
      }
      );

      return () => {
        subscription.unsubscribe();
      } 
      
      
    },[watch,slugTransform,setValue]
    )
    
   
    
 
  return (
    <form onSubmit={handleSubmit(submit)} className='w-full px-4 py-12 flex justify-center bg-[rgb(220,220,220)]'>
     <div className="flex flex-wrap  xl:gap-x-16  w-[95%] md:w-[95%] xl:w-4/5 mt-5 mb-8">
     {error && <p className='text-black mt-8 text-center w-full mb-6 '>{error}</p>}
    <div className="w-[92%] mx-auto md:w-[52%] xl:w-[62%] px-2">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            disabled={post ? true : false}
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
    </div>
    <div className="w-[92%] mx-auto md:w-[35%] xl:w-[30%] px-2 py-10 xl:py-0  ">
        <Input
            label={post ? "Update Featured Image :" : 'Add Featured Image :'}
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-6 flex flex-col items-center">
              <p className='w-full mb-4 text-base xl:text-xl'>Current Featured Image :</p>
                <img
                    src={firebaseService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg  w-full h-[170px] object-cover "
                />
            </div>
        )}
        
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full py-2 xl:mt-4">
            {post ? "Update" : "Submit"}
        </Button>
    </div>
     </div>
</form>
  )
}

export default PostForm
