// BlogDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../footer/Footer";

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/blogs/${id}`);
      setBlog(response.data);
    } catch (error) {
      console.error(
        "Error fetching blog details:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    ); // Show loading message while fetching
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-red-500">Blog not found.</div>
      </div>
    ); // Handle case where blog is not found
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md mb-12 p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-blue-600">
          {blog.title}
        </h2>
        {blog.image && (
          <img
            src={`http://localhost:8000/${blog.image}`}
            alt={blog.title}
            className="w-full md:w-3/4 lg:w-2/3 h-auto rounded-lg mb-4 object-cover"
          />
        )}
        <div className="flex flex-col md:flex-row items-start md:justify-between mb-4">
          <p className="text-sm text-gray-500">Author: {blog.author}</p>
          <p className="text-sm text-gray-500">Tags: {blog.tags.join(", ")}</p>
        </div>
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
          {blog.content}
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetail;
