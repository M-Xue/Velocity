import React from 'react'
import ProseMirrorForm from '../../../../components/proseMirrorForm/ProseMirrorForm'
import './kanbanCardModalForm.css'
import { motion } from 'framer-motion'

interface Props {
  isModalActive: boolean,
  handleCloseModal: any
}


export default function KanbanCardModalForm({isModalActive, handleCloseModal}: Props) {
  return (
    <motion.div 
      className="kanban-modal"

      initial={{opacity: 0, scale: 0}}
      animate={{opacity: 1, scale: [null,1.01,1]}}
      exit={{opacity: 0, scale: 0}}
      transition={{ duration: 0.3}}
    >
      <button 
        type='button'
        onClick={handleCloseModal}
      >X</button>
      
      <ProseMirrorForm/>

      <div className="kanban-modal-form-footer">
        <button className='kanban-modal-form-save-button' type='button'>Save</button>
      </div>

    </motion.div>
  )
}