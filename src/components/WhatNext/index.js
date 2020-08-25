import React from 'react'
import ModalContainer from 'common/ModalContainer'
import ninjiImage from 'assets/ninja-what-next.png'
import arrow from 'assets/arrow-right.svg'
import elastOSLogo from 'assets/main-logo.svg'
import verifyLogo from 'assets/verify-img.svg'

import './index.scss'

function NextStep({logo, title}) {
  return (
    <div className="next-step mb-1">
      <img src={logo} alt="logo" height="40px" />
      <span>{title}</span>
      <img src={arrow} width="16px" alt="arrow" />
    </div>
  )
}

function WhatNext() {
  return (
    <ModalContainer>
      <img src={ninjiImage} alt="ninja" className="d-flex align-self-center" />
      <span className="title">Hurray!</span>
      <span className="description">Your Identity has been published and made public for all to see. You own it, It’s yours!</span>
      <span className="title font-weight-normal">What next?</span>
      <NextStep logo={elastOSLogo} title="See your Identity on elastOS" />
      <NextStep logo={verifyLogo} title="Verify DID with Vouch" />
    </ModalContainer>
  )
}

export default WhatNext