import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

// import Fab from "@material-ui/core/Fab";
// import DeleteIcon from "@material-ui/icons/Delete";

function Notes(props) {
  function handleDelete() {
    props.onDelete(props.id);
  }

  return (
    <div className="note ">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Notes;
