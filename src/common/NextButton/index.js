import React from 'react'
import PropTypes from 'prop-types'
import nextButton from 'assets/next-button.svg'

import './index.scss'

function NextButton({title, onClick}) {
  return (
    <div className="d-flex flex-column align-items-center" onClick={onClick}>
      <img src={nextButton} alt="next-button" className="next-button" />      
      <span className="button-name mt-3">{title}</span>
    </div>
  )
}

NextButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func
}

export default NextButton

