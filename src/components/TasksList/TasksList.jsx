import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useTask } from "../../contexts/TaskContext";
import Task from "../Task";

function TasksList() {
  const { queriedTasks, tasks } = useTask();

  return (
    <div className="">
      <div className="fixed shadow-md top-0 p-3 bg-green-100  w-full">
        <div className="font-bold text-3xl text-blue-400">Tasks</div>
      </div>
      <div className="pt-16 px-2">
        <SubSection
          i={0}
          color={"emerald-600"}
          text={"Today"}
          zeroLenText={"No follow ups today swalla 🎉"}
          queriedTasks={queriedTasks}
        />

        <hr className="my-2" />
        <SubSection
          i={1}
          color={"orange-500"}
          text={"Previous"}
          zeroLenText={"No Backlog 🎉"}
          queriedTasks={queriedTasks}
        />

        <hr className="my-2" />
        <SubSection
          i={2}
          color={"blue-500"}
          text={"Upcoming"}
          zeroLenText={"No Upcoming Work 🎉"}
          queriedTasks={queriedTasks}
        />
      </div>
    </div>
  );
}

const SubSection = ({ i, text, zeroLenText, color, queriedTasks }) => {
  const nameRef = useRef()
  let colors = ['text-emerald-600', 'text-orange-500', 'text-blue-500']
  return (
    <>
      <h2 ref={nameRef} className={` ${colors[i]} text-2xl  font-bold font-mono text-center`}>
        {text}
      </h2>
      <div>
        {queriedTasks[i].length !== 0 ? (
          queriedTasks[i].map((task) => {
            return (
              <div key={task.id}>
                <Task task={task} color={color} index={i}/>
              </div>
            );
          })
        ) : (
          <div className="text-center text-lg">{zeroLenText}</div>
        )}
      </div>
    </>
  );
};

export default TasksList;
