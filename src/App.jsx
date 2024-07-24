import { useState } from "react";
import NoteCard from "./components/NoteCard";
import MarkdownEditor from "@uiw/react-markdown-editor";

function App() {
  const [notes, setNotes] = useState([]);
  const [currentEditing, setCurrentEditing] = useState(null);

  const addNote = () => {
    const newNote = {
      title: "#Enter your title",
      desc: "",
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    setCurrentEditing(newNotes.length - 1); // Set the current editing note to the new note
  };

  const deleteNote = (index) => {
    let newArray = notes.filter((item, ind) => ind !== index);
    if (newArray.length === 0) {
      setCurrentEditing(null);
    } else if (index === currentEditing) {
      setCurrentEditing(null); // Clear current editing if the edited note is deleted
    } else if (index < currentEditing) {
      setCurrentEditing(currentEditing - 1); // Adjust currentEditing if a note before it is deleted
    }
    setNotes(newArray);
  };

  return (
    <div className="app" style={{ display: "flex", gap: "10px" }}>
      <div className="left">
        <button className="add" onClick={addNote}>Add Note</button>
        {notes.map((item, index) => (
          <NoteCard
            key={index}
            title={item.title}
            setCurrentEditing={() => setCurrentEditing(index)}
            index={index}
            deleteNote={deleteNote}
          />
        ))}
      </div>
      <div className="right">
        {currentEditing != null && notes[currentEditing] ? (
          <MarkdownEditor
            height="100%"
            width="100%"
            onChange={(value) => {
              let newValue = value;
              let localCopy = [...notes];
              localCopy[currentEditing].desc = newValue;
              localCopy[currentEditing].title = newValue.split("\n")[0];
              setNotes(localCopy);
            }}
            value={notes[currentEditing].desc}
          />
        ) : (
          <p>Please click on a specific note to edit</p>
        )}
      </div>
    </div>
  );
}

export default App;
