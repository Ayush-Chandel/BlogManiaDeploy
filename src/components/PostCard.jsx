import React from 'react';
import firebaseService from '../firebase/conf';
import { Link } from 'react-router-dom';

function PostCard({
    $id, title, featuredImage, 
}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-400 rounded-xl p-4'>
      <div className='w-full   '>

        <img  src={firebaseService.getFilePreview(featuredImage, 50)} 
        alt={title} 
        className='rounded-xl w-full h-[180px] xl:h-[210px] object-cover' />

      </div>
      <h2  className='  text-[20px] xl:text-2xl mt-4 mb-1 font-bold truncate'> {title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
