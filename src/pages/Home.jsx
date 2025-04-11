
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
        <div className='w-full pb-12'>
           
                <HomeWrapper>
                <div className='pb-10 gap-x-14 gap-y-16 flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className=' w-[30%]'>
                            <PostCard {...post} />
                            
                        </div>)
                    )}
                    <div key={'thisisakeyforcard'} className=' w-[30%]'>
                    
                            <Link to={'/all-posts'}>
                            <div className='w-full bg-gray-400 rounded-xl p-4'>
                            <div className='w-full   '>

                                <div className='h-[210px]  rounded-xl px-2 py-6 bg-orange-800 text-center text-7xl text-slate-300'>
                                   <p >Read </p>
                                <p  >More</p> 
                                </div>
                                

                            </div>
                            <h2  className='text-2xl mt-4 mb-1 font-bold'> Click here to read more</h2>
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

