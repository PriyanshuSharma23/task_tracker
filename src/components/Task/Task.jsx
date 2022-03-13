import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTask } from "../../contexts/TaskContext";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";

function Task({ task, index }) {
  const [dateUpdateVisible, setDateUpdateVisible] = useState(false);
  const { updateDate, setSelectedTask, deleteDocument } = useTask();
  const [deleteVisible, setDeleteVisible] = useState(false);
  const dateRef = useRef();
  const buttonRef = useRef();
  const [confirmVisible, setConfirmVisible] = useState(false);

  let colors = ["bg-emerald-600", "bg-orange-500", "bg-blue-500"];

  function dateToReadableString(s) {
    return `${s.getDate()} / ${s.getMonth() + 1} / ${s.getFullYear()}`;
  }
  const createdDate = task?.data.dateCreated.toDate();
  let nextFollowUpDate = dateToReadableString(task?.data.date.toDate());

  useEffect(() => {
    nextFollowUpDate = task?.data.date.toDate();
  }, [task]);

  useEffect(() => {
    function _handleClick(e) {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setDateUpdateVisible(false);
      }
    }

    document.addEventListener("mousedown", _handleClick);
    return () => {
      document.removeEventListener("mousedown", _handleClick);
    };
  }, [buttonRef]);

  function handleClick(e) {
    setDeleteVisible((prev) => {
      if (!buttonRef.current.contains(e.target)) {
        return !prev;
      } else prev;
    });
  }

  function handleFocus(e) {
    e.currentTarget.type = "date";
    e.currentTarget.focus();
    setConfirmVisible(true);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const val = dateRef.current.value;
    if (!val) {
      toast.error("Date can't be empty", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
      });
      return;
    }

    try {
      await updateDate(val, task);
      toast.success("Updated", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
      });
    } catch (err) {
      console.log(err);
    }
    dateRef.current.type = "text";
    setConfirmVisible(false);
  }

  function handleClose(e) {
    e.preventDefault()
    setDateUpdateVisible(false)
  }

  return (
    <div onClick={handleClick} className="w-full my-1  bg-white">
      <div className="shadow-md p-2 border rounded">
        <div className="flex gap-1 justify-between">
          <div className="md:text-2xl text-xl  text-slate-800">
            {task?.data.task}
          </div>

          <div
            ref={buttonRef}
            className={`transition-all cursor-pointer text-white font-bold  text-md text-center rounded `}
          >
            <form>
              <input
                type="text"
                ref={dateRef}
                id="date-input"
                onBlur={(e) => {
                  e.currentTarget.type = "text";
                  setConfirmVisible(false);
                }}
                onFocus={handleFocus}
                className={`text-center ${colors[index]} placeholder:text-white placeholder:font-bold px-1 text-lg w-44`}
                placeholder={nextFollowUpDate}
              />
              {confirmVisible ? (
                <div className="text-black flex justify-around">
                  <button
                    onClick={handleUpdate}
                    className="text-green-500 ext-md text-"
                  >
                    <TiTick />
                  </button>
                  <button
                    onClick={handleClose}
                    className="text-red-500 text-sm"
                  >
                    <ImCross />
                  </button>
                </div>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
        <div className="flex items-end justify-between mt-1">
          <div>
            Assigned To:
            <br />
            {task?.data.assigned}
          </div>
          <div>
            <span className="text-md text-gray-500">
              Created at: {dateToReadableString(createdDate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
