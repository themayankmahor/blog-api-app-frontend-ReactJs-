import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from 'reactstrap';
import { createComment, loadPost } from '../services/post-service';
import { toast } from 'react-toastify';
import { BASE_URL } from '../services/Helper';
import { isLoggedIn } from '../auth';

const PostPage = () => {

  const {postId} = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState({
    content:''
  })

  useEffect(()=>{
    //load post of post id
    loadPost(postId).then(data => {

      console.log(data);
      setPost(data);

    }).catch((error) => {
      console.log(error);
      toast.error("Error in loading Post");
    })

  }, [])

  //print date
  const printDate = (numbers) =>
  {
    //return new Date(numbers).toString();
    return new Date(numbers).toLocaleString();
  }

  // add post
  const submitPost = () => {

    //if user is not logged in
    if (!isLoggedIn())
    {
      toast.error("You need to login first...");
      return;
    }

    //
    if (comment.content.trim()==='')
    {
      return;
    }
   createComment(comment, post.postId).then(data =>{
    console.log(data);
    toast.success("Comment Added");

    //set post
    setPost({
      ...post,
      comments:[...post.comments, data.data]
    });

    //black comment field
    setComment({
      content:''
    })
   }).catch(error => {
    console.log(error);
    toast.success("Error");
   })
  }

  return (
    <Base>
      <Container className='mt-4'>
        <Link to={"/"}>Home</Link> / {post && (<Link to={""}>{post.title}</Link>)}

      <Row>
        <Col md={{
          size:12
        }}>

          <Card className='mt-3 ps-2 shadow-sm'>
            {
              (post) &&(

              <CardBody>
                {/* Posted By */}
                <CardText>Posted By <b>{post.user.name}</b> on <b>{printDate(post.addedDate)}</b> </CardText>

                {/* Category */}
                <CardText>
                  <span className='text-muted'>{post.category.categoryTitle}</span>
                </CardText>

                {/* Divider */}
                <div  className='divider' style={{width:"100%", height:"1px", background:"#e2e2e2"}}></div>

                {/* Post title */}
                <CardText className='mt-3'>
                  <h3>{post.title}</h3>
                </CardText>

                {/* Image */}
                <div className='image-container mt-5 container text-center shadow' style={{maxWidth:"50%"}}>
                  <img className='img-fluid' src={`${BASE_URL}/post/image/${post.imageName}`} alt="" />
                </div>
                
                {/* Content */}
                <CardText className='mt-5' dangerouslySetInnerHTML={{__html:post.content}}>

                </CardText>

              </CardBody>

              )

            }
          </Card>
        
        </Col>
      </Row>

      <Row className='my-2'>

            <Col md={{
              size:6,
              offset:4
            }}>
            
              <h3>Comments ( {post ? post.comments.length : 0} ) </h3>

              {
                post && post.comments.map((c, index) =>(

                  <Card className='mt-2 border-0' key={index}>
                    <CardBody>
                      <CardText>
                        {c.content}
                      </CardText>
                    </CardBody>
                  </Card>

                ))
              }

                  <Card className='mt-4 border-0'>
                    <CardBody>
                      {/* Add comment */}
                      <Input type='textarea' placeholder='Enter comment' value={comment.content} 
                      onChange={(event)=>setComment({content:event.target.value})} />

                      {/* Button */}
                      <Button onClick={submitPost} className='mt-2' color='primary' >Add Comment</Button>
                    </CardBody>
                  </Card>

            </Col>

      </Row>

      </Container>
    </Base>
  )
}

export default PostPage