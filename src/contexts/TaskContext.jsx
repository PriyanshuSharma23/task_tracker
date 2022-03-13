import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { doc, collection, onSnapshot, updateDoc, Timestamp, query, where, orderBy, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const TaskContext = createContext();

export function useTask() {
  return useContext(TaskContext);
}

const TaskProvider = ({ children }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [expandedState, setExpandedState] = useState(false);
  const [tasks, setTasks] = useState(null);
  const queriedTasks = useMemo(() => {
    return queryTasks(tasks);
  }, [tasks, setTasks]);

  useEffect(() => {
    const q = collection(db, "users", "user1", "tasks");
    const qy = query(q, orderBy('date', 'desc'))
    onSnapshot(q, (snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  function queryTasks(tasks) {
    function isToday(d) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date();
      tomorrow.setHours(0, 0, 0, 0);
      tomorrow.setDate(today.getDate() + 1);
      if (d >= today && d < tomorrow) return "today";
      else if (d < today) return "past";
      else return "upcoming";
    }

    const arrangedTasks = [[], [], []]; //today past upcoming
    tasks?.forEach((task) => {
      const taskStatus = isToday(task?.data?.date?.toDate());
      if (taskStatus === "today") arrangedTasks[0].push(task);
      else if (taskStatus === "past") arrangedTasks[1].push(task);
      else arrangedTasks[2].push(task);
    });

    return arrangedTasks;
  }

  const updateDate = async (newDate, task) => {
    if (newDate !== task.data.date) {
      try {
        const refDoc = doc(db, "users", "user1", "tasks",task?.id);
        await updateDoc(refDoc, {
          date: Timestamp.fromDate(new Date(newDate)),
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  async function deleteDocument(id) {
    const taskRef = doc(db, 'users', 'user1', 'tasks', id)
    try {
      await deleteDoc(taskRef)
    } catch (err) {
      console.log(err)
    }
  }

  const val = {
    selectedTask,
    setExpandedState,
    setSelectedTask,
    expandedState,
    tasks,
    setTasks,
    updateDate,
    queriedTasks,
    deleteDocument
  };
  return <TaskContext.Provider value={val}>{children}</TaskContext.Provider>;
};

export default TaskProvider;
