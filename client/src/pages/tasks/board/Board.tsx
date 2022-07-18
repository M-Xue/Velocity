import React, { useEffect, useRef, useState } from 'react'
import './board.css'
import _ from 'lodash';

import styled from 'styled-components';
import KanbanBoardCard from '../kanbanBoardCard/KanbanBoardCard';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const cardDummyData = {
  backlog: [
    {
      id: '1',
      listId: 'backlog',
      priority: 'High',
      project: 'Velocity',
      cardTitle: 'Test',
      tags: ['UI', "Backend"],
      deadline: '15 Jun 2022'
    },
    {
      id: '2',
      listId: 'backlog',
      priority: 'High',
      project: 'Velocity',
      cardTitle: 'Test',
      tags: ['UI', "Backend"],
      deadline: '15 Jun 2022'
    }
  ],
  todo: [],
  inPogress: [],
  inReview: [],
  done: [],
  cancelled: []
}


// const lists = ['backlog', 'todo', 'inPogress', 'inReview', 'done', 'cancelled'];

// Removes and element from a given list from the given index and returns both the new list and the removed element
const removeFromList = (list: any, index: any) => {  
  const result = Array.from(list);  
  const [removed] = result.splice(index, 1);  
  return [removed, result];
}

// Returns a new list that is a copy of the given list with the given element inserted at the given index
const addToList = (list: any, index: any, element: any) => {  
  const result = Array.from(list);  
  result.splice(index, 0, element);  
  return result;
}



