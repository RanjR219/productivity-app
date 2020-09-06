import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";

// import AddIcon from "@material-ui/icons/Add";
// import Fab from "@material-ui/core/Fab";

function NotesArea(props) {
  const [note, setCreateNote] = useState({
    title: "",
    content: "",
  });

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: note.title,
          content: note.content,
        }),
      });
      props.onAdd(note);

      setCreateNote({
        title: "",
        content: "",
      });
    }
  }

  function handleClick(event) {
    fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: note.title,
        content: note.content,
      }),
    });

    props.onAdd(note);
    setCreateNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setCreateNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }
  return (
    <form>
      <input
        name="title"
        value={note.title}
        onChange={handleChange}
        placeholder="Title"
        autoComplete="off"
        onKeyPress={handleKeyPress}
      />

      <textarea
        maxLength="300"
        value={note.content}
        onChange={handleChange}
        name="content"
        placeholder="Take a note..."
        rows="3"
        onKeyPress={handleKeyPress}
      />
      <button id="buttonNoteArea" onClick={handleClick}>
        <AddIcon />
      </button>
    </form>
  );
}
export default NotesArea;
