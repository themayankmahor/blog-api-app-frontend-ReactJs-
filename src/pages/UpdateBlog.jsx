import React, { useContext, useEffect, useRef, useState } from 'react'
import Base from '../components/Base'
import { useNavigate, useParams } from 'react-router-dom';
import userContext from '../context/userContext';
import { loadPost, updatePostService } from '../services/post-service';
import { toast } from 'react-toastify';
import { loadAllCategories } from '../services/category-service';
import { 
    Button,
    Card, 
    CardBody,
    Container,
    Form,
    Input,
    Label
 } from "reactstrap";
 import JoditEditor from "jodit-react";

const UpdateBlog = () => {

    const {blogId} = useParams();

    const object = useContext(userContext);

    const navigate = useNavigate();

    const [post, setPost] = useState(null);

    const [categories, setCategories] = useState([]);
    
    //for jodit editor
    const editor = useRef(null);

    // //
    useEffect(() => {

        loadAllCategories().then((data) => {
            
            setCategories(data);
        }).catch(error => {
            console.log(error);
        })

        //load the blog from database
        loadPost(blogId).then(data  => {
            
            setPost({...data, categoryId:data.category.categoryId});

        }).catch(error => {
            
            console.log(error);
            toast.error("Error in loading the blog");

        })
        

    }, [])

    //
    useEffect(() => {
        console.log("First");
        //
        if (post)
        {
            if (post.user.id != object.user.data.id)
            {
                toast.error("This is not your post !!");
                navigate('/');
            }
        }

    }, [post])

    //uupdate post
    const updatePost = (event) =>
    {
        event.preventDefault();

        console.log(post);

        updatePostService({...post, category:{categoryId:post.categoryId}}, post.postId)
        .then(response => {

            console.log(response);
            toast.success("Post Updated");

        }).catch(error => {

            console.log(error);
            toast.error("Error in updating post");

        })

    }

    //
    const updateHtml = () => {
        return (
            <div className="wrapper">

                

            <Card className="shadow-sm mt-2">
                <CardBody>
                
                    <h3>Update Post</h3>

                    <Form onSubmit={updatePost}>
                        {/* Title */}
                        <div className="my-3">
                            <Label for="title">Post Title</Label>
                            <Input type="text" id="title" name="title" placeholder="Enter Title" onChange={(event) => handleChange(event, 'title')} value={post.title}/>
                        </div>

                        {/* Content */}
                        <div className="my-3">
                            <Label for="content">Post Content</Label>
                            {/* <Input type="textarea" id="content" placeholder="Content" style={{height:'150px'}}/> */}
                           <JoditEditor
                                ref={editor}
                                
                                value={post.content}
                                onChange={(newContent) => setPost({...post, content:newContent})}
		                    />
                        </div>

                        {/* Category */}
                        <div className="my-3">
                            <Label for="category">Post Category</Label>
                            <Input type="select" id="category" placeholder="Content" name="categoryId"
                            onChange={(event) => handleChange(event, 'categoryId')}
                            value={post.categoryId}
                            >
                                <option disabled value={0}>--Select Category--</option>
                                {/* Printing category data dynamically */}

                                {
                                    categories.map((category) => (
                                        <option value={category.categoryId} key={category.categoryId}>{category.categoryTitle}</option>
                                    ))
                                }

                            </Input>
                        </div>

                        {/* Image */}
                        <div>
                            <Input id="image" type="file" onChange={''}/>
                        </div>

                        {/* Button */}
                        <Container className="text-center  mt-3">
                            <Button type="submit" color="primary" className="rounded-0">Update Post</Button>
                            <Button color="danger" className="rounded-0 ms-2">Reset</Button>
                        </Container>

                    </Form>

                    

                </CardBody>
            </Card>

        </div>
        )
    }

    //
    const handleChange = (event, fieldName) => {

        setPost({
            ...post,
            [fieldName]:event.target.value
        })

    }

  return (
    
    <Base>

        <Container>
            {post && updateHtml()}
        </Container>

    </Base>

  )

}

export default UpdateBlog