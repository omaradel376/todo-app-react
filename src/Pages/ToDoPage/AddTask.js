import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./AddTask.css";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../Data/slices/ToDoSlice";
import { increaseId } from "../../Data/slices/IdSlice";
import Swal from "sweetalert2";

function ToDoPage() {
  let id = useSelector((state) => state.ID);

  let param = useParams();
  console.log(param.id);
  console.log(localStorage.getItem("category"));

  // Set date of current day to set it as a default value in date input
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().length === 2 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
  const day = date.getDate().toString().length === 2 ? `${date.getDate()}` : `0${date.getDate()}`;

  // set states for inputs values
  const [textOfInput, setTextOfInput] = useState("");
  const [category, setCategory] = useState("none");
  const [stateOfTask, setStateOfTask] = useState("normal");
  const [timeStart, setTimeStart] = useState("not set");
  const [dateStart, setDateStart] = useState(`${year}-${month}-${day}`);
  const [timeEnd, setTimeEnd] = useState("not set");
  const [dateEnd, setDateEnd] = useState(`${year}-${month}-${day}`);
  // this is a global state for task data
  const dispatch = useDispatch();


  useEffect(() => {
    if (param.id === localStorage.getItem("category")) {
      setCategory(param.id);
    }
  }, []);

  // alert when task is add
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  return (
    <div className="add-task-page">
      <div className="input-add-task">
        <div className="input-group group-add-task">
          <label htmlFor="input-task">Type Task</label>
          <input onChange={(event) => setTextOfInput(event.target.value)} id="input-task" type="text" placeholder="Type Your New Taskes" />
        </div>
      </div>

      <div className="input-add-category">
        <div className="input-group group-add-category">
          <label htmlFor="input-category">Type Category</label>
          <input defaultValue={param.id === localStorage.getItem("category") ? param.id : ""} onChange={(event) => setCategory(event.target.value.toLowerCase().trim())} id="input-category" type="text" placeholder="Type Your Category" />
        </div>
      </div>

      <div className="state-of-task">
        <div className="input-group">
          <label htmlFor="state-of-task">The State Of Task</label>
          <select id="state-of-task" onChange={(event) => setStateOfTask(event.target.value)}>
            <option value="normal">Normal</option>
            <option value="not-important">Not Important</option>
            <option value="important">Important</option>
            <option value="very-important">Very Important</option>
          </select>
        </div>
      </div>

      <div className="input-date-start">
        <div className="input-group group-time-start">
          <label htmlFor="input-time-start">Time Of Start</label>
          <input onChange={(event) => setTimeStart(event.target.value)} id="input-time-start" type="time" />
        </div>

        <div className="input-group group-date-start">
          <label htmlFor="input-date-start">Date Of Start</label>
          <input onChange={(event) => setDateStart(event.target.value)} id="input-date-start" type="date" defaultValue={`${year}-${month}-${day}`} />
        </div>
      </div>
      <div className="input-date-end">
        <div className="input-group group-time-end">
          <label htmlFor="input-time-end">Time Of End :</label>
          <input onChange={(event) => setTimeEnd(event.target.value)} id="input-time-end" type="time" />
        </div>

        <div className="input-group group-date-start">
          <label htmlFor="input-date-end">Date Of End</label>
          <input onChange={(event) => setDateEnd(event.target.value)} id="input-date-end" type="date" defaultValue={`${year}-${month}-${day}`} />
        </div>
      </div>
      <button
        onClick={() => {
          if (textOfInput.trim().length > 2) {
            dispatch(
              addTask({
                id: id,
                task: textOfInput,
                category: category,
                stateOfTask: stateOfTask,
                timeStart: timeStart,
                timeEnd: timeEnd,
                dateStart: dateStart,
                dateEnd: dateEnd,
                done: false,
              })
            );
            // setLengthOfText(true);
            dispatch(increaseId());

            // fire the alert when task added
            Toast.fire({
              icon: "success",
              title: "Task Added",
            });

            // setIsAdded(true);
            // setTimeout(() => {
            //   setIsAdded(false);
            // }, 1000);
          } else {
            // setLengthOfText(false);
            // when task text < 3 letters fire alert error
            Toast.fire({
              icon: "error",
              title: "Task Letters Must Be > 2 Letters",
            });
          }
        }}
        className="btn-add-task"
      >
        Add Task
      </button>
      <Link className="return-home" to="/">
        Return To Home Page
      </Link>
    </div>
  );
}

export default ToDoPage;
