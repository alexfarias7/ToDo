import Footer from "./components/Footer";
import Header from "./components/Header";

import styles from "./App.module.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useState } from "react";
import { ITask } from "./interfaces/Task";
import Modal from "./components/Modal";

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskUpdate] = useState<ITask | null>(null);

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      })
    );
  };

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal");
    if (display) {
      modal!.classList.remove("hide");
    } else {
      modal!.classList.add("hide");
    }
  };

  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskUpdate(task);
  };

  const updateTask = (id:number, title:string, dificulty:number)=>{
    const updateTask:ITask = {id, title, dificulty}
    const updateItems= taskList.map((task)=>{
      return task.id === updateTask.id ? updateTask: task;
    })

    setTaskList(updateItems)
    hideOrShowModal(false)
  }
  return (
    <div className="App">
      <Modal
        children={
          <TaskForm
            btnText="editar tarefa"
            taskList={taskList}
            task={taskToUpdate}
            handleUpdate={updateTask}
          />
        }
      />
      <Header />

      <main className={styles.main}>
        <div>
          <h2> O que você vai fazer?</h2>
          <TaskForm
            taskList={taskList}
            btnText="criar tarefas"
            setTaskList={setTaskList}
          />
        </div>

        <div>
          <h2>Suas atividades</h2>
          <TaskList
            tasklist={taskList}
            handleDelete={deleteTask}
            handleEdit={editTask}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
