import React, { useState, useEffect,useContext } from "react";
import { useParams,useNavigate } from "react-router-dom";
import PostCard from "../Components/PostCard";
import axios from "axios";
import { UserContext } from "../../context/UserContext"; 

const ViewAuthorPosts = () => {
  const { authorId } = useParams();
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
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
  }, [userInfo, navigate]);

  return (
    <div>
      {posts.length > 0 && (
        <h2 className="text-center font-bold my-3 font-Poppins text-lg">
          These are the posts by @{posts[0].author.username}
        </h2>
      )}
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
