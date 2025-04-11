import React, {useState, useEffect} from 'react'
import appwriteService from '../appwrite/conf';
import { PostCard, Container } from '../components';
import { useSelector } from 'react-redux';
import { where } from 'firebase/firestore';

function MyPosts() {

    const [posts,setPosts] = useState([]);

   const userId = useSelector((state) => state.auth.userData?.uid)

   
   
    useEffect(() => {
      
      appwriteService.getPosts([where('userId', '==', userId)]).then((posts) => {
        
      if (posts) {
        
        
        setPosts(posts) 
      }
    }
    )

    },[]
    )

    

  return (
    <div className='py-8 w-full'>
        
      <Container>
        <div className='px-4'>
              <div className='flex justify-center mb-12'>
                    <p className='  text-center text-5xl pb-3 border-b-2 border-slate-600 font-semibold text-red-600'>My Articles</p>
                  </div>
                <div className='pb-6 gap-x-8 gap-y-10 flex flex-wrap'>
                    {
                    posts.map((post) => <div className='w-[31%]' key={post.$id}> 
                    <PostCard {...post} /> </div>
                    )
                    }
        
                </div>
              </div>
        
      </Container>
    </div>
  )
}

export default MyPosts;
