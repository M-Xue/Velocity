import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Board from './board/Board'
import './tasks.css'
import './issuePage/IssuePage'
import IssuePage from './issuePage/IssuePage'


// import styled from 'styled-components';




export default function Tasks() {

  return (
    <div className='task-page-container'>
      <Sidebar />
      <Board />
      {/* <IssuePage/> */}
    </div>
  )
}
