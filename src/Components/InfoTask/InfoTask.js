import React from "react";
import "./InfoTask.css";
function InfoTask(props) {
  let task = props.task;
  console.log(props.task);
  return (
    <div className="infoTask">
      <div className="task-info-boxs task-text">
        <p>{task.task}</p>
      </div>
      <div className="task-info-boxs task-category">
        <p>category: {task.category}</p>
      </div>
      <div className="task-info-boxs date-task">
        <p>start in: {task.dateStart}</p>
        <p>end in: {task.dateEnd}</p>
      </div>
      <div className="task-info-boxs time-task">
        <p>start in: {task.timeStart}</p>
        <p>end in: {task.timeEnd}</p>
      </div>
      <div className="task-info-boxs state-task"><p>state : {task.stateOfTask}</p></div>
      <div className="action-task-info">
        <button>delete</button>
        <button>edit</button>
      </div>
    </div>
  );
}

export default InfoTask;
