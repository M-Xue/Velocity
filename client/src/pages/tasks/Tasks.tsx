import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Board from './board/Board'
import './tasks.css'
import './issuePage/IssuePage'
import IssuePage from './issuePage/IssuePage'


// import styled from 'styled-components';




export default function Tasks() {

  // const Button = styled.button`
  //   background-colour: cyan;
  //   font-size: 14px;
  //   padding: 10px
  // `




  return (
    <div className='task-page-container'>
      <Sidebar />
      {/* <Board /> */}
      <IssuePage/>
    </div>
  )
}
