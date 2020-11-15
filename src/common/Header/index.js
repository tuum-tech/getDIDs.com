import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

function HeaderItem({active, title}) {
  return <span className={`header-item ${active && 'active'}`}>
    <b>&#8226;</b>&nbsp;{title}
  </span>
}

function Header({order}) {
  return (
    <div className="d-flex header-container mt-4">
      <HeaderItem active={order>=0} title="Get Started" />
      <HeaderItem active={order>=1} title="Create" />
      <HeaderItem active={order>=5} title="Publish" />
      <HeaderItem active={order>=6} title="What Next?" />
    </div>
  )
}

Header.propTypes = {
  order: PropTypes.number
}

export default Header

