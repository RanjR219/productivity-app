import React, { useState } from "react";
import Heading from "./Heading";
import Todoitems from "./Todoitems";
import Notes from "./Notes";
import NotesArea from "./NotesAarea";

function App() {
  setInterval(updateTime, 1000);

  const now = new Date().toLocaleTimeString();

  const [time, setTime] = useState(now);
  const [notes, setNotes] = useState([]);
  // const [isTwo, setIsTwo] = useState(false);

  React.useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then((results) => results.json())
      .then((data) => {
        setNotes(data); // array of objects
      });
  }, []); // <-- Have to pass in [] here!

  function updateTime() {
    const newTime = new Date().toLocaleTimeString();
    setTime(newTime);
  }

  function onAddNote(newNote) {
    // if (notes.length === 2) {
    //   setIsTwo(true);

    //   return null;
    // } else {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
    // }
  }

  function deleteNote(id) {
    // setIsTwo(false);
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        if (index === id) {
          fetch("http://localhost:5000/notes", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: noteItem.title,
            }),
          });
        }
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Heading />
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <Todoitems />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="time">{time}</div>
            <div className="notes-area">
              <NotesArea onAdd={onAddNote} />

              {notes.map((noteItem, index) => {
                return (
                  <Notes
                    key={index}
                    id={index}
                    onDelete={deleteNote}
                    title={noteItem.title}
                    content={noteItem.content}
                  />
                );
              })}
              {/* <div>{isTwo ? <p className="warning">*Max limit!</p> : null}</div> */}

              {/* <Notes title="Title" content="This is the content" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
