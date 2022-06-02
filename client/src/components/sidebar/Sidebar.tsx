import React, { useRef, useState, useEffect } from 'react'
import './sidebar.css'

import styled from 'styled-components';



const SidebarContainer = styled.div.attrs((props: any) => ({
  style: {
    width: props.sidebarWidth,
  }
}))` 
  
`
const SidebarBorderSpan = styled.span`
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

    document.addEventListener('mousemove', resizeMouseMoveHandler);
    document.addEventListener('mouseup', resizeMouseUpHandler);
  
    document.body.style.cursor = "ew-resize"; // ! BUG: Theres a bug here where the style of the cursor changes to default when you move outside the sidebar
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

  const resizeMouseUpHandler = (e:any) => {
    originalSidebarWidth.current = sidebarWidth;
    document.body.style.cursor = "default"; 

    document.removeEventListener('mousemove', resizeMouseMoveHandler);
    document.removeEventListener('mouseup', resizeMouseUpHandler);

    isResizeActive.current = false; 
    setIsResizeActiveState(prev => !prev) // This is to change the background color of the border when the user lets go of resizing the sidebar
  }

  return (


    <SidebarContainer 
      className='sidebar-container'
      sidebarWidth={sidebarWidth}
      isResizeActive={isResizeActive.current}
    >
      <div className="sidebar-content">sdfhgdfs</div>

      <div className="sidebar-resize-container">
        <div className="sidebar-border"></div>
        <button className='sidebar-resize-button' onMouseDown={resizeMouseDownHandler}>
          <SidebarBorderSpan isResizeActive={isResizeActive.current}></SidebarBorderSpan>  
        </button>
      </div>
    </SidebarContainer>
  )
}










































































// export default function Sidebar() {


  //   // const originalSidebarWidth = useRef(267) // Need to make this based on local storage
  
  //   const [originalSidebarWidth, setOriginalSidebarWidth] = useState(267) // Need to make this based on local storage
  //   const [sidebarWidth, setSidebarWidth] = useState(originalSidebarWidth);
  
  //   const [originalMousePositionX, setOriginalMousePositionX] = useState(sidebarWidth)
    
  
  //   const [isResizeActive, setIsResizeActive] = useState(false)
  //   const test = useRef(false)
  
  //   const resizeMouseDownHandler = (e: any) => {
  //     setOriginalMousePositionX(e.clientX);
  //     document.addEventListener('mousemove', resizeMouseMoveHandler);
  //     document.addEventListener('mouseup', resizeMouseUpHandler);
    
  //     document.body.style.cursor = "ew-resize"; // Theres a bug here where the style of the cursor changes to default when you move outside the sidebar
  
  //     console.log('mousedown');
  
  
  //     setIsResizeActive(true);
  
  //     console.log('MD test value: ', test);
  //     test.current = true;
  
  //   }
    
  
  
  //   const resizeMouseMoveHandler = (e: any) => {
  //     if (originalMousePositionX) {
  //       const mouseMovementX = e.clientX - originalMousePositionX;
  //       const newWidth = originalSidebarWidth + mouseMovementX;
  //       setSidebarWidth(newWidth)
  //       console.log(sidebarWidth);
  
  //     }
      
  
  //     console.log('mousemove');
  //   }
  
  
  //   const resizeMouseUpHandler = (e:any) => {
  //     setOriginalSidebarWidth(sidebarWidth);
  //     document.body.style.cursor = "default"; 
  
  //     document.removeEventListener('mousemove', resizeMouseMoveHandler);
  //     document.removeEventListener('mouseup', resizeMouseUpHandler);
  //     console.log('mouseup');
  
  
  //     console.log(isResizeActive);
  //     // setIsResizeActive(false);
  
  
  //     console.log('MU test value: ', test);
  //     test.current = false;
  
  
  //   }
  
  //   return (
  
  
  //     <SidebarContainer 
  //       className='sidebar-container'
  //       sidebarWidth={sidebarWidth}
  //     >
  //       <div className="sidebar-content">sdfhgdfs</div>
  
  
  //       <div className="sidebar-resize-container">
  //         <div className="sidebar-border"></div>
  //         <button className='sidebar-resize-button' onMouseDown={resizeMouseDownHandler}>
  //           <span></span>
  //         </button>
  //       </div>
  
        
  
  //     </SidebarContainer>
  //   )
  // }
  