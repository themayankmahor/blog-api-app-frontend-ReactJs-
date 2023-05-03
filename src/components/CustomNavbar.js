import React, { useContext, useEffect, useState } from 'react';
import { NavLink as ReactLink, useNavigate} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth';
import userContext from '../context/userContext';

  
  const CustomNavbar = () => {

    const  userContextData = useContext(userContext);

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const [login, setLogin] = useState(false);

    const [user, setUser] = useState(undefined);

    //use effect used for calling call back functios
    useEffect(() =>{

      setLogin(isLoggedIn());
      setUser(getCurrentUserDetail());

    }, [login])   //if we dont pass login it calls only one time but if we pass any agr(like login) then it calls every time when login variable changes

    //Logout Button Handler
    const logout = () =>
    {
      doLogout(() => {
        //logged out
        setLogin(false);
        userContextData.setUser({
          data:null,
          login:false
        })
        navigate('/');
      });
    }

    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <div>
        <Navbar                 
                color="dark"
                dark
                expand="md"
                fixed=""
                className='px-5'  //here in px, x is x-axis (Left, Right)
                >
          
          <NavbarBrand  tag={ReactLink} to="/">My Blogs</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            {/* Left Nav */}
            <Nav className="me-auto" navbar>

              {/* Home */}
              <NavItem>
                <NavLink tag={ReactLink} to="/">New Feed</NavLink>
              </NavItem>

              {/* About */}
              <NavItem>
                <NavLink tag={ReactLink} to="/about">About</NavLink>
              </NavItem>

              {/* Services */}
              <NavItem>
                <NavLink tag={ReactLink} to="/services">Services</NavLink>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  More
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag={ReactLink} to="/services" >Contact Us</DropdownItem>
                  <DropdownItem>Facebook </DropdownItem>
                  <DropdownItem divider />    {/*use divider for line in dropdown box*/}
                  <DropdownItem>Instagram </DropdownItem>
                  <DropdownItem>LinkedIn </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>

            {/* Right Nav */}
            <Nav navbar>

              {/* render different nav items, when user in logged in or not */}
              {
                // render jsx with use of login var (if user is logged in)
                login && (

                  <>

                  {/* Profile */}
                  <NavItem>
                  <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`}>
                      Profile Info
                    </NavLink>
                  </NavItem>
                  

                  {/* user Email */}
                  <NavItem>
                    <NavLink tag={ReactLink} to="/user/dashboard">
                      {user.name}
                    </NavLink>
                  </NavItem>

                  {/* Logout */}
                  <NavItem>
                    <NavLink onClick={logout}>
                      Logout
                    </NavLink>
                  </NavItem>
                  
                  
                  </>

                )
              }

              {/* Not Logged In we are using {} operator for writing js code*/}
              {
                !login && (

                  <>
                  
                    <NavItem>
                      <NavLink tag={ReactLink} to="/login">
                        Login
                      </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink  tag={ReactLink} to="/signup">
                          Signup
                        </NavLink>
                    </NavItem>
                  
                  </>

                )
              }

            </Nav>

          </Collapse>
        </Navbar>
      </div>
    );
  }

export default CustomNavbar;