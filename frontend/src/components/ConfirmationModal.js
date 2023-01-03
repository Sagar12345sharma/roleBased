import React, { useEffect } from "react";

function ConfirmationModal({ message, closeConfirmationModal }) {
  useEffect(() => {
    setTimeout(() => {
      closeConfirmationModal("");
    }, 2000);
  }, []);

  return (
    <div className="confirmationModal">
      <div id={"confirmationModal"} className="container">
        <div
          className="cross_icon"
          onClick={() => closeConfirmationModal("")}
        ></div>
        <div className="mess">{message}</div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
