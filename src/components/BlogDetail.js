import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate,Link } from 'react-router-dom';
import {Box,InputLabel,TextField,Typography,Button} from '@mui/material'
import './BlogDetail.css'
function BlogDetail() {
  const params=useParams()
  const [blog,setBlog]=useState([])
  const [title,setTitle]=useState()
  const [description,setDes]=useState()
  const [image,setImage]=useState()
  const navigate=useNavigate()

  //getting blog
  const getBlog=async()=>{
   const result = await axios.get('http://localhost:8000/getAblog/'+params.id)
   console.log(result);
   setBlog(result.data.blog);
   setTitle(result.data.blog.title)
   setDes(result.data.blog.description)
   setImage(result.data.blog.image)
  }
  
  useEffect(()=>{
    getBlog()
  },[params.id])
  console.log(blog);
  console.log(title,description,image);

  //updateBlog function
  const handleSubmit=async(e)=>{
   
    e.preventDefault()
    const body={
      
      title,
      description,
      image,
      
      
    }
    console.log(body);
    const result = await axios.put('http://localhost:8000/upDateBlog/'+params.id,body)
    console.log(result);
    alert(result.data.message)
    navigate('/Myblogs')
  }
  return (
    <div className='blogedit' >
      <form onSubmit={handleSubmit}>
        <Box 
        display='flex' 
        flexDirection={'column'} 
        width="80%"
        marginTop={3}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        margin={'auto'}
        >
          <Typography textAlign={'center'} fontWeight={'bold'} padding={3}  variant='h4' >Update Your Blog</Typography>
          <InputLabel><h4 className='mt-3'>Title</h4></InputLabel>
          <TextField   variant="outlined" margin='normal' value={title}
          onChange={(e)=>setTitle(e.target.value)}/>
          
          <InputLabel><h4 className='mt-3'>Description</h4></InputLabel>
          <TextField onChange={(e)=>setDes(e.target.value)} multiline rows={4}   variant="outlined" margin='normal' value={description} />
          
          <InputLabel><h4 className='mt-3'>Image URL</h4></InputLabel>
          <TextField onChange={(e)=>setImage(e.target.value)}   variant="outlined" margin='normal' value={image} />
          <Button type='submit' className='mt-3' variant='contained' color="primary"> Submit</Button> 
          <Button LinkComponent={Link} to="/blogs">Cancel</Button>
         </Box>
        
      </form>
    </div>
  )
}

export default BlogDetail