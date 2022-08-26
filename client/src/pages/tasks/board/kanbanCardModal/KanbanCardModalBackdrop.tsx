import React, { MouseEventHandler } from 'react'
import './kanbanCardModalBackdrop.css'
import { motion, AnimatePresence } from 'framer-motion'
import KanbanCardModal from './KanbanCardModalForm'

interface Props {
  isModalActive: boolean,
  handleCloseModal: any
}

export default function KanbanCardModalBackdrop({isModalActive, handleCloseModal}: Props) {
  return (
    <>
      <div className="modal-container">
        <motion.div
          className='modal-backdrop'
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{ duration: 0.1}}
          onClick={handleCloseModal}
        >
        </motion.div>

        <KanbanCardModal isModalActive={isModalActive} handleCloseModal={handleCloseModal}/>

      </div>
      



      
    </>

  )
}
