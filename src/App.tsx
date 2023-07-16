import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Main } from './pages/Main';
import { Login } from './pages/Login';
import { Navbar } from './components/Navbar';
import { CreatePost } from './pages/posts/CreatePost';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

