import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import {
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

function Blogs() {
  const { user } = useContext(AppContext);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState(""); // State for filter input

  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error(
        "Error fetching blogs:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleAddOrUpdateBlog = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("author", author);
      formData.append("tags", tags);
      if (image) {
        formData.append("image", image); // Append the selected image file
      }

      if (editMode) {
        await axios.put(
          `http://localhost:8000/api/blogs/${editBlogId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post("http://localhost:8000/api/blogs", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error(
        "Error saving blog:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setAuthor("");
    setTags("");
    setImage(null);
    setEditMode(false);
    setShowForm(false);
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/blogs/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error(
        "Error deleting blog:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleEditBlog = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setAuthor(blog.author);
    setTags(blog.tags.join(","));
    setImage(blog.image); // Optionally show current image URL in input
    setEditBlogId(blog._id);
    setEditMode(true);
    setShowForm(true);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter blogs based on the title or author
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(filter.toLowerCase()) ||
      blog.author.toLowerCase().includes(filter.toLowerCase())
  );

  // Function to truncate content to a specified number of words
  const truncateContent = (content, wordLimit) => {
    const words = content.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "..."; // Add ellipsis to indicate truncation
    }
    return content;
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl text-center font-extrabold mb-8 underline underline-offset-8 text-blue-600">
        Blogs
      </h2>

      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search blogs by title or author"
        className="border border-gray-300 p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center absolute right-5 bottom-5 bg-blue-600 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700 transition duration-300"
      >
        <PlusCircleIcon className="h-6 w-6 mr-2" />
        {showForm ? "Hide Form" : "Add Blog"}
      </button>

      {showForm && user && (
        <div className="mt-6 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {editMode ? "Edit Blog" : "Add Blog"}
          </h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border border-gray-300 p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="border border-gray-300 p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            className="border border-gray-300 p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="border border-gray-300 p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])} // Save the selected file
            accept="image/*"
            className="border border-gray-300 p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAddOrUpdateBlog}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            {editMode ? "Update Blog" : "Add Blog"}
          </button>
        </div>
      )}

      <div className="mt-6 mb-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden cursor-pointer" // Add cursor-pointer for better UX
            onClick={() => navigate(`/blogs/${blog._id}`)} // Navigate to blog detail on click
          >
            {blog.image && (
              <img
                src={`http://localhost:8000/${blog.image}`}
                alt={blog.title}
                className="w-full h-52 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {truncateContent(blog.content, 15)} {/* Truncate content */}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Author: {blog.author}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Tags: {blog.tags.join(", ")}
              </p>
              {user && (
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditBlog(blog);
                    }} // Prevent click from triggering the card click
                    className="bg-blue-700 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-300"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBlog(blog._id);
                    }} // Prevent click from triggering the card click
                    className="bg-slate-900 text-white p-2 rounded-md hover:bg-red-700 transition duration-300"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Blogs;
