
import { useEffect,useState } from 'react';
import { Container,PostForm } from '../components';
import appwriteService from '../appwrite/conf'
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);

    const {slug} = useParams();
    
    
    const navigate = useNavigate();
 
    useEffect(() => {
      if (slug) {
        appwriteService.getPost(slug).then((post) => {
          if(post){
            
          setPost(post);
          }
        }
        )
      }else{
        navigate('/')
      }
    }
    ,[slug,navigate])

  return post ? (
    <div >
    
        <PostForm post={post} />
      
      
    </div>
  ) : null;
}

export default EditPost
 