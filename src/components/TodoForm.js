import React from "react";
import "../App.css";

function TodoForm({ handleClick, handleChange, todo, isEdit, onEdit }) {
  return (
    <div className="popup">
      <form className="forms">
        <p>My list</p>
        <input
          type="text"
          required="new list"
          onChange={handleChange}
          name="title"
          value={todo.title}
          placeholder="Title"
          className="form-control"
          required="required"
          aria-required="true"
        />
        <textarea
          type="text"
          value={todo.description}
          placeholder="Add your description"
          className="textarea-control"
          name="description"
          onChange={handleChange}
          required="required"
        />
        <input
          type="time"
          name="time"
          value={todo.time}
          onChange={handleChange}
          required="required"
        />
        <button
          className="add-btn"
          type="button"
          onClick={(e) => (isEdit ? onEdit() : handleClick(e))}
        >
          {isEdit ? "UPDATE" : "ADD"}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
