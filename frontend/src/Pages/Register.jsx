import {React,useState} from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link ,useNavigate} from "react-router-dom";
import axios from 'axios';


const Register = () => {
  const navigate = useNavigate();
  const [formData,setFormData]=useState({});

  const changeHandler=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:3000/api/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 200) {
        console.log('Registration successful:', response.data);
        navigate('/login');
      } else {
        console.error('Registration failed');
        
      }
    } catch (error) {
      console.error('Error:', error);
      
    }
  };


  return (
    <div className="h-screen flex justify-center items-center gap-4 flex-col md:flex-row">
      {/* left */}
      <div className="w-1/2 p-6 justify-center items-center">
        <h2 className=" text-xl font-bold">
          Welcome to Supradeep's Blog Website
        </h2>
        <p>
          Create and read informative,enthusiastic,refreshing content.Interact
          with people.Signin and enjoy full access to this website.
        </p>
      </div>

      {/* right */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <form onSubmit={submitHandler} className="w-4/6 flex justify-center items-center border p-3 flex-col gap-4 ">
          <h3 className="text-lg font-extrabold font-Poppins">Register</h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Your Username" />
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="Enter Username"
              required
              shadow
              onChange={changeHandler}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@gmail.com"
              required
              shadow
              onChange={changeHandler}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              required
              shadow
              onChange={changeHandler}
              placeholder="Enter Password"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="confirmpassword" value="Confirm password" />
            </div>
            <TextInput
              id="confirmpassword"
              type="password"
              placeholder="Confirm Password"
              required
              shadow
              onChange={changeHandler}
            />
          </div>

          <Button type="submit">Register</Button>
        </form>
        <p className='mt-3'>
          Have an account?
          <span className="text-blue-600 underline">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
