import React, { useEffect, useState } from 'react'
import Post from './Post'
import axios from 'axios'

const Test = () => {
  
  const[posts,setPosts]=useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/post')
      .then((response) => setPosts(response.data))
  },[])
  
  return (
    <>
        {posts.map(post => (
          <Post post={post} key={post._id}/>
        ))}
    </>
  )
}

export default Test