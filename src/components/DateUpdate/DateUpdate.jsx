import React, { useRef } from "react";
import { toast } from "react-toastify";

function DateUpdate({id}) {
  const dateRef = useRef();

  async function handleSubmit() {
    const newDate = dateRef.current.value;
    if (newDate) {
      const collectionToBeFetched = collection(db, "users");
      const selectedDoc = doc(collectionToBeFetched, "user1");
      const refDoc = collection(selectedDoc, "tasks");

      try {
        await updateDoc(refDoc, {
          date: newDate,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.warn("Enter a valid date");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="date" ref={dateRef} />
      </form>
    </div>
  );
}

export default DateUpdate;
