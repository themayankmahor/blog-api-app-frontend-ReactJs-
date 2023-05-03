import React, { useEffect, useState } from 'react'
import Base from '../../components/Base';
import { useContext } from 'react';
import userContext from '../../context/userContext';
import { useParams } from 'react-router-dom';
import { getUser } from '../../services/user-service';
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap';
import ViewUserProfile from '../../components/ViewUserProfile';

const ProfileInfo = () => {

  const {userId} = useParams();
  
  //hook
  const object = useContext(userContext);

  //
  const [user, setUser] = useState(null);

  //use Effect
  useEffect(() => {
    getUser(userId).then(data => {

      console.log(data);
      setUser({...data});

    }).catch(error => {
      console.log(error);
    })
  }, [])

  //
  const userView = () => 
  {
    return(
      <Row>
        <Col md={{size:8, offset:2}}>
          
          <ViewUserProfile user={user} />

        </Col>
      </Row>
    )
  }


  return (
    
    <Base>
      {user ? userView() : 'Loading User data'}
    </Base>

  )
}

export default ProfileInfo;