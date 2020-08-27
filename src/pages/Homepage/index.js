import React, { useState } from 'react'
import GetStarted from 'components/GetStarted'
import Create from 'components/Create'
import Publish from 'components/Publish'
import WhatNext from 'components/WhatNext'
import Header from 'common/Header'
import Footer from 'common/Footer'
import MnemonicContext from 'context/MnemonicContext'
import './index.scss'

function renderComponent(step, setStep) {
  switch(step) {
    case 0:
      return <GetStarted setStep={() => setStep(1)} />
    case 1:
      return <Create setStep={() => setStep(2)} />
    case 2:
      return <Publish setStep={() => setStep(3)} />
    case 3:
      return <WhatNext setStep={setStep} />
    default:
      return <Create setStep={() => setStep(1)} />
  }
}

function Homepage() {

  const [step, setStep] = useState(0)
  const [mnemonic, setMnemonic] = useState(["-","-","-","-","-","-","-","-","-","-","-","-"])
  const [privateKey, setPrivatekey] = useState(null)
  const [publicKey, setPublickey] = useState(null)
  const [did, setDid] = useState(null)
  return (
    <MnemonicContext.Provider value={{
      mnemonic,
      setMnemonic: (generatedMnemonic) => setMnemonic(generatedMnemonic),
      privateKey,
      setPrivatekey: (generatedPrivatekey) => setPrivatekey(generatedPrivatekey),
      publicKey,
      setPublickey: (generatedPublickey) => setPublickey(generatedPublickey),
      did,
      setDid: (generatedDid) => setDid(generatedDid)
    }}>
      <div className="header">
        <Header order={step} />
      </div>
      <div className="d-flex w-100 main-container">
        <div className="homepage">
          {renderComponent(step, setStep)}
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </MnemonicContext.Provider>
  )
}

export default Homepage

