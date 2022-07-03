import React from 'react'
import './kanbanBoardCard.css'

export default function KanbanBoardCard() {
  return (
    <div className='kanban-card'>
        <div className="kcard-top">
            <div className="kcard-priority">High</div>
            <div className="kcard-project">Velocity</div>
            <div className="kcard-edit-priority">...</div>
        </div>
        <div className="kcard-title">Test</div>
        <div className="kcard-bottom">

            <div className="kcard-tags">
                <div className="kcard-tag">UI</div>
                <div className="kcard-tag">Backend</div>
            </div>

            {/* <div className="kcard-progress">*********</div> */}
            <div className="kcard-due-date">15 Jun 2018</div>
        </div>

    </div>
  )
}
