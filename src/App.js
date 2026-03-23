import React, { useState, useEffect } from "react";
import './App.css';
function App() {

  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Create Note
  const addNote = () => {
    if (text.trim() === "") return;

    if (editIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = text;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      setNotes([...notes, text]);
    }

    setText("");
  };

  // Edit Note
  const editNote = (index) => {
    setText(notes[index]);
    setEditIndex(index);
  };

  // Delete Note
  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Notes App</h2>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter note"
      />

      <button onClick={addNote}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            {note}
            <button onClick={() => editNote(index)}>Edit</button>
            <button onClick={() => deleteNote(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;