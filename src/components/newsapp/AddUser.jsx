import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddUser = () => {

  const [author, setAuthor] = useState("");

  const [title, setTitle] = useState("");

  const [caption, setCaption] = useState("");

  const [content, setContent] = useState("");

  const [image, setImage] = useState("");
  
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://muhdaffawibi.com/news", {
        author,
        title,
        caption,
        content,
        image,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="container bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={saveUser}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Author
            </label>
            <input
              type="text"
              className="input"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Caption
            </label>
            <input
              type="text"
              className="input"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Caption"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Content
            </label>
            <input
              type="text"
              className="input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image
            </label>
            <input
              type="text"
              className="input"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image"
            />
          </div>

          <div className="flex justify-between">
            <button type="submit" className="btn button is-success">
              Save
            </button>
            <Link to={`/`} className="btn button is-success">
              Go Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
