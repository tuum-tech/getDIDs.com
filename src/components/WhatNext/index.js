import React, { useContext, useEffect } from "react";
import ModalContainer from "common/ModalContainer";
import elastoslogo from "assets/elastos.svg";
import androidlogo from "assets/android.jpg";
import ioslogo from "assets/ios.jpg";
import copyicon from "assets/copy.svg";
import MnemonicContext from "context/MnemonicContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast, Slide } from "react-toastify";
import GetDids from "services/getdids.service";
import "./index.scss";

var QRCode = require("qrcode.react");

function WhatNext() {
  const { network, did, mnemonic, publishStatus, setPublishStatus } =
    useContext(MnemonicContext);

  useEffect(() => {
    if (publishStatus.status === "Completed") return;
    setTimer();
  });

  const setTimer = () => {
    const timer = setTimeout(async () => {
      await refreshStatus();
    }, 10 * 1000);
    return () => clearTimeout(timer);
  };

  const refreshStatus = async () => {
    console.log("checking status: ", publishStatus.confirmation_id);
    let confirmation = await GetDids.getTxStatus(
      network,
      publishStatus.confirmation_id
    );
    if (confirmation) {
      setPublishStatus(confirmation);
      console.log("checking status completed", confirmation.status);
    }
  };

  const openAndroid = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=org.elastos.essentials.app"
    );
  };
  const openIOS = () => {
    window.open(
      "https://apps.apple.com/us/app/elastos-essentials/id1568931743"
    );
  };

  const Confirmation = () => {
    let status = publishStatus.status.toLowerCase();
    let classItem = `confirmation-${status}`;
    let textItem = "";
    switch (status) {
      case "cancelled":
        textItem = "Identity transaction is on cancelled";
        break;

      case "completed":
        textItem = "Identity transaction is complete";
        break;

      case "processing":
        textItem = "Identity transaction is processing…";
        break;

      default:
        textItem = "Please wait. Identity transaction is pending";
        break;
    }

    return (
      <div className={classItem}>
        <span className="confirmation-status">{textItem}</span>
      </div>
    );
  };

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
    <ModalContainer useFull={true}>
      <span className="title">Next Steps?</span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
        <div className="d-flex flex-column justify-content-between align-items-center content">
          <span className="description">
            Congratz! Your identity is being published in the background. This
            process may take around 10 seconds or so. You can check out your DID
            on the{" "}
            <a
              href={`https://eid.elastos.io/did?did=${encodeURIComponent(did)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Elastos ID Sidechain browser
            </a>
          </span>

          <div className="qrcode-did">
            <QRCode
              // imageSettings={{src: `did:elastos:${did}`, width: "120px", height: "120px" }}
              size={120}
              value={mnemonic.join(" ")}
            />
            <div className="did-item">
              <CopyToClipboard text={`${did}`} onCopy={notify}>
                <img src={copyicon} alt="copy DID" className="copy-icon" />
              </CopyToClipboard>
              <div className="did-text">{`${did}`}</div>
            </div>
          </div>

          {Confirmation()}
        </div>
      </div>
      <div className="d-flex flex-column align-items-center elastos-content">
        <img src={elastoslogo} alt="elastOS" height="40px" width="40px" />
        <span className="elastos-download">Download elastOS</span>
        <span className="last-message">
          Continue managing your new digital identity on the elastOS
          application.
        </span>
        <div className="store-download">
          <img
            src={ioslogo}
            alt="IOS App Store"
            height="40px"
            onClick={openIOS}
          />
          <img
            src={androidlogo}
            alt="Google Play"
            height="40px"
            onClick={openAndroid}
          />
        </div>
      </div>
    </ModalContainer>
  );
}

export default WhatNext;
