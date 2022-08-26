import React from 'react'
import ProseMirrorForm from '../../proseMirrorForm/ProseMirrorForm'
import './kanbanCardModal.css'

interface Props {
  isModalActive: boolean,
  handleCloseModal: any
}


export default function KanbanCardModalForm({isModalActive, handleCloseModal}: Props) {
  return (
    <div className="kanban-modal-container">
      <div className="kanban-modal">
        <button 
          type='button'
          onClick={handleCloseModal}
        >X</button>
        {/* <ProseMirrorForm/> */}
      </div>
    </div>
  )
}