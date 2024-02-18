import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import Cookies from 'js-cookie';
import { Bounce,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { CgCloseO } from "react-icons/cg";

const Header = () => {
  const {userInfo,setUserInfo}= useContext(UserContext)
  const[redirect,setRedirect]=useState(false)
  // useEffect(() => {
  //   axios.get('http://localhost:8000/profile',2
  //   {
  //     withCredentials:true
  //   }).then((response) => {
  //     const userData=response.data;
  //     setUserInfo(userData);
  //   })
  // },[])


  useEffect(() => {
    // Check if the token exists in the cookie on page refresh
    const token = Cookies.get('token');

    if (token) {
      // Token exists, you can perform actions accordingly
      console.log('Token exists:', token);

      axios.get('http://localhost:8000/verify?token='+token)
      .then((response) => {
        if(response.status===200){
          setUserInfo(response.data.data)
          console.log(userInfo.username)
        }  
      })
      .catch(error=>{
        if(error.response.status === 401){
          Cookies.remove(token)
            setUserInfo(null);
            alert('Unauthorized access')
          }
      })
    } else {
      // Token doesn't exist, handle the case as needed
      console.log('Token not found.');
    }
  }, []);



  const user=userInfo?.username;

  
  const handleLogout =() => {
    axios.post('http://localhost:8000/logout',{
      withCredentials:true
    });
    setUserInfo(null)
    Cookies.remove('token');
    toast.success("Logged Out !!!",{
      transition:Bounce
    });
  }

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };



  return (
    <nav className="flex justify-between items-center mb-8 mt-6 border-b-2">
        <Link to='/' className="logo mb-4 w-[5rem]">
          <img src="/logo.png" alt="" />
        </Link>
        
        {user && (
          <div className="links flex gap-6 mb-4">
            <Link to='/create' className="text-xl">Create New Post</Link>
            <a className="text-xl cursor-pointer" onClick={handleLogout}>Logout</a>
          </div>
        )}
        
        {!user && 
          <div className={`flex gap-6 mb-4` }>

            <Link to='/login' className={`md:flex hidden space-x-4 text-xl font-semibold`}>Login</Link>
            <Link to='/signup' className={`md:flex hidden space-x-4 text-xl font-semibold`}>Sign Up</Link>
            
            
            <div className={`${menuOpen? 'openDiv' : 'hidden'}`}>
              <button onClick={() => setMenuOpen(false)} className='absolute top-0 right-0 text-3xl p-4'>
                <CgCloseO />
              </button>
                <div className="flex flex-col gap-4 absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] items-center text-center w-full">
                  <Link to='/login' className='text-xl font-semibold' onClick={() => setMenuOpen(false)}>Login</Link>
                  <Link to='/signup' className='text-xl font-semibold' onClick={() => setMenuOpen(false)}>Sign Up</Link>
                </div>
            </div>
            
            
            <button className="md:hidden" onClick={toggleMenu}>
              <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        } 
      </nav>
  )
}

export default Header