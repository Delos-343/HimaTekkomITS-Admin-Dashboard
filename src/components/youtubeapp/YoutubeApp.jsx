import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YoutubeApp = () => {
  const [youtubeIds, setYotubeIDs] = useState([]);
  const [currentYoutubeID, setCurrentYoutubeID] = useState({ id: null, url: ''});

  useEffect(() => {
    fetchYotubeIDs();
  }, []);

  const fetchYotubeIDs = async () => {
    try {
      const response = await axios.get('https://muhdaffawibi.com/youtubeId');
      setYotubeIDs(response.data);
    } catch (error) {
      console.error('Error fetching youtubeIds:', error);
    }
  };

  const addNote = async () => {
    if (currentYoutubeID.url.trim() !== '') {
      try {
        const response = await axios.post("https://muhdaffawibi.com/youtubeId", currentYoutubeID);
        setYotubeIDs([...youtubeIds, response.data]);
        setCurrentYoutubeID({ id: null, url: ''});
      } catch (error) {
        console.error('Error adding youtubeId:', error);
      }
    }
  };

  const updateNote = async () => {
    if (currentYoutubeID.url.trim() !== '') {
      try {
        await axios.put(`https://muhdaffawibi.com/youtubeId/${currentYoutubeID.id}`, currentYoutubeID);
        setYotubeIDs(youtubeIds.map((youtubeId) => (youtubeId.id === currentYoutubeID.id ? currentYoutubeID : youtubeId)));
        setCurrentYoutubeID({ id: null, url: ''});
      } catch (error) {
        console.error('Error updating youtubeId:', error);
      }
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`https://muhdaffawibi.com/youtubeId/${id}`);
      setYotubeIDs(youtubeIds.filter((youtubeId) => youtubeId.id !== id));
    } catch (error) {
      console.error('Error deleting youtubeId:', error);
    }
  };

  const editNote = (youtubeId) => {
    setCurrentYoutubeID({
      id: youtubeId.id,
      url: youtubeId.url
    });
  };

  return (
    <div className="grid w-full flex-col sm:flex-row bg-white mx-auto px-4 py-3 mt-5 rounded-t-lg shadow-lg">
      <h1 className="text-2xl text-blue-500 font-bold mb-4">
        YotubeIDs App
      </h1>
      <hr className="mb-5 text-gray-300" />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          className="border border-gray-400 rounded px-2 py-1 mb-2 sm:mr-2 sm:mb-0 w-full sm:w-auto"
          value={currentYoutubeID.url}
          onChange={(e) => setCurrentYoutubeID({ ...currentYoutubeID, url: e.target.value })}
        />
        {currentYoutubeID.id ? (
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded mb-2 sm:mb-0"
            onClick={updateNote}
          >
            Update
          </button>
        ) : (
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-light py-2 px-4 rounded"
            onClick={addNote}
          >
            Add New
          </button>
        )}
      </div>
      <ul>
        {youtubeIds.map((youtubeId) => (
          <li key={youtubeId.id} className="flex flex-col sm:flex-row justify-between align-middle mb-2 bg-gray-100 rounded px-4 py-2">
            <div className="flex flex-col sm:flex-row justify-start items-center">
              <div className="my-2 sm:m-0">
                {youtubeId.url}
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex space-x-2 my-2 sm:m-0">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-light py-1 px-4 rounded"
                  onClick={() => editNote(youtubeId)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 hover:bg-red-600 text-white font-light py-1 px-4 rounded"
                  onClick={() => deleteNote(youtubeId.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YoutubeApp;
