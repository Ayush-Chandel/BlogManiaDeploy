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
    <div className='py-8 w-full'>
        
      <Container>
        <div className='flex flex-wrap'>
            {
            posts.map((post) => <div className='p-2 w-1/4' key={post.$id}> <PostCard {...post} /> </div>
            )
            }

        </div>
        
      </Container>
    </div>
  )
}

export default AllPosts
