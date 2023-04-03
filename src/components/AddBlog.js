import React ,{useState,useEffect} from 'react'
import {Box,InputLabel,TextField,Typography,Button} from '@mui/material'
import uuid from 'react-uuid';
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom';
import './AddBlog.css'
function AddBlog() {
  const navigate=useNavigate()
  const [title,setTitle]=useState('')
  const [description,setDes]=useState('')
  const [image,setImage]=useState('')
  const [id,setId]=useState()
  const email=localStorage.getItem('email')
  const user=localStorage.getItem("user")
  useEffect(()=>{
    //generating unique id
    setId(uuid().slice(0,3));
  },[])
 const handleSubmit=async(e)=>{
  e.preventDefault()
  if(title=='' || description=='' || image==' '  ){
    alert('Enter valid input')
  }
  else{
    const body={
      id,
      title,
      description,
      image,
      email,
      user
      
    }
    
    console.log(body);
   const result=await axios.post('http://localhost:8000/addBlog',body)
   alert(result.data.message)

   navigate("/Myblogs")
  }
 
 }

  return (
    <div className='addblog'>
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
          <Typography textAlign={'center'} fontWeight={'bold'} padding={3}  variant='h4' >Post Your Blog</Typography>
          
          <TextField  label="Title" variant="outlined" margin='normal' 
          onChange={(e)=>setTitle(e.target.value)}/>
          
          
          <TextField onChange={(e)=>setDes(e.target.value)} multiline rows={4} label="Description" variant="outlined" margin='normal' />
          
          
          <TextField onChange={(e)=>setImage(e.target.value)}  label="Image URL" variant="outlined" margin='normal' />
          <Button  type='submit' className='mt-3' variant='contained' color="primary" sx={{margin:1,borderRadius:10}}> Submit</Button> <Button LinkComponent={Link} to="/blogs">Cancel</Button>
          
         </Box>
        
      </form>
    </div>
  )
}

export default AddBlog