
import React, {useEffect, useState} from 'react';
import appwriteService from '../appwrite/conf';
import { Container, PostCard, HomeWrapper} from '../components';
import { useSelector } from 'react-redux';
import { where } from 'firebase/firestore';
import {updatePublic} from '../store/postSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';



function Home() {
    // const [posts, setPosts] = useState(false);
    // const dispatch = useDispatch();

    const posts = useSelector((state) => state.post.publicPosts);

    
    
    // useEffect(() => {
        
    //             appwriteService.getPosts([where('public', '==', true)]).then((posts) => {

    //             if(posts){
    //                 dispatch(updatePublic([posts.length, posts]))
    //                setPosts(posts); 
    //             }
    //                 }
    //                 )
        
    // }
    // ,[])
    // // ,[authStatus])

    // if(posts === false){
    //     return (
    //     <div className='w-full py-8 text-center mt-4'>
    //         <Container>
    //             <div className='flex flex-wrap '>
    //                 <div className='p-2 w-full'>
    //                     <h1 className='text-2xl font-bold
    //                      hover:text-gray-600'>
    //                        ...Loading
    //                     </h1>
    //                 </div>
    //             </div> 
    //         </Container>
    //     </div>
    //     )
    // }
    // else

     if(posts.length === 0){
        return (
        <div className='w-full py-8 text-center mt-4'>
         
                <HomeWrapper>
                <div className='flex flex-wrap '>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold
                         hover:text-gray-600'>
                            No Posts to show
                        </h1>
                    </div>
                </div>
                </HomeWrapper>
         
        </div>
        )
    }

    return (
        <div className='w-full py-8'>
           
                <HomeWrapper>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                            
                        </div>)
                    )}
                    <div key={'thisisakeyforcard'} className='p-2 w-1/4'>
                    
                            <Link to={'/all-posts'}>
                            <div className='w-full bg-gray-100 rounded-xl p-4'>
                            <div className='w-full  justify-center mb-4'>

                                <p className='rounded-xl px-2 py-8 bg-orange-800 text-center text-6xl text-slate-300' >Read More</p>

                            </div>
                            <h2  className='text-xl font-bold'> Click here to read more</h2>
                            </div>
                            </Link>
                            
                    </div>
                </div>
                </HomeWrapper>
            
          
        </div>
        
    )
    
  
}

export default Home


// import React, {useEffect, useState} from 'react';
// import appwriteService from '../appwrite/conf';
// import { Container, PostCard } from '../components';
// import { useSelector } from 'react-redux';
// import { where } from 'firebase/firestore';


// function Home() {
//     const [posts, setPosts] = useState(false);

//     const authStatus = useSelector((state) => state.status);

    
//     useEffect(() => {
//         if(authStatus){
//                 appwriteService.getPosts().then((posts) => {

//                 if(posts){
//                 setPosts(posts); 
//                 }
//                     }
//                     )
//         }else{
//                 appwriteService.getPosts([where('public', '==', true)]).then((posts) => {

//                 if(posts){
//                    setPosts(posts); 
//                 }
//                     }
//                     )
//         }
//     }
//     ,[authStatus])

//     if(posts === false){
//         return (
//         <div className='w-full py-8 text-center mt-4'>
//             <Container>
//                 <div className='flex flex-wrap '>
//                     <div className='p-2 w-full'>
//                         <h1 className='text-2xl font-bold
//                          hover:text-gray-600'>
//                            ...Loading
//                         </h1>
//                     </div>
//                 </div> 
//             </Container>
//         </div>
//         )
//     }
//     else if(posts.length === 0){
//         return (
//         <div className='w-full py-8 text-center mt-4'>
//             <Container>
//                 <div className='flex flex-wrap '>
//                     <div className='p-2 w-full'>
//                         <h1 className='text-2xl font-bold
//                          hover:text-gray-600'>
//                             No Posts to show
//                         </h1>
//                     </div>
//                 </div>
//             </Container>
//         </div>
//         )
//     }

//     return (
//         <div className='w-full py-8'>
//             <Container>
//                 <div className='flex flex-wrap'>
//                     {posts.map((post) => (
//                         <div key={post.$id} className='p-2 w-1/4'>
//                             <PostCard {...post} />
//                         </div>)
//                     )}
//                 </div>
            
//             </Container>   
//         </div>
        
//     )
    
  
// }

// export default Home

