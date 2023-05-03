import { myAxios } from "./Helper";

export const signup = (user) =>
{
    return myAxios.post('/auth/register', user).then((response) => response.data);
}

export const loginUser = (loginDetail) =>
{
    return myAxios.post('/auth/login', loginDetail).then((response)=>response.data);
}

//
export const getUser = (userId) =>
{
    return myAxios.get(`/users/${userId}`).then(response => response.data);
}