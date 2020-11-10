
import React, { useContext } from "react";
import { func } from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy as farCopy } from "@fortawesome/free-regular-svg-icons";

import ModalContainer from "common/ModalContainer";
import NextButton from "common/NextButton";
import MnemonicContext from "context/MnemonicContext";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetDids from "services/getdids.service"

var QRCode = require("qrcode.react");


function Publish({ setStep }) {
  const {did, twitter_name, twitter_user, mnemonic} = useContext(MnemonicContext)  

  const publishDocument = async () =>{
    await GetDids.PublishDocument(mnemonic, {
      name: twitter_name,
      user: twitter_user
    })

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
      <span className="title mt-4">You own an Identity!</span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
        <span className="description pl-3 pr-3">
          That long number is your Identity address and the QR code belongs to
          that address. Congrats, it’s as simple as that!
        </span>
        <QRCode
          imageSettings={{ width: "153px", height: "153px" }} 
          value={`did:elastos:${did}`}         
        />
        <div className="text-center">
          <span className="description d-block mb-2">{`did:elastos:${did}`}</span>
          <CopyToClipboard
            text={`did:elastos:${did}`}
            onCopy={notify}
          >
            <span className="cursor-pointer ml-2 font-weight-bold">
              <FontAwesomeIcon icon={farCopy} />&nbsp;Copy
            </span>
          </CopyToClipboard>
        </div>
        <NextButton title="Let's Publish" onClick={publishDocument} />
      </div>
    </ModalContainer>
  );
}

Publish.propTypes = {
  setStep: func,
};

export default Publish;
