import React, { useEffect, useRef, useState } from 'react'
import './kanbanBoard.css'
import styled from 'styled-components';
import KanbanBoardCard from '../kanbanBoardCard/KanbanBoardCard';

import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from "react-beautiful-dnd";
import KanbanBoardHeading from './kanbanBoardHeading/KanbanBoardHeading';
import KanbanCardModal from '../kanbanCardModal/KanbanCardModal';
import { AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';


const initialBoardState = {
	'Backlog': [{
		id: '1',
		listId: 'Backlog',
		title: 'Test1',
	}],
	'To Do': [{
		id: '2',
		listId: 'To Do',
		title: 'Test2',
	}],
	'In Progress': [],
	'In Review': [],
	'Done': [],
	'Cancelled': []
}

export interface kanbanBoard {
	[key: string]: cardData[],
}

export interface cardData {
	id: string,
	listId: string,
	title: string,
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
  	const [board, setBoard] = useState<kanbanBoard>(initialBoardState);

	const [isModalActive, setIsModalActive] = useState<boolean>(false);
	const [activeModalColumnId, setActiveModalColumnId] = useState<string | null>(null)

	const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>, columnId: string)  => {
		e.preventDefault();
		setActiveModalColumnId(columnId);
		setIsModalActive(true);
	}

	const handleCloseModal = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setActiveModalColumnId(null);
		setIsModalActive(false);
	}

	const handleSaveModal = (e: React.MouseEvent<HTMLButtonElement>, currentContent: any) => {
		e.preventDefault();

		const newCardData: cardData = {
			id: uuidv4(),
			listId: activeModalColumnId!, 
			title: currentContent.title
		}

		const newColumn: cardData[] = [...board[activeModalColumnId!]];
		newColumn.push(newCardData);
		const newBoard: kanbanBoard = {...board};
		newBoard[activeModalColumnId!] = newColumn;

		setBoard(newBoard);
		setActiveModalColumnId(null);
		setIsModalActive(false);
	}


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
					<KanbanBoardHeading handleOpenModal={handleOpenModal}/>

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
																	title={card.title}
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

			<AnimatePresence
				initial={false}
				mode='wait'
				onExitComplete={()=>null}
			>
				{isModalActive && <KanbanCardModal handleCloseModal={handleCloseModal} handleSaveModal={handleSaveModal}/>}
			</AnimatePresence>
    	</>
  	)
}













{/* https://github.com/atlassian/react-beautiful-dnd/issues/1734
	potential solution
*/}


