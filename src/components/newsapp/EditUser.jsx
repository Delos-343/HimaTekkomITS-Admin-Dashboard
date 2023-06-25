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
    <div className="columns mt-5 is-centered ml-5">
      <div className="column is-half">
        <form onSubmit={updateUser}>
          <div className="field">
            <label className="label">
              Author
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
              />
            </div>
          </div>

          <br />

          <div className="field">
            <label className="label">
              Title
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
          </div>

          <br />

          <div className="field">
            <label className="label">
              Caption
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Caption"
              />
            </div>
          </div>

          <br />

          <div className="field">
            <label className="label">
              Content
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
              />
            </div>
          </div>

          <br />

          <div className="field">
            <label className="label">
              Image
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image"
              />
            </div>
          </div>

          <br />

          <div className="field">
            <button type="submit" className="button is-success">
              Update
            </button>
          </div>

          <br />

        </form>
      </div>
      <Link to={`/`} className="btn button is-success">
        Go Back
      </Link>
    </div>
  );
};

export default EditUser;