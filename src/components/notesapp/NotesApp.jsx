import React, { useState } from 'react';

const NotesApp = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Note 1', content: 'Content 1' },
    { id: 2, title: 'Note 2', content: 'Content 2' },
    { id: 3, title: 'Note 3', content: 'Content 3' },
  ]);

  const [currentNote, setCurrentNote] = useState({ id: null, title: '', content: '' });

  const addNote = () => {
    if (currentNote.title.trim() !== '') {
      const newNote = { ...currentNote, id: Date.now() };
      setNotes([...notes, newNote]);
      setCurrentNote({ id: null, title: '', content: '' });
    }
  };

  const updateNote = () => {
    if (currentNote.title.trim() !== '') {
      setNotes(
        notes.map((note) => (note.id === currentNote.id ? { ...currentNote } : note))
      );
      setCurrentNote({ id: null, title: '', content: '' });
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (note) => {
    setCurrentNote({
      id: note.id,
      title: note.title,
      content: note.content,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notes App</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Title"
          className="border border-gray-400 rounded px-2 py-1 mr-2"
          value={currentNote.title}
          onChange={(e) =>
            setCurrentNote({ ...currentNote, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Content"
          className="border border-gray-400 rounded px-2 py-1 mr-2"
          value={currentNote.content}
          onChange={(e) =>
            setCurrentNote({ ...currentNote, content: e.target.value })
          }
        />
        {currentNote.id ? (
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded"
            onClick={updateNote}
          >
            Update
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-1 rounded"
            onClick={addNote}
          >
            Add
          </button>
        )}
      </div>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            className="mb-2 flex items-center justify-between border border-gray-400 rounded px-4 py-2"
          >
            <div>
              <span className="font-bold">{note.title}</span> - {note.content}
            </div>
            <div>
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
                onClick={() => editNote(note)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesApp;
