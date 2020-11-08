import React, { useState } from "react";
import GetStarted from "components/GetStarted";
import Create from "components/Create";
import Import from "components/Import";
import Publish from "components/Publish";
import WhatNext from "components/WhatNext";
import Header from "common/Header";
import Footer from "common/Footer";
import MnemonicContext from "context/MnemonicContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useLocation} from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./index.scss";

function renderComponent(step, setStep) {
  switch (step) {
    case 0:
      return <GetStarted setStep={() => setStep(1)} />;
    case 1:
      return <Import setStep={() => setStep(2)} />;
    case 2:
      return <Create setStep={() => setStep(3)} />;
    case 3:
      return <Publish setStep={() => setStep(4)} />;
    case 4:
      return <WhatNext setStep={setStep} />;
    default:
      return <Create setStep={() => setStep(1)} />;
  }
}

  function Homepage() {
  const history = useHistory();
  const search = useLocation().search;
  const oauth_token = new URLSearchParams(search).get('oauth_token');
  const oauth_verifier = new URLSearchParams(search).get('oauth_verifier');
  const [twitter_user, setTwitterUser] = useState(null);
  const [twitter_name, setTwitterName] = useState(null);
  
  const [mnemonic, setMnemonic] = useState([
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
    "-",
  ]);
  const [privateKey, setPrivatekey] = useState(null);
  const [publicKey, setPublickey] = useState(null);
  const [did, setDid] = useState(null);

  let startStep = 0

  if (oauth_token)
  {
    //startStep  =1
    let responseFetch = fetch("http://192.168.86.27:8081/v1/auth/twitter_callback", {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         "Authorization": "didcreds-validator-secret-key"
      },
      body: JSON.stringify({
        token: oauth_token,
        verifier: oauth_verifier
      })
    }).then(s=>{
      return s.json()
    })
    .then(json => {
        let response = atob(json.data.response).split(";")
        setTwitterName(response[0])
        setTwitterUser(response[1])
        history.push("/?logged");
    });
  } else {
    
  }

  const [step, setStep] = useState(startStep);

  return (
    <MnemonicContext.Provider
      value={{
        mnemonic,
        setMnemonic: (generatedMnemonic) => setMnemonic(generatedMnemonic),
        privateKey,
        setPrivatekey: (generatedPrivatekey) =>
          setPrivatekey(generatedPrivatekey),
        publicKey,
        setPublickey: (generatedPublickey) => setPublickey(generatedPublickey),
        did,
        setDid: (generatedDid) => setDid(generatedDid),
        twitter_name,
        twitter_user,
      }}
    >
      <ToastContainer />
      <div className="header">
        <Header order={step} />
      </div>
      <div className="d-flex w-100 main-container">
        <div className="homepage">{renderComponent(step, setStep)}</div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </MnemonicContext.Provider>
  );
}

export default Homepage;
