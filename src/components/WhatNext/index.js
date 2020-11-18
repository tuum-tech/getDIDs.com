import React, {useContext} from "react";
import ModalContainer from "common/ModalContainer";
import elastoslogo from 'assets/elastos.svg'
import androidlogo from 'assets/android.jpg'
import ioslogo from 'assets/ios.jpg'
import MnemonicContext from "context/MnemonicContext";
import GetDids from "services/getdids.service"
import "./index.scss";

function WhatNext() {
  const { publishStatus, setPublishStatus } = useContext(MnemonicContext)

  const refreshStatus = async () =>{
    let confirmation = await GetDids.getTxStatus(publishStatus.confirmation_id)
    setPublishStatus(confirmation)
  }

  const openAndroid = () =>{
    window.open("https://play.google.com/store/apps/details?id=org.elastos.trinity.runtime")
  }
  const openIOS = () =>{
    window.open("https://apps.apple.com/us/app/elastos-essentials/id1532705468 ")
  }
  return (
    <ModalContainer>
      <span className="title">Next Steps?</span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
        <div className="d-flex flex-column justify-content-between align-items-center content">
          <span className="description">
            Your identity is being published in the background. This process may take up to 10 minutes. You can check for status of this on the <a href="https://idchain.elastos.org" target="_blank" rel="noopener noreferrer">Blockchain Explorer</a>.
          </span>

          <span className="identity-status">Identity Status</span>

          <div className="confirmation-id">
              <span className="confirmation-status">{publishStatus.status}</span>
              <span className="confirmation-refresh" onClick={refreshStatus}>Refresh</span>
          </div>

          <span className="description last-message">
              Continue managing your new digital identity on the elastOS application.
          </span>

          
          <img src={elastoslogo} alt="elastOS" height="70.9px" width="72.1px" />
          <span className="elastos-download">Download elastOS</span>

          <div className="store-download">
            <img src={ioslogo} alt="IOS App Store" height="40px" onClick={openIOS} />
            <img src={androidlogo} alt="Google Play" height="40px" onClick={openAndroid} />
          </div>

          
        </div>
        
      </div>

      
    </ModalContainer>
  );
}

export default WhatNext;
