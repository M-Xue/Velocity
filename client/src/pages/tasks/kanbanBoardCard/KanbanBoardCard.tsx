import React from 'react'
import './kanbanBoardCard.css'
import { Draggable } from "react-beautiful-dnd";


interface Props {
  id: String,
  listId: String,
  priority: String,
  project: String,
  title: String,
  tags: String[],
  deadline: String
}


export default function KanbanBoardCard({id, listId, priority, project, title, tags, deadline}: Props) {
  return (
    <div className='kanban-card'>
        <div className="kcard-top">
            <div className="kcard-priority">{priority}</div>
            <div className="kcard-project">{project}</div>
            <div className="kcard-edit-priority">...</div>
        </div>
        <div className="kcard-title">{title}</div>
        <div className="kcard-bottom">
            <div className="kcard-tags">
              {tags.map((tag) => (
                <div className="kcard-tag">{tag}</div>
              ))}
            </div>
            {/* <div className="kcard-progress">*********</div> */}
            <div className="kcard-due-date">{deadline}</div>
        </div>

    </div>
  )
}
