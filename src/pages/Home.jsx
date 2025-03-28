import React, {useEffect, useState} from 'react';
import appwriteService from '../appwrite/conf';
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';


function Home() {
    const [posts, setPosts] = useState(false);

    const authStatus = useSelector((state) => state.status);

    
    useEffect(() => {
      appwriteService.getPosts().then((posts) => {

        if(posts){
           setPosts(posts); 
        }else{
            setPosts(false);
        }
        
      }
      )
    }
    ,[authStatus])

    if(posts === false){
        return (
        <div className='w-full py-8 text-center mt-4'>
            <Container>
                <div className='flex flex-wrap '>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold
                         hover:text-gray-600'>
                            Login to read posts
                        </h1>
                    </div>
                </div> 
            </Container>
        </div>
        )
    }
    else if(posts.length === 0){
        return (
        <div className='w-full py-8 text-center mt-4'>
            <Container>
                <div className='flex flex-wrap '>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold
                         hover:text-gray-600'>
                            No Posts to show
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>)
                    )}
                </div>
            
            </Container>   
        </div>
        
    )
    
  
}

export default Home
