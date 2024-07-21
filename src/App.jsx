import "./styles.css";
import { useState } from "react";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [toDos, setToDos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setToDos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });
    setNewItem("");
  }

  function toggleToDo(id, completed) {
    setToDos((currentTodos) => {
      return currentTodos.map((toDo) => {
        if (toDo.id === id) {
          return { ...toDo, completed };
        }
        return toDo;
      });
    });
  }

  function deleteToDo(id) {
    setToDos((currentTodos) => {
      return currentTodos.filter((toDo) => toDo.id !== id);
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div>
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {toDos.map((toDo) => {
          return (
            <li key={toDo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={toDo.completed}
                  onChange={(e) => toggleToDo(toDo.id, e.target.checked)}
                />
                {toDo.title}
              </label>
              <button
                onClick={() => deleteToDo(toDo.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
