import { 
    Card, 
    Container, 
    CardHeader,
    CardBody,
    Label,
    Form,
    FormGroup,
    Input,
    Button, 
    Row,
    Col,
    FormFeedback
} from "reactstrap";
import Base from "../components/Base";
import { useEffect, useState } from "react";
import { signup } from "../services/user-service";
import {toast} from 'react-toastify';

const Signup = () =>
{
    //
    const[data, setData] = useState({
        
        name : '',
        email: '',
        password: '',
        about: ''
    })

    //
    const[error, setError] = useState({

        errors:{},
        isError:false
    })

    //use effect
    useEffect(() =>{

        console.log(data);

    }, [data])

    // handle change
    const handleChange = (event, property) => {

        //dynamic settign the values
        setData({...data, [property]:event.target.value})

    }

    //reset form data
    const resetData = () => {
        setData({
            name : '',
            email: '',
            password: '',
            about: ''
        });
    }

    //submit form
    const submitForm = (event) => 
    {
        event.preventDefault();

        //
        // if (error.isError)
        // {
        //     toast.error("Form data is invalid !!, correct all details then submit.");
        //     setError({...error, isError:false})
        //     return;
        // }


        //data validate

        //call server api for sending data
        signup(data).then((response) => {
            console.log(response);
            console.log("success log");
            toast.success("User is Registered Successfully !! User id " + response.id);
            setData({
                name : '',
                email: '',
                password: '',
                about: ''
            });
        }).catch((error) => {
            console.log(error);
            console.log("Error Log");

            //handle errors in proper way
            setError({
                errors:error,
                isError:true
            })
        })
    }

    return(
        <Base>
            
            <Container>

                <Row className="mt-4">

                    <Col sm={{size:6,offset:3}}>

                    <Card color="dark" inverse>

                        <CardHeader>

                        <h3 className="text-center"> Fill Information to Register</h3>

                        </CardHeader>

                        <CardBody>
                        {/* Creating form */}

                        <Form onSubmit={submitForm}>
                            {/* Name field */}
                            <FormGroup>
                                <Label for="name">Enter Name</Label>
                                <Input id="name" type='text' placeholder='Enter Name' onChange={(e) => handleChange(e, 'name')} value={data.name} /*invalid={true}*/ 
                                invalid={error.errors?.response?.data?.name ? true : false}/>
                                {/* Feedback */}
                                <FormFeedback>
                                    {error.errors?.response?.data?.name}
                                </FormFeedback>
                            </FormGroup>

                            {/* Email field */}
                            <FormGroup>
                                <Label for="email">Enter Email</Label>
                                <Input id="email" type='email' placeholder='Enter Email'  onChange={(e) => handleChange(e, 'email')} value={data.email} 
                                    invalid={error.errors?.response?.data?.email ? true : false}/>
                                {/* Feedback */}
                                <FormFeedback>
                                    {error.errors?.response?.data?.email}
                                </FormFeedback>
                            </FormGroup>

                            
                            {/* Password field */}
                            <FormGroup>
                                <Label for="password">Enter Password</Label>
                                <Input id="password" type='password' placeholder='Enter Password' onChange={(e) => handleChange(e, 'password')} value={data.password}
                                invalid={error.errors?.response?.data?.password ? true : false}/>
                                {/* Feedback */}
                                <FormFeedback>
                                    {error.errors?.response?.data?.password}
                                </FormFeedback>
                            </FormGroup>

                            {/* About field */}
                            <FormGroup>
                                <Label for="about">About Yourself</Label>
                                <Input id="about" type='textarea' placeholder='About yourself'
                                        style={{height:"250px"}} onChange={(e) => handleChange(e, 'about')} value={data.about}
                                        invalid={error.errors?.response?.data?.about ? true : false}/>
                                {/* Feedback */}
                                <FormFeedback>
                                    {error.errors?.response?.data?.about}
                                </FormFeedback>
                            </FormGroup>

                            <Container className="text-center">

                                <Button outline color="light">Register</Button>
                                <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>
                            </Container>

                        </Form>


                        </CardBody>

                        </Card>

                    </Col>

                </Row>

            </Container>

        </Base>
    )
}

export default Signup;