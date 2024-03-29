import React, { useContext, useEffect } from "react";
import { func } from "prop-types";
import NextButton from "common/NextButton";
import ModalContainer from "common/ModalContainer";
import MnemonicContext from "context/MnemonicContext";
import "./index.scss";
import Elastos from "services/elastos.service";

function MnemonicItem({ number, title }) {
  return (
    <div className="mnemonic">
      <span className="number">{number}</span>
      {title}
    </div>
  );
}

function Create({ setStep }) {
  const { network, mnemonic, setMnemonic, setDid } =
    useContext(MnemonicContext);

  useEffect(() => {
    async function generateDid() {
      /*eslint-disable no-undef*/
      let mnemonics = await Elastos.GenerateMnemonics();
      let mnemonicsArr = mnemonics.split(" ");
      const hasDuplicates = (arr) => {
        return new Set(arr).size !== arr.length;
      };
      while (hasDuplicates(mnemonicsArr)) {
        mnemonics = await Elastos.GenerateMnemonics();
        mnemonicsArr = mnemonics.split(" ");
      }
      setMnemonic(mnemonicsArr);
      let diddocument = await Elastos.GetDIDDocument(network, mnemonics);
      setDid(diddocument.getDefaultPublicKeyId().getDid().toString());
      /*eslint-disable no-undef*/
    }

    if (!mnemonic || mnemonic[0] === "-") generateDid();
  });

  return (
    <ModalContainer>
      <span className="title">Your security words</span>
      <div className="mnemonic-wrapper">
        {mnemonic.map((item, key) => (
          <MnemonicItem
            key={`mnemonic-key-${key}`}
            number={key + 1}
            title={item}
          />
        ))}
      </div>

      <div className="d-flex flex-column justify-content-between align-items-center h-100">
        <span className="description">
          These 12 words are what give you, and you alone, access to your DID.
          They act as your private mnemonics.
        </span>
        <div className="mnemonic-security-info">
          <span className="description d-block">
            Never share these mnemonics or store them digitally.
          </span>
          <span className="description d-block">
            Instead, write them down and keep them safe.{" "}
          </span>
          <span className="description d-block">
            If you lose these mnemonics, you lose access to your DID.
          </span>
        </div>

        <NextButton title="Next" onClick={setStep} />
      </div>
    </ModalContainer>
  );
}

Create.propTypes = {
  setStep: func,
};

export default Create;
