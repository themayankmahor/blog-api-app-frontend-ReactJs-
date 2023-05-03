import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isLoggedIn } from '../auth';

const PrivareRoute = () => {


    return isLoggedIn() ? <Outlet/> : <Navigate to={'/login'}/>



    //
    // if (isLoggedIn())
    // {
    //     return <Outlet/>
    // }
    // else
    // {
    //     return <Navigate to={'/login'}/>;
    // }

//   return (

//     // <></>  this empty tags are fragments
//     <>
//         <div>PrivareRoute this is private</div>

//         {/* This gets Route under Route(PrivateRoute) */}
//         <Outlet/>
//     </>
//   )
}

export default PrivareRoute