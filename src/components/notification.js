import React from "react";

function Notification({ message, success }) {
  return message ? (
    <p className="error">{message}</p>
  ) : success ? (
    <p className="success">{success}</p>
  ) : "";
}

export default Notification;
