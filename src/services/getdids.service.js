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
    let diddocument = ElastosClient.didDocuments.newDIDDocument(didelement)

    if (profile.name && profile.name !== "")
    {
      let vcName = ElastosClient.didDocuments.createVerifiableCredential(didelement, didelement.did, "Name", ["ProfileCredential"], profile.name)
      ElastosClient.didDocuments.addVerfiableCredentialToDIDDocument(didelement, diddocument, vcName)
    }

    if (profile.email && profile.email !== "")
    {
      let vcEmail = ElastosClient.didDocuments.createVerifiableCredential(didelement, didelement.did, "Email", ["EmailCredential"], profile.email)
      ElastosClient.didDocuments.addVerfiableCredentialToDIDDocument(didelement, diddocument, vcEmail)
    }

    if (profile.birthDate && profile.birthDate !== "")
    {
      let vcBirthDate = ElastosClient.didDocuments.createVerifiableCredential(didelement, didelement.did, "BirthDate", ["ProfileCredential"], profile.birthDate)
      ElastosClient.didDocuments.addVerfiableCredentialToDIDDocument(didelement, diddocument, vcBirthDate)
    }

    if (profile.twitter)
    {
      let url = `${process.env.REACT_APP_DIDCRED_URL}/v1/validation/twitter_handle`
      let response = await fetch(url, {
           method: 'POST',
           headers: {
              'Content-Type': 'application/json',
              "Authorization": process.env.REACT_APP_DIDCRED_KEY
           },
           body: JSON.stringify({
             did: didelement.did,
             value: profile.twitter
           })
      });
  
      if (response.ok) {
        let json = await response.json();
        let vc = json.data.verifiable_credential
        ElastosClient.didDocuments.addVerfiableCredentialToDIDDocument(didelement, diddocument, vc)
      } 
    }
    let signedDocument = ElastosClient.didDocuments.sealDocument(didelement, diddocument)
    let tx = ElastosClient.idChainRequest.generateCreateRequest(signedDocument, didelement)
    

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
    return json.data.confirmation_id

    
  }
};

export default GetDids;

