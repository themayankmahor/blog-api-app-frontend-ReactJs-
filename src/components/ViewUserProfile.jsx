import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, Container, Table } from 'reactstrap';
import { getCurrentUserDetail, isLoggedIn } from '../auth';

const ViewUserProfile = ({user}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [login, setLogin] = useState(false);

    useEffect(() => {

        setCurrentUser(getCurrentUserDetail());
        setLogin(isLoggedIn());

    }, [])  ///[] -> blank dependency

  return (
    <Card className='mt-3'>
            <CardBody>

              <h3 className='text-uppercase'>User Information</h3>

              <Container className='text-center'>
                <img style={{maxWidth : '250px', maxHeight:'250px'}} src={user.image ? user.image : 'https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg'} alt="user profile picture" className='img-fluid' />
              </Container>

              <Table responsive hover bordered={true} className='mt-5 text-center'>
                <tbody>
                  <tr>

                    <td>
                      BLOGs ID
                    </td>

                    <td>
                      Blogs {user.id} 
                    </td>

                  </tr>

                  <tr>

                      <td>
                        USER NAME
                      </td>

                      <td>
                        {user.name} 
                      </td>

                      </tr>
                  <tr>

                      <td>
                        USER EMAIL
                      </td>

                      <td>
                        {user.email} 
                      </td>

                      </tr>
                  <tr>

                      <td>
                        ABOUT
                      </td>

                      <td>
                        {user.about} 
                      </td>

                      </tr>
                  <tr>

                      <td>
                        ROLE
                      </td>

                      <td>
                        {user.roles.map((role) => {
                          return (

                            <div key={role.id}>{role.name}</div>
                          )
                        })} 
                      </td>

                      </tr>
                </tbody>
              </Table>

                {currentUser ? (currentUser.id == user.id) ? (
                                    <CardFooter className='text-center'>

                                    <Button color='warning'>Update Profile</Button>
                
                            </CardFooter>
                ) : '' : ''}

            </CardBody>
          </Card>
  )
}

export default ViewUserProfile;