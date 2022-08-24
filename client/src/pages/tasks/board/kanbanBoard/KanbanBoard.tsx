import React, { useEffect, useRef, useState } from 'react'
import './kanbanBoard.css'
import styled from 'styled-components';
import KanbanBoardCard from '../kanbanBoardCard/KanbanBoardCard';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const cardDummyData = {
	"Backlog": [
		{
			id: '1',
			listId: 'backlog',
			priority: 'High',
			project: 'Velocity',
			title: 'Test1',
			tags: ['UI', "Backend"],
			deadline: '15 Jun 2022'
		},
		{
			id: '10',
			listId: 'backlog',
			priority: 'High',
			project: 'Velocity',
			title: 'Test2',
			tags: ['UI', "Backend"],
			deadline: '15 Jun 2022'
		},{
			id: '3',
			listId: 'backlog',
			priority: 'High',
			project: 'Velocity',
			title: 'Test3',
			tags: ['UI', "Backend"],
			deadline: '15 Jun 2022'
		},{
			id: '4',
			listId: 'backlog',
			priority: 'High',
			project: 'Velocity',
			title: 'Test4',
			tags: ['UI', "Backend"],
			deadline: '15 Jun 2022'
		},{
			id: '5',
			listId: 'backlog',
			priority: 'High',
			project: 'Velocity',
			title: 'Test5',
			tags: ['UI', "Backend"],
			deadline: '15 Jun 2022'
		},{
			id: '6',
			listId: 'backlog',
			priority: 'High',
			project: 'Velocity',
			title: 'Test6',
			tags: ['UI', "Backend"],
			deadline: '15 Jun 2022'
		},{
			id: '7',
			listId: 'backlog',
			priority: 'High',
			project: 'Velocity',
			title: 'Test7',
			tags: ['UI', "Backend"],
			deadline: '15 Jun 2022'
		},{
			id: '8',
			listId: 'backlog',
			priority: 'High',
			project: 'Velocity',
			title: 'Test8',
			tags: ['UI', "Backend"],
			deadline: '15 Jun 2022'
		},{
			id: '9',
			listId: 'backlog',
			priority: 'High',
			project: 'Velocity',
			title: 'Test9',
			tags: ['UI', "Backend"],
			deadline: '15 Jun 2022'
		},{
			id: '11',
			listId: 'backlog',
			priority: 'High',
			project: 'Velocity',
			title: 'Test11',
			tags: ['UI', "Backend"],
			deadline: '15 Jun 2022'
		},{
			id: '12',
			listId: 'backlog',
			priority: 'High',
			project: 'Velocity',
			title: 'Test12',
			tags: ['UI', "Backend"],
			deadline: '15 Jun 2022'
		}
		,{
			id: '13',
			listId: 'backlog',
			priority: 'High',
			project: 'Velocity',
			title: 'Test13',
			tags: ['UI', "Backend"],
			deadline: '15 Jun 2022'
		},{
			id: '14',
			listId: 'backlog',
			priority: 'High',
			project: 'Velocity',
			title: 'Test14',
			tags: ['UI', "Backend"],
			deadline: '15 Jun 2022'
		},{
			id: '15',
			listId: 'backlog',
			priority: 'High',
			project: 'Velocity',
			title: 'Test15',
			tags: ['UI', "Backend"],
			deadline: '15 Jun 2022'
		},{
			id: '16',
			listId: 'backlog',
			priority: 'High',
			project: 'Velocity',
			title: 'Test16',
			tags: ['UI', "Backend"],
			deadline: '15 Jun 2022'
		},{
			id: '17',
			listId: 'backlog',
			priority: 'High',
			project: 'Velocity',
			title: 'Test17',
			tags: ['UI', "Backend"],
			deadline: '15 Jun 2022'
		}
		
	],
	"To Do": [{
		id: '2',
		listId: 'backlog',
		priority: 'High',
		project: 'Velocity',
		title: 'Test2',
		tags: ['UI', "Backend"],
		deadline: '15 Jun 2022'
	}],
	"In Progress": [],
	"In Review": [],
	"Done": [],
	"Cancelled": []
}
  
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
  


export default function KanbanBoard() {

    //* STICKY TITLE ***********************/
  //? Source: https://stackoverflow.com/questions/16302483/event-to-detect-when-positionsticky-is-triggered
  // TODO NEED TO WATCH THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! https://www.youtube.com/watch?v=2IbRtjez6ag&list=PLVUo-YVOlgZPvqvoi3ilabhV5OX-c7ezh&index=4&t=184s&ab_channel=WebDevSimplified 
  // TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const [isSticky, setIsSticky] = useState(false)
  const stickyColumnName = useRef<any>()
  // const boardColumnsContainer = useRef<HTMLDivElement>()
  const [yIntersection, setYIntersection] = useState(-1)
  
  // mount 
  useEffect(()=>{
    const cachedRef = stickyColumnName.current,
          observer = new IntersectionObserver(
            ([e]) => setIsSticky(e.intersectionRatio < 1),
            {
              threshold: 1,
            }
          )

    observer.observe(cachedRef)
    
    // unmount
    return function(){
      observer.unobserve(cachedRef)
    }
  }, [])
  //**************************************/

    const [board, setBoard] = useState<any>(cardDummyData);

    
    const onDragEnd = (result: any) => {  
      // console.log(result)
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
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='board-columns'> {/* If you want the react-dnd-board to be scrollable, the container outside the Droppables need to be scrollable. */} 
          <div className="board-area">
            <div className={"kaban-board-headings-container" + (isSticky ? " isSticky" : "")} ref={stickyColumnName}>
              {Object.keys(board).map((list, index) => (
                <div className="kaban-board-heading" key={index}>
                  {list}
                  <div className="add-card-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>

                  </div>
                </div>
              ))}
            </div>

            <div className="board-columns-wrapper">
              {Object.keys(board).map((list, index) => (
                <div className="board-column">
                  <Droppable droppableId={list}> 
                    {(provided: any, snapshot: any) => (
                      <div 
                        className='board-droppable-area'
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

                                className="kaban-card-container"
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

                </div>

                
              ))}
            </div>
          </div>
          
        </div>
      </DragDropContext>
    </>
  )
}
