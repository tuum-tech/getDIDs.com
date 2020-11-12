import React from "react";
import ModalContainer from "common/ModalContainer";
import elastoslogo from 'assets/mainlogo.svg'
import arrow from 'assets/arrow-right.svg'

import "./index.scss";

function NextStep({ logo, title, clickFunc }) {
  return (
    <div className="next-step mb-1" onClick={clickFunc}>
      <img src={logo} alt="logo" height="40px" />
      <span>{title}</span>
      <img src={arrow} width="16px" alt="arrow" />
    </div>
  );
}

function WhatNext() {
  const openElastos = () =>{
    window.location.href = `https://scheme.elastos.org/app?id=org.elastos.trinity.dapp.did`
  }
  return (
    <ModalContainer>
      <span className="title mt-5">The Next Steps?</span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
        <div className="d-flex flex-column justify-content-between align-items-center content">
          <span className="description">
            Your Identity has been published and made public for all to see. You own it, It’s yours!
          </span>
          <span className="description ">
            This is just the beginning. We would suggest to download elastOS so you can view your Identity and start adding information.
          </span>

          <NextStep logo={elastoslogo} title="Manage your Identity on elastOS" clickFunc={openElastos} />
        </div>
      </div>

      <span className="info-footer mt-3">You can safely close this window now</span>
    </ModalContainer>
  );
}

export default WhatNext;
