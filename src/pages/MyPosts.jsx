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

export default MyPosts;
