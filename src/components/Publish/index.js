
import React, { useContext } from "react";
import { func } from "prop-types";
import ModalContainer from "common/ModalContainer";
import NextButton from "common/NextButton";
import MnemonicContext from "context/MnemonicContext";
import ConfirmationDetail from "common/ConfirmationDetail"
import usericon from 'assets/users.svg'
import emailicon from 'assets/email.svg'
import birthicon from 'assets/birthicon.svg'
import twittericon from 'assets/twittericon.svg'
import "react-toastify/dist/ReactToastify.css";
import GetDids from "services/getdids.service"
import './index.scss';



function Publish({ setStep }) {
  const { name, email, birthDate, twitter_user, setPublishStatus, mnemonic } = useContext(MnemonicContext)

  const publishDocument = async () => {
    let confirmation = await GetDids.PublishDocument(mnemonic, {
      name: name,
      email: email,
      birthDate: birthDate,
      twitter: twitter_user
    })

    
    setPublishStatus(confirmation)
    setStep()
  }
  
  return (
    <ModalContainer>
      <span className="title">Nearly completed!</span>
      <span className="description">
      Your identity is being created. We are not quite finished yet, let’s publish these details, and then you’re all set!
        </span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
          <div className="confirmation-items">
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
