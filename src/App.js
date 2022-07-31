import './App.css';
import React from 'react';
import { Container } from '@material-ui/core';

import Navbar from './Component/Navbar/Navbar';
import { BrowserRouter, Routes, Route,  Navigate } from 'react-router-dom'
import Home from './Component/Home/Home';
import Auth from './Component/Auth/Auth';
import PostDetails from './Component/PostDetails/postDetails';

function App() {

  // const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'))

  return (

    <BrowserRouter>
      <Container  maxWidth="xl">
        <Navbar />
        <Routes>
          {/* <Route path='/' exact element={<Home/>}> </Route> */}
          {/* <Route path='/' exact element={() => <Redirect to='/posts' />} /> */}
          <Route path='/'  element={<Navigate replace to="/posts" />} />
          <Route path='/posts' exact element={<Home/>}> </Route> 
          <Route path='/posts/search' exact element={<Home/>}> </Route> 
          <Route path='/posts/:id' exact element={<PostDetails/>}> </Route> 

          <Route path='/auth' exact element={!user? <Auth/> : <Navigate replace to="/posts" />}> </Route>
        </Routes>
      </Container>
    </BrowserRouter>

  );


}

export default App;

// direction='column-reverse'