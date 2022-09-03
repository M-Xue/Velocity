import React from 'react'
import ProseMirrorEditor from './proseMirrorEditor/ProseMirrorEditor'
import './proseMirrorForm.css'

interface Props {
  currentState?: any
}

export default function ProseMirrorForm({currentState}: Props) {


  

  return (
    <form action="">
        <textarea name="title" className='issue-content-title' placeholder='Issue title' onChange={e=>currentState.current.title = e.target.value}></textarea>
        <ProseMirrorEditor currentState={currentState}/>
    </form>
  )
}

// onChange={e=>currentState.current.title = e.target.value}