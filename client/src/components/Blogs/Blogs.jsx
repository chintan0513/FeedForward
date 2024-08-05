import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import axios from "axios";
import { PlusCircleIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

function Blogs() {
  const { user } = useContext(AppContext);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error.response ? error.response.data : error.message);
    }
  };

  const handleAddOrUpdateBlog = async () => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:8000/api/blogs/${editBlogId}`, { title, content });
      } else {
        await axios.post("http://localhost:8000/api/blogs", { title, content });
      }
      setTitle("");
      setContent("");
      setEditMode(false);
      setShowForm(false);
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error.response ? error.response.data : error.message);
    }
  };
  
  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/blogs/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error.response ? error.response.data : error.message);
    }
  };

  const handleEditBlog = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setEditBlogId(blog._id);
    setEditMode(true);
    setShowForm(true);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl  underline text-center font-extrabold text-gray-900 mb-6">Blogs</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center absolute right-5 bottom-5 bg-blue-600 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700 transition duration-300"
      >
        <PlusCircleIcon className="h-6 w-6 mr-2" />
        {showForm ? "Hide Form" : "Add Blog"}
      </button>

      {showForm && user && (
        <div className="mt-6 p-6 text-center items-center bg-white shadow-lg rounded-lg border border-gray-200 ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{editMode ? "Edit Blog" : "Add Blog"}</h2>
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
          <button
            onClick={handleAddOrUpdateBlog}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            {editMode ? "Update Blog" : "Add Blog"}
          </button>
        </div>
      )}

      {!showForm && (
        <div className="mt-6 space-y-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white w-1/2 border flex flex-col border-gray-200 p-4 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
              <p className="text-gray-700 mb-4">{blog.content}</p>
              {user && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditBlog(blog)}
                    className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-300"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(blog._id)}
                    className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition duration-300"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blogs;
