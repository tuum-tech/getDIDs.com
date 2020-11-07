import React, { useContext, useEffect } from 'react'
import { func } from 'prop-types'
import NextButton from 'common/NextButton'
import ModalContainer from 'common/ModalContainer'
import MnemonicContext from 'context/MnemonicContext'
import { ElastosClient } from "@tuum-tech/elastos-js-sdk"
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
  const {mnemonic, setMnemonic, setPrivatekey, setPublickey, setDid} = useContext(MnemonicContext)
  useEffect(() => {

    async function generateDid()
    {
      /*eslint-disable no-undef*/
      const mnemonicObject = await ElastosClient.did.generateNew()
      setMnemonic(mnemonicObject.mnemonic.split(' '))
      setPrivatekey(mnemonicObject.privateKey)
      setPublickey(mnemonicObject.publicKey)
      setDid(mnemonicObject.did.replace('did:elastos:', ''))
      /*eslint-disable no-undef*/
    }

    generateDid();
    
  }, [])
  
  return (
    <ModalContainer>
      <span className="title">Your Mnemonic</span>
      <div className="mnemonic-wrapper">
        {
          mnemonic.map((item, key) => <MnemonicItem key={`mnemonic-key-${key}`} number={key + 1} title={item} />)
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