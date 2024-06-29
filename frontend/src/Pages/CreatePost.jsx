import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Editor from "../Components/Editor";
import axios from 'axios';

const CreatePost = () => {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [imageURL, setImageURL] = useState('');
  const navigate = useNavigate();

    // To upload file to cloudinary
    const postDetails = (photo) => {
        if (photo === undefined) {
          toast({
            title: "Please Select an Image!",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
        if (photo.type === "image/jpeg" || photo.type === "image/png") {
          const data = new FormData();
          data.append("file", photo);
          data.append("upload_preset",import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
          data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
          fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: "post",
            body: data,
          })
            .then((res) => res.json())
            .then((data) => {
              setImageURL(data.url.toString());
              console.log(data.url.toString());
              
            })
            .catch((err) => {
              console.log(err);
              
            });
        } else {
          toast({
            title: "Please Select an Image!",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
      };

  async function createNewPost(e) {

    e.preventDefault();
    const postData = {title,summary,content,imageURL}
    
    try {
      const response = await axios.post('http://localhost:3000/user/create-post',postData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials:true
      })
      navigate('/');
    } catch (error) {
      console.log("some error in posting : "+error);
    }


    
    
  }

  return (
    <div className="my-7 p-3">
        <h2 className="font-Poppins font-extrabold text-center text-3xl my-6">Create Your Post Here</h2>
        
        <form className="flex flex-col shadow gap-4 border py-8 px-4" onSubmit={createNewPost}>
      <input className="border-2 p-2" type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input className="border-2 p-2" type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
             accept="image/*"
             onChange={(e) => postDetails(e.target.files[0])}
            />
      <Editor value={content} onChange={setContent} />
      <button className="bg-black text-white py-4 font-Poppins hover:shadow-lg" style={{marginTop:'5px'}}>Create post</button>
    </form>
    </div>
  )
}

export default CreatePost