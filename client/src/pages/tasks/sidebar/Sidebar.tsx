import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './sidebar.css'



export default function Sidebar() {

  // const [sidebarFlyoutWidth, setSidebarFlyoutWidth] = useState(sidebarElementRef.current?.clientWidth)
  // const resizeButtonRef = useRef<HTMLButtonElement>(null);


  const sidebarElementRef = useRef<HTMLDivElement>(null);

  const [sidebarWidth, setSidebarWidth] = useState(267)

  const [currMousePositionX, setCurrMousePositionX] = useState(0)
  const [originalWidth, setOriginalWidth] = useState(0)










  useEffect(() => {
    console.log(sidebarWidth);

  }, [sidebarWidth])
  


  
  const resizeMouseDownHandler = (e: any) => {
    // console.log('mousedown');
    
    setCurrMousePositionX(e.clientX);


    sidebarElementRef.current && setOriginalWidth(sidebarElementRef.current?.clientWidth)



    sidebarElementRef.current && sidebarElementRef.current.addEventListener('mousemove', resizeMouseMoveHandler);
    sidebarElementRef.current && sidebarElementRef.current.addEventListener('mouseup', resizeMouseUpHandler);



  }


  const resizeMouseMoveHandler = (e: any) => {
    const dx = e.clientX - currMousePositionX;



    originalWidth && setSidebarWidth(dx + originalWidth);
    // console.log('mousemove');
  }


  const resizeMouseUpHandler = (e: any) => {
    // console.log('mouseup');

    sidebarElementRef.current && sidebarElementRef.current.removeEventListener('mousemove', resizeMouseMoveHandler);
    sidebarElementRef.current && sidebarElementRef.current.removeEventListener('mouseup', resizeMouseUpHandler);
  }
  



  


  // This event handler is just for edge case scenario. If the users mouse leaves the resize button, the mousemove event should be removed so you don't keep adjusting the width of the sidebar.
  // const resizeMouseLeaveHandler = (e: any) => {
  //   console.log('mouseleave');
  //   sidebarElementRef.current && sidebarElementRef.current.removeEventListener('mousemove', resizeMouseMoveHandler);
  //   sidebarElementRef.current && sidebarElementRef.current.removeEventListener('mouseup', resizeMouseUpHandler);
  // }

  //onMouseLeave={resizeMouseLeaveHandler}
  
  return (
    <div className='sidebar-container' ref={sidebarElementRef} style={{width: sidebarWidth}}>

      <div className="sidebar-content"></div>


      <div className="sidebar-resize-container">
        <div className="sidebar-border"></div>
        <button className='sidebar-resize-button'  onMouseDown={resizeMouseDownHandler}>
          <span></span>
        </button>
      </div>





      {/* <button className='collapse-button'>
        <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M10.294 9.698a.988.988 0 010-1.407 1.01 1.01 0 011.419 0l2.965 2.94a1.09 1.09 0 010 1.548l-2.955 2.93a1.01 1.01 0 01-1.42 0 .988.988 0 010-1.407l2.318-2.297-2.327-2.307z" fill="currentColor" fill-rule="evenodd"></path></svg>
      </button> */}

    </div>
  )
}























// const resizeMouseMoveHandler = useCallback(
//   (e: any) => {
//     const dx = e.clientX - currMousePositionX;



//     originalWidth && setSidebarWidth(dx + originalWidth);
//     // console.log('mousemove');
//   },
//   [currMousePositionX, originalWidth],
// )



// const resizeMouseUpHandler = useCallback(
//   (e: any) => {
//     // console.log('mouseup');

//     sidebarElementRef.current && sidebarElementRef.current.removeEventListener('mousemove', resizeMouseMoveHandler);
//     sidebarElementRef.current && sidebarElementRef.current.removeEventListener('mouseup', resizeMouseUpHandler);
//   },
//   [resizeMouseMoveHandler],
// )




// const resizeMouseDownHandler = useCallback(
//   (e: any) => {
//     // console.log('mousedown');
    
//     setCurrMousePositionX(e.clientX);


//     sidebarElementRef.current && setOriginalWidth(sidebarElementRef.current?.clientWidth)



//     sidebarElementRef.current && sidebarElementRef.current.addEventListener('mousemove', resizeMouseMoveHandler);
//     sidebarElementRef.current && sidebarElementRef.current.addEventListener('mouseup', resizeMouseUpHandler);



//   },
//   [resizeMouseMoveHandler, resizeMouseUpHandler],
// )