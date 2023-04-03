import React, { useState } from 'react'
import {AppBar, Toolbar, Typography,Box, Button,Tabs,Tab} from '@mui/material'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
import './Header.css'

function Header() {
const [value,setValue]=useState();
const isLoggedIn=useSelector((state)=>state.isLoggedIn)
const dispath=useDispatch()
  return (
   <div className='head'>
      <AppBar  className='Header'>
          <Toolbar>
            <Typography variant='h4'>Blogger</Typography>
            { isLoggedIn && <Box display="flex" marginLeft={"auto"} marginRight="auto">
              <Tabs textColor='inherit' value={value} onChange={(e,val)=>setValue(val)}>
                <Tab LinkComponent={Link} to="/blogs" label="All Blog" />
                <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
                <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
              </Tabs>
  
            </Box>}
            <Box display="flex" marginLeft="auto">
              
               { !isLoggedIn &&  <><Button LinkComponent={Link} to="/" variant="contained" className='text-light ' sx={{margin:1,borderRadius:10}} >Login</Button>
                <Button LinkComponent={Link} to="/" variant="contained" className='text-light 'sx={{margin:1,borderRadius:10}} >SignUp</Button> </>}
                {isLoggedIn && <Button onClick={()=>dispath(authActions.logout())} LinkComponent={Link} to="/" variant="contained" className='text-light 'sx={{margin:1,borderRadius:10}} >LogOut</Button>}
            </Box>
          </Toolbar>
      </AppBar>
   </div>
  )
}

export default Header