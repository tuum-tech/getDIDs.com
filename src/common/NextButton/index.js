import React from "react";
import PropTypes from "prop-types";
// import nextButton from "assets/next-button.svg";
// import nextButtonOver from "assets/next-button-over.svg";

import "./index.scss";

function NextButton({ title, onClick }) {
   return (
    <div className="next-button d-flex flex-column align-items-center" onClick={onClick}>
      <span className="button-name mt-2">{title}</span>
    </div>
  );
}

NextButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default NextButton;
