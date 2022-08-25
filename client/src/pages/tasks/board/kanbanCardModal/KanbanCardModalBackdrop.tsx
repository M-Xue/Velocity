import React from 'react'
import './kanbanCardModalBackdrop.css'
import { motion } from 'framer-motion'

interface Props {
  isActive?: Function,
  handleBackdropOnClick?: Function,
}

export default function KanbanCardModalBackdrop({isActive, handleBackdropOnClick}: Props) {
  return (
    <motion.div
      className='modal-backdrop'
    >
      

    </motion.div>
  )
}
