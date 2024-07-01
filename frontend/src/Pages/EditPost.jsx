import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Editor from "../Components/Editor";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageURL,setImageURL]=useState("");
  const { id } = useParams();
  const navigate = useNavigate();

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
      data.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "post",
          body: data,
        }
      )
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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/view-single-post/${id}`,
          { withCredentials: true }
        );
        const data = response.data;
        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content);
        setImageURL(data.imageURL); // Assume you have imageURL in the response
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const updatePost = async (e) => {
    e.preventDefault();
    const updateData = { title, summary, content, imageURL };

    try {
      const response = await axios.put(
        `http://localhost:3000/user/update-single-post/${id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate("/view-posts");
    } catch (error) {
      console.log("some error in updating : " + error);
    }
  };

  return (
    <div className="my-7 p-3">
      <h2 className="font-Poppins font-extrabold text-center text-3xl my-6">
        Update Your Post Here
      </h2>

      <form
        className="flex flex-col shadow gap-4 border py-8 px-4"
        onSubmit={updatePost}
      >
        <input
          className="border-2 p-2"
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          className="border-2 p-2"
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
        <Editor value={content} />
        <button
          className="bg-black text-white py-4 font-Poppins hover:shadow-lg"
          style={{ marginTop: "5px" }}
        >
          Update post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
