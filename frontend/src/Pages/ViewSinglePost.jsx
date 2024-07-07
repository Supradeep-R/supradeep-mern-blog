import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const ViewSinglePost = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/view-single-post/${id}`, { withCredentials: true });
        setPostInfo(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);



  if (!postInfo) return <div>Loading...</div>;

  return (
    <div className="post-page max-w-3xl mx-auto p-4">
      {userInfo._id === postInfo.author._id && (
        <Link to={`/edit-post/${postInfo._id}`}>
          <div className="flex justify-start mb-4 bg-black text-white px-4 py-3 rounded-full text-center hover:bg-slate-800">
            <p className="mx-2">You are the author of this post, Edit by clicking here</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </div>
        </Link>
      )}
      <div className="border border-gray-300 rounded-lg p-4">
        <h1 className="text-3xl font-bold text-gray-900">{postInfo.title}</h1>
        <time className="block text-gray-500">{formatISO9075(new Date(postInfo.createdAt))}</time>
        <div className="author text-gray-700 mb-4">
          by <Link to={`/view-author-posts/${postInfo.author._id}`} className="text-blue-500 hover:underline">@{postInfo.author.username}</Link>
        </div>
        <div className="image mb-4">
          <img src={postInfo.imageURL} alt="" className="w-full max-h-96 object-cover rounded" />
        </div>
        <div className="content text-gray-800" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      </div>
    </div>
  );
};

export default ViewSinglePost;
