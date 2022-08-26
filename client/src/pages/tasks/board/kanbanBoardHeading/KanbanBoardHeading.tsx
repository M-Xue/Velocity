import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
import './kanbanBoardHeading.css'

const boardTitles = ["Backlog", "To Do", "In Progress", "In Review", "Done", "Cancelled"]

interface Props {
  handleOpenModal: any
}

export default function KanbanBoardHeading({handleOpenModal}: Props) {
  return (
    <div className={"kaban-board-headings-container"}>
      {boardTitles.map((list, index) => (

        <div className="kaban-board-heading" key={index}>
          {list}
          <button className="add-card-button" type='button' onClick={handleOpenModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          </button>
        </div>
        
      ))}
    </div> 
  )
}












































  //     //* STICKY TITLE ***********************/
  // //? Source: https://stackoverflow.com/questions/16302483/event-to-detect-when-positionsticky-is-triggered
  // // TODO NEED TO WATCH THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! https://www.youtube.com/watch?v=2IbRtjez6ag&list=PLVUo-YVOlgZPvqvoi3ilabhV5OX-c7ezh&index=4&t=184s&ab_channel=WebDevSimplified 
  // // TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // const [isSticky, setIsSticky] = useState(false)
  // const stickyColumnName = useRef<any>()
  // // const boardColumnsContainer = useRef<HTMLDivElement>()
  // const [yIntersection, setYIntersection] = useState(-1)
  
  // // mount 
  // useEffect(()=>{
  //   const cachedRef = stickyColumnName.current,
  //         observer = new IntersectionObserver(
  //           ([e]) => setIsSticky(e.intersectionRatio < 1),
  //           {
  //             threshold: 1,
  //           }
  //         )

  //   observer.observe(cachedRef)
    
  //   // unmount
  //   return function(){
  //     observer.unobserve(cachedRef)
  //   }

  // }, [])
  // //**************************************/


  // return (
  //   <div className={"kaban-board-headings-container" + (isSticky ? " isSticky" : "")} ref={stickyColumnName}>
  //     {boardTitles.map((list, index) => (
  //       <div className="kaban-board-heading" key={index}>
  //         {list}
  //         <div className="add-card-button">
  //           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>

  //         </div>
  //       </div>
  //     ))}
  //   </div> 
  // )