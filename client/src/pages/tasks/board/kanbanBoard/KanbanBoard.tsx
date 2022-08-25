import React, { useEffect, useRef, useState } from 'react'
import './kanbanBoard.css'
import styled from 'styled-components';
import KanbanBoardCard from '../kanbanBoardCard/KanbanBoardCard';

import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from "react-beautiful-dnd";
import KanbanBoardHeading from '../kanbanBoardHeading/KanbanBoardHeading';
import KanbanCardModalBackdrop from '../kanbanCardModal/KanbanCardModalBackdrop';
import KanbanCardModal from '../kanbanCardModal/KanbanCardModal';

const cardDummyData = {
	'backlog': [{
		id: '1',
		listId: 'backlog',
		priority: 'High',
		project: 'Velocity',
		title: 'Test1',
		tags: ['UI', "Backend"],
		deadline: '15 Jun 2022'
	}],
	'toDo': [{
		id: '2',
		listId: 'backlog',
		priority: 'High',
		project: 'Velocity',
		title: 'Test2',
		tags: ['UI', "Backend"],
		deadline: '15 Jun 2022'
	}],
	'inProgress': [],
	'inReview': [],
	'done': [],
	'cancelled': []
}
interface kanbanBoard {
	[key: string]: cardData[],
}

interface cardData {
	id: string,
	listId: string,
	priority: string,
	project: string,
	title: string,
	tags: string[],
	deadline: string
}

// Removes and element from a given list from the given index and returns both the new list and the removed element
const removeFromList = (list: cardData[], index: number) => {  
	const resultList: cardData[] = Array.from(list);  
	const removed: cardData = resultList.splice(index, 1)[0];  
	return [removed, resultList];
}

// Returns a new list that is a copy of the given list with the given element inserted at the given index
const addToList = (list: cardData[], index: number, element: cardData) => {  
	const result: cardData[] = Array.from(list);  
	result.splice(index, 0, element);  
	return result;
}



