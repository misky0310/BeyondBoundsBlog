import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import { User } from './models/user.models.js';
import { Post } from './models/post.models.js';

import pkg from 'jsonwebtoken';
const {sign,verify}=pkg;

import cookieParser from 'cookie-parser';

import multer from 'multer'

import fs from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const upload=multer({dest:'./uploads'})


const app = express();
const saltRounds = 10;

app.use(express.json())

app.use(
    cors(
        {
            'credentials':true,
            'origin':'http://localhost:5173'
        }
    )
);

app.use(cookieParser())

app.use('/uploads',express.static(__dirname + '/uploads'))

try {
    mongoose.connect('mongodb://0.0.0.0:27017/usersDB')
} catch (error) {
    console.warn(error)
}



app.post('/signup', async (req,res) => {
    const {email,username,password}=req.body;

    try {
        const userDoc= await User.create({
            email,
            username,
            password:bcrypt.hashSync(password, saltRounds)
        })
        return res.json(userDoc)
    
    } catch (error) {
        res.status(400).json(error);    
    }

})


app.post("/login" , async (req,res) => {
    const {username,password}=req.body;
    const userDoc=await User.findOne({username:username});
    const loggedIn=bcrypt.compareSync(password, userDoc.password);
    
    if(loggedIn){
        //USER IS LOGGED IN
        const token = sign({username,id:userDoc._id},"secret",{})
        res.cookie('token',token).json({
            id:userDoc._id,
            username
        });
    }
    else{
        res.status(400).json('Wrong Credentials')
    }
})

app.get('/profile', (req,res) => {
    const {token}=req.cookies
    const verifycode = verify(token, "secret");
    return res.json(verifycode)
})

app.post('/logout',(req,res) => {
    res.cookie('token','').json('ok');
})


app.post('/createpost',upload.single('file'), async (req,res) => {
    
    const{originalname,path}=(req.file)
    const parts=originalname.split('.');
    const ext= parts[parts.length-1];
    const newPath=path+'.'+ext
    fs.renameSync(path,newPath)

    const{title,summary,content}=req.body;

    const {token}=req.cookies
    const verifycode = verify(token, "secret");

    try {
        const postDoc= await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author:verifycode.id
        })
        
        return res.json(postDoc)
    
    } catch (error) {
        res.status(400).json(error);    
    }
})

app.get('/post',async (req,res) => {
    const posts=await 
        Post.find()
        .populate('author',['username'])
        .sort({createdAt:-1})
        .limit(20);
    return res.json(posts);
    
})

app.get('/post/:id', async (req,res) => {
    const {id} = (req.params);
    const postDoc= await Post.findById(id).populate('author',['username']);
    return res.json(postDoc)
})

app.put('/edit/:id', upload.single('file'), async (req,res) => {
    
    let newPath=null;
    
    if(req.file){
        const{originalname,path}=(req.file)
        const parts=originalname.split('.');
        const ext= parts[parts.length-1];
        newPath=path+'.'+ext
        fs.renameSync(path,newPath)
    }

    const {id} = (req.params);
    const{title,summary,content}=req.body;
    const postDoc= await Post.findById(id).populate('author',['username']);

    try{ 
        await Post.updateOne({
            _id:postDoc._id
        },{
            $set:{
                title:title,
                summary:summary,
                content:content,
                cover:newPath ? newPath : postDoc.cover
            }
        });
        res.status(200).json('ok');
    }
    catch(error) {
        res.status(400).json(error)
    }
    
})

app.get('/verify',cors(), (req,res) => {
    const token= req.query.token;
    try {
        const verifycode = verify(token, "secret");
            res.status(200).json(
                {
                    verified:true,
                    data:verifycode
                });
    } catch (error) {
        return res.status(401).json(
            {
            verified:false
            })
    }
})


app.listen(8000);