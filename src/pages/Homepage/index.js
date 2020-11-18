import React, { useState } from "react";
import GetStarted from "components/GetStarted";
import Create from "components/Create";
import VerifyMnemonics from "components/VerifyMnemonics";
import Import from "components/Import";
import Publish from "components/Publish";
import WhatNext from "components/WhatNext";
import Header from "common/Header";
import Footer from "common/Footer";
import MnemonicContext from "context/MnemonicContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useLocation} from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./index.scss";
import ConfirmData from "components/ConfirmData";
import getDids from "services/getdids.service";
function renderComponent(step, setStep) {
  switch (step) {
    case 0:
      return <GetStarted setStep={() => setStep(1)} />;
    case 1:
      return <Import setStep={() => setStep(2)} setMnemonic={() => setStep(3)} />;
    case 2:
        return <ConfirmData setStep={() => setStep(3)} setBack={() => setStep(1)} />;
    case 3:
      return <Create setStep={() => setStep(4)} />;
    case 4:
      return <VerifyMnemonics setStep={() => setStep(5)} />;
    case 5:
      return <Publish setStep={() => setStep(6)} />;
    case 6:
      return <WhatNext setStep={setStep} />;
    default:
      return <GetStarted setStep={() => setStep(1)} />;
  }
}

  function Homepage() {
  const history = useHistory();
  const search = useLocation().search;
  const oauth_token = new URLSearchParams(search).get('oauth_token');
  const oauth_verifier = new URLSearchParams(search).get('oauth_verifier');
  const [twitter_user, setTwitterUser] = useState("");
  const [twitter_name, setTwitterName] = useState("");
  const [publishStatus, setPublishStatus] = useState({confirmation_id:"", status: "Pending"});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState(null);

  const [isLogged, setIsLogged] = useState(false);
  
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
  const [did, setDid] = useState(null);

  let startStep = 0
  if (oauth_token && !isLogged)
  {
    startStep = 1
    setIsLogged(true)
    
    getDids.CallbackTwitter(oauth_token, oauth_verifier).then(json =>{
      if (!json || json === null)
      {
        setIsLogged(false)
        setTwitterName(null)
        setTwitterUser(null)
        if (name) setName(null)
  
      } else {
        let response = atob(json.data.response).split(";")
        setTwitterName(response[0])
    
        if (!name || name ==="") setName(response[0])
    
        setTwitterUser(response[1])
      }
      setStep(1)
      history.push("/");
    });

    
  } 

  const [step, setStep] = useState(startStep);

  return (
    <MnemonicContext.Provider
      value={{
        mnemonic,
        setMnemonic: (generatedMnemonic) => setMnemonic(generatedMnemonic),
        did,
        setDid: (generatedDid) => setDid(generatedDid),
        isLogged,
        twitter_name,
        twitter_user,
        name,
        email,
        birthDate,
        setName,
        setBirthDate,
        setEmail,
        setPublishStatus,
        publishStatus,
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
