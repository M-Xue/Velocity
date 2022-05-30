import React, { useState } from 'react'
import './sidebar.css'

import styled from 'styled-components';



const SidebarContainer = styled.div.attrs((props: any) => ({
  style: {
    width: props.sidebarWidth,
  }
}))` 
`



export default function Sidebar() {

  const [originalSidebarWidth, setOriginalSidebarWidth] = useState(267) // Need to make this based on local storage
  const [sidebarWidth, setsidebarWidth] = useState(originalSidebarWidth);

  const [originalMousePositionX, setOriginalMousePositionX] = useState(sidebarWidth)
  

  const [isResizeActive, setIsResizeActive] = useState(false)


  const resizeMouseDownHandler = (e: any) => {
    setOriginalMousePositionX(e.clientX);
    document.addEventListener('mousemove', resizeMouseMoveHandler);
    document.addEventListener('mouseup', resizeMouseUpHandler);
  
    document.body.style.cursor = "ew-resize"; // Theres a bug here where the style of the cursor changes to default when you move outside the sidebar

    console.log('mousedown');


    setIsResizeActive(true);

  }
  


  const resizeMouseMoveHandler = (e: any) => {
    if (originalMousePositionX) {
      const mouseMovementX = e.clientX - originalMousePositionX;
      const newWidth = originalSidebarWidth + mouseMovementX;
      setsidebarWidth(newWidth)
      console.log(sidebarWidth);

    }
    

    console.log('mousemove');
  }


  const resizeMouseUpHandler = (e:any) => {
    setOriginalSidebarWidth(sidebarWidth);
    document.body.style.cursor = "default"; 

    document.removeEventListener('mousemove', resizeMouseMoveHandler);
    document.removeEventListener('mouseup', resizeMouseUpHandler);
    console.log('mouseup');


    console.log(isResizeActive);
    // setIsResizeActive(false);

  }


  


  return (


    <SidebarContainer 
      className='sidebar-container'
      sidebarWidth={sidebarWidth}
    >
      <div className="sidebar-content">sdfhgdfs</div>


      <div className="sidebar-resize-container">
        <div className="sidebar-border"></div>
        <button className='sidebar-resize-button' onMouseDown={resizeMouseDownHandler}>
          <span></span>
        </button>
      </div>

      

    </SidebarContainer>
  )
}






















/* <Resizable
        style={style}
        defaultSize={{
          width: 200,
          height: 200
        }}
      >
        001
      </Resizable> */






// * ////// OG
      // export default function Sidebar() {

  
  
      //   return (
      
      
      //     <div className='sidebar-container'>
      
      
      
      //       <div className="sidebar-content"></div>
      
      
      //       <div className="sidebar-resize-container">
      //         <div className="sidebar-border"></div>
      //         <button className='sidebar-resize-button' >
      //           <span></span>
      //         </button>
      //       </div>
      
            
      
      //     </div>
      //   )
      // }

// * //


























      // {/* <button className='collapse-button'>
      //   <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M10.294 9.698a.988.988 0 010-1.407 1.01 1.01 0 011.419 0l2.965 2.94a1.09 1.09 0 010 1.548l-2.955 2.93a1.01 1.01 0 01-1.42 0 .988.988 0 010-1.407l2.318-2.297-2.327-2.307z" fill="currentColor" fill-rule="evenodd"></path></svg>
      // </button> */}






// // const [sidebarFlyoutWidth, setSidebarFlyoutWidth] = useState(sidebarElementRef.current?.clientWidth)
//   // const resizeButtonRef = useRef<HTMLButtonElement>(null);


//   const sidebarElementRef = useRef<HTMLDivElement>(null);

//   const [sidebarWidth, setSidebarWidth] = useState(267)

//   const [currMousePositionX, setCurrMousePositionX] = useState(0)
//   const [originalWidth, setOriginalWidth] = useState(0)










//   useEffect(() => {
//     console.log(sidebarWidth);

//   }, [sidebarWidth])
  


  
//   const resizeMouseDownHandler = (e: any) => {
//     // console.log('mousedown');
    
//     setCurrMousePositionX(e.clientX);


//     sidebarElementRef.current && setOriginalWidth(sidebarElementRef.current?.clientWidth)



//     sidebarElementRef.current && sidebarElementRef.current.addEventListener('mousemove', resizeMouseMoveHandler);
//     sidebarElementRef.current && sidebarElementRef.current.addEventListener('mouseup', resizeMouseUpHandler);



//   }


//   const resizeMouseMoveHandler = (e: any) => {
//     const dx = e.clientX - currMousePositionX;



//     originalWidth && setSidebarWidth(dx + originalWidth);
//     // console.log('mousemove');
//   }


//   const resizeMouseUpHandler = (e: any) => {
//     // console.log('mouseup');

//     sidebarElementRef.current && sidebarElementRef.current.removeEventListener('mousemove', resizeMouseMoveHandler);
//     sidebarElementRef.current && sidebarElementRef.current.removeEventListener('mouseup', resizeMouseUpHandler);
//   }
  



  


//   // This event handler is just for edge case scenario. If the users mouse leaves the resize button, the mousemove event should be removed so you don't keep adjusting the width of the sidebar.
//   // const resizeMouseLeaveHandler = (e: any) => {
//   //   console.log('mouseleave');
//   //   sidebarElementRef.current && sidebarElementRef.current.removeEventListener('mousemove', resizeMouseMoveHandler);
//   //   sidebarElementRef.current && sidebarElementRef.current.removeEventListener('mouseup', resizeMouseUpHandler);
//   // }

//   //onMouseLeave={resizeMouseLeaveHandler}




// return (
//   <div className='sidebar-container' ref={sidebarElementRef} style={{width: sidebarWidth}}>

//     <div className="sidebar-content"></div>


//     <div className="sidebar-resize-container">
//       <div className="sidebar-border"></div>
//       <button className='sidebar-resize-button'  onMouseDown={resizeMouseDownHandler}>
//         <span></span>
//       </button>
//     </div>





//     {/* <button className='collapse-button'>
//       <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M10.294 9.698a.988.988 0 010-1.407 1.01 1.01 0 011.419 0l2.965 2.94a1.09 1.09 0 010 1.548l-2.955 2.93a1.01 1.01 0 01-1.42 0 .988.988 0 010-1.407l2.318-2.297-2.327-2.307z" fill="currentColor" fill-rule="evenodd"></path></svg>
//     </button> */}

//   </div>
// )