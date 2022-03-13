import React, { useEffect } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import Button from "./Button";
import { addDoc, collection, doc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";

function TaskInput({
  expandState: expandedState,
  setExpandState: setExpandedState,
}) {
  const taskRef = useRef();
  const assignedToRef = useRef();
  const dateRef = useRef();

  const dropDownRef = useRef();

  function todaysDate() {
    const date = new Date();
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();

    return `${y}-${m < 10 ? "0" : ""}${m}-${d < 10 ? "0" : ""}${d}`;
  }

  /**
   *
   * @param {string} s
   */
  function stringToDate(s) {
    // XXXX-XX-XX

    let date = new Date(s);

    return date;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const taskVal = taskRef.current.value;
    const assigned = assignedToRef.current.value;
    const date = dateRef.current.value;

    if (!taskVal) {
      toast.error("Enter a Task", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
      });
      return;
    }

    if (!assigned) {
      toast.error("Enter Assigned to", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
      });
      return;
    }

    if (!date) {
      toast.error("Enter a valid date", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
      });
      return;
    }

    let Date_date = stringToDate(date)

    const task = {
      dateCreated: Timestamp.now(),
      task: taskVal,
      assigned,
      date: Timestamp.fromDate(Date_date),
    };

    try {
      const collectionToBeFetched = collection(db, "users");
      const selectedDoc = doc(collectionToBeFetched, "user1");
      const x = collection(selectedDoc, "tasks");
      await addDoc(x, task);
      toast.success("Successfully added", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        collapseDuration: 100,
      });
    } catch (err) {
      console.log(err);
    }

    taskRef.current.value = "";
    assignedToRef.current.value = "";
    dateRef.current.value = "";

    setExpandedState();
  }

  useEffect(() => {
    function handleClick(e) {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setExpandedState(false);
      }
    }

    function escHandle(e) {
      if (e.keycode === 27) {
        setExpandedState(false);
        console.log("Key Presses");
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", escHandle);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", escHandle);
    };
  }, [dropDownRef]);

  return (
    <div
      ref={dropDownRef}
      className={`z-10 w-full lg:w-1/2 xl:w-1/3 bg-white left-1/2 -translate-x-1/2 lg:mx-auto fixed transition-all p-3 ${
        !expandedState ? "-translate-y-full" : "shadow-md"
      }`}
    >
      <form className={`flex flex-col gap-2 `} onSubmit={handleSubmit}>
        <label htmlFor="task-input">Enter Task</label>
        <input
          id="task-input"
          placeholder="Enter task name"
          className="p-2 shadow-md"
          type="text"
          ref={taskRef}
        />
        <label htmlFor="assigned-to">Assigned To</label>
        <input
          id="assigned-to"
          type="text"
          placeholder="Assigned To"
          className="p-2 shadow-md"
          ref={assignedToRef}
        />
        <div>
          <label htmlFor="date">Next follow up date: </label>
          <input ref={dateRef} type="date" className="p-2 border" />
        </div>
        <button className="bg-blue-400 mb-1 w-min mx-auto px-2 py-1 rounded-lg text-white font-semibold">
          ADD
        </button>
        {expandedState && (
          <Button
            expandState={expandedState}
            setExpandedState={setExpandedState}
          />
        )}
      </form>
    </div>
  );
}

export default TaskInput;
