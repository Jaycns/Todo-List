import React, { useState } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./App.css";
import image from "./images/blue_hill.jpg";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "@mui/material";
import { CircularProgress } from "@chakra-ui/react";

const initialTodoState = {
  Id: null,
  title: "",
  description: "",
  time: "",
  completed: false,
};
export default function App() {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setIsEdit(false);
    setTodo({ ...initialTodoState, Id: Math.floor(Math.random() * 1000) });
  };
  const initialState = JSON.parse(localStorage.getItem("list")) || [];

  const handleClose = () => setOpen(false);
  const [list, setList] = useState(initialState);
  const [todo, setTodo] = useState(initialTodoState);

  function handleChange(e) {
    const { value, name } = e.target;
    setTodo({ ...todo, [name]: value });
  }
  function handleClick(e) {
    e.preventDefault();
    if (!todo.title || !todo.description) {
      alert("kindly provide all required information");
    } else {
      setList([...list, todo]);
      localStorage.setItem("list", JSON.stringify([...list, todo]));
      setTodo(initialTodoState);
      setOpen(false);
    }
  }

  function handleDelete(key) {
    const filteredList = list.filter((item, index) => {
      return index !== key;
    });
    setList(filteredList);
    localStorage.setItem("list", JSON.stringify(filteredList));
  }
  function handleEdit() {
    const index = list.findIndex((item) => item.Id === todo.Id);
    const newList = JSON.parse(JSON.stringify(list));
    newList[index] = todo;
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
    setTodo(initialTodoState);
    setOpen(false);
  }
  const complete = list.filter((items) => items.completed).length;
  const lenth = list.length;
  const per = complete / lenth;
  const perc = Math.floor(per * 100);
  console.log(todo);
  let date = new Date();
  console.log(date);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const todoId = todo.Id;
  return (
    console.log(todoId),
    (
      <div className="todo">
        <div className="up-holder">
          <div className="up-box">
            <img src={image} className="blue-hill" alt="An age is here" />
            <div className="lcon">
              <div className="line"></div>
              <div className="lin"></div>
              <div className="line"></div>
            </div>
            <h1 className="heads">
              Your <br /> Todo List
            </h1>
            <p className="full-date">
              {Months[month - 1]} {day}, {year}
            </p>
            <div className="line-under"></div>
            <div className="dark-trans"></div>
            <div className="trans-one">
              <h1>24</h1>
              <p>Personal</p>
            </div>
            <div className="trans-two">
              <h1>15</h1>
              <p>Business</p>
            </div>
            <div className="trans-three">
              <CircularProgress
                className="circle-progress"
                value={perc}
                size="22px"
                thickness="8px"
              />
              <p>{lenth > 0 ? perc : 0}% done</p>
            </div>
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <TodoForm
            handleClick={handleClick}
            handleChange={handleChange}
            handleDelete={handleDelete}
            handleClose={handleClose}
            todo={todo}
            list={list}
            setList={setList}
            isEdit={isEdit}
            onEdit={handleEdit}
          />
        </Modal>
        <div className="flow-holder">
          <h2 className="list-head">Inbox</h2>
          <div className="list">
            {list.map((item, index) => {
              return (
                <TodoList
                  data={item}
                  key={index}
                  id={index}
                  setTodo={setTodo}
                  handleDelete={handleDelete}
                  setOpen={setOpen}
                  list={list}
                  setIsEdit={setIsEdit}
                  todo={todo}
                  setList={setList}
                />
              );
            })}
          </div>
        </div>
        <div className="footers" style={{ visibility: "visible" }}>
          <h2>Completed</h2>
          <p>{complete}</p>
        </div>
        <div className="btn-add">
          <AiOutlinePlus onClick={handleOpen} className="cross" />
        </div>
      </div>
    )
  );
}
