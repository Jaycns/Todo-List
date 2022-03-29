import React from "react";
import "../App.css";
import { MdDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";

function TodoList({
  data,
  handleDelete,
  id,
  handleClick,
  list,
  setTodo,
  setOpen,
  setIsEdit,
  todo,
  setList,
}) {
  function onDelete() {
    handleDelete(id);
  }

  function clickHandle() {
    const newList = Array.from(list);
    const index = list.findIndex((item) => item.Id === data.Id);
    newList[index].completed = !list[index].completed;
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
  }

  function onhandleEdit(key) {
  
    setOpen(true);
    setIsEdit(true);
    setTodo({
      ...todo,
      Id: data.Id,
      title: data.title,
      description: data.description,
      time: data.time,
    });
  }

  return (
    <div className="lister">
      <FaCheck
        className="check"
        style={{ visibility: data.completed ? "visible" : "hidden" }}
      />

      <div style={{ opacity: data.completed ? "50%" : "100%" }}>
        <div className="spanner" onClick={clickHandle}></div>
        <p
          onClick={handleClick}
          className="list-time"
          style={{ visibility: data.completed ? "hidden" : "visible" }}
        >
          {data.time}
        </p>
        <h2
          className="list-title"
          style={{ textDecoration: data.completed ? "line-through" : "none" }}
        >
          {data.title}
        </h2>
        <p className="list-description">{data.description}</p>
      </div>

      <MdDelete
        onClick={onDelete}
        className="delete-icon"
        style={{ visibility: data.completed ? "hidden" : "" }}
      />
      <FiEdit2
        onClick={onhandleEdit}
        className="edit-icon"
        style={{ visibility: data.completed ? "hidden" : "" }}
      />

      <hr />
    </div>
  );
}

export default TodoList;
