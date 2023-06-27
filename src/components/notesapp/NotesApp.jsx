import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ id: null, title: '', toDo: '' });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('https://muhdaffawibi.com/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async () => {
    if (currentNote.title.trim() !== '') {
      try {
        const response = await axios.post("https://muhdaffawibi.com/notes", currentNote);
        setNotes([...notes, response.data]);
        setCurrentNote({ id: null, title: '', toDo: '' });
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };

  const updateNote = async () => {
    if (currentNote.title.trim() !== '') {
      try {
        await axios.put(`https://muhdaffawibi.com/notes/${currentNote.id}`, currentNote);
        setNotes(notes.map((note) => (note.id === currentNote.id ? currentNote : note)));
        setCurrentNote({ id: null, title: '', toDo: '' });
      } catch (error) {
        console.error('Error updating note:', error);
      }
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`https://muhdaffawibi.com/notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const editNote = (note) => {
    setCurrentNote({
      id: note.id,
      title: note.title,
      toDo: note.toDo,
    });
  };

  return (
    <div className="grid w-full flex-col sm:flex-row bg-white mx-auto px-4 py-3 mt-5 rounded-t-lg shadow-lg">
      <h1 className="text-2xl text-blue-500 font-bold mb-4">
        Notes App
      </h1>
      <hr className="mb-5 text-gray-300" />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          className="border border-gray-400 rounded px-2 py-1 mb-2 sm:mr-2 sm:mb-0 w-full sm:w-auto"
          value={currentNote.title}
          onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Content"
          className="border border-gray-400 rounded px-2 py-1 mb-2 sm:mr-2 sm:mb-0 w-full sm:w-auto"
          value={currentNote.toDo}
          onChange={(e) => setCurrentNote({ ...currentNote, toDo: e.target.value })}
        />
        {currentNote.id ? (
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
        {notes.map((note) => (
          <li key={note.id} className="flex flex-col sm:flex-row justify-between align-middle mb-2 bg-gray-100 rounded px-4 py-2">
            <div className="flex flex-col sm:flex-row justify-start items-center">
              <div className="my-2 sm:m-0">
                {note.title}
              </div>
            </div>
            <div className="flex justify-center items-center md:justify-start md:items-start">
              <div className="mb-6 mt-4 sm:m-auto text-left">
                {note.toDo}
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex space-x-2 my-2 sm:m-0">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-light py-1 px-4 rounded"
                  onClick={() => editNote(note)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 hover:bg-red-600 text-white font-light py-1 px-4 rounded"
                  onClick={() => deleteNote(note.id)}
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

export default NotesApp;
