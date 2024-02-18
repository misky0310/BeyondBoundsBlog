import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';

const EditPost = () => {
    
    const[title,setTitle]=useState('')
    const[summary,setSummary]=useState('')
    const[content,setContent]=useState('')
    const[files,setFiles]=useState(null);

    
    const {id}=useParams();

    useEffect(()=> {
        axios.get('http://localhost:8000/post/'+id)
            .then((response) => {
                const postInfo=(response.data);
                setTitle(postInfo.title)
                setSummary(postInfo.summary)
                setContent(postInfo.content)
            })
    }, [])

    const[redirect,setRedirect]=useState(false);


    const editPost = (e) => {
        
        e.preventDefault();
        const data=new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        if(files?.[0])
            data.set('file',files?.[0]);

        axios.put('http://localhost:8000/edit/'+id, 
            data,
            {
                withCredentials:true
            }
        ).then((response) => {
            console.log(response.data)
            setRedirect(true)
        })
        .catch((error) => console.warn(error))
        
    }

    if(redirect)
        return <Navigate to={'/post/'+id}/>

  return (
    <form className='flex flex-col gap-7' onSubmit={editPost}>
        <input
            type="text"
            placeholder='Title'
            className='bg-gray-700 px-5 py-4 rounded-md text-xl'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <input 
            type="text" 
            placeholder='Summary' 
            className='bg-gray-700 px-5 py-4 rounded-md text-xl' 
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
        />
        <input 
            type="file" 
            className='text-xl bg-gray-700 rounded-md px-5 py-4' 
            onChange={(e) => setFiles(e.target.files)}
        />
        <ReactQuill 
            theme='snow' 
            className='bg-gray-400 text-black text-xl'
            value={content}
            onChange={(newValue) => setContent(newValue)}
        />
        <button 
            className='bg-gray-700 w-28 text-white px-4 py-3 rounded-lg text-md font-semibold hover:bg-gray-600 mb-10'>
                Update 
        </button>
    </form>
  )
}

export default EditPost