import React, { useContext } from "react";
import ModalContainer from "common/ModalContainer";
import NextButton from "common/NextButton"
import ConfirmationDetail from "common/ConfirmationDetail"
import usericon from 'assets/users.svg'
import emailicon from 'assets/email.svg'
import birthicon from 'assets/birthicon.svg'
import twittericon from 'assets/twittericon.svg'
import MnemonicContext from "context/MnemonicContext";
import "./index.scss";





function ConfirmData({setStep, setBack}) {
  const { name, email, birthDate, twitter_user } = useContext(MnemonicContext)   
  return (
    <ModalContainer>
      <span className="title">Confirm details</span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
        <div className="d-flex flex-column justify-content-between align-items-center content">
          <span className="description">
            We'll create your secure identity with the information you provided below.
          </span>
          <span className="description ">
          Make sure these details are correct. <br /> Once confirmed, they will be linked to your new DID.
          </span>

          <div className="confirm-details" >
                <ConfirmationDetail icon={twittericon} value={ twitter_user? "@" + twitter_user : "" } />
                <ConfirmationDetail icon={usericon} value={name} />
                <ConfirmationDetail icon={emailicon} value={email} />
                <ConfirmationDetail icon={birthicon} value={birthDate} />
          </div>

        </div>
        <NextButton title="Confirm" onClick={setStep} />
      </div>
      
      <span className="back-footer mt-3" onClick={setBack}>Go back to edit details</span>
    </ModalContainer>
  );
}

export default ConfirmData;