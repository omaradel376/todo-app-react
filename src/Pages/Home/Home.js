import { Link } from "react-router-dom";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { doneCatDecrease, doneCatIncrease, doneChange } from "../../Data/slices/ToDoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import InfoTask from "../../Components/InfoTask/InfoTask";
import { useState } from "react";
function Home() {
  const data = useSelector((state) => state.ADDTASK);
  const dispatch = useDispatch();
  
  // for edit task
  const [dataToEdit, setDataToEdit] = useState([])
  // console.log(dataToEdit);
  const [showEdit, setShowEdit] = useState(false)


  return (
    <div className={data.tasks.length >= 1 ? "home" : "home no-tasks"}>
      {data.tasks.length >= 1 ? (
        // if tasks
        <div className="all-tasks-home-page">
            {showEdit  && <div className="info-task-container">
            <InfoTask task={dataToEdit}></InfoTask>
          </div> }
          
          {data.tasks.map((task, indexTask) => { 
            return (
              <div className="box-category" key={task.id}>
                {task.done === task.tasks.length ? <p className="isCatComplete true">complate</p> : <p className="isCatComplete false">not complate</p>}
                <h2>{task.category}</h2>
                <div className="liner">
                  <span style={{ width: `calc(100%*(${task.done} / ${task.tasks.length}))`, backgroundColor: "#43aa8b", position: "absolute", inset: "0", zIndex: "100", transition: ".3s" }}></span>
                  <span style={{ position: "relative", zIndex: "1000" }}>
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
                        <FontAwesomeIcon icon={faGear}
                          onClick={
                            () => {
                              setDataToEdit(test)
                              setShowEdit(true)
                          }
                        }
                        
                        />
                        <label className="container">
                          <input
                            type="checkbox"
                            // handel task done true or not
                            checked={test.done}
                            onClick={(event) => {
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
              </div>
            );
          })}
        </div>
      ) : (
        <>
          {/* if no tasks */}
          <h1>There is No Tasks yet</h1>
          <Link to="/add-task">
            Click To <span>Add</span> Some
          </Link>
        </>
      )}
    </div>
  );
}

export default Home;
