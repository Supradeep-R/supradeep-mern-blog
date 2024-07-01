import React, { useState, useEffect } from "react";
import PostCard from "../Components/PostCard";
import axios from "axios";

const ViewPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/view-posts",
          { withCredentials: true }
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
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
