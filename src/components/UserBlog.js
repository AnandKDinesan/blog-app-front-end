import React ,{useEffect,useState} from 'react'
import axios from 'axios'
import Blogs from './Blogs'
import { Box } from '@mui/system'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import './UserBlog.css'
function UserBlog() {
const [blogs,setBlogs]=useState([])
  const email=localStorage.getItem("email")
  let add=true
  console.log(email)
const myBlogs=async()=>{
  const body={email}
  console.log(body);
  const result= await axios.post('http://localhost:8000/myBlog',body)
  console.log(result);
  setBlogs(result.data.blogs);
  
}
 useEffect(()=>{
  myBlogs()
 },[]) 
 if(blogs.length==0)
{
  add=true
}
else{
  add=false
}
 console.log(blogs,'hi');
 console.log(blogs.length);

  return (
    <div>
       <>{add &&<div className='container noblog  w-50 text-center  '>
          <h1>OOPS! You don't written any blogs !!</h1> 
          <p className='mt-4'>Share your thoughts and experiences with every one</p>
          <Button type='submit' LinkComponent={Link} to="/blogs/add"  className='mt-3' variant='contained' color="primary">Add Blog</Button>
        </div>}</>
       {blogs && blogs.map((blog,index)=>(
        
        <Blogs  item={blog}/>
      ))
        }
    </div>
  )
}

export default UserBlog