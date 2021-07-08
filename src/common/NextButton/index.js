import React from "react";
import PropTypes from "prop-types";
// import nextButton from "assets/next-button.svg";
// import nextButtonOver from "assets/next-button-over.svg";

import "./index.scss";

function NextButton({ title, onClick, enabled = true }) {
  return (
    // <div className={`next-button d-flex flex-column align-items-center ${enabled? "" : "disabled"}`} onClick={() =>{ if (enabled) onClick() } }>
    <div
      className={`next-button d-flex flex-column align-items-center ${
        enabled ? "" : "disabled"
      }`}
      onClick="return false"
    >
      <span className="button-name">{title}</span>
    </div>
  );
}

NextButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default NextButton;
