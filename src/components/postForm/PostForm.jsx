import React, {useCallback, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import {Input, Select, Button, RTE} from '../index';
import appwriteService from '../../appwrite/conf';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authService from '../../appwrite/auth';


function PostForm({post}) {
 
  

    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active'

        }
    });

    const navigate = useNavigate();

    const userData = useSelector((state) => state.userData);
    
    

    const submit = async (data) => {
  
      
        if (post) {
         
          
           const fileId =  data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

           if(fileId){ 
            await appwriteService.deleteFile(post.featuredImage)
           }

           const dbPost = await appwriteService.updatePost(
            post.$id,{
              ...data,
              featuredImage: fileId ? fileId : undefined
            }
           )

           if(dbPost){
            navigate(`/post/${post.$id}`)
           }

           }else{

            const fileId = await appwriteService.uploadFile(data.image[0]);

            if(fileId){

              data.featuredImage = fileId;
              const dbPost = await appwriteService.createPost({
                ...data,
                userId:  userData.uid
              });
              
              if(dbPost){
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
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
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
    <div className="w-1/3 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={appwriteService.getFilePreview(post.featuredImage,50)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
        </Button>
    </div>
</form>
  )
}

export default PostForm
