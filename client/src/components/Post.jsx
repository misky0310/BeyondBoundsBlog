import React from 'react'
import { formatISO9075 } from "date-fns";
import { Link } from 'react-router-dom';

const Post = ({post}) => {
  return (
    <div className="post md:flex justify-center gap-5 mb-6 border-2 border-blue-400 px-6 py-6">
        
        <Link to={`/post/${post._id}`}>
          <img src={'http://localhost:8000/'+post.cover} alt="" className="post-img px-0 object-contain md:w-[380px] w-full h-full object-center m-0" />
        </Link>
        
        <div className="post-content flex flex-col gap-6 md:w-[550px]">
          
          <div className="flex flex-col gap-1">
           
            <Link to={`/post/${post._id}`}>
              <span className="post-title font-bold text-xl">
                {post.title}
              </span>
            </Link>
            
            <span className="post-author text-gray-400">
              <span className="author font-bold">{post.author.username}</span> {formatISO9075(new Date(post.createdAt))}
            </span>
          
          </div>
          
          <span className="post-desc leading-8">
            {/* Tesla has been sued by 25 California counties alleging the automaker has repeatedly mishandled hazardous waste at facilities throughout the state. The lawsuit was filed after months of settlement talks apparently fell apart. */}
            {post.summary}
          </span>
        
        </div>
      </div>
  )
}

export default Post