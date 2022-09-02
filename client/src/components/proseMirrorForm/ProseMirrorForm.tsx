import React from 'react'
import ProseMirrorEditor from './proseMirrorEditor/ProseMirrorEditor'
import './proseMirrorForm.css'

export default function ProseMirrorForm() {
    return (
      <form action="">
          <textarea name="title" className='issue-content-title' placeholder='Issue title'></textarea>
          <ProseMirrorEditor/>
      </form>
    )
}