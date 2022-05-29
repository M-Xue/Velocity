import React from 'react'
import Sidebar from './sidebar/Sidebar'
import './tasks.css'


// import styled from 'styled-components';




export default function Tasks() {

  // const Button = styled.button`
  //   background-colour: cyan;
  //   font-size: 14px;
  //   padding: 10px
  // `







  return (
    <div className='task-page-container'>
      <Sidebar/>
      {/* <div>gagg</div>
      <Button onClick={()=>alert('Working')}>Test</Button> */}


    </div>
  )
}
