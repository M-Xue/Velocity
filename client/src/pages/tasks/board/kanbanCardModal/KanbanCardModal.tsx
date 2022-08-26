import React from 'react'
import ProseMirrorForm from '../../proseMirrorForm/ProseMirrorForm'
import './kanbanCardModal.css'

export default function KanbanCardModal() {
  return (
    <div className="kanban-modal-container">
      <div className="kanban-modal">
        <button type='button'>X</button>
        {/* <ProseMirrorForm/> */}
      </div>
    </div>
  )
}