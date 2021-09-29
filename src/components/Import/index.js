import React, { useContext } from "react";
import { func } from "prop-types";
import ModalContainer from "common/ModalContainer";
import NextButton from "common/NextButton";
import MnemonicContext from "context/MnemonicContext";
import usericon from "assets/users.svg";
import emailicon from "assets/email.svg";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

function ItemData({ icon, placeholder, type, value, onChanged }) {
  return (
    <div className="item-data">
      <img src={icon} alt={placeholder} />
      <input
        type={type}
        value={value}
        onChange={onChanged}
        placeholder={placeholder}
      />
    </div>
  );
}

function Import({ setStep, setMnemonic }) {
  const { name, email, setName, setEmail } = useContext(MnemonicContext);
  const updateName = (event) => {
    setName(event.target.value);
  };

  const updateEmail = (event) => {
    setEmail(event.target.value);
  };

  const NextStep = async () => {
    if ((!name || name === "") && (!email || email === "")) {
      setMnemonic();
    } else {
      setStep();
    }
  };

  return (
    <ModalContainer>
      <span className="title">Add details</span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100 import-content">
        <div className="d-flex flex-column align-items-center h-100 ">
          <span className="description mb-5">
            Add your details to begin building your digital identity.
          </span>

          <ItemData
            icon={usericon}
            type="text"
            value={name}
            onChanged={updateName}
            placeholder="Enter Name (optional)"
          />
          <ItemData
            icon={emailicon}
            type="email"
            value={email}
            onChanged={updateEmail}
            placeholder="Enter Email (optional)"
          />
        </div>
        <NextButton title="Done adding details" onClick={NextStep} />
      </div>
    </ModalContainer>
  );
}

Import.propTypes = {
  setStep: func,
};

export default Import;
