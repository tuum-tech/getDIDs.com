
import React, { Fragment, useContext } from "react";
import { func } from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy as farCopy } from "@fortawesome/free-regular-svg-icons";

import ModalContainer from "common/ModalContainer";
import NextButton from "common/NextButton";
import MnemonicContext from "context/MnemonicContext";
import { ToastContainer, toast, Slide } from "react-toastify";
import { ElastosClient } from "@tuum-tech/elastos-js-sdk"
import "react-toastify/dist/ReactToastify.css";

import {Cookies, useCookies} from "react-cookie";

var QRCode = require("qrcode.react");

function TwitterInfo() {
  const {twitter_name, twitter_user} = useContext(MnemonicContext) 
  const getRequestToken = async () =>{


    let url = "http://192.168.86.27:8081/v1/auth/twitter"
    let response = await fetch(url, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            "Authorization": "didcreds-validator-secret-key"
         }
    });

    if (response.ok) { // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json = await response.json();

      console.log("Request json", json.data)
      return json.data.request_token
    } 

    return ""
    
  }

  const openTwitter = async () => {
    let request = await getRequestToken()
    window.location.replace(`https://api.twitter.com/oauth/authorize?oauth_token=${request}`)
  }


  if (twitter_user){ 
    return <div> {twitter_user} - {twitter_name} </div>
  }
  return <button onClick={openTwitter}>Login on twitter</button>
}

function Import({ setStep }) {
  const publishDocument = async () =>{
    setStep()
  }  
  return (
    <ModalContainer>
      <span className="title">Import your data using </span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">

        <TwitterInfo />
      
        <NextButton title="Next Step" onClick={publishDocument} />
      </div>
    </ModalContainer>
  );
}

Import.propTypes = {
  setStep: func,
};

export default Import;
