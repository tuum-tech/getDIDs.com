import React, { useContext, useEffect } from 'react'
import { func } from 'prop-types'
import NextButton from 'common/NextButton'
import ModalContainer from 'common/ModalContainer'
import MnemonicContext from 'context/MnemonicContext'
import GetDids from "services/getdids.service"
import './index.scss';

function MnemonicItem({number, title}) {
  return (
    <div className="mnemonic">
      <span className="number">{number}</span>
      {title}
    </div>
  )
}

function Create({setStep}) {
  const {mnemonic, setMnemonic, setDid} = useContext(MnemonicContext)
  useEffect(() => {
    
    async function generateDid()
    {
      /*eslint-disable no-undef*/
      const mnemonicObject = await GetDids.GenerateMnemonics()
      setMnemonic(mnemonicObject.mnemonic.split(' '))
      setDid(mnemonicObject.did.replace('did:elastos:', ''))
      /*eslint-disable no-undef*/
    }

    generateDid();
    
  }, [])
  
  return (
    <ModalContainer>
      
      <div className="mnemonic-wrapper">
        {
          mnemonic.map((item, key) => <MnemonicItem key={`mnemonic-key-${key}`} number={key + 1} title={item} />)
        }
      </div>
      <span className="title">Your Mnemonic</span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
        <span className="description">These are your security words (like a password).</span>
        <div>
          <span className="description d-block">Lose these words and you will lose the identity.</span>
          <span className="description d-block">Keep them written down, in order, and safe. </span>
          <span className="description d-block">Write them down now, in order!</span>
        </div>
        <NextButton title="Continue" onClick={setStep} />
      </div>
    </ModalContainer>
  )
}

Create.propTypes = {
  setStep: func
}

export default Create