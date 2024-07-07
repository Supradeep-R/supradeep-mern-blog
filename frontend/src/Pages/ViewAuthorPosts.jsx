import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../Components/PostCard";
import axios from "axios";

const ViewAuthorPosts = () => {
  const { authorId } = useParams();
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAuthorPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/view-author-posts/${authorId}`,
          { withCredentials: true }
        );
        if (response.data.message) {
          setMessage(response.data.message);
        } else {
          setPosts(response.data);
        }
      } catch (error) {
        console.error("Error fetching author posts:", error);
      }
    };

    fetchAuthorPosts();
  }, [authorId]);

  return (
    <div>
      {message ? (
        <p>{message}</p>
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
