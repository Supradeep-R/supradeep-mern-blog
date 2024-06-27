const User = require('../models/user.model');
const bcrypt= require('bcryptjs')

exports.signup = async(req,res)=>{
    const {username,email,password,confirmpassword}=req.body;
    if(!username || !password || !email || !confirmpassword || username ==='' || password==='' || email==='' || confirmpassword===''){
        return res.status(400).json({message:"Every field must be filled"});
    }
    if(confirmpassword!==password){
        return res.status(400).json({message:"Password and Confirm password should match"})
    }
    hashedPassword = bcrypt.hashSync(password,10);
    const newUser = new User(
       { username,
        email,
        password:hashedPassword}
    );
    try{
        await newUser.save();
        res.status(200).json({message:"signup successfull"})
    }catch(error){
        res.status(500).json({message:"error while signup",error})
    }

}