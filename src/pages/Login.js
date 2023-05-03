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
    Col
} from "reactstrap";
import Base from "../components/Base";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

const Login = () =>
{
    const userContextData = useContext(userContext);

    const navigate = useNavigate();     //we are using a HOOK
    
    //login detials
    const [loginDetail, setLoginDetail] = useState({
        username:'',
        password:''
    })

    //handle change event [FIELDS]
    const handleChange = (event, field) =>{

        let actualValue = event.target.value
        setLoginDetail({
            ...loginDetail,
            [field]:actualValue
        })

    }

    //reset form value to blank
    const handleReset = () => {
        setLoginDetail({
            username:'',
            password:''
        })
    }

    //handle form submit
    const handleFormSubmit = (event) =>{

        event.preventDefault();
        console.log(loginDetail);

        //validation
        if (loginDetail.username.trim() == '' || loginDetail.password.trim() == '')
        {
            toast.error("Username or Password is required !!");
        }

        //submit the data to server to generate JWT (token)
        loginUser(loginDetail).then((data) =>{
            console.log(data);

            //save the data to localStorage
            doLogin(data, ()=>{
                console.log("Login detail is saved to localStorage");

                //redirect to your dashboard page
                userContextData.setUser({
                    data:data.user,
                    login:true
                });
                navigate('/user/dashboard');
            });

            toast.success("Login Success");
        }).catch(error=>{
            console.log(error);

            //error status
            if (error.response.status == 400 || error.response.status == 404)
            {
                toast.error(error.response.data.message);
            }
            else{
                toast.error("Something went wrong on server !!");
            }

            
        })

    }

    return(
        <Base>
            <Container>

                <Row className="mt-4">

                    <Col sm={{size:6,offset:3}}>

                    <Card color="dark" inverse>

                        <CardHeader>

                        <h3 className="text-center">Login</h3>

                        </CardHeader>

                        <CardBody>
                        {/* Creating form */}

                        <Form onSubmit={handleFormSubmit}>

                            {/* Email field */}
                            <FormGroup>
                                <Label for="email">Enter Email</Label>
                                <Input id="email" type='email' placeholder='Enter Email' value={loginDetail.username}
                                onChange={(e) => handleChange(e, 'username')} />
                            </FormGroup>

                            
                            {/* Password field */}
                            <FormGroup>
                                <Label for="password">Enter Password</Label>
                                <Input id="password" type='password' placeholder='Enter Password' value={loginDetail.password}
                                onChange={(e) => handleChange(e, 'password')} />
                            </FormGroup>


                            <Container className="text-center">

                                <Button outline color="light">Login</Button>
                                <Button onClick={handleReset} color="secondary" type="reset" className="ms-2">Reset</Button>
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

export default Login;