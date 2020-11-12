import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

function HeaderItem({active, title}) {
  return <span className={`header-item ${active && 'active'}`}>
    {title}
  </span>
}

function Header({order}) {
  return (
    <div className="d-flex header-container mt-4">
      <HeaderItem active={order>=0} title="Get Started" />
      <HeaderItem active={order>=1} title="Import" />
      <HeaderItem active={order>=2} title="Create" />
      <HeaderItem active={order>=4} title="Publish" />
      <HeaderItem active={order>=5} title="What Next?" />
    </div>
  )
}

Header.propTypes = {
  order: PropTypes.number
}

export default Header

