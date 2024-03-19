import "./InfoTask.css";
import { useDispatch } from "react-redux";
import { deleteTask, doneCatDecreaseFromDelete } from "../../Data/slices/ToDoSlice";
import { Link } from "react-router-dom";
import { edit } from "../../Data/slices/TaskToEdit";
import Swal from "sweetalert2";

function InfoTask(props) {
  let task = props.task;
  let cat = props.cat;

  const dispatch = useDispatch();

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
      <div className="task-info-boxs state-task">
        <p>state : {task.stateOfTask}</p>
      </div>
      <div className="action-task-info">
        <button
          onClick={(event) => {
            // alert when delete
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              // if user click delete it
              if (result.isConfirmed) {
                // REMOVE INFO BOX AND OVER LAY
                event.target.parentElement.parentElement.classList.add("remove");
                event.target.parentElement.parentElement.parentElement.classList.add("remove");
                setTimeout(() => {
                  props.showInfoOfTask();
                }, 1000);
                // DELETE THIS TASK FROM DATA {REDUX} AND UPDATE DATA
                dispatch(doneCatDecreaseFromDelete({ cat: cat, task: task }));
                dispatch(deleteTask(task));

                // MESSAGE AFTER DELETE
                Swal.fire({
                  title: "Deleted!",
                  text: "Task has been deleted.",
                  icon: "success",
                });
              }
            });
          }}
          className="delete"
        >
          delete
        </button>

        <Link to="/edit-task">
          <button
            className="edit"
            onClick={() => {
              dispatch(edit(task));
            }}
          >
            edit
          </button>
        </Link>

        <button
          onClick={(event) => {
            event.target.parentElement.parentElement.classList.add("remove");
            event.target.parentElement.parentElement.parentElement.classList.add("remove");
            setTimeout(() => {
              props.showInfoOfTask();
            }, 1000);
          }}
          className="close"
        >
          close
        </button>
      </div>
    </div>
  );
}

export default InfoTask;