export default function KanbanBoard() {
  	const [board, setBoard] = useState<kanbanBoard>(cardDummyData);

	// console.log("rendered");

	const onDragEnd = (result: DropResult) => {
		// console.log(result);
		if (!result.destination) {  
				return;  
		}  
		const listCopy = {...board} // Copies the state of the board
		
		// Creates a copy of the list the Draggable was taken from, removes the Draggable from that list, and overrides that list in the overall listCopy.
		const sourceList: cardData[] = listCopy[result.source.droppableId]; // result.source.droppableId is the key of the key value pair of the list in the elements state object that the draggable was taken from
		const [removedElement, newSourceList] = removeFromList(sourceList, result.source.index);

		if (Array.isArray(newSourceList)) listCopy[result.source.droppableId] = newSourceList; 
		const destinationList = listCopy[result.destination.droppableId];
		if (!Array.isArray(removedElement)) {
			removedElement.listId = result.destination.droppableId; //* CHANGED THIS SO THAT THE ELEMENTS LIST ID IS DYNAMICALLY UPDATED. 
			listCopy[result.destination.droppableId] = addToList(destinationList, result.destination.index, removedElement);
		}
		setBoard(listCopy)
	}

  	return (
    	<>
			<div className='board-columns'> {/* If you want the react-dnd-board to be scrollable, the container outside the Droppables need to be scrollable. */}
				<div className="board-area">
					<KanbanBoardHeading/>

					<DragDropContext onDragEnd={onDragEnd}>
						<div className="board-columns-wrapper">
							{Object.keys(board).map((list: string, index) => (
								<div className="board-column" key={list}>
									<Droppable droppableId={list}> 
										{(provided: DroppableProvided) => (
											<div 
												className='board-droppable-area'
												ref={provided.innerRef}
												{...provided.droppableProps} 
											>

												{/* ////////////////////////////////////////////////// */}
												{board[list].map((card: cardData, index: number) => (
													<Draggable key={card.id} draggableId={card.id} index={index}>
														{(provided: DraggableProvided) => (
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
												{/* ////////////////////////////////////////////////// */}

												{provided.placeholder}
											</div>
										)}
									</Droppable>
								</div>
							))}
						</div>
					</DragDropContext>
				</div>
			</div>

			{/* <KanbanCardModalBackdrop /> */}
			<KanbanCardModal/>

    	</>
  	)
}









{/* https://github.com/atlassian/react-beautiful-dnd/issues/1734
	potential solution
*/}

































{/* <DragDropContext onDragEnd={onDragEnd}>
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
					</DragDropContext> */}











					// {
					// 	id: '10',
					// 	listId: 'backlog',
					// 	priority: 'High',
					// 	project: 'Velocity',
					// 	title: 'Test2',
					// 	tags: ['UI', "Backend"],
					// 	deadline: '15 Jun 2022'
					// },{
					// 	id: '3',
					// 	listId: 'backlog',
					// 	priority: 'High',
					// 	project: 'Velocity',
					// 	title: 'Test3',
					// 	tags: ['UI', "Backend"],
					// 	deadline: '15 Jun 2022'
					// },{
					// 	id: '4',
					// 	listId: 'backlog',
					// 	priority: 'High',
					// 	project: 'Velocity',
					// 	title: 'Test4',
					// 	tags: ['UI', "Backend"],
					// 	deadline: '15 Jun 2022'
					// },{
					// 	id: '5',
					// 	listId: 'backlog',
					// 	priority: 'High',
					// 	project: 'Velocity',
					// 	title: 'Test5',
					// 	tags: ['UI', "Backend"],
					// 	deadline: '15 Jun 2022'
					// },{
					// 	id: '6',
					// 	listId: 'backlog',
					// 	priority: 'High',
					// 	project: 'Velocity',
					// 	title: 'Test6',
					// 	tags: ['UI', "Backend"],
					// 	deadline: '15 Jun 2022'
					// },{
					// 	id: '7',
					// 	listId: 'backlog',
					// 	priority: 'High',
					// 	project: 'Velocity',
					// 	title: 'Test7',
					// 	tags: ['UI', "Backend"],
					// 	deadline: '15 Jun 2022'
					// },{
					// 	id: '8',
					// 	listId: 'backlog',
					// 	priority: 'High',
					// 	project: 'Velocity',
					// 	title: 'Test8',
					// 	tags: ['UI', "Backend"],
					// 	deadline: '15 Jun 2022'
					// },{
					// 	id: '9',
					// 	listId: 'backlog',
					// 	priority: 'High',
					// 	project: 'Velocity',
					// 	title: 'Test9',
					// 	tags: ['UI', "Backend"],
					// 	deadline: '15 Jun 2022'
					// },{
					// 	id: '11',
					// 	listId: 'backlog',
					// 	priority: 'High',
					// 	project: 'Velocity',
					// 	title: 'Test11',
					// 	tags: ['UI', "Backend"],
					// 	deadline: '15 Jun 2022'
					// },{
					// 	id: '12',
					// 	listId: 'backlog',
					// 	priority: 'High',
					// 	project: 'Velocity',
					// 	title: 'Test12',
					// 	tags: ['UI', "Backend"],
					// 	deadline: '15 Jun 2022'
					// }
					// ,{
					// 	id: '13',
					// 	listId: 'backlog',
					// 	priority: 'High',
					// 	project: 'Velocity',
					// 	title: 'Test13',
					// 	tags: ['UI', "Backend"],
					// 	deadline: '15 Jun 2022'
					// },{
					// 	id: '14',
					// 	listId: 'backlog',
					// 	priority: 'High',
					// 	project: 'Velocity',
					// 	title: 'Test14',
					// 	tags: ['UI', "Backend"],
					// 	deadline: '15 Jun 2022'
					// },{
					// 	id: '15',
					// 	listId: 'backlog',
					// 	priority: 'High',
					// 	project: 'Velocity',
					// 	title: 'Test15',
					// 	tags: ['UI', "Backend"],
					// 	deadline: '15 Jun 2022'
					// },{
					// 	id: '16',
					// 	listId: 'backlog',
					// 	priority: 'High',
					// 	project: 'Velocity',
					// 	title: 'Test16',
					// 	tags: ['UI', "Backend"],
					// 	deadline: '15 Jun 2022'
					// },{
					// 	id: '17',
					// 	listId: 'backlog',
					// 	priority: 'High',
					// 	project: 'Velocity',
					// 	title: 'Test17',
					// 	tags: ['UI', "Backend"],
					// 	deadline: '15 Jun 2022'
					// }