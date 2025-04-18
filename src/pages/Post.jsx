import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import firebaseService from "../firebase/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

import { where } from 'firebase/firestore';
import {updatePublic} from '../store/postSlice';
import { useDispatch } from 'react-redux';

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.uid : false;

    const dispatch = useDispatch();

    

    useEffect(() => {
       
        
        if (slug) {
            firebaseService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate,userData]);

    const deletePost = async () => {
      let status = await firebaseService.deletePost(post.$id);
            if (status) {
               const fileStatus =  await firebaseService.deleteFile(post.featuredImage);

               if (fileStatus) {

                if (post.publicPost) {

                    const posts = await firebaseService.getPosts([where('publicPost', '==', true)])
                    
                        if(posts){
                          dispatch(updatePublic([posts.length, posts]))
                          navigate(`/`)
                        }
                        
    
                    }else{
                      navigate(`/`)
                    }
               }
            }
       
    };

    return post ? (
        <div className="  py-8">
            <Container>

             <div className="pb-8">
             <div className=" my-10 mb-14 xl:mb-16">
                    <h1 className=" w-[93%] md:w-[65%] xl:w-[57%] mx-auto text-2xl xl:text-4xl font-bold">{post.title}</h1>
                </div>   
            <div className="w-full my-8 xl:my-12 flex justify-center">
            <div className=" flex w-[93%] md:w-[70%] xl:w-[65%] justify-center mb-4 relative  rounded-xl ">
                    <img
                        src={firebaseService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full h-[250px] md:h-[330px] xl:h-[500px] border p-3 object-cover bg-gray-500"
                    />

                    {isAuthor && (
                        <div className="flex gap-2 absolute right-8 top-10 shadow-2xl">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="  mr-3 shadow-lg px-[10px] xl:px-5 py-1  rounded-full shadow-black">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost} className="shadow-lg shadow-black py-1 px-[8px] xl:px-4">
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
            </div>
                
                <div className="w-full flex justify-center">
                <div className="w-[90%] md:w-[80%] xl:w-[70%]">
                    {parse(post.content)}
                </div>
                </div>
             </div>
            </Container>
        </div>
    ) : null;
}