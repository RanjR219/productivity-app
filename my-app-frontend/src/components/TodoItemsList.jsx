import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";

function TodoItemsList(props) {
  let [edit, setEdit] = useState(false);

  function handleDeleteItem() {
    props.onDelete(props.id);
  }

  function handleKeyDown(e, i) {
    if (e.key === "Backspace" && props.items[i].itemName === "") {
      e.preventDefault();
      return props.onPress(i);
    }
  }
  // function handleEdit(event) {
  //   console.log(event.target.value);
  //   props.onEdit(event.target.value, props.id);
  // }
  return (
    <li>
      <p style={{ marginBottom: 0 }}>
        {edit ? (
          <input
            style={{ width: "65%" }}
            type="text"
            value={props.text}
            onKeyDown={(e) => handleKeyDown(e, props.id)}
            onChange={(event) => {
              return props.onEdit(event.target.value, props.id);
            }}
          />
        ) : (
          props.text
        )}
        <button className="listbtns" onClick={handleDeleteItem}>
          <DeleteIcon />
        </button>
        {edit ? (
          <button
            className="listbtns"
            onClick={() => {
              setEdit(false);
            }}
          >
            <CheckIcon />
          </button>
        ) : (
          <button
            className="listbtns"
            onClick={() => {
              setEdit(!edit);
            }}
          >
            <EditIcon />
          </button>
        )}

        {/* <button
          className="listbtns"
          onClick={() => {
            setEdit(!edit);
          }}
        >
          <EditIcon />
        </button> */}
      </p>
    </li>
  );
}

export default TodoItemsList;
