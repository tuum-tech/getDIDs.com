
import React, { useContext } from "react";
import { func } from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import copyimg from "assets/copy.svg"
import ModalContainer from "common/ModalContainer";
import NextButton from "common/NextButton";
import MnemonicContext from "context/MnemonicContext";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetDids from "services/getdids.service"
import './index.scss';
var QRCode = require("qrcode.react");


function Publish({ setStep }) {
  const {did, twitter_name, twitter_user, mnemonic} = useContext(MnemonicContext)  

  const publishDocument = async () =>{
    // await GetDids.PublishDocument(mnemonic, {
    //   name: twitter_name,
    //   user: twitter_user
    // })

    setStep()
  }

  const notify = () =>
    toast.info("☑ DID successfully copied to clipboard", {
      className:"bg-blue-600",
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
      <span className="title mt-4">You own Identity</span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
       
        <QRCode
          imageSettings={{ width: "153px", height: "153px" }} 
          value={`did:elastos:${did}`}         
        />
        <div className="text-center">
          <span className="description d-block mb-3">{`did:elastos:${did}`}</span>
          <CopyToClipboard
            text={`did:elastos:${did}`}
            onCopy={notify}
          >
            <span className="copy-text">
              <img src={copyimg} alt="copy"/>&nbsp;Copy
            </span>
          </CopyToClipboard>
        </div>
        <span className="description text-padding">
          That long number is your Identity address and the QR code belongs to
          that address. Congrats, it’s as simple as that!
        </span>
        <NextButton title="Let's Publish" onClick={publishDocument} />
      </div>
    </ModalContainer>
  );
}

Publish.propTypes = {
  setStep: func,
};

export default Publish;
