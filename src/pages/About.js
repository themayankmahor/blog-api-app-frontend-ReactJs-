import Base from "../components/Base";
import userContext from "../context/userContext";

const About = () =>
{
    return (
        <userContext.Consumer>

            {(object) =>(

                <Base>

                    <h1>This is About page</h1>
                    <p>We are building blog website</p>
                    {console.log(object)}
                    <h1>Welcome user : {object.user.login && object.user.data.name}</h1>

                </Base>
            )}

        </userContext.Consumer>
    )
}

export default About;