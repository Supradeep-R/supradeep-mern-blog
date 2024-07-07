import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="flex justify-center items-center  bg-white">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto p-6 md:p-12">
        {/* Left Side */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-black mb-4">
            Welcome to Supradeep's Blog App
          </h2>
          <p className="text-gray-600 mb-6">
            Create and read informative, enthusiastic, and refreshing content.
            Interact with people and enjoy full access to this website.
          </p>
          <p className="text-gray-600 mb-6">
            Our mission is to provide a space for writers, thinkers, and
            enthusiasts to share their ideas, stories, and insights with a
            growing community of readers.
          </p>
          
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="bg-black bg-opacity-10 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-black mb-4">About the App</h3>
            <p className="text-gray-600 mb-4">
              Supradeep's Blog App is a platform designed to bring together
              writers, thinkers, and enthusiasts from all walks of life. Our
              goal is to create a vibrant community where ideas can be shared,
              discussed, and celebrated.
            </p>
            <p className="text-gray-600 mb-4">
              Whether you're an aspiring writer looking to hone your craft, or a
              reader eager to discover new perspectives, Supradeep's Blog App
              has something for everyone. Join us on this exciting journey as we
              explore the boundless possibilities of the written word.
            </p>
            <Link
              to="/view-posts"
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded inline-block transition-colors duration-300"
            >
              Explore the Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
