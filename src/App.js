import Header from './components/Header.js';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Login from './components/Login.js';
import Blog from './components/Blog.js';
import UserBlog from './components/UserBlog.js';
import BlogDetail from './components/BlogDetail.js';
import AddBlog from './components/AddBlog.js'
import Footer from './components/Footer.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './store/index.js';

function App() {
  const dispath=useDispatch()
  const isLoggedIn=useSelector((state)=>state.isLoggedIn)
  console.log(isLoggedIn);
  useEffect(()=>{
    if(localStorage.getItem("email")){
        dispath(authActions.login())
    }
  },[dispath])
  return (
    <div className="App">
      <header><Header/></header>
     <main>
      <Routes>
      {!isLoggedIn ? 
          <Route path="/" element={<Login/>}/> :
          <>
          <Route path="/blogs" element={<Blog/>}/>
          <Route path="/Myblogs" element={<UserBlog/>}/>
          <Route path="/Myblogs/:id" element={<BlogDetail/>}/>
          <Route path="/blogs/add" element={<AddBlog/>}/>
          </>
      }
        </Routes> 
     </main>
     <footer><Footer/></footer>
    </div>
  );
}

export default App;
