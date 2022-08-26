import React, { MouseEventHandler } from 'react'
import './kanbanCardModalBackdrop.css'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  isActive: boolean,
  handleCloseModal: any
}

export default function KanbanCardModalBackdrop({isActive, handleCloseModal}: Props) {
  return (
    <>
      <motion.div
        className='modal-backdrop'
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{ duration: 0.075}}
        onClick={handleCloseModal}
      >

      </motion.div>

      
    </>

  )
}
