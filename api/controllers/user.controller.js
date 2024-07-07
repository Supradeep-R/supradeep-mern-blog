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

const viewPosts = async(req,res)=>{
   res.json(
      await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
    );
}
const viewSinglePost = async (req, res) => {
   const { id } = req.params;
   try {
     const postDoc = await Post.findById(id).populate('author', ['username']);
     res.json(postDoc);
   } catch (error) {
     res.status(500).json({ message: 'Error fetching the post', error });
   }
 };
 
 const updateSinglePost = async (req, res) => {
  const { id } = req.params;
  const { title, summary, content, imageURL } = req.body;

  // console.log("this is from update single post :" + req.user.id);

  try {
    const postDoc = await Post.findById(id);
    if (!postDoc) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(req.user.id);
    if (!isAuthor) {
      return res.status(400).json('You are not the author');
    }

    const updatedData = { title, summary, content };
    if (imageURL) {
      updatedData.imageURL = imageURL;
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updatedData, { new: true });

    return res.status(200).json({ message: "Successfully updated post", updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: "Some error occurred in updating the blog", error });
  }
};

const viewAuthorPosts = async (req, res) => {
  console.log("called view author posts");
  console.log(req.user)
  const { id } = req.params;
  console.log(req.params);
  console.log("Received author ID:", id);

  try {
    const posts = await Post.find({ author: id }).populate('author', ['username']).sort({ createdAt: -1 });
    console.log(posts);
    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts posted by this author" });
    }

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving posts", error });
  }
};
module.exports = { createPost, viewPosts, viewSinglePost, updateSinglePost ,viewAuthorPosts};
