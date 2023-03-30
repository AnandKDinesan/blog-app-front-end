import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { CardContent,Card,CardMedia,Typography,Avatar,CardHeader,Box } from '@mui/material'
function Blogs({item}) {
 const navigate=useNavigate()
 const params=useParams()
  console.log(item);
  let isUser=false
  let id=item.id
  const emailUser=localStorage.getItem("email")
  if(emailUser==item.email)
  {
     isUser=true
  }
  else{
    isUser=false
  }
  console.log(isUser);
  const handleEdit=(e)=>{
    navigate(`/Myblogs/${id}`)
  }
  const handleDelete=async()=>{
    const result = await axios.delete('http://localhost:8000/deleteBlog/'+id)
    console.log(result);
    alert(result.data.message)
    navigate('/blogs')
  }
  return (
    
    <div>

         <Card sx={{ width: "40%", margin:'auto',mt:2,padding:2,boxShadow:"5px 5px 10px #ccc" ,":hover:":{
          boxShadow:"10px 10px 20px #ccc"
         } }}>
         
     {isUser &&(
      <Box display='flex'>
        <button style={{marginLeft:'auto'}} onClick={handleEdit} className='btn me-3'><i class="fa-solid fa-pen fa-primary"></i></button>
        <button className='btn' onClick={handleDelete} ><i class="fa-solid fa-trash"></i></button>
      </Box>
     )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            {item.user.slice(0,1)}
          </Avatar>
        }
  
        title={item.title}
        
      />
      <CardMedia
        component="img"
        height="194"
        image={item.image}
        alt="Blog Image"
      />
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.user}:{item.description}
        </Typography>
      </CardContent>
  

    </Card>
    </div>
  )
}

export default Blogs