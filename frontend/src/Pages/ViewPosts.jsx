import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import PostCard from "../Components/PostCard";


const ViewPosts = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [posts, setPosts] = useState([]);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || !userInfo.username) {
      navigate("/login"); // Redirect to login page if userInfo or username is not available
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/user/view-posts`,
          { withCredentials: true }
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userInfo, navigate]);

  return (
    <div>
      {posts.length > 0 &&
        posts.map((post) => (
          <div key={post._id} className="p-4">
            <PostCard {...post} />
          </div>
        ))}
    </div>
  );
};

export default ViewPosts;
