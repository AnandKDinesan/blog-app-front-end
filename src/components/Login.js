import { TextField, Typography,Button } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Box } from '@mui/system'
import React ,{useState} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../store'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login()
 {
 
  const dispatch=useDispatch()
  const [isSignup,setIsSignup]=useState(false)
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  //error state
   const [nameError,setNameError]=useState(false)
  const [emailError,setEmailError]=useState(false)
  const [passwordError,setPasswordError]=useState(false)

  const navigate=useNavigate()

  //login
  const signIn=async()=>{
    setEmailError(false)
    setPasswordError(false)
    const body={
       
       email,
       password
     }
     if(email=='' && password=='')
     {
      setEmailError(false)
      setPasswordError(false)
     }
    if(email=='')
    {
      setEmailError(true)
    }
    if(password==''){
      setPasswordError(true)
    }
    
     if(email && password){
      try{
        const {data,status}= await axios.post('http://localhost:8000/signIn',body)
      console.log(data.user.email);
      console.log();
      localStorage.setItem("email",data.user.email)
      localStorage.setItem("user",data.user.name)
     
      alert(data.message)
      navigate('/blogs')
      dispatch(authActions.login())
      } catch(error){
        alert(error.response.data.message)
      }
      
     }
    
    
   }
  const signUp=async()=>{
    setPasswordError(false)
      setNameError(false)
      setEmailError(false)
   const body={
      name,
      email,
      password
    }
    if(email=='' && password=='' && name=='')
    {
      setPasswordError(true)
      setNameError(true)
      setEmailError(true)
    }
       if(name==''){
      setNameError(true)
    }
    if(email=='')
    {
      setEmailError(true)
    }
    if(password==''){
      setPasswordError(true)
    }
    if(email && password && name){
      try{
        const result= await axios.post('http://localhost:8000/signUp',body)
    console.log(result.data.message);
        
      setIsSignup(false)
      }
      catch(error){
        alert(error.response.data.message);
        // dispatch(authActions.login())
      }
    
    }
  }
 
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(isSignup){
      // signUp().then(()=>dispatch(authActions.login()));
      signUp()
    }
    else{
      // signIn().then(()=>dispatch(authActions.login()));
      signIn()
    }
  }

  return (
    <div  className='container login  w-50'>
      <form nonValidate autoComplete='off' onSubmit={handleSubmit } className='p-3'>
        <Box display="flex" flexDirection="column" alignItems={'center'} justifyContent={'center'}
        boxShadow="10px 10px 20px #ccc">
          <Typography
           variant='h2' 
           className='mt-3'>{isSignup? "SignUp ":"Login"}
           </Typography>
          {isSignup && 
          <TextField 
          name='name' 
          label="Name"
           variant="outlined"  
           margin='normal'  
           color='primary'
           
          error={nameError}
          helperText={ nameError ? "Please enter your name":null}
           onChange={(e)=>setName(e.target.value)}/>}
          <TextField 
          name="email" 
          type={'email'} 
          label="Email" 
          variant="outlined"
           margin='normal'  
           error={emailError}
          helperText={ emailError ? "Please enter your email":null}
            onChange={(e)=>setEmail(e.target.value)}
           />
          {/* //  error={!!errors?.email}
          //  helperText={errors?.email ? errors.email.message:null} */}

          <TextField 
          name='password' 
          type={'password'} 
          label="Password" 
          variant="outlined"    
          margin='normal'
          error={passwordError}
          helperText={ passwordError ? "Please enter password":null}
           onChange={(e)=>setPassword(e.target.value)}/>
          <Button type='submit' className='mt-3' variant='contained' color="primary"> Submit</Button>
          <Button onClick={()=>setIsSignup(!isSignup)}>Change to {isSignup? "Login" : "SignUp"}</Button>
        </Box>
      </form>
    </div>
  )
}

export default Login