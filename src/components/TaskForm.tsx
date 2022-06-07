import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ITask } from "../interfaces/Task";
import styles from "./TasskForm.module.css";
interface Props {
  btnText: string;
  taskList:ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
  task?:ITask|null;
  handleUpdate?(id:number, title:string, dificulty:number):void;
}

const TaskForm = ({ btnText, taskList, setTaskList, task, handleUpdate }: Props) => {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [dificulty, setDifficulty] = useState<number>(0);

  useEffect(()=>{
    if(task){
      setId(task.id)
      setTitle(task.title)
      setDifficulty(task.dificulty)
    }
  }, [task])

  const addTaskHandler = (E:FormEvent<HTMLFormElement>) => {
    E.preventDefault()
    if(handleUpdate){
      handleUpdate(id, title, dificulty)
    } else { 
      const id= Math.floor(Math.random()*1000)
      const newTask:ITask= {id, title, dificulty}
      setTaskList!([...taskList, newTask])
      setTitle('')
      setDifficulty(0)
      console.log(taskList)
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setDifficulty(parseInt(e.target.value));
    }
  };

  return (
    <form className={styles.form} onSubmit={addTaskHandler}>
      <div className={styles.inputContainer}>
        <label htmlFor="title">Titulo</label>
        <input
          type="text"
          name="title"
          placeholder="titulo da tarefa"
          onChange={handleChange}
          value={title}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="dificulty">dificuldade:</label>
        <input
          type="number"
          name="dificullty"
          placeholder="dificuldade da tarefa"
          onChange={handleChange}
          value={dificulty}
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );
};

export default TaskForm;
