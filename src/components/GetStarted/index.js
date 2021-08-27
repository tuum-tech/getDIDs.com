import React, { useContext } from "react";
import propTypes from "prop-types";
import ModalContainer from "common/ModalContainer";
import NextButton from "common/NextButton";
import getstart from "assets/getstart.svg";
import Select from "react-select";
import MnemonicContext from "context/MnemonicContext";
import "./index.scss";

const options = [
  { value: "mainnet", label: "Mainnet" },
  { value: "testnet", label: "Testnet" },
];

function GetStarted({ setStep }) {
  const { setNetwork } = useContext(MnemonicContext);

  const handleChange = (options) => {
    console.log("options: ", options.value);
    setNetwork(options.value);
  };

  return (
    <ModalContainer>
      <span className="title">Digital Identity</span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
        <div className="d-flex flex-column justify-content-between align-items-center getstarted-content">
          <span className="description">
            Choose the network you would like to publish your DID in
            <Select
              defaultValue={options[0]}
              onChange={handleChange}
              options={options}
            />
          </span>
          <span className="description">
            Our lives are linked to the apps, devices, and services we use every
            day. But with each new digital connection, we expose our identity
            and data to new risks beyond our control. Currently Migrating to new
            DID sidechain
          </span>
          <img
            src={getstart}
            alt="getstart"
            className="d-flex align-self-center mt-3"
          />

          <span className="description ">
            Let's set you up with a secure Digital Identity that we call a
            Decentralized Identifier, or DID. <br />A DID provides independent
            proof of ownership of all your data, allowing you - and only you -
            to truly own it.
          </span>
        </div>

        <NextButton title="Let's get started" onClick={setStep} />
      </div>
    </ModalContainer>
  );
}

GetStarted.propTypes = {
  setStep: propTypes.func,
};

export default GetStarted;
