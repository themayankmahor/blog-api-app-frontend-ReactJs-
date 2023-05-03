import React from 'react'
import Base from '../components/Base'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import CategorySideMenu from '../components/CategorySideMenu';
import NewFeed from '../components/NewFeed';
import { deletePostByUser, loadPostSortedByCategory } from '../services/post-service';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Post from '../components/Post';

const Categories = () => {

    const {categoryId} = useParams();

    //get post data
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        loadPostSortedByCategory(categoryId).then(data => {
            
            setPosts([...data]);

        }).catch(error => {
            console.log(error);
            toast.error("Error in loading post");
        })

    }, [categoryId])

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

        <Container className="mt-3">
            
            <Row>
                <Col md={2} className="pt-3">
                    <CategorySideMenu />
                </Col>

                <Col md={10}>

                    <h1>Blogs Count ({posts.length})</h1>

                    {
                        posts && posts.map((post, index) => {
                            return(
                                <Post post={post} key={index} deletePost={deletePostById} />
                            )
                        })
                    }

                    {posts.length<=0 ? <h1>No post in this category</h1> : ''}
                    
                </Col>
            </Row>

        </Container>

    </Base>

  )
}

export default Categories