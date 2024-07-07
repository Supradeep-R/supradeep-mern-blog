import { React, useState } from "react";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { HiExclamationCircle, HiCheckCircle } from 'react-icons/hi';

const Register = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('');

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

    // Real-time validation for password
    if (e.target.id === "password") {
      if (!passwordRegex.test(e.target.value)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          password: "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character"
        }));
      } else {
        setErrors(prevErrors => {
          const { password, ...rest } = prevErrors;
          return rest;
        });
      }
    }

    // Real-time validation for confirm password
    if (e.target.id === "confirmpassword") {
      if (e.target.value !== formData.password) {
        setErrors(prevErrors => ({
          ...prevErrors,
          confirmpassword: "Passwords do not match"
        }));
      } else {
        setErrors(prevErrors => {
          const { confirmpassword, ...rest } = prevErrors;
          return rest;
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character";
    }
    if (formData.password !== formData.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/register`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setToastMessage('Registration successful!');
        setToastType('success');
        setShowToast(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setToastMessage('Registration failed. Please try again.');
        setToastType('error');
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage('Error: ' + error.message);
      setToastType('error');
      setShowToast(true);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center gap-4 flex-col md:flex-row">
      {showToast && (
        <div className="fixed top-5 right-5 z-50">
          <Toast>
            <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
              toastType === 'success' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
            }`}>
              {toastType === 'success' ? <HiCheckCircle className="h-5 w-5" /> : <HiExclamationCircle className="h-5 w-5" />}
            </div>
            <div className="ml-3 text-sm font-normal">{toastMessage}</div>
            <Toast.Toggle onClick={() => setShowToast(false)} />
          </Toast>
        </div>
      )}
      {/* left */}
      <div className="w-1/2 p-6 justify-center items-center">
        <h2 className=" text-xl font-bold">
          Welcome to Supradeep's Blog Website
        </h2>
        <p>
          Create and read informative, enthusiastic, refreshing content. Interact
          with people. Sign in and enjoy full access to this website.
        </p>
      </div>

      {/* right */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <form onSubmit={submitHandler} className="w-full md:w-4/6 flex justify-center items-center border p-3 flex-col gap-4 ">
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
              color={errors.username ? "failure" : "default"}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
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
              color={errors.email ? "failure" : "default"}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
              color={errors.password ? "failure" : "default"}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
              color={errors.confirmpassword ? "failure" : "default"}
            />
            {errors.confirmpassword && <p className="text-red-500 text-sm">{errors.confirmpassword}</p>}
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
