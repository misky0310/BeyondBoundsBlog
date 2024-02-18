import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatISO9075 } from "date-fns";
import UserContext from '../context/UserContext';
import { FaEdit } from "react-icons/fa";


const SinglePost = () => {
  
  const {id}= useParams();
  const[post,setPost] = useState(null);

  const {userInfo}=useContext(UserContext)

  useEffect(()=> {
    axios.get(`http://localhost:8000/post/${id}`)
    .then((response) => {
      setPost(response.data)
    })
  }, [])
  
  if(!post) return;
  

  return (
    <div className='fullPost flex flex-col gap-10 p-6'>
      
      <span className='text-3xl font-extrabold text-center pt-7 '>{post.title}</span>
      <div className="author flex gap-5 w-[30%] justify-evenly text-gray-400 mx-auto">
        <span className='font-bold'>{post.author.username}</span>
        <span className='text-blue-400'>/</span>
        <span>{formatISO9075(new Date(post.createdAt))}</span>
      </div>

      {userInfo.id===post.author._id && (
        <div className='w-full flex'>
          <Link to={`/edit/${post._id}`} className='bg-gray-700 border-gray-600 text-gray-400 px-6 py-2 rounded-lg mx-auto font-semibold text-md flex items-center gap-3 hover:bg-gray-800'><FaEdit />Edit this post</Link>
        </div>
      )}

      <img src={'http://localhost:8000/' + post.cover} alt="" className='w-full rounded-xl' />
      
      <div className='content leading-loose pb-10'
        dangerouslySetInnerHTML={{ __html: post.content }}
       />
      
    </div>
  )
}

export default SinglePost