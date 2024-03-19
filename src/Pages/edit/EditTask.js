import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./EditTask.css";
import { Link } from "react-router-dom";
import { updateDataAfterEdit } from "../../Data/slices/ToDoSlice";
import Swal from "sweetalert2";

function EditTask() {
  // task this you click on edit button
  const editData = useSelector((state) => state.EDITTASK);

  const dispatch = useDispatch();

  // set states for inputs values
  const [textOfInput, setTextOfInput] = useState(editData.task);
  const [stateOfTask, setStateOfTask] = useState(editData.stateOfTask);
  const [timeStart, setTimeStart] = useState(editData.timeStart);
  const [dateStart, setDateStart] = useState(editData.dateStart);
  const [timeEnd, setTimeEnd] = useState(editData.timeEnd);
  const [dateEnd, setDateEnd] = useState(editData.dateEnd);

  // set the data after update
  const [allData, setAllData] = useState({
    category: editData.category,
    dateEnd: dateEnd,
    dateStart: dateStart,
    done: editData.done,
    id: editData.id,
    stateOfTask: stateOfTask,
    task: textOfInput,
    timeEnd: timeEnd,
    timeStart: timeStart,
  });

  // update data after update inputs values
  useEffect(() => {
    setAllData({
      category: editData.category,
      dateEnd: dateEnd,
      dateStart: dateStart,
      done: editData.done,
      id: editData.id,
      stateOfTask: stateOfTask,
      task: textOfInput,
      timeEnd: timeEnd,
      timeStart: timeStart,
    });
  }, [textOfInput, stateOfTask, timeStart, dateStart, timeEnd, timeStart]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  return (
    <div className="edit-task">
      {editData.length === 0 ? (
        <>
          <h1 className="no-edit-task">no Task To Edit</h1>
          <Link className="no-edit-task" to="/add-task/add-new-task">
            Click To <span>Add</span> Some
          </Link>
        </>
      ) : (
        <>
          <div className="input-add-task">
            <div className="input-group group-add-task">
              <label htmlFor="input-task">Edit Task</label>
              <input
                onInput={(event) => {
                  // set text state when change value
                  setTextOfInput(event.target.value);
                }}
                id="input-task"
                type="text"
                placeholder="Type Your New Taskes"
                defaultValue={textOfInput}
              />
            </div>
          </div>

          <div className="state-of-task">
            <div className="input-group">
              <label htmlFor="state-of-task">Edit State Of Task</label>
              <select
                onChange={(event) => {
                  // set state of task state when change value
                  setStateOfTask(event.target.value);
                }}
                id="state-of-task"
                defaultValue={stateOfTask}
              >
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
              <input
                onChange={(event) => {
                  // set time start state when change value
                  setTimeStart(event.target.value);
                }}
                id="input-time-start"
                type="time"
                defaultValue={timeStart}
              />
            </div>

            <div className="input-group group-date-start">
              <label htmlFor="input-date-start">Date Of Start</label>
              <input
                onChange={(event) => {
                  // set date start state when change value
                  setDateStart(event.target.value);
                }}
                id="input-date-start"
                type="date"
                defaultValue={dateStart}
              />
            </div>
          </div>
          <div className="input-date-end">
            <div className="input-group group-time-end">
              <label htmlFor="input-time-end">Time Of End :</label>
              <input
                onChange={(event) => {
                  // set time end state when change value
                  setTimeEnd(event.target.value);
                }}
                id="input-time-end"
                type="time"
                defaultValue={timeEnd}
              />
            </div>

            <div className="input-group group-date-start">
              <label htmlFor="input-date-end">Date Of End</label>
              <input
                onChange={(event) => {
                  // set date end state when change value
                  setDateEnd(event.target.value);
                }}
                id="input-date-end"
                type="date"
                defaultValue={dateEnd}
              />
            </div>
          </div>
          <div className="action-edit">
            <Link to="/">
              <button
                onClick={() => {
                  if (textOfInput.length > 2) {
                    // ALERT WHEN CLICK SAVE BUTTON
                    Toast.fire({
                      icon: "success",
                      title: "Task Is Updated",
                    });

                    // this is a reducer to update value after click on the button {save}
                    dispatch(updateDataAfterEdit(allData));
                  } else {
                    Toast.fire({
                      icon: "error",
                      title: "Task Letters Must Be > 2 Letters",
                    });

                  }
                }}
                className="save-edit"
              >
                save
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default EditTask;
