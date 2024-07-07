import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext"; // Assuming you have a UserContext for user authentication

const Home = () => {
  const { userInfo } = useContext(UserContext);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">
          Welcome to Supradeep's Blog App
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Create and explore informative, enthusiastic, and refreshing content.
          Join our vibrant community!
        </p>
        <div className="mt-6 space-x-4">
          {!userInfo || !userInfo.username ? (
            <Link
              to="/login"
              className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-800 transition-colors duration-300"
            >
              Login
            </Link>
          ) : (
            <Link
              to="/view-posts"
              className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-800 transition-colors duration-300"
            >
              View Posts
            </Link>
          )}
          {/* Additional Links if needed */}
        </div>
      </div>
    </div>
  );
};

export default Home;
