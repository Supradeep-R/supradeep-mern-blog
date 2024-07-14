import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { Spinner, Alert } from "flowbite-react"; // Import Alert

const ViewSinglePost = () => {
  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/view-single-post/${id}`, { withCredentials: true });
        setPostInfo(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`${backendUrl}/user/delete-post/${id}`, { withCredentials: true });
        setAlertMessage("Post deleted successfully!");
        setAlertVisible(true);
        // Optionally, redirect or update state to remove post
      } catch (error) {
        console.error("Error deleting post:", error);
        setAlertMessage("Failed to delete post.");
        setAlertVisible(true);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="post-page max-w-3xl mx-auto p-4 md:p-8">
      {alertVisible && (
        <Alert color="success" onDismiss={() => setAlertVisible(false)}>
          {alertMessage}
        </Alert>
      )}
      {userInfo._id === postInfo.author._id && (
        <div className="flex justify-start mb-4">
          <Link to={`/edit-post/${postInfo._id}`} className="bg-black text-white px-4 py-3 rounded-full text-center hover:bg-gray-700 transition mr-4">
            Edit Post
          </Link>
          <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-3 rounded-full text-center hover:bg-red-700 transition">
            Delete Post
          </button>
        </div>
      )}
      <div className="p-4 md:p-6 bg-white shadow-sm rounded-md">
        <h1 className="text-4xl font-bold text-gray-900">{postInfo.title}</h1>
        <time className="block text-gray-500 text-sm">{formatISO9075(new Date(postInfo.createdAt))}</time>
        <div className="author text-gray-700 mb-4">
          by <Link to={`/view-author-posts/${postInfo.author._id}`} className="text-blue-500 hover:underline">@{postInfo.author.username}</Link>
        </div>
        <div className="image mb-4">
          <img src={postInfo.imageURL} alt="" className="w-full h-auto object-cover rounded-lg" />
        </div>
        <div className="content text-gray-800" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      </div>
    </div>
  );
};

export default ViewSinglePost;
