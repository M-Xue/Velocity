import React from 'react'
import ProseMirrorEditor from '../../issuePage/proseMirrorEditor/ProseMirrorEditor'
import './kanbanForm.css'

export default function KanbanForm() {
  return (
    <form action="">
        <textarea name="title" className='issue-content-title'></textarea>
        <ProseMirrorEditor/>
    </form>
  )
}
