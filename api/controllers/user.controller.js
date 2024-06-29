const Post = require('../models/post.model');

const createPost = async(req,res)=>{
   const {title,summary,content,imageURL} = req.body;
   const newPost = new Post({title,summary,content,imageURL,author:req.user.id});
   try{
    await newPost.save();
    return res.status(200).json({message:"successfully posted",newPost});
   }catch(error){
    return res.status(500).json({message:"Some error occured in posting blog",error})
   }
}

module.exports={createPost};