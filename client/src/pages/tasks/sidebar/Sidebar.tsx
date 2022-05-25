import React from 'react'
import './sidebar.css'



export default function Sidebar() {
  return (
    <div className='sidebar-container'>

      <div className="sidebar-content"></div>


      <div className="sidebar-resize-container">
        <div className="sidebar-border"></div>
        <button className='sidebar-resize-button'>
          <span></span>
        </button>
      </div>

      {/* <button className='collapse-button'>
        <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M10.294 9.698a.988.988 0 010-1.407 1.01 1.01 0 011.419 0l2.965 2.94a1.09 1.09 0 010 1.548l-2.955 2.93a1.01 1.01 0 01-1.42 0 .988.988 0 010-1.407l2.318-2.297-2.327-2.307z" fill="currentColor" fill-rule="evenodd"></path></svg>
      </button> */}

    </div>
  )
}
