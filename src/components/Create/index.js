import React from 'react'
import { func } from 'prop-types'
import NextButton from 'common/NextButton'
import ModalContainer from 'common/ModalContainer'

import './index.scss';

function MnemonicItem({number, title, key}) {
  return (
    <div className="mnemonic" key={key}>
      <span className="number">{number}</span>
      {title}
    </div>
  )
}

const mnemonicArray = ['measures', 'bread', 'rectangle', 'mountain', 'healing', 'tree', 'academy', 'purple', 'sunshine', 'twister', 'dog', 'fabrications'];

function Create({setStep}) {
  return (
    <ModalContainer>
      <span className="title">Your Mnemonic</span>
      <div className="mnemonic-wrapper">
        {
          mnemonicArray.map((item, key) => <MnemonicItem key={`mnemonic-key-${key}`} number={key + 1} title={item} />)
        }
      </div>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
        <span className="description">This is your mnemonic security phrase.</span>
        <div>
          <span className="description d-block">Lose these words and you will lose the identity.</span>
          <span className="description d-block">Keep them written down, in order, and safe. </span>
          <span className="description d-block">Write them down now, in order!</span>
        </div>
        <NextButton title="Create" onClick={setStep} />
      </div>
    </ModalContainer>
  )
}

Create.propTypes = {
  setStep: func
}

export default Create