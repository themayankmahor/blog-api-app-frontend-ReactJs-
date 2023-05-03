import Base from "../components/Base"
import userContext from "../context/userContext";

const Services = () =>
{
    return(
        <userContext.Consumer>

            {
                (user)=>(

                    <Base>
        
                        <h1>This is Services Page</h1>
                        <h2>Welcome : {user.user.login && user.user.data.name}</h2>
    
                    </Base>
            
            )}

        </userContext.Consumer>
    )
}

export default Services;