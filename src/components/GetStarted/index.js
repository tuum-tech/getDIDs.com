import React from 'react'
import propTypes from 'prop-types'
import ModalContainer from 'common/ModalContainer'
import NextButton from 'common/NextButton'
import getstart from 'assets/getstart.svg'
import './index.scss';
function GetStarted({ setStep }) {
  return (
    <ModalContainer>

      <span className="title">Digital Identity</span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
        <div className="d-flex flex-column justify-content-between align-items-center getstarted-content">
        <span className="description">Our lives are linked to the apps, devices, and services we use every day. But with each new digital connection, we expose our identity and data to new risks beyond our control.</span>
        <img src={getstart} alt="getstart" className="d-flex align-self-center mt-3" />
        <span className="description ">Let's set you up with a secure Digital Identity that we call a Decentralized Identifier, or DID. <br />
          A DID provides independent proof of ownership of all your data, allowing you - and only you - to truly own it.
        </span>
        </div>
        
        <NextButton title="Let's get started" onClick={setStep} />
      </div>
    </ModalContainer>
  )
}

GetStarted.propTypes = {
  setStep: propTypes.func
}

export default GetStarted
