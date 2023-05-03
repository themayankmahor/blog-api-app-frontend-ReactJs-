import React from 'react'
import Base from '../../components/Base'
import AddPost from '../../components/AddPost'
import { Container } from 'reactstrap'
import { useState } from 'react'
import { useEffect } from 'react'
import { getCurrentUserDetail } from '../../auth'
import { deletePostByUser, loadPostByUser } from '../../services/post-service'
import Post from '../../components/Post'
import { toast } from 'react-toastify'

///functional Component
const UserDashboard = () => {

  const [user, setUser] = useState({});

  const [posts, setPosts] = useState([]);

  //use effect
  useEffect(() => {
    
    console.log(getCurrentUserDetail());
    setUser(getCurrentUserDetail());

          //load post by user
          loadPostByUser(getCurrentUserDetail().id).then(data => {

            console.log(data);
      
            //set posts
            setPosts([...data]);
      
      
          }).catch(error => {
            console.log(error);
          })


  },[])

  const loadPostData = () =>
  {
      // //load post by user
      // loadPostByUser(getCurrentUserDetail().id).then(data => {

      //   console.log(data);
  
      //   //set posts
      //   setPosts([...data]);
  
  
      // }).catch(error => {
      //   console.log(error);
      // })
  }

      //function to delete post
      const deletePostById = (post) =>
      {
        //going to delete post
        deletePostByUser(post.postId).then(data => {
  
          console.log(data);
          toast.success("Post Deleted !!!");
          
          let newPosts =  posts.filter(p=>p.postId!=post.postId)
          setPosts([...newPosts]);
  
        }).catch(error => {
  
          console.log(error);
          toast.error("Something went wrong on servers !!");
        })
      }

  return (

    <Base>

      <Container>
        <AddPost />

        <h1>Post Count ({posts.length})</h1>

        {
          posts.map((post, index) => {
            return(
              <Post post={post} key={index} deletePost={deletePostById} />
            )
          })
        }

      </Container>
      

    </Base>

  )
}

export default UserDashboard