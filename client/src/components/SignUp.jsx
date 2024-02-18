import React, { useRef } from 'react';
import { FaUserCircle, FaLock } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import axios from 'axios'
const SignUp = () => {
  const emailRef = useRef();
  const userRef = useRef();
  const passRef = useRef();

  const handleRegister = (e) => {
    e.preventDefault()

    // axios.post('https://jsonplaceholder.typicode.com/posts',
      // JSON.stringify(
      // {
      //   title: 'fOO',
      //   body: 'bar',
      //   userId: 1,
      // }),
      // {headers: {
      //   'Content-Type': 'application/json'
      // }}
      // )
      // .then(resp => console.log(resp))
      // .catch(err => console.warn(err))
      
      let data = JSON.stringify({
        "email": emailRef.current.value,
        "username": userRef.current.value,
        "password": passRef.current.value
      });

      // let config = {
      //   method: 'post',
      //   maxBodyLength: Infinity,
      //   url: 'http://localhost:8000/signup',
      //   headers: { 
      //     'Content-Type': 'application/json'
      //   },
      //   data : data
      // };

      axios.post('http://localhost:8000/signup',data,
        {headers:{'Content-Type': 'application/json'}}
      )
      .then((response) => {
        alert("Registration Successful")
        emailRef.current.value='';
        userRef.current.value='';
        passRef.current.value='';
      
      })
      .catch((error) => {
        alert('Registration Failed')
      });

  }
  return (
    <>
      <h1 className='text-center text-[3rem] font-semibold mb-8'>Sign Up</h1>
      <form className='flex flex-col w-full md:w-[50%] mx-auto gap-5' onSubmit={handleRegister} autoComplete='off'>
        <div className='flex'>
          <span className='inline-flex items-center px-3 text-sm border-none rounded-e-0  rounded-s-md bg-gray-600 text-gray-400 '>
            <MdAlternateEmail className='h-4 w-4' />
          </span>
          <input
            type='email'
            className='rounded-none outline-none border-none rounded-e-lg block flex-1 min-w-0 w-full text-md  p-2.5  bg-gray-700  placeholder-gray-400 text-white focus:ring-[1.5px] focus:border-sky-700'
            ref={emailRef}
            placeholder='Email-ID'
          />
        </div>

        <div className='flex'>
          <span className='inline-flex items-center px-3 text-sm border-none rounded-e-0  rounded-s-md bg-gray-600 text-gray-400 '>
            <FaUserCircle className='h-4 w-4' />
          </span>
          <input
            type='text'
            className='rounded-none outline-none border-none rounded-e-lg block flex-1 min-w-0 w-full text-md  p-2.5  bg-gray-700  placeholder-gray-400 text-white focus:ring-[1.5px] focus:border-sky-700'
            placeholder='Username'
            ref={userRef}
          />
        </div>

        <div className='flex'>
          <span className='inline-flex items-center px-3 text-sm border-none rounded-e-0  rounded-s-md bg-gray-600 text-gray-400 '>
            <FaLock className='h-4 w-4' />
          </span>
          <input
            type='password'
            className='rounded-none outline-none border-none rounded-e-lg block flex-1 min-w-0 w-full text-md  p-2.5  bg-gray-700  placeholder-gray-400 text-white focus:ring-[1.5px] focus:border-sky-700'
            placeholder='Password'
            ref={passRef}
          />
        </div>
        <button
          type='submit'
          className='w-full border border-gray-500 bg-gray-700 rounded-xl py-2 text-md hover:bg-gray-800 font-semibold '
        >
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUp;
