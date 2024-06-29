const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;
  if (
    !username ||
    !password ||
    !email ||
    !confirmpassword ||
    username === "" ||
    password === "" ||
    email === "" ||
    confirmpassword === ""
  ) {
    return res.status(400).json({ message: "Every field must be filled" });
  }
  if (confirmpassword !== password) {
    return res
      .status(400)
      .json({ message: "Password and Confirm password should match" });
  }
  hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(200).json({ message: "signup successfull" });
  } catch (error) {
    res.status(500).json({ message: "error while signup", error });
  }
};

const login = async(req,res)=>{
  const {email,password} = req.body;
  if(!email || !password || email ==='' || password===''){
    return res.status(400).json({message:"All fields should be filled"});
  }

  try{
    const validUser = await User.findOne({email});
    if(!validUser){
      return res.status(400).json({message:"User not found"})
    }
    const validPassword = bcrypt.compareSync(password,validUser.password);
    if(!validPassword){
      return res.status(400).json({message:"Invalid Credentials"});
    }

    const token  = jwt.sign({id:validUser._id},process.env.SECRET_KEY);

    const{password:_,...rest}=validUser.toObject();

    return res.status(200).cookie('access_token',token,{
      httpOnly:true
    }).json(rest);

    
  }catch(error){
    console.log(error)
    return res.status(500).json({message:"some error in login",error})
  }
}

module.exports={register,login};