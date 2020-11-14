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
      <span className="title">Your security words</span>
      <div className="mnemonic-wrapper">
        {
          mnemonic.map((item, key) => <MnemonicItem key={`mnemonic-key-${key}`} number={key + 1} title={item} />)
        }
      </div>
      
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
        <span className="description">These 12 words are what give you, and you alone, access to your DID.  They act as your secure password.</span>
        <div className="mnemonic-security-info">
          
          <span className="description d-block">Never share this password or store it digitally.</span>
          <span className="description d-block">Instead, write it down and keep it safe. </span>
          <span className="description d-block">If you lose this password, you lose access to your DID.</span>
        </div>
        <NextButton title="Next" onClick={setStep} />
      </div>
    </ModalContainer>
  )
}

Create.propTypes = {
  setStep: func
}

export default Create