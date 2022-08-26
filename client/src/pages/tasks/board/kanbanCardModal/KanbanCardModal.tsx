import React, { MouseEventHandler } from 'react'
import './kanbanCardModal.css'
import { motion } from 'framer-motion'
import KanbanCardModalForm from './KanbanCardModalForm'

interface Props {
  isModalActive: boolean,
  handleCloseModal: any
}

export default function KanbanCardModal({isModalActive, handleCloseModal}: Props) {
  return (
    <>
      <div className="kanban-modal-container" >
        <motion.div
          className='modal-backdrop'
          onClick={handleCloseModal}

          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{ duration: 0.1}}
        >
        </motion.div>

        <KanbanCardModalForm isModalActive={isModalActive} handleCloseModal={handleCloseModal}/> 
      </div>
      



      
    </>

  )
}
