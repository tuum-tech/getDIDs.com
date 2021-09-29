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
import "./index.scss";
import ConfirmData from "components/ConfirmData";
function renderComponent(step, setStep) {
  switch (step) {
    case 0:
      return <GetStarted setStep={() => setStep(1)} />;
    case 1:
      return (
        <Import setStep={() => setStep(2)} setMnemonic={() => setStep(3)} />
      );
    case 2:
      return (
        <ConfirmData setStep={() => setStep(3)} setBack={() => setStep(1)} />
      );
    case 3:
      return <Create setStep={() => setStep(4)} />;
    case 4:
      return (
        <VerifyMnemonics
          setStep={() => setStep(5)}
          setBack={() => setStep(3)}
        />
      );
    case 5:
      return <Publish setStep={() => setStep(6)} />;
    case 6:
      return <WhatNext setStep={setStep} />;
    default:
      return <GetStarted setStep={() => setStep(1)} />;
  }
}

function Homepage() {
  const [network, setNetwork] = useState("");
  const [publishStatus, setPublishStatus] = useState({
    confirmation_id: "",
    status: "Pending",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
  let startStep = 0;
  const [step, setStep] = useState(startStep);

  return (
    <MnemonicContext.Provider
      value={{
        network,
        setNetwork,
        mnemonic,
        setMnemonic: (generatedMnemonic) => setMnemonic(generatedMnemonic),
        did,
        setDid: (generatedDid) => setDid(generatedDid),
        name,
        email,
        setName,
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
