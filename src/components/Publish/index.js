
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

var QRCode = require("qrcode.react");


function Publish({ setStep }) {
  const {did, twitter_name, twitter_user, mnemonic} = useContext(MnemonicContext)  
  const publishDocument = async () =>{
    let didelement = await ElastosClient.did.loadFromMnemonic(mnemonic.join(' '))
    let diddocument = ElastosClient.didDocuments.newDIDDocument(didelement)

    if (twitter_name)
    {
      console.log("using twitter name", twitter_name)

      let vcName = ElastosClient.didDocuments.createVerifiableCredential(didelement, didelement.did, "Name", ["ProfileCredential"], twitter_name)
      ElastosClient.didDocuments.addVerfiableCredentialToDIDDocument(didelement, diddocument, vcName)

      
    }

    if (twitter_user)
    {
      console.log("using twitter user", twitter_user)
      let url = "http://192.168.86.27:8081/v1/validation/twitter_handle"
      let response = await fetch(url, {
           method: 'POST',
           headers: {
              'Content-Type': 'application/json',
              "Authorization": "didcreds-validator-secret-key"
           },
           body: JSON.stringify({
             did: didelement.did,
             value: twitter_user
           })
      });
  
      if (response.ok) {
        let json = await response.json();
        console.log("Request json", json.data)

        let vc = json.data.verifiable_credential
        
        ElastosClient.didDocuments.addVerfiableCredentialToDIDDocument(didelement, diddocument, vc)
      } 
    }

    console.log(JSON.stringify(diddocument, null, ""))

    let signedDocument = ElastosClient.didDocuments.sealDocument(didelement, diddocument)

    console.log("is document valid", ElastosClient.didDocuments.isValid(diddocument, didelement))

    let tx = ElastosClient.idChainRequest.generateCreateRequest(signedDocument, didelement)

    console.log("is tx valid", ElastosClient.idChainRequest.isValid(tx, didelement))

    let url = "http://192.168.86.27:8000/v1/didtx/create"
    let data = {
      "didRequest" : tx,
      "requestFrom": "GetDIDs.com",
      "did": `did:elastos:${did}`,
      "memo": ""
    }

    console.log("Publish request", data)


    let response = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            "Authorization": "assist-restapi-secret-key"
         },
         body: JSON.stringify(data)
    });

    setStep()
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
            text={`did:elastos:${did}`}
            onCopy={notify}
          >
            <span className="cursor-pointer ml-2 font-weight-bold">
              <FontAwesomeIcon icon={farCopy} /> Copy
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
