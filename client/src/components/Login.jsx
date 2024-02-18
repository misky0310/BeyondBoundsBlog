import axios from 'axios';
import React, { useContext, useRef, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Bounce,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const userRef=useRef();
  const passRef=useRef();
  const [redirect,setRedirect]=useState(false);
  const {setUserInfo} = useContext(UserContext)
  const handleLogin=(e) => {
    e.preventDefault();
    
    let data=JSON.stringify({
      "username":userRef.current.value,
      "password":passRef.current.value
    })

    axios.post('http://localhost:8000/login',
    data,
    {
      withCredentials: true,
      headers:{
        'Content-Type': 'application/json'
      },   
    }
    )
    .then((response) => {
      if(response.status===200){
        setUserInfo(response.data)
        setRedirect(true)
        toast.success("Logged in !!!",{
          transition:Bounce
        });
      }
    })
    .catch((error) =>{
      toast.error('Wrong Credentials',{
        transition:Bounce
      });
    })

  }

  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
    <>
      <h1 className='text-center text-[3rem] font-semibold mb-8'>Login</h1>
      <form action="" className='flex flex-col w-full md:w-[50%] mx-auto gap-5' onSubmit={handleLogin} autoComplete='off'>
      
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm border-none rounded-e-0 rounded-s-md bg-gray-600 text-gray-400 ">
            <FaUserCircle className='h-4 w-4' />
          </span>
          <input type="text" className="rounded-none outline-none border-none rounded-e-lg block flex-1 w-full text-md p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-[1.5px] focus:border-sky-700" placeholder="Username" ref={userRef} />
        </div>

      <div className="flex">
          <span className="inline-flex items-center px-3 text-sm border-none rounded-e-0  rounded-s-md bg-gray-600 text-gray-400 ">
            <FaLock className='h-4 w-4'/>
          </span>
          <input type="password" className="rounded-none outline-none border-none rounded-e-lg block flex-1 min-w-0 w-full text-md  p-2.5  bg-gray-700  placeholder-gray-400 text-white focus:ring-[1.5px] focus:border-sky-700" placeholder="Password" ref={passRef} />
      </div>
      <button type='submit' className='w-full border border-gray-500 bg-gray-700 rounded-xl py-2 text-md hover:bg-gray-800 font-semibold '>Login</button>
    </form>
    </>
    
  )
}

export default Login