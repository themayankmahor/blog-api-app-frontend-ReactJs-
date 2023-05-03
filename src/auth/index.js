//isLoggedIn=> 
export const isLoggedIn = () =>{
    let data = localStorage.getItem("data");

    //
    if (data != null)
    {
        return true;
    }
    else
    {
        return false;
    }
}

//doLogin=> data=> set to localstorage
export const doLogin= (data, next) =>{

    localStorage.setItem("data", JSON.stringify(data));
    next();

}

//doLogout=> remove from localstorage
export const doLogout = (next) =>
{
    localStorage.removeItem("data");
    next();
}

//get currentUser
export const getCurrentUserDetail = () =>
{
    //
    if (isLoggedIn())           //if we use isLoggedIn(it reference calling) use isLoggedIn() so you dont need to use ?
    {
        return JSON.parse(localStorage.getItem("data")).user;      //? -> this is used for safe operator
    }
    else
    {
        return undefined;
    }
}

//get token
export const getToken = () =>
{
    if (isLoggedIn())
    {
        return JSON.parse(localStorage.getItem("data")).token;
    }
    else{
        return null;
    }
}