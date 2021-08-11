import React, { useContext, useState } from "react";
import propTypes from "prop-types";
import ModalContainer from "common/ModalContainer";
import NextButton from "common/NextButton";
import MnemonicContext from "context/MnemonicContext";
import backicon from "assets/back-arrow.svg";
import "./index.scss";

function MnemonicWord({ title, click, hide }) {
  if (hide) {
    return <div className="hide"></div>;
  } else {
    return (
      <div className="mnemonic" onClick={click}>
        {title}
      </div>
    );
  }
}

function shuffle(array) {
  /* var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  } */

  return array;
}

function VerifyMnemonics({ setStep, setBack }) {
  const { mnemonic } = useContext(MnemonicContext);
  const [shuffleMnenonics, setShuffleMnenonics] = useState([]);
  const [words, setWords] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [nextIndex, setNextIndex] = useState(0);
  const item = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const selectWord = (index) => {
    if (nextIndex > 12) return;
    words[nextIndex] = shuffleMnenonics[index];
    setWords(words);
    setNextIndex(nextIndex + 1);
  };

  const isValid = () => {
    return mnemonic.every((value, index) => value === words[index]);
  };

  const undo = () => {
    words[nextIndex - 1] = "";
    setWords(words);
    setNextIndex(nextIndex - 1);
  };

  const containsWord = (word) => {
    let contains = false;
    words.forEach((value, index) => {
      if (value === word) contains = true;
    });
    return contains;
  };

  const test = () => {
    if (nextIndex < 12) {
      return (
        <div className="test">
          <span>Select your security words in the correct order:</span>
          <div className="words-wrapper">
            {shuffleMnenonics.map((item, key) => (
              <MnemonicWord
                hide={containsWord(item)}
                key={`mnemonic-word-${key}`}
                title={item}
                click={() => {
                  selectWord(key);
                }}
              />
            ))}
          </div>
        </div>
      );
    }

    if (isValid()) {
      return (
        <div className="security-valid d-flex flex-column justify-content-between align-items-center">
          <span className="description ">
            Correct!
            <br />
            Security words are correct and in order.
          </span>
        </div>
      );
    }

    return (
      <div className="security-invalid d-flex flex-column justify-content-between align-items-center">
        <span className="description">
          Incorrect!
          <br />
          Security words have been input incorrectly. <br />
          Please try again.
        </span>
      </div>
    );
  };

  const showButton = () => {
    if (nextIndex < 12 || isValid())
      return (
        <div className="buttons-collection">
          <NextButton
            title="Undo"
            onClick={undo}
            enabled={nextIndex > 0 && !isValid()}
          />
          <NextButton title="Continue" onClick={setStep} enabled={isValid()} />
        </div>
      );

    return <NextButton title="Start over" onClick={reset} />;
  };

  const reset = () => {
    setWords(["", "", "", "", "", "", "", "", "", "", "", ""]);
    setNextIndex(0);
  };

  if (shuffleMnenonics.length <= 0) setShuffleMnenonics(shuffle([...mnemonic]));

  return (
    <ModalContainer>
      <div className="title-items">
        <img
          src={backicon}
          alt="go back"
          className="back-icon"
          onClick={setBack}
        />

        <span className="title">Security check</span>
      </div>

      <div className="d-flex flex-column justify-content-between align-items-center h-100">
        <div className="mnemonic-test-wrapper">
          {item.map((number, key) => (
            <div
              key={`mnemonic-item-${key}`}
              className={`${
                words[number - 1] === "" ? "mnemonic" : "mnemonic-active"
              }`}
            >
              <span className="number">{item[number - 1]}</span>
              {words[number - 1]}
            </div>
          ))}
        </div>
        <div className="d-flex flex-column justify-content-between align-items-center h-100 mnemonic-words-wrapper">
          {test()}
          {showButton()}
        </div>
      </div>
    </ModalContainer>
  );
}

VerifyMnemonics.propTypes = {
  setStep: propTypes.func,
};

export default VerifyMnemonics;
