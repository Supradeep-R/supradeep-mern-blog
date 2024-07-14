import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostCard from "../Components/PostCard";
import axios from "axios";
import { UserContext } from "../../context/UserContext"; 
import { Spinner } from "flowbite-react"; // Import Spinner from Flowbite

const ViewAuthorPosts = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { authorId } = useParams();
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true); // State to manage loading
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    if (!userInfo || !userInfo.username) {
      navigate("/login"); // Redirect to login page if userInfo or username is not available
      return;
    }
  
    const fetchAuthorPosts = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/user/view-author-posts/${authorId}`,
          { withCredentials: true }
        );
        if (response.data.message) {
          setMessage(response.data.message);
        } else {
          setPosts(response.data);
        }
      } catch (error) {
        console.error("Error fetching author posts:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchAuthorPosts();
  }, [userInfo, navigate, authorId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    ); // Show loading spinner while fetching
  }

  return (
    <div>
      {posts.length > 0 && (
        <h2 className="text-center font-bold my-3 font-Poppins text-lg">
          These are the posts by @{posts[0].author.username}
        </h2>
      )}
      {message ? (
        <p className="text-center text-red-500">{message}</p>
      ) : (
        posts.length > 0 &&
        posts.map((post) => (
          <div key={post._id} className="p-4">
            <PostCard {...post} />
          </div>
        ))
      )}
    </div>
  );
};

export default ViewAuthorPosts;
