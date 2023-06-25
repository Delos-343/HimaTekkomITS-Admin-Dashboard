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
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveUser}>
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
              Save
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

export default AddUser;