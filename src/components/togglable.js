import React, { useState } from "react";
import propTypes from "prop-types";

function Togglable({ buttonlabel, children }) {
  const [visible, setVisible] = useState(false);

  const visibility = {
    hideWhenVisible: {
      display: visible ? "none" : "",
    },
    showWhenVisible: {
      display: visible ? "" : "none",
    },
  };

  return (
    <div>
      <div style={visibility.hideWhenVisible}>
        <button onClick={() => setVisible(true)} className='toggleBtn'>{buttonlabel}</button>
      </div>
      <div id="showWhenvisible" style={visibility.showWhenVisible}>
        {children}
        <button onClick={() => setVisible(false)}>cancel</button>
      </div>
    </div>
  );
}

export default Togglable;
Togglable.prototypes={
  buttonlabel: propTypes.string.isRequired
};