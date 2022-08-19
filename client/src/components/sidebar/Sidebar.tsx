import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import './sidebar.css';
import _ from 'lodash';

import styled from 'styled-components';

interface SidebarWidthProp {
  sidebarWidth: number;
}

const SidebarContainer = styled.div.attrs((props: SidebarWidthProp) => ({
  style: {
    minWidth: props.sidebarWidth,
  }
}))` 
  min-width: ${(props: SidebarWidthProp) => props.sidebarWidth}; // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42691
`

// https://stackoverflow.com/questions/61760696/no-overload-matches-this-call-when-usign-styled-components
const SidebarBorderSpan = styled.span<{isResizeActive: boolean}>`
  background-color: ${(props: any) => props.isResizeActive ? "rgb(38, 132, 255)" : ""};
`



export default function Sidebar() {
  

  const originalSidebarWidth = useRef<number>(240) // Need to make this based on local storage

  const [sidebarWidth, setSidebarWidth] = useState<number>(originalSidebarWidth.current);

  const originalMousePositionX = useRef<number>(sidebarWidth)
  const isResizeActive = useRef<boolean>(false) 
  const [isResizeActiveState, setIsResizeActiveState] = useState<boolean>(false) // ! This is not a good React patten. Try to replace this when a better method comes up.

  

  // This makes it so that when the window is resized and the 50% max-width measurement changes, the width of the sidebar is automatically clipped.
  useEffect(() => {

    const windowResizeHandler = (e: any) => {
      if (sidebarWidth > document.documentElement.clientWidth/2) {
        setSidebarWidth(document.documentElement.clientWidth/2);
      }
    }

    window.addEventListener('resize', windowResizeHandler);
  
    return () => {
      window.removeEventListener('resize', windowResizeHandler);
    }
  }, [sidebarWidth])
  



  const resizeMouseDownHandler = (e: any) => {
    originalMousePositionX.current = e.clientX;

    window.addEventListener('mousemove', throttleResizeMouseMoveHandler); // * To revert throttle changes replace 'throttleResizeMouseMoveHandler' with 'resizeMouseMoveHandler'.
    window.addEventListener('mouseup', resizeMouseUpHandler);
  
    document.body.style.cursor = "ew-resize"; // ! BUG: Theres a bug here where the style of the cursor changes to default when you move outside the sidebar
    //! I think this bug is fixed now

    isResizeActive.current = true; 
    setIsResizeActiveState(prev => !prev) // This is to change the background color of the border when the user lets go of resizing the sidebar
  }
  
  const resizeMouseMoveHandler = (e: any) => {

    const mouseMovementX = e.clientX - originalMousePositionX.current;
    const newWidth = sidebarWidth + mouseMovementX;

    if (newWidth <= document.documentElement.clientWidth/2 && newWidth >= 240) {
      setSidebarWidth(newWidth)
    }

    
  }

  // * //////// Throttle function
  const throttleResizeMouseMoveHandler = useMemo(
    () => _.throttle(resizeMouseMoveHandler, 1), 
  [resizeMouseMoveHandler])
  // * //////// Source: https://dmitripavlutin.com/react-throttle-debounce/


  const resizeMouseUpHandler = (e:any) => {
    originalSidebarWidth.current = sidebarWidth;
    document.body.style.cursor = "default"; 

    window.removeEventListener('mousemove', throttleResizeMouseMoveHandler); // * To revert throttle changes replace 'throttleResizeMouseMoveHandler' with 'resizeMouseMoveHandler'.
    window.removeEventListener('mouseup', resizeMouseUpHandler); 

    isResizeActive.current = false; 
    setIsResizeActiveState(prev => !prev) // This is to change the background color of the border when the user lets go of resizing the sidebar
  }

  return (


    <SidebarContainer 
      className='sidebar-container'
      sidebarWidth={sidebarWidth}
      // isResizeActive={isResizeActive.current}
    >
      <div className="sidebar-content">Put Sidebar Children Here</div>

      <div className="sidebar-resize-container" onMouseDown={resizeMouseDownHandler}>
        <div className="sidebar-border"></div>
        <button className='sidebar-resize-button' >
          <SidebarBorderSpan isResizeActive={isResizeActive.current}></SidebarBorderSpan>  
          <span></span>
        </button>
      </div>
    </SidebarContainer>
  )
}





































































// export default function Sidebar() {
  

  //   const originalSidebarWidth = useRef<number>(240) // Need to make this based on local storage
  
  
  //   const [sidebarWidth, setSidebarWidth] = useState<number>(originalSidebarWidth.current);
  
  //   const originalMousePositionX = useRef<number>(sidebarWidth)
  //   const isResizeActive = useRef<boolean>(false) 
  //   const [isResizeActiveState, setIsResizeActiveState] = useState<boolean>(false) // ! This is not a good React patten. Try to replace this when a better method comes up.
  
    
  
  //   // This makes it so that when the window is resized and the 50% max-width measurement changes, the width of the sidebar is automatically clipped.
  //   useEffect(() => {
  
  //     const windowResizeHandler = (e: any) => {
  //       if (sidebarWidth > document.documentElement.clientWidth/2) {
  //         setSidebarWidth(document.documentElement.clientWidth/2);
  //       }
  //     }
  
  //     window.addEventListener('resize', windowResizeHandler);
    
  //     return () => {
  //       window.removeEventListener('resize', windowResizeHandler);
  //     }
  //   }, [sidebarWidth])
    
  
  
  
  //   const resizeMouseDownHandler = (e: any) => {
  //     originalMousePositionX.current = e.clientX;
  
  //     window.addEventListener('mousemove', resizeMouseMoveHandler);
  //     window.addEventListener('mouseup', resizeMouseUpHandler);
    
  //     document.body.style.cursor = "ew-resize"; // ! BUG: Theres a bug here where the style of the cursor changes to default when you move outside the sidebar
  //     isResizeActive.current = true; 
  //     setIsResizeActiveState(prev => !prev) // This is to change the background color of the border when the user lets go of resizing the sidebar
  //   }
    
  //   const resizeMouseMoveHandler = (e: any) => {
  
  //     const mouseMovementX = e.clientX - originalMousePositionX.current;
  //     const newWidth = sidebarWidth + mouseMovementX;
  
  //     if (newWidth <= document.documentElement.clientWidth/2 && newWidth >= 240) {
  //       setSidebarWidth(newWidth)
  //     }
  
      
  //   }
  
  
  
  //   const resizeMouseUpHandler = (e:any) => {
  //     originalSidebarWidth.current = sidebarWidth;
  //     document.body.style.cursor = "default"; 
  
  //     window.removeEventListener('mousemove', resizeMouseMoveHandler);
  //     window.removeEventListener('mouseup', resizeMouseUpHandler);
  
  //     isResizeActive.current = false; 
  //     setIsResizeActiveState(prev => !prev) // This is to change the background color of the border when the user lets go of resizing the sidebar
  //   }
  
  //   return (
  
  
  //     <SidebarContainer 
  //       className='sidebar-container'
  //       sidebarWidth={sidebarWidth}
  //       isResizeActive={isResizeActive.current}
  //     >
  //       <div className="sidebar-content">sdfhgdfs</div>
  
  //       <div className="sidebar-resize-container">
  //         <div className="sidebar-border"></div>
  //         <button className='sidebar-resize-button' onMouseDown={resizeMouseDownHandler}>
  //           <SidebarBorderSpan isResizeActive={isResizeActive.current}></SidebarBorderSpan>  
  //         </button>
  //       </div>
  //     </SidebarContainer>
  //   )
  // }
  