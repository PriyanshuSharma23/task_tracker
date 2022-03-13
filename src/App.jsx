import "./App.css";
import { useRef, useState } from "react";
import TaskInput from "./components/TaskInput/TaskInput";
import { ToastContainer } from "react-toastify";
import Button from "./components/TaskInput/Button";
import TasksList from "./components/TasksList";

function App() {
  
  const [expandedState, setExpandedState] = useState(false);
  const AppObject = useRef();

  return (
    <div ref={AppObject}>
      <TaskInput expandState={expandedState} setExpandState={setExpandedState} />
      <Button expandState = {expandedState} setExpandedState = {setExpandedState} />
      <TasksList />
      <ToastContainer />
    </div>
  );
}

export default App;
