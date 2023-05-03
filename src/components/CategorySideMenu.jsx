import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { loadAllCategories } from '../services/category-service';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const CategorySideMenu = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        loadAllCategories().then(data => {

            setCategories([...data]);

        }).catch(error => {
            console.log(error);
            toast.error("Error in loading Categories");
        })

    }, [])

  return (
    <div>

        <ListGroup>

            <ListGroupItem tag={Link} to="/" action={true}>
                All Blogs
            </ListGroupItem>

            {/* getting categories dynamically */}

            {categories && categories.map((cat, index) => {

                return(

                    <ListGroupItem tag={Link} to={`/categories/${cat.categoryId}`} key={index} action={true}>
                        {cat.categoryTitle}
                    </ListGroupItem>

                )

            })}

        </ListGroup>






    </div>
  )
}

export default CategorySideMenu;