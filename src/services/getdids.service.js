import { ElastosClient } from "@tuum-tech/elastos-js-sdk"
import Elastos from "./elastos.service"

const GetDids = {
  GenerateMnemonics: async () =>{
    return await ElastosClient.did.generateNew()
  },
  GetRequestToken: async () =>{
    let url = `${process.env.REACT_APP_DIDCRED_URL}/v1/auth/twitter_request`
    let response = await fetch(url, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            "Authorization": process.env.REACT_APP_DIDCRED_KEY
         }
    });

    if (response.ok) { // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json = await response.json();
      return json.data.request_token
    } 

    return ""
    
  },
  CallbackTwitter: async (oauth_token, oauth_verifier) =>{
    
    let response = await fetch(`${process.env.REACT_APP_DIDCRED_URL}/v1/auth/twitter_callback`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         "Authorization": process.env.REACT_APP_DIDCRED_KEY
      },
      body: JSON.stringify({
        token: oauth_token,
        verifier: oauth_verifier
      })
    });

    if (response.ok){
      return await response.json()
    }

    return null;
  },
  PublishDocument: async (mnemonic, profile) => {
    let didelement = await ElastosClient.did.loadFromMnemonic(mnemonic.join(' '))
    let isValid = false;


    //Temporary bypass signature error
    let signedDocument = null;
    let tx = null
    while(!isValid){
        signedDocument = await Elastos.generateDocument(didelement, profile);
        isValid = ElastosClient.didDocuments.isValid(signedDocument, didelement)
    }

    //Temporary bypass signature error
    isValid = false;
    while(!isValid){
      tx = ElastosClient.idChainRequest.generateCreateRequest(signedDocument, didelement)
      isValid = ElastosClient.idChainRequest.isValid(tx, didelement)
    }
    

    let url = `${process.env.REACT_APP_ASSIST_URL}/v1/didtx/create`
    let data = {
      "didRequest" : tx,
      "requestFrom": "GetDIDs.com",
      "did": `did:elastos:${didelement.did}`,
      "memo": ""
    }

    let response = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            "Authorization": process.env.REACT_APP_ASSIST_KEY
         },
         body: JSON.stringify(data)
    });

    let json = await response.json()
    return {
      confirmation_id: json.data.confirmation_id,
      status: "Pending"
    }

    
  },
  getTxStatus: async (confirmation_id) =>{
    let url = `${process.env.REACT_APP_ASSIST_URL}/v1/didtx/confirmation_id/${confirmation_id}`

    let response = await fetch(url, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            "Authorization": process.env.REACT_APP_ASSIST_KEY
         }
    });

    let json = await response.json()
    return {
      confirmation_id: confirmation_id,
      status: json.data.status
    }
  }


  
};

export default GetDids;

