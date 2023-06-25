import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditUser = () => {

  const [author, setAuthor] = useState();

  const [title, setTitle] = useState();

  const [caption, setCaption] = useState();

  const [content, setContent] = useState();

  const [image, setImage] = useState();

  const navigate = useNavigate();
  
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://muhdaffawibi.com/news/${id}`, {
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

  const getUserById = async () => {
    const response = await axios.get(`https://muhdaffawibi.com/news/${id}`);
    setAuthor(response.data.author);
    setTitle(response.data.title);
    setCaption(response.data.caption);
    setContent(response.data.content);
    setImage(response.data.image);
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="container bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={updateUser}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Author
            </label>
            <input
              type="text"
              className="input px-2 py-1"
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
              className="input px-2 py-1"
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
              className="input px-2 py-1"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Caption"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Content
            </label>
            <div className="control">
              <textarea
                className="input px-2 py-1"
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image
            </label>
            <input
              type="text"
              className="input px-2 py-1"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image"
            />
          </div>

          <div className="flex justify-between">
            <button type="submit">
              Update
            </button>
            <Link to={`/`}>
              Go Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
