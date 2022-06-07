import { ITask } from "../interfaces/Task";
import styles from "./TaskList.module.css";

interface Props {
  tasklist: ITask[];
  handleDelete(id:number):void;
  handleEdit(task:ITask):void;
}

const TaskList = ({ tasklist , handleDelete, handleEdit}: Props) => {
  return (
    <>
      {tasklist.length > 0 ? (
        tasklist.map((task) => (
          <div key={task.id} className={styles.task}>
            <div className={styles.details}>
              <h4>{task.title}</h4>
              <p>Difficulty: {task.dificulty}</p>
            </div>

            <div className={styles.actions}>
              <i className="bi bi-pencil" onClick={()=>handleEdit(task)}></i>
              <i className="bi bi-trash" onClick={()=>{handleDelete(task.id)}}></i>
            </div>
          </div>
        ))
      ) : (
        <p>Sem tarefas casdastradas.</p>
      )}
    </>
  );
};

export default TaskList;
