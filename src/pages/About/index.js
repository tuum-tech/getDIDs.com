import React, { useState } from "react";
import MnemonicContext from "context/MnemonicContext";

function About() {

    return (
        <MnemonicContext.Provider
          value={{  }}
        >
          <div className="header">
            
          </div>
          <div className="d-flex w-100 main-container">
            <div className="homepage">
                <span>test</span>
            </div>
          </div>
          <div className="footer">
            
          </div>
        </MnemonicContext.Provider>
      );
}

export default About;
