import React, {useEffect, useContext} from 'react'
import propTypes from 'prop-types'
import ModalContainer from 'common/ModalContainer'
import NextButton from 'common/NextButton'
import ninjiImage from 'assets/ninja.png'
import MnemonicContext from 'context/MnemonicContext'

function GetStarted({setStep}) {
  const {setMnemonic, setPrivatekey, setPublickey, setDid} = useContext(MnemonicContext)

  useEffect(() => {
    /*eslint-disable no-undef*/
    const mnemonicObject = createDid()
    setMnemonic(mnemonicObject.mnemonic.split(' '))
    setPrivatekey(mnemonicObject.privateKey)
    setPublickey(mnemonicObject.publicKey)
    setDid(mnemonicObject.did)
    /*eslint-disable no-undef*/
  }, [])

  return (
    <ModalContainer>
      <img src={ninjiImage} alt="ninja" className="d-flex align-self-center" />
      <span className="title">Your Digital Identity</span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
        <span className="description">Let’s set you up with a Digital Identity. We call this a Decentralized Identifier (DID).</span>
        <span className="description">It provides independent proof of ownership of your data so you can truly own it!</span>
        <NextButton title="Let's get started" onClick={setStep} />
      </div>
    </ModalContainer>
  )
}

GetStarted.propTypes = {
  setStep: propTypes.func
}

export default GetStarted
