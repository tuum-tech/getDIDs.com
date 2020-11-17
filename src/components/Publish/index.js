
import React, { useContext } from "react";
import { func } from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ModalContainer from "common/ModalContainer";
import NextButton from "common/NextButton";
import MnemonicContext from "context/MnemonicContext";
import ConfirmationDetail from "common/ConfirmationDetail"
import usericon from 'assets/users.svg'
import emailicon from 'assets/email.svg'
import birthicon from 'assets/birthicon.svg'
import twittericon from 'assets/twittericon.svg'
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetDids from "services/getdids.service"
import './index.scss';

var QRCode = require("qrcode.react");


function Publish({ setStep }) {
  const { did, name, email, birthDate, twitter_user, setConfirmationID, mnemonic } = useContext(MnemonicContext)

  const publishDocument = async () => {
    let confirmation = await GetDids.PublishDocument(mnemonic, {
      name: name,
      email: email,
      birthDate: birthDate,
      twitter: twitter_user
    })
    
    setConfirmationID(confirmation)
    setStep()
  }

  const notify = () =>
    toast.info("☑ DID successfully copied to clipboard", {
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
      <span className="title">Congrats!</span>
      <span className="description">
          Your identity is now created. Copy your DID if you want to. Then, let's publish, and then you're all set!
        </span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100 mt=4">
       

        <div className="publish-details" >
          <div className="qrcode-did">
            <QRCode
              // imageSettings={{src: `did:elastos:${did}`, width: "120px", height: "120px" }}
              size={120}
              value={`did:elastos:${did}`}
            />
            <div className="text-center mt-1">
              <span className="did-text">{`did:elastos:${did}`}</span>
              
              <CopyToClipboard
                text={`did:elastos:${did}`}
                onCopy={notify}
              >
                <span className="copy-text d-block">Click to copy address</span>
              </CopyToClipboard>
            </div>
          </div>

          <ConfirmationDetail icon={twittericon} value={twitter_user ? "@" + twitter_user : ""} />
          <ConfirmationDetail icon={usericon} value={name} />
          <ConfirmationDetail icon={emailicon} value={email} />
          <ConfirmationDetail icon={birthicon} value={birthDate} />
        </div>

        <NextButton title="Finish" onClick={publishDocument} />
      </div>
    </ModalContainer>
  );
}

Publish.propTypes = {
  setStep: func,
};

export default Publish;
