import React from 'react'
import { useState } from 'react'


function HideButton({ showAbout, setShowAbout }) {
   

  return (
    <div>
      {/* TOGGLE BUTTON */}
                    <div className="col-12">
                        <button
                        className="btn btn-warning rounded-pill"
                        onClick={() => setShowAbout(!showAbout)}
                        >
                        {showAbout ? "Hide Info" : "Show Info"}
                        </button>
                    </div>          
   </div>
  )
}

export default HideButton
