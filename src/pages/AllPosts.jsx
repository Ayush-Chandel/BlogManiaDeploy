import React, {useState, useEffect} from 'react'
import appwriteService from '../appwrite/conf';
import { PostCard, Container } from '../components';

function AllPosts() {

    const [posts,setPosts] = useState([]);

    useEffect(() => {
     
      
      
      appwriteService.getPosts([]).then((posts) => {
        
      if (posts) {
        
        
        setPosts(posts) 
      }
    }
    )

    },[]
    )

    

  return (
    <div className='pt-14 pb-10 w-full'>
        
      <Container>
      <div className='px-6'>
      <div className='flex justify-center mb-16'>
            <p className='  text-center text-6xl pb-3 border-b-2 border-slate-600 font-semibold text-red-600'>Articles</p>
          </div>
        <div className='pb-10 gap-x-14 gap-y-16 flex flex-wrap'>
            {
            posts.map((post) => <div className='w-[30%]' key={post.$id}> 
            <PostCard {...post} /> </div>
            )
            }

        </div>
      </div>
        
      </Container>
    </div>
  )
}

export default AllPosts
