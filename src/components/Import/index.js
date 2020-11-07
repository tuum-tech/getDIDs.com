
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


function Import({ setStep }) {
  const {did, privateKey, publicKey, mnemonic} = useContext(MnemonicContext)  
  const twitter = ""
  const name = ""
  const avatar = ""
  const [cookies, setCookie] = useCookies();

  // const propTypes = {
  //   cookies: instanceOf(Cookies).isRequired
  // };

  // constructor(props) {
  //   super(props);

  //   const { cookies } = props;
  //   this.state = {
  //     name:  || 'Ben'
  //   };
  // }

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
    let top = (window.innerHeight - 400) / 2 + window.screenY;
    let left = (window.innerWidth - 400) / 2 + window.screenX;

    let request = await getRequestToken()

    let win = window.open(
      `https://api.twitter.com/oauth/authorize?oauth_token=${request}`,
      "Twitter login",
      `dialog=yes,top=${top}px,left=${left},width=${400}px,height=${500}px`
    );

    var timer = setInterval(function() {   
      if(win.closed) {  
          clearInterval(timer);  
          console.log("windows closed")
          let response = localStorage.getItem("twitter")
          console.log(response)

          
      }  
    }, 500); 
  }

  const publishDocument = async () =>{

    
    
    // let didelement = await ElastosClient.did.loadFromMnemonic(mnemonic.join(' '))
    // let diddocument = ElastosClient.didDocuments.newDIDDocument(didelement)
    // let signedDocument = ElastosClient.didDocuments.sealDocument(didelement, diddocument)


    // let tx = ElastosClient.didDocuments.generatePublishTx(signedDocument, didelement)

    // let url = "http://192.168.86.27:8000/v1/didtx/create"
    // let data = {
    //   "didRequest" : tx,
    //   "requestFrom": "GetDIDs.com",
    //   "did": `did:elastos:${did}`,
    //   "memo": ""
    // }

  

    // let response = await fetch(url, {
    //      method: 'POST',
    //      headers: {
    //         'Content-Type': 'application/json',
    //         "Authorization": "assist-restapi-secret-key"
    //      },
    //      body: JSON.stringify(data)
    // });

    setStep()
  }

  const authResponse = (err, data) =>{
    console.log(err, data);
  }

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
      <span className="title">Import your data using </span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
      <button onClick={openTwitter}>
        Login on twitter
      </button>
        <NextButton title="Next Step" onClick={publishDocument} />
      </div>
    </ModalContainer>
  );
}

Import.propTypes = {
  setStep: func,
};

export default Import;
