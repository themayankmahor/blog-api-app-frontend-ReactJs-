import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Base from './components/Base';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Services from './pages/Services';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDashboard from './pages/user-routes/UserDashboard';
import PrivareRoute from './components/PrivareRoute';
import ProfileInfo from './pages/user-routes/ProfileInfo';
import PostPage from './pages/PostPage';
import UserProvider from './context/UserProvider';
import Categories from './pages/Categories';
import UpdateBlog from './pages/UpdateBlog';


function App() {
  return (

    <UserProvider>
    <BrowserRouter>
    <ToastContainer position='bottom-center'/>
      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/posts/:postId' element={<PostPage/>}/>
        <Route path='/categories/:categoryId' element={<Categories/>}/>

        <Route path='/user' element={<PrivareRoute/>}>

          {/* If we use "/user" it becomes absolute URL */}
          {/* User DashBoard */}
          <Route path='dashboard' element={<UserDashboard/>}/>

          {/* ProfileInfo */}
          <Route path='profile-info/:userId' element={<ProfileInfo/>}/>

          {/* Update blog */}
          <Route path='update-blog/:blogId' element={<UpdateBlog/>}/>

        </Route>

        

      </Routes>

    </BrowserRouter>
    </UserProvider>

  );
}

export default App;