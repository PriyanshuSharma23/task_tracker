import React from "react";
import {BsPlus, BsArrowUpShort} from 'react-icons/bs'

function Button({ expandState, setExpandedState }) {
  function handleClick() {
    setExpandedState((prev) => !prev);
  }

  return (
    <button
      onClick={handleClick}
      className={`transition-all duration-500 right-3 z-10 fixed top-3 delay-200  text-4xl bg-blue-400 text-white rounded-full ${
        expandState ? " opacity-20" : ""
      }`}
    >
      {expandState ? <span aria-label="retract dropdown"><BsArrowUpShort/> </span>: <span aria-label="add new task" className=""><BsPlus /> </span>}
    </button>
  );
}

export default Button;
