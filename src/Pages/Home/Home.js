import { Link } from "react-router-dom";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, doneCatDecrease, doneCatIncrease, doneChange } from "../../Data/slices/ToDoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import InfoTask from "../../Components/InfoTask/InfoTask";
import { useState } from "react";
import Swal from "sweetalert2";

function Home() {
  const data = useSelector((state) => state.ADDTASK);
  const dispatch = useDispatch();

  // for edit task
  const [dataToEdit, setDataToEdit] = useState([]);
  const [dataToEditCat, setDataToEditCat] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  const showInfoOfTask = () => {
    setShowEdit(false);
  };

  // show setting box
  const [showSetting, setShowSetting] = useState(false);

  return (
    <div className={data.tasks.length >= 1 ? "home" : "home no-tasks"}>
      {data.tasks.length >= 1 ? (
        // if tasks
        <div className="all-tasks-home-page">
          {showEdit && (
            <div className="info-task-container">
              <InfoTask showInfoOfTask={showInfoOfTask} cat={dataToEditCat} task={dataToEdit}></InfoTask>
            </div>
          )}

          {data.tasks.map((task, indexTask) => {
            return (
              <div className="box-category" key={task.id}>
                <FontAwesomeIcon
                  onClick={(event) => {
                    setShowSetting(!showSetting);
                  }}
                  className="setting-of-box"
                  icon={faEllipsisVertical}
                />
                <div className={showSetting ? " delete-cat" : "delete-cat not-active"}>
                  <ul>
                    <li>
                      <button
                        onClick={() => {
                          // ALERT CHECKER WHEN DELETE CATEGORY
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              // HIDE DELETE BUTTON
                              setShowSetting(!showSetting);
                              // DELETE THIS CATEGORY FROM DATA {REDUX} AND UPDATE IT
                              dispatch(deleteCategory(task));
                              // MESSAGE AFTER DELETE
                              Swal.fire({
                                title: "Deleted!",
                                text: "Category has been deleted.",
                                icon: "success",
                              });
                            }
                          });
                        }}
                      >
                        delete
                      </button>
                    </li>
                  </ul>
                </div>
                {task.done === task.tasks.length ? <p className="isCatComplete true">complate</p> : <p className="isCatComplete false">not complate</p>}
                <h2>{task.category}</h2>
                <div className="liner">
                  <span style={{ width: `calc(100%*(${task.done} / ${task.tasks.length}))`, backgroundColor: "#43aa8b", position: "absolute", inset: "0", zIndex: "100", transition: ".3s" }}></span>
                  <span style={{ position: "relative", zIndex: "101" }}>
                    {task.done}/{task.tasks.length}
                  </span>
                </div>
                {task.tasks.map((test, index) => {
                  return (
                    <div className="text-of-task" key={test.id}>
                      <p>
                        <span>{index + 1}-</span>
                        {test.task}
                      </p>
                      <div className="actions-tasks">
                        <FontAwesomeIcon
                          icon={faGear}
                          onClick={() => {
                            setDataToEdit(test);
                            setDataToEditCat(task);
                            setShowEdit(true);
                          }}
                        />
                        <label className="container">
                          <input
                            name="checked"
                            type="checkbox"
                            // handel task done true or not
                            checked={test.done}
                            onChange={(event) => {
                              // catIndex => for choose the category
                              // taskIndex => for choose the task from category
                              dispatch(doneChange({ catIndex: indexTask, taskIndex: index }));
                              if (event.target.checked) {
                                dispatch(doneCatIncrease({ catIndex: indexTask }));
                              } else {
                                dispatch(doneCatDecrease({ catIndex: indexTask }));
                              }
                            }}
                          />
                          <div className="checkmark"></div>
                        </label>
                      </div>
                    </div>
                  );
                })}
              
                <Link to={`/add-task/${task.category}`}><FontAwesomeIcon onClick={() => {
                  localStorage.setItem("category", task.category)
                }} className="plus-icon-category" icon={faPlus} /></Link>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          {/* if no tasks */}
          <h1>There is No Tasks yet</h1>
          <Link to="/add-task/add-new-task">
            Click To <span>Add</span> Some
          </Link>
        </>
      )}
    </div>
  );
}

export default Home;
