import React, {useState, useEffect} from 'react'
import firebaseService from '../firebase/conf';
import { PostCard, Container } from '../components';

function AllPosts() {

    const [posts,setPosts] = useState([]);

    useEffect(() => {
     
      
      
      firebaseService.getPosts([]).then((posts) => {
        
      if (posts) {
        
        
        setPosts(posts) 
      }
    }
    )

    },[]
    )

    if(posts.length === 0){
      return (
      <div className='w-full py-8 text-center mt-4'>
       
             
              <div className='flex flex-wrap '>
                  <div className='p-2 w-full'>
                      <h1 className='text-2xl font-bold
                       hover:text-gray-600'>
                          No Posts to show
                      </h1>
                  </div>
              </div>
             
       
      </div>
      )
  }

    

  return (
    <div className='pt-14 pb-10 w-full'>
        
      <Container>
      <div className='px-6'>
      <div className='flex justify-center mb-16'>
            <p className='  text-center text-3xl xl:text-6xl pb-3 border-b-2 border-slate-600 font-semibold text-red-600'>Articles</p>
          </div>
        <div className='pb-10 gap-x-14 gap-y-16 flex flex-wrap justify-center xl:justify-start'>
            {
            posts.map((post) => <div className='min-w-[290px] w-[30%]' key={post.$id}> 
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
