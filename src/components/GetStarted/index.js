import React from 'react'
import propTypes from 'prop-types'
import ModalContainer from 'common/ModalContainer'
import NextButton from 'common/NextButton'
import getstart from 'assets/getstart.svg'
import './index.scss';
function GetStarted({setStep}) {
  return (
    <ModalContainer>
      <img src={getstart} alt="getstart" className="d-flex align-self-center mt-3" />
      <span className="title mt-3">Digital Identity</span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100 content">
        <span className="description">Let’s set you up with a Digital Identity. We call this a Decentralized Identifier (DID).</span>
        <span className="description">It provides independent proof of ownership of your data so you can truly own it!</span>
        <NextButton title="Let's get started" onClick={setStep} />
      </div>
    </ModalContainer>
  )
}

GetStarted.propTypes = {
  setStep: propTypes.func
}

export default GetStarted
