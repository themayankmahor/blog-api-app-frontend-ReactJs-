import React, { useContext, useEffect, useState } from 'react'
import { deletePostByUser, loadAllPosts } from '../services/post-service'
import { Col, Row, Pagination, PaginationItem, PaginationLink, Container } from 'reactstrap';
import Post from './Post';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';

const NewFeed = () => {

    //get all post (store post)
    const [postContent, setPostContent] = useState({
        content:[],
        totalPage:'',
        totalElements:'',
        pageSize:'',
        lastPage:false,
        pageNumber:''
    });

    //current page
    const [currentPage, setCurrentPage] = useState(0);

    //use effect
    useEffect(() => {

        //load add the post from server
        // loadAllPosts(0, 5).then((data) =>{
        //     console.log(data);
        //     //set data of post
        //     setPostContent(data);
        // }).catch((error) => {
        //     console.log(error);
        //     toast.error("Error in loading Posts");
        // })

        changePage(currentPage, 5);

    }, [currentPage])

    //change page
    const changePage = (pageNumber=0, pageSize=0) => {
        // //dont load data after last page
        // if (postContent.lastPage){
        //     return
        // }

        //
        if (pageNumber > postContent.pageNumber && postContent.lastPage)
        {
            return;
        }

        if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0)
        {
            return;
        }

        loadAllPosts(pageNumber, pageSize).then(data => {
            setPostContent({
                content:[...postContent.content, ...data.content],
                totalPage: data.totalPage,
                totalElements: data.totalElements,
                pageSize:data.pageSize,
                lastPage:data.lastPage,
                pageNumber:data.pageNumber
            });
            //window.scroll(0,0);
        }).catch(error => {
            toast.error("Error in loading Posts");
        })
    }

    //infinite scroll
    const changePageInfinite = () =>
    {
        console.log("Page changed");
        setCurrentPage(currentPage+1);
    }

    //function to delete post
    const deletePostById = (post) =>
    {
    //going to delete post
    deletePostByUser(post.postId).then(data => {

        console.log(data);
        toast.success("Post Deleted !!!");

        //
        let newPostContent = postContent.content.filter(p => p.postId!=post.postId);
        setPostContent({...postContent, content: newPostContent});
        

    }).catch(error => {

        console.log(error);
        toast.error("Something went wrong on servers !!");
    })
    }

    return (

        <div className="container-fluid">
            <Row>
                <Col md={{
                    size:12
                }}>

                    <h1>Blog Count ({postContent?.totalElements})</h1>
                    {
                        
                        <InfiniteScroll
                            dataLength={postContent.content.length}
                            next={changePageInfinite}
                            hasMore={!postContent.lastPage}
                            loader={<h4>Loading...</h4>}
                            endMessage={
                                <p style={{textAlign:'center'}}>

                                    <b>Yay! You have seen it all</b>

                                </p>
                            }
                        >

                            {
                                postContent.content.map((post) => (
                                    <Post post={post} key={post.postId} deletePost={deletePostById} />
                                ))
                            }

                        </InfiniteScroll>

                    }

                    {/* Pagiantion */}
                    {/* <Container className='mt-3'>
                                          
                    <Pagination>
                        <PaginationItem onClick={()=>changePage(postContent.pageNumber - 1, 5)} disabled={postContent.pageNumber === 0}>
                            <PaginationLink previous>

                            </PaginationLink>
                        </PaginationItem>

                           
                            {
                                [...Array(postContent.totalPage)].map((item, index) => (

                                    <PaginationItem onClick={()=>changePage(index, 5)} active={index===postContent.pageNumber} key={index}>
                                        <PaginationLink>
                                                {index+1}
                                        </PaginationLink>
                                    </PaginationItem>

                                ))

                            }


                         
                            <PaginationItem onClick={()=>changePage(postContent.pageNumber + 1, 5)} disabled={postContent.lastPage}>
                                <PaginationLink next>

                            </PaginationLink>
                        </PaginationItem>
                    </Pagination>
                    </Container> */}



                </Col>
            </Row>
        </div>

    )

}

export default NewFeed