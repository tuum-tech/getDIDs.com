import React, { useContext } from "react";
import { func } from "prop-types";
import ModalContainer from "common/ModalContainer";
import NextButton from "common/NextButton";
import MnemonicContext from "context/MnemonicContext";
import ConfirmationDetail from "common/ConfirmationDetail";
import usericon from "assets/users.svg";
import emailicon from "assets/email.svg";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import Elastos from "services/elastos.service";

function Publish({ setStep }) {
  const { network, name, email, setPublishStatus, mnemonic, did } =
    useContext(MnemonicContext);

  const publishDocument = async () => {
    let confirmation = await Elastos.PublishDocument(
      network,
      mnemonic.join(" "),
      {
        did: did,
        name: name,
        email: email,
      }
    );
    setPublishStatus(confirmation);
    setStep();
  };

  return (
    <ModalContainer>
      <span className="title">Nearly completed!</span>
      <span className="description">
        Your identity is being created. We are not quite finished yet. Choose
        the network you would like to publish your DID in and then you're all
        set!
      </span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
        <div className="confirmation-items">
          <ConfirmationDetail icon={usericon} value={name} />
          <ConfirmationDetail icon={emailicon} value={email} />
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
