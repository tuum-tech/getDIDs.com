import React, { Fragment, useContext } from "react";
import { func } from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy as farCopy } from "@fortawesome/free-regular-svg-icons";

import ModalContainer from "common/ModalContainer";
import NextButton from "common/NextButton";
import MnemonicContext from "context/MnemonicContext";
import { ToastContainer, toast, Slide } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

var QRCode = require("qrcode.react");

function Publish({ setStep }) {
  const { did } = useContext(MnemonicContext);

  const notify = () =>
    toast.success("DID successfully copied to clipboard", {
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
      <span className="title">You own an Identity!</span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
        <span className="description pl-3 pr-3">
          That long number is your Identity address and the QR code belongs to
          that address. Congrats, it’s as simple as that!
        </span>
        <QRCode
          value={`did:elastos:${did}`}
          imageSettings={{ width: "128px", height: "128px" }}
        />
        <div className="text-center">
          <span className="description d-block mb-2">{`did:elastos:${did}`}</span>
          <CopyToClipboard
            text="did:elastos:iouMSXKHNcwdbPzb58pXpmGBxrMzfq2c"
            onCopy={notify}
          >
            <span className="cursor-pointer ml-2 font-weight-bold">
              <FontAwesomeIcon icon={farCopy} /> Copy
            </span>
          </CopyToClipboard>
        </div>
        <NextButton title="Let's Publish" onClick={setStep} />
      </div>
    </ModalContainer>
  );
}

Publish.propTypes = {
  setStep: func,
};

export default Publish;
