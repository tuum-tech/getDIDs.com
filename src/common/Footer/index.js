import React from 'react'
import arrowRight from 'assets/arrow-right-small.svg'
import './index.scss'
function Footer(props) {
  return (
    <div className="d-flex justify-content-center link-text">
        <a href="https://elastos.academy/get-dids/" target="_blank" rel="noopener noreferrer">
          Learn more about DID at Elastos Academy
          <img src={arrowRight} alt="arrow-right" className="align-self-center ml-1" />
          </a>
    </div>
  )
}

Footer.propTypes = {

}

export default Footer

