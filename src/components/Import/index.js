
import React, { useContext } from "react";
import { func } from "prop-types";
import ModalContainer from "common/ModalContainer";
import NextButton from "common/NextButton";
import MnemonicContext from "context/MnemonicContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter as farTwitter } from "@fortawesome/free-brands-svg-icons";
import GetDids from "services/getdids.service"
import "react-toastify/dist/ReactToastify.css";
import './index.scss';


function TwitterInfo() {
  const {twitter_name, twitter_user, isLogged} = useContext(MnemonicContext) 
  

  const openTwitter = async () => {
    let request = await GetDids.GetRequestToken();
    window.location.replace(`https://api.twitter.com/oauth/authorize?oauth_token=${request}`)
  }


  if (isLogged ){ 
    if (twitter_user){
      return <div> 
      <span> <b>Name</b> {twitter_name}</span> <br />
      <span> <b>Twitter</b> @{twitter_user}</span> 
      </div>  
    }
    return <div>Loading details</div>
    
  }
  return <div className="round-button d-flex flex-column align-items-center mt-5" onClick={openTwitter}>
      <span className="button-name mt-2">
        <FontAwesomeIcon icon={farTwitter} />&nbsp; 
         Login on twitter
         </span>
    </div>
  
}

function Import({ setStep }) {
  const NextStep = async () =>{
    setStep()
  }  
  return (
    <ModalContainer>
      <span className="title mt-4">Import your data using </span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">

        <TwitterInfo />
      
        <NextButton title="Next Step" onClick={NextStep} />
      </div>
    </ModalContainer>
  );
}

Import.propTypes = {
  setStep: func,
};

export default Import;