export default function Board() {

  const [board, setBoard] = useState<any>(cardDummyData);


  const onDragEnd = (result: any) => {  
    if (!result.destination) {  
        return;  
    }  
    const listCopy = { ...board }  
  
    const sourceList = listCopy[result.source.droppableId] // result.source.droppableId is the key of the key value pair of the list in the elements state object that the draggable was taken from
    const [removedElement, newSourceList] = removeFromList(sourceList, result.source.index)  
    listCopy[result.source.droppableId] = newSourceList  
  
    const destinationList = listCopy[result.destination.droppableId]  
    // removedElement.listId = result.destination.droppableId; //* CHANGED THIS SO THAT THE ELEMENTS LIST ID IS DYNAMICALLY UPDATED. 
    listCopy[result.destination.droppableId] = addToList(destinationList, result.destination.index, removedElement)
    // console.log(destinationList);
    // console.log(removedElement);
    setBoard(listCopy)
  }


  return (
    <div className='board-container'>



      <nav className='board-navbar'>
        <ul>
          <li><div className='board-list-toggle-button'><span>List</span></div></li>
          <span className="board-project-label">Project Label</span>
          <li><div className='board-view-button'>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.5 10.5C9.63261 10.5 9.75979 10.5527 9.85355 10.6464C9.94732 10.7402 10 10.8674 10 11V14C10 14.1326 9.94732 14.2598 9.85355 14.3536C9.75979 14.4473 9.63261 14.5 9.5 14.5H8.5C8.36739 14.5 8.24021 14.4473 8.14645 14.3536C8.05268 14.2598 8 14.1326 8 14V11C8 10.8674 8.05268 10.7402 8.14645 10.6464C8.24021 10.5527 8.36739 10.5 8.5 10.5H9.5ZM7 11.5V13H1.75C1.55109 13 1.36032 12.921 1.21967 12.7803C1.07902 12.6397 1 12.4489 1 12.25C1 12.0511 1.07902 11.8603 1.21967 11.7197C1.36032 11.579 1.55109 11.5 1.75 11.5H7ZM14.25 11.5C14.4489 11.5 14.6397 11.579 14.7803 11.7197C14.921 11.8603 15 12.0511 15 12.25C15 12.4489 14.921 12.6397 14.7803 12.7803C14.6397 12.921 14.4489 13 14.25 13H11V11.5H14.25ZM5.5 6C5.63261 6 5.75979 6.05268 5.85355 6.14645C5.94732 6.24021 6 6.36739 6 6.5V9.5C6 9.63261 5.94732 9.75979 5.85355 9.85355C5.75979 9.94732 5.63261 10 5.5 10H4.5C4.36739 10 4.24021 9.94732 4.14645 9.85355C4.05268 9.75979 4 9.63261 4 9.5V6.5C4 6.36739 4.05268 6.24021 4.14645 6.14645C4.24021 6.05268 4.36739 6 4.5 6H5.5ZM3 7.25V8.75H1.75C1.55109 8.75 1.36032 8.67098 1.21967 8.53033C1.07902 8.38968 1 8.19891 1 8C1 7.80109 1.07902 7.61032 1.21967 7.46967C1.36032 7.32902 1.55109 7.25 1.75 7.25H3ZM14.25 7.25C14.4489 7.25 14.6397 7.32902 14.7803 7.46967C14.921 7.61032 15 7.80109 15 8C15 8.19891 14.921 8.38968 14.7803 8.53033C14.6397 8.67098 14.4489 8.75 14.25 8.75H7V7.25H14.25ZM11.5 1.75C11.6326 1.75 11.7598 1.80268 11.8536 1.89645C11.9473 1.99021 12 2.11739 12 2.25V5.25C12 5.38261 11.9473 5.50979 11.8536 5.60355C11.7598 5.69732 11.6326 5.75 11.5 5.75H10.5C10.3674 5.75 10.2402 5.69732 10.1464 5.60355C10.0527 5.50979 10 5.38261 10 5.25V2.25C10 2.11739 10.0527 1.99021 10.1464 1.89645C10.2402 1.80268 10.3674 1.75 10.5 1.75H11.5ZM9 3V4.5H1.75C1.55109 4.5 1.36032 4.42098 1.21967 4.28033C1.07902 4.13968 1 3.94891 1 3.75C1 3.55109 1.07902 3.36032 1.21967 3.21967C1.36032 3.07902 1.55109 3 1.75 3H9ZM14.25 3C14.4489 3 14.6397 3.07902 14.7803 3.21967C14.921 3.36032 15 3.55109 15 3.75C15 3.94891 14.921 4.13968 14.7803 4.28033C14.6397 4.42098 14.4489 4.5 14.25 4.5H13V3H14.25Z" fill="#6B6F76"/>
            </svg>

            <span>View</span>

            <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.292068 0.293002C0.105262 0.481894 0.000488281 0.736838 0.000488281 1.0025C0.000488281 1.26816 0.105262 1.52311 0.292068 1.712L3.23107 4.677C3.44907 4.892 3.73107 4.999 4.01007 4.999C4.28907 4.999 4.56607 4.892 4.77907 4.677L7.70907 1.722C7.89563 1.53298 8.00024 1.27809 8.00024 1.0125C8.00024 0.746917 7.89563 0.492021 7.70907 0.303002C7.61724 0.209818 7.5078 0.13582 7.38711 0.0853119C7.26642 0.0348039 7.1369 0.00879383 7.00607 0.00879383C6.87524 0.00879383 6.74571 0.0348039 6.62503 0.0853119C6.50434 0.13582 6.3949 0.209818 6.30307 0.303002L4.00507 2.62L1.69807 0.293002C1.60603 0.200181 1.49652 0.126505 1.37586 0.0762262C1.25521 0.0259474 1.12578 6.10352e-05 0.995069 6.10352e-05C0.864353 6.10352e-05 0.734931 0.0259474 0.614272 0.0762262C0.493613 0.126505 0.384105 0.200181 0.292068 0.293002V0.293002Z" fill="currentColor"/>
            </svg>
          </div></li>
        </ul>
      </nav>


      <DragDropContext onDragEnd={onDragEnd}>
        <div className='board-columns'>
          {Object.keys(board).map((list, index) => (
            <Droppable droppableId={list} key={index}>
              {(provided: any, snapshot: any) => (
                <div 
                  className='board-column'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {board[list].map((card: any, index: any) => (
                    <Draggable key={card.id} draggableId={card.id} index={index}>
                      {(provided: any) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <KanbanBoardCard
                            id={card.id}
                            listId={card.listId}
                            priority={card.priority}
                            project={card.project}
                            title={card.title}
                            tags={card.tags}
                            deadline={card.deadline}
                          />

                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>


                    {/* <KanbanBoardCard
                      id={card.id}
                      listId={card.listId}
                      priority={card.priority}
                      project={card.priority}
                      title={card.title}
                      tags={card.tags}
                      deadline={card.deadline}
                    /> */}

    </div>
  )
}




// <div className="kaban-board-heading">Backlog</div>
//                   {board[list].map((card: any, index: any) => (
//                     <Draggable key={card.id} draggableId={card.id} index={index}>
//                       {(provided: any) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                         >
//                           <KanbanBoardCard
//                             id={card.id}
//                             listId={card.listId}
//                             priority={card.priority}
//                             project={card.priority}
//                             title={card.title}
//                             tags={card.tags}
//                             deadline={card.deadline}
//                           />
//                         </div>
//                       )}   
//                     </Draggable>
//                   ))} 





{/* <div className='board-columns'>




<div className='board-column backlog-column'>
  <div className="kaban-board-heading">Backlog</div>
  <KanbanBoardCard/>
  <KanbanBoardCard/>
</div>




<div className='board-column todo-column'>
  <div className="kaban-board-heading">To Do</div>

</div>



<div className='board-column in-progress-column'>
  <div className="kaban-board-heading">In Progress</div>

</div>



<div className='board-column in-review-column'>
  <div className="kaban-board-heading">In Review</div>

</div>



<div className='board-column done-column'>
  <div className="kaban-board-heading">Done</div>

</div>



<div className='board-column cancelled-column'>
  <div className="kaban-board-heading">Cancelled</div>

</div>



</div> */}

























//********************************************************************************************************************************************************************************* */










/* <nav className='board-navbar'>
<ul>
  <li><div className='board-list-toggle-button'><span>List</span></div></li>
  <span className="board-project-label">Project Label</span>
  <li><div className='board-view-button'>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M9.5 10.5C9.63261 10.5 9.75979 10.5527 9.85355 10.6464C9.94732 10.7402 10 10.8674 10 11V14C10 14.1326 9.94732 14.2598 9.85355 14.3536C9.75979 14.4473 9.63261 14.5 9.5 14.5H8.5C8.36739 14.5 8.24021 14.4473 8.14645 14.3536C8.05268 14.2598 8 14.1326 8 14V11C8 10.8674 8.05268 10.7402 8.14645 10.6464C8.24021 10.5527 8.36739 10.5 8.5 10.5H9.5ZM7 11.5V13H1.75C1.55109 13 1.36032 12.921 1.21967 12.7803C1.07902 12.6397 1 12.4489 1 12.25C1 12.0511 1.07902 11.8603 1.21967 11.7197C1.36032 11.579 1.55109 11.5 1.75 11.5H7ZM14.25 11.5C14.4489 11.5 14.6397 11.579 14.7803 11.7197C14.921 11.8603 15 12.0511 15 12.25C15 12.4489 14.921 12.6397 14.7803 12.7803C14.6397 12.921 14.4489 13 14.25 13H11V11.5H14.25ZM5.5 6C5.63261 6 5.75979 6.05268 5.85355 6.14645C5.94732 6.24021 6 6.36739 6 6.5V9.5C6 9.63261 5.94732 9.75979 5.85355 9.85355C5.75979 9.94732 5.63261 10 5.5 10H4.5C4.36739 10 4.24021 9.94732 4.14645 9.85355C4.05268 9.75979 4 9.63261 4 9.5V6.5C4 6.36739 4.05268 6.24021 4.14645 6.14645C4.24021 6.05268 4.36739 6 4.5 6H5.5ZM3 7.25V8.75H1.75C1.55109 8.75 1.36032 8.67098 1.21967 8.53033C1.07902 8.38968 1 8.19891 1 8C1 7.80109 1.07902 7.61032 1.21967 7.46967C1.36032 7.32902 1.55109 7.25 1.75 7.25H3ZM14.25 7.25C14.4489 7.25 14.6397 7.32902 14.7803 7.46967C14.921 7.61032 15 7.80109 15 8C15 8.19891 14.921 8.38968 14.7803 8.53033C14.6397 8.67098 14.4489 8.75 14.25 8.75H7V7.25H14.25ZM11.5 1.75C11.6326 1.75 11.7598 1.80268 11.8536 1.89645C11.9473 1.99021 12 2.11739 12 2.25V5.25C12 5.38261 11.9473 5.50979 11.8536 5.60355C11.7598 5.69732 11.6326 5.75 11.5 5.75H10.5C10.3674 5.75 10.2402 5.69732 10.1464 5.60355C10.0527 5.50979 10 5.38261 10 5.25V2.25C10 2.11739 10.0527 1.99021 10.1464 1.89645C10.2402 1.80268 10.3674 1.75 10.5 1.75H11.5ZM9 3V4.5H1.75C1.55109 4.5 1.36032 4.42098 1.21967 4.28033C1.07902 4.13968 1 3.94891 1 3.75C1 3.55109 1.07902 3.36032 1.21967 3.21967C1.36032 3.07902 1.55109 3 1.75 3H9ZM14.25 3C14.4489 3 14.6397 3.07902 14.7803 3.21967C14.921 3.36032 15 3.55109 15 3.75C15 3.94891 14.921 4.13968 14.7803 4.28033C14.6397 4.42098 14.4489 4.5 14.25 4.5H13V3H14.25Z" fill="#6B6F76"/>
    </svg>

    <span>View</span>

    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M0.292068 0.293002C0.105262 0.481894 0.000488281 0.736838 0.000488281 1.0025C0.000488281 1.26816 0.105262 1.52311 0.292068 1.712L3.23107 4.677C3.44907 4.892 3.73107 4.999 4.01007 4.999C4.28907 4.999 4.56607 4.892 4.77907 4.677L7.70907 1.722C7.89563 1.53298 8.00024 1.27809 8.00024 1.0125C8.00024 0.746917 7.89563 0.492021 7.70907 0.303002C7.61724 0.209818 7.5078 0.13582 7.38711 0.0853119C7.26642 0.0348039 7.1369 0.00879383 7.00607 0.00879383C6.87524 0.00879383 6.74571 0.0348039 6.62503 0.0853119C6.50434 0.13582 6.3949 0.209818 6.30307 0.303002L4.00507 2.62L1.69807 0.293002C1.60603 0.200181 1.49652 0.126505 1.37586 0.0762262C1.25521 0.0259474 1.12578 6.10352e-05 0.995069 6.10352e-05C0.864353 6.10352e-05 0.734931 0.0259474 0.614272 0.0762262C0.493613 0.126505 0.384105 0.200181 0.292068 0.293002V0.293002Z" fill="currentColor"/>
    </svg>
  </div></li>
</ul>
</nav> */