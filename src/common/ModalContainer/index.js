import React from 'react'
import propTypes from 'prop-types'
import './index.scss'

function ModalContainer({useFull = false, children}) {
  return (
    <div className={useFull ? "modal-container-full" : "modal-container"}>
      {children}
    </div>
  )
}

ModalContainer.propTypes = {
  children: propTypes.array
}

export default ModalContainer