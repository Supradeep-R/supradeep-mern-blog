import { React, useContext, useState } from 'react';
import { Button, Checkbox, Label, TextInput, Toast } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { HiExclamationCircle, HiCheckCircle } from 'react-icons/hi';

const Login = () => {
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState(''); // 'success' or 'error'

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:3000/api/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.status === 200) {
        console.log('Login successful:', response.data);
        setUserInfo(response.data);
        setToastMessage('Login successful!');
        setToastType('success');
        setShowToast(true);
        setTimeout(() => {
          navigate('/');
        }, 1000); // Redirect after 2 seconds
      } else {
        console.error('Login failed');
        setToastMessage('Login failed. Please try again.');
        setToastType('error');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setToastMessage('Error: ' + error.message);
      setToastType('error');
      setShowToast(true);
    }
  };

  return (
    <div>
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
      <div className="h-screen flex justify-center items-center gap-4 flex-col md:flex-row">
        {/* left */}
        <div className="w-1/2 p-6 justify-center items-center">
          <h2 className="text-xl font-bold">
            Welcome to Supradeep's Blog Website
          </h2>
          <p>
            Create and read informative, enthusiastic, refreshing content. Interact
            with people. Sign in and enjoy full access to this website.{" "}
          </p>
        </div>

        {/* right */}
        <div className="w-1/2 flex flex-col justify-center items-center">
          <form onSubmit={submitHandler} className="w-4/6 flex justify-center items-center border p-3 flex-col gap-4 ">
            <h3 className="text-lg font-extrabold font-Poppins">Login</h3>
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

            <Button type="submit">Login</Button>
          </form>
          <p className='mt-3'>
            Don't have an account?
            <span className="text-blue-600 underline">
              <Link to="/register">Create New</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
