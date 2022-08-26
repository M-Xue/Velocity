import React from 'react'
import ProseMirrorForm from '../../proseMirrorForm/ProseMirrorForm'
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
      animate={{opacity: 1, scale: 1}}
      exit={{opacity: 0, scale: 0}}
      transition={{ duration: 0.1}}
    >
      <button 
        type='button'
        onClick={handleCloseModal}
      >X</button>
      {/* <ProseMirrorForm/> */}
    </motion.div>
  )
}