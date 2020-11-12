import React from 'react'
import arrowRight from 'assets/arrow-right-small.svg'
import { Link } from "react-router-dom";
import './index.scss'
function Footer(props) {
  return (
    <div className="d-flex justify-content-center link-text">
      <Link to="/about">Learn more about DID
          <img src={arrowRight} alt="arrow-right" className="align-self-center ml-1" />
      </Link>
      
    </div>
  )
}

Footer.propTypes = {

}

export default Footer

