import React, { useContext } from "react";
import './index.scss'

function ConfirmationDetail({value, icon}) {
    if (!value || value === "" || value ==="@null" ) return null

    return <div className="confirmation-detail">
        <img src={icon} alt="icon detail" />
        <span>{value}</span>
    </div>
}

export default ConfirmationDetail