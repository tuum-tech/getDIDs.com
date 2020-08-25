import React from 'react'
import propTypes from 'prop-types'
import ModalContainer from 'common/ModalContainer'
import NextButton from 'common/NextButton'
import ninjiImage from 'assets/ninja.png'

function GetStarted({setStep}) {
  return (
    <ModalContainer>
      <img src={ninjiImage} alt="ninja" className="d-flex align-self-center" />
      <span className="title">Your Digital Identity</span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
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
