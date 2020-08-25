import React from 'react'
import propTypes from 'prop-types'
import './index.scss'

function ModalContainer({children}) {
  return (
    <div className="modal-container">
      {children}
    </div>
  )
}

ModalContainer.propTypes = {
  children: propTypes.array
}

export default ModalContainer