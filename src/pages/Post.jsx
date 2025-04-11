import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
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
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate,userData]);

    const deletePost = async () => {
      let status = await appwriteService.deletePost(post.$id);
            if (status) {
               const fileStatus =  await appwriteService.deleteFile(post.featuredImage);

               if (fileStatus) {

                if (post.publicPost) {

                    const posts = await appwriteService.getPosts([where('publicPost', '==', true)])
                    
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

             <div className="pb-6">
             <div className=" my-6">
                    <h1 className="w-[53%] mx-auto text-3xl font-bold">{post.title}</h1>
                </div>   
            <div className="w-full my-12 flex justify-center">
            <div className=" flex w-3/5 justify-center mb-4 relative  rounded-xl ">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full  h-[400px] border p-3 object-cover bg-gray-500"
                    />

                    {isAuthor && (
                        <div className="flex gap-2 absolute right-8 top-10 shadow-">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3 shadow-lg shadow-black">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost} className="shadow-lg shadow-black">
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
            </div>
                
                <div className="w-full flex justify-center">
                <div className="w-4/5">
                    {parse(post.content)}
                </div>
                </div>
             </div>
            </Container>
        </div>
    ) : null;
}