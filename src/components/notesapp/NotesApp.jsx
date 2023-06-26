import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ id: null, title: '', content: '' });

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
        const response = await axios.post('https://muhdaffawibi.com/notes', currentNote);
        setNotes([...notes, response.data]);
        setCurrentNote({ id: null, title: '', content: '' });
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
        setCurrentNote({ id: null, title: '', content: '' });
      } catch (error) {
        console.error('Error updating note:', error);
      }
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`); // Replace '/api/notes' with your API endpoint
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const editNote = (note) => {
    setCurrentNote({
      id: note.id,
      title: note.title,
      toDo: note.toDO,
    });
  };

  return (
    <div className="container bg-white mx-auto px-4 py-3 mt-5 rounded-t-lg shadow-lg">
      <h1 className="text-2xl text-blue-500 font-bold mb-4">
        
        Notes App
      
      </h1>
      <hr className="pt-5" />
      <div className="mb-4 flex flex-col sm:flex-row">
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
          value={currentNote.toDO}
          onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
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
          <li key={note.id} className="mb-2 bg-gray-100 rounded px-4 py-2">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-2 sm:mb-0">
                <span className="font-semibold">
                  {note.title}
                </span>
                &nbsp;
                - {note.toDo}
              </div>
              <div className="flex space-x-2">
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