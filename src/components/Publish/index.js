import React, {Fragment} from 'react'
import { func } from 'prop-types'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy as farCopy } from '@fortawesome/free-regular-svg-icons'

import ModalContainer from 'common/ModalContainer'
import NextButton from 'common/NextButton'

var QRCode = require('qrcode.react');

function Publish({setStep}) {
  return (
    <ModalContainer>
      <span className="title">You own an Identity!</span>
      <div className="d-flex flex-column justify-content-between align-items-center h-100">
        <span className="description pl-3 pr-3">That long number is your Identity address and the QR code belongs to that address. Congrats, it’s as simple as that!</span>
        <QRCode value="did:elastos:iouMSXKHNcwdbPzb58pXpmGBxrMzfq2c" imageSettings={{width: '128px', height: '128px'}} />
        <div className="text-center">
          <span className="description d-block mb-2">did:elastos:iouMSXKHNcwdbPzb58pXpmGBxrMzfq2c</span>
          <CopyToClipboard text="did:elastos:iouMSXKHNcwdbPzb58pXpmGBxrMzfq2c">
            <Fragment>
              <FontAwesomeIcon icon={farCopy} /><span className="cursor-pointer ml-2 font-weight-bold">Copy</span>
            </Fragment>
          </CopyToClipboard>
        </div>
        <NextButton title="Let's Publish" onClick={setStep} />
      </div>
    </ModalContainer>
  )
}

Publish.propTypes = {
  setStep: func
}

export default Publish