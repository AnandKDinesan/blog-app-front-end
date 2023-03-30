import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Blogs from './Blogs'
function Blog() {
  const [blogs,setBlogs]=useState([])
const getblogs=async()=>{
  const result= await axios.get('http://localhost:8000/all-blogs')
  setBlogs(result.data.blogs);
}
useEffect(()=>{
  getblogs();
},[])
console.log(blogs);
  return (
    <div>
      {blogs && blogs.map((blog,index)=>(
        <Blogs  item={blog}/>
      ))
        }
      </div>
  )
}

export default Blog