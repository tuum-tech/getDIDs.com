
import React, { useContext } from "react";
import { func } from "prop-types";
import ModalContainer from "common/ModalContainer";
import NextButton from "common/NextButton";
import MnemonicContext from "context/MnemonicContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter as farTwitter } from "@fortawesome/free-brands-svg-icons";
import GetDids from "services/getdids.service"
import usericon from 'assets/users.svg'
import emailicon from 'assets/email.svg'
import birthicon from 'assets/birthicon.svg'
import twittericon from 'assets/twittericon.svg'
import "react-toastify/dist/ReactToastify.css";
import './index.scss';

function ItemData({ icon, placeholder, type, value, onChanged }) {
  return <div className="item-data">
    <img src={icon} alt={placeholder} />
    <input type={type} value={value} onChange={onChanged} placeholder={placeholder} />
  </div>
}

function TwitterInfo() {
  const { twitter_user, isLogged } = useContext(MnemonicContext)


  const openTwitter = async () => {
    let request = await GetDids.GetRequestToken();
    window.location.replace(`https://api.twitter.com/oauth/authorize?oauth_token=${request}`)
  }


  if (isLogged) {
    return <div className="item-data">
              <img src={twittericon} alt="twitter" />
              <span className="twitter-name">
                { twitter_user ? "@" + twitter_user : "Loading"  }
              </span>
              <span className="twitter-change" onClick={openTwitter}>
                  Change
              </span>
          </div>
  }
  return <div className="round-button d-flex flex-column align-items-center mt-5" onClick={openTwitter}>
    <span className="button-name mt-2">
      <FontAwesomeIcon icon={farTwitter} />&nbsp;
         Sign in using twitter
         </span>
  </div>

}



function Import({ setStep, setMnemonic }) {
  const { name, email, birthDate, twitter_user, setName, setEmail, setBirthDate } = useContext(MnemonicContext)
  const updateName = (event) => {
    setName(event.target.value)
  }

  const updateEmail = (event) => {
    setEmail(event.target.value)
  }

  const updateDateBirth = (event) => {
    setBirthDate(event.target.value)
  }

  const NextStep = async () => {
    
    if ((!twitter_user || twitter_user === "") && 
        (!name || name === "") && 
        (!email || email === "") && 
        (!birthDate || birthDate === "")) 
        {
          setMnemonic()
        }
        else{
          setStep()
        }

    
  }

  return (
    <ModalContainer>
      <span className="title">Add details</span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
        <div className="d-flex flex-column align-items-center h-100">
          <span className="description mb-5">Add your details to begin building your digital identity.</span>

          <TwitterInfo />
          <ItemData icon={usericon} type="text" value={name} onChanged={updateName} placeholder="Enter Name" />
          <ItemData icon={emailicon} type="email" value={email} onChanged={updateEmail} placeholder="Enter Email" />
          <ItemData icon={birthicon} type="date" value={birthDate} onChanged={updateDateBirth} placeholder="Enter Date of Birth" />



        </div>
        <NextButton title="Done adding details" onClick={NextStep} />
      </div>


    </ModalContainer>
  );
}

Import.propTypes = {
  setStep: func,
};

export default Import;
