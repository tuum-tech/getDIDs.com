'use strict';
import { ElastosClient } from "@tuum-tech/elastos-js-sdk"

const GetDids = {
  GenerateMnemonics: async () =>{
    return await ElastosClient.did.generateNew()
  },
  GetRequestToken: async () =>{
    let url = `${process.env.REACT_APP_DIDCRED_URL}/v1/auth/twitter`
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
  PublishDocument: async (mnemonic, twitter) => {
    let didelement = await ElastosClient.did.loadFromMnemonic(mnemonic.join(' '))
    let diddocument = ElastosClient.didDocuments.newDIDDocument(didelement)

    if (twitter.name)
    {
      let vcName = ElastosClient.didDocuments.createVerifiableCredential(didelement, didelement.did, "Name", ["ProfileCredential"], twitter.name)
      ElastosClient.didDocuments.addVerfiableCredentialToDIDDocument(didelement, diddocument, vcName)
    }

    if (twitter.user)
    {
      console.log("using twitter user", twitter.user)
      let url = `${process.env.REACT_APP_DIDCRED_URL}/v1/validation/twitter_handle`
      let response = await fetch(url, {
           method: 'POST',
           headers: {
              'Content-Type': 'application/json',
              "Authorization": process.env.REACT_APP_DIDCRED_KEY
           },
           body: JSON.stringify({
             did: didelement.did,
             value: twitter.user
           })
      });
  
      if (response.ok) {
        let json = await response.json();
        let vc = json.data.verifiable_credential
        ElastosClient.didDocuments.addVerfiableCredentialToDIDDocument(didelement, diddocument, vc)
      } 
    }
    let signedDocument = ElastosClient.didDocuments.sealDocument(didelement, diddocument)
    console.log("is document valid", ElastosClient.didDocuments.isValid(diddocument, didelement))

    let tx = ElastosClient.idChainRequest.generateCreateRequest(signedDocument, didelement)
    console.log("is tx valid", ElastosClient.idChainRequest.isValid(tx, didelement))

    let url = `${process.env.REACT_APP_ASSIST_URL}/v1/didtx/create`
    let data = {
      "didRequest" : tx,
      "requestFrom": "GetDIDs.com",
      "did": `did:elastos:${didelement.did}`,
      "memo": ""
    }

    await fetch(url, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            "Authorization": process.env.REACT_APP_ASSIST_KEY
         },
         body: JSON.stringify(data)
    });

    
  }
};

export default GetDids;

