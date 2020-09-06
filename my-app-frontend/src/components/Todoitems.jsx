import React, { useState } from "react";

import TodoItemsList from "./TodoItemsList";
// import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddIcon from "@material-ui/icons/Add";
import ClearAllIcon from "@material-ui/icons/ClearAll";
// import Fab from "@material-ui/core/Fab";

function Todoitems() {
  const [inputToDo, setInputToDo] = useState({ itemName: "" });
  const [items, setItems] = useState([]);

  const getItems = () => {
    fetch("http://localhost:5000/todos")
      .then((results) => results.json())
      .then((data) => {
        /*
    data = [{item: "item name"}, { ... }]
    
    item = "item name"
    item = {
      name: "item name",
    }
    */
        // console.log(data);
        setItems(data); // array of objects
      });
  };

  React.useEffect(() => {
    getItems();
  }, []);

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleClick();
    }
  }
  function handleChange(event) {
    const { name, value } = event.target;

    setInputToDo({ [name]: value });
  }

  function handleClick() {
    if (inputToDo.itemName !== "") {
      fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemName: inputToDo.itemName,
        }),
      });

      setItems((prevItems) => {
        return [...prevItems, inputToDo];
      });

      setInputToDo({ itemName: "" });
    }
  }

  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        if (index === id) {
          fetch("http://localhost:5000/todos", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              itemName: item.itemName,
            }),
          });
        }
        return index !== id;
      });
    });
  }

  function deleteAll() {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        fetch("http://localhost:5000/deleteAll", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemName: item.itemName }),
        });
        return index === null;
      });
    });
  }

  function onkeypress(i) {
    if (i === 0 && items.length === 1) return;
    setItems((items) =>
      items.slice(0, i).concat(items.slice(i + 1, items.length))
    );
    // setTimeout(() => {
    //   document.forms[0].elements[i - 1].focus();
    // }, 0);
  }

  function editItems(text, id) {
    const editid = items[id]._id;

    fetch(`http://localhost:5000/todos/${editid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemName: text,
      }),
    });

    setItems((prevItems) => {
      const newTodos = [...prevItems];
      newTodos[id].itemName = text;
      return newTodos;
    });
  }

  return (
    <div className="todolist">
      <h1 className="todoHeading">Todolist for the day!</h1>
      <div className="form">
        <input
          onChange={handleChange}
          name="itemName"
          type="text"
          value={inputToDo.itemName}
          autoComplete="off"
          onKeyPress={handleKeyPress}
        />
        <button className="todolistbtn" onClick={handleClick}>
          <span>
            <AddIcon />
          </span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((item, index) => {
            return (
              <TodoItemsList
                onEdit={editItems}
                onPress={onkeypress}
                onDelete={deleteItem}
                key={index}
                id={index}
                text={item.itemName}
                items={items}
              />
            );
          })}
        </ul>
      </div>
      <div style={{ margin: "50px auto 0 auto" }}>
        <button onClick={deleteAll} id="deleteAll">
          <ClearAllIcon />
        </button>
      </div>
    </div>
  );
}

export default Todoitems;
