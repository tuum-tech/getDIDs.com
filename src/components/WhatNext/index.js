import React, {useContext} from "react";
import ModalContainer from "common/ModalContainer";
import elastoslogo from 'assets/mainlogo.svg'
import assistLogo from 'assets/assist-icon.png'
import arrowBlack from 'assets/arrow-right-small.svg'
import arrowWhite from 'assets/arrow-right-white.svg'
import { CopyToClipboard } from "react-copy-to-clipboard";
import MnemonicContext from "context/MnemonicContext";
import { toast, Slide } from "react-toastify";
import "./index.scss";

function NextStep({ logo, title, clickFunc, className, isArrowBlack = true }) {
  return (
    <div className={className} onClick={clickFunc}>
      <img src={logo} alt="logo" height="40px" />
      <span>{title}</span>
      <img src={isArrowBlack ? arrowBlack : arrowWhite} width="16px" alt="arrow" />
    </div>
  );
}

function WhatNext() {
  const { confirmationID } = useContext(MnemonicContext)
  const openElastos = () =>{
    window.location.href = `https://scheme.elastos.org/app?id=org.elastos.trinity.dapp.did`
  }
  const openAssist = () =>{
    window.location.href = `https://scheme.elastos.org/app?id=org.elastos.trinity.dapp.did`
  }
  const notify = () =>
    toast.info("☑ Confirmation ID successfully copied to clipboard", {
      className: "bg-blue-600",
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      transition: Slide,
      progress: undefined,
    });
  return (
    <ModalContainer>
      <span className="title">Next Steps?</span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
        <div className="d-flex flex-column justify-content-between align-items-center content">
          <span className="description">
            Your identity is being published in the background.<br />
            This process may take up to 10 minutes.
          </span>

          <span className="confirmation-id ">
            Confirmation ID: {confirmationID}
            <CopyToClipboard
                text={confirmationID}
                onCopy={notify}
              >
                <span className="copy-text d-block">Click to copy ID</span>
              </CopyToClipboard>
          </span>

          <span className="description mb-4">
             You can check for confirmation on the Assist app, and <br/>
             continue managing your new digital identity on elastOS.
          </span>

          
        </div>
        <NextStep logo={assistLogo} title="Check confirmation on Assist app" clickFunc={openAssist} className="next-assist" isArrowBlack={false} />
        <NextStep logo={elastoslogo} title="Download elastOS" clickFunc={openElastos} className="next-elastos" />
      </div>

      
    </ModalContainer>
  );
}

export default WhatNext;
