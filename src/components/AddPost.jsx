import { 
    Button,
    Card, 
    CardBody,
    Container,
    Form,
    Input,
    Label
 } from "reactstrap";
 import { loadAllCategories } from "../services/category-service";
import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { createPost as doCreatePost, uploadPostImage} from "../services/post-service";
import { getCurrentUserDetail } from "../auth";

const AddPost = () =>{

    //for jodit editor
    const editor = useRef(null);
    //const [content, setContent] = useState('');

    const [categories, setCategories] = useState([])

    //get user
    const [user, setUser] = useState(undefined);


    const [post, setPost] = useState({
        title:'',
        content:'',
        categoryId:''
    })

    const [image, setImage]  = useState(null);

    //field changed handler
    const fieldChanged = (event) =>{
        
        //
        setPost({...post, [event.target.name]: event.target.value});
    }

    //field change handler for JoditEditor
    const contentFieldChange = (data) => {
        setPost({...post, 'content':data});
    }

    //create post
    const createPost = (event) => {
        event.preventDefault();
        

        //
        if (post.title.trim() === '')
        {
            toast.error("Title is Required !!");
            return;
        }

        //
        if (post.content.trim() === '')
        {
            toast.error("Post Content is Required !!");
            return;
        }

        //
        if (post.categoryId.trim() === '')
        {
            toast.error("Select Category !!");
            return;
        }

        //submit the form to server
        post['userId'] = user.id;
        doCreatePost(post).then(data => {

            //upload imgage
            uploadPostImage(image, data.postId).then(data => {
                toast.success("Image Uploaded");
            }).catch(error => {
                toast.error("Error in Uploading Image");
                console.log(error);
            })

            toast.success("Post Added");
            // console.log(post);
            //blank form
            setPost({
                title:'',
                content:'',
                categoryId:''
            })
        }).catch((error)=>{
            toast.error("Something went wrong on servers !!");
            // console.log(error);
        })

    }

    //handle image file
    const handleImageChange = (event) => {
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
    }

    //use effect
    useEffect(() => {
        setUser(getCurrentUserDetail());
        loadAllCategories().then((data) => {
            
            setCategories(data);
        }).catch(error => {
            console.log(error);
        })
    },[])

    return(

        <div className="wrapper">

            <Card className="shadow-sm mt-2">
                <CardBody>
                
                    <h3>What's going in your mind ?</h3>

                    <Form onSubmit={createPost}>
                        {/* Title */}
                        <div className="my-3">
                            <Label for="title">Post Title</Label>
                            <Input type="text" id="title" name="title" placeholder="Enter Title" onChange={fieldChanged} />
                        </div>

                        {/* Content */}
                        <div className="my-3">
                            <Label for="content">Post Content</Label>
                            {/* <Input type="textarea" id="content" placeholder="Content" style={{height:'150px'}}/> */}
                           <JoditEditor
                                ref={editor}
                                value={post.content}
                                onChange={contentFieldChange}
		                    />
                        </div>

                        {/* Category */}
                        <div className="my-3">
                            <Label for="category">Post Category</Label>
                            <Input type="select" id="category" placeholder="Content" name="categoryId"
                            onChange={fieldChanged}
                            defaultValue={0}
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
                            <Input id="image" type="file" onChange={handleImageChange}/>
                        </div>

                        {/* Button */}
                        <Container className="text-center  mt-3">
                            <Button type="submit" color="primary" className="rounded-0">Create Post</Button>
                            <Button color="danger" className="rounded-0 ms-2">Reset</Button>
                        </Container>

                    </Form>

                    

                </CardBody>
            </Card>

        </div>

    )

}

export default AddPost;