
import { useEffect,useState } from 'react';
import { Container,PostForm } from '../components';
import firebaseService from '../firebase/conf'
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);

    const {slug} = useParams();
    
    
    const navigate = useNavigate();
 
    useEffect(() => {
      if (slug) {
        firebaseService.getPost(slug).then((post) => {
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
 