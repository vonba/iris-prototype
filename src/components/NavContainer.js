import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import styled from "styled-components";

import navContainerBackground from '../images/nav-background.jpg';
// import unfoldMore from '../images/unfold-more.svg';
// import unfoldLess from '../images/unfold-less.svg';
import { MEDIA } from "../constants";

const NavContainerStyles = styled.div`
  --navContainerMinHeight: 48px;

  position: fixed;
  z-index: 9;
  width: calc(100% - 2em);
  height: var(--navContainerMinHeight); // Starting height
  border-radius: var(--defaultRadius);
  top: 1em;
  left: 1em;
  overflow: hidden;
  background: var(--colorPurple) url("${navContainerBackground}") center no-repeat;
  background-size: cover;

  @media (min-width: ${MEDIA['large']}) {
    top: 2em;
    left: 2em;
    width: calc(100% - 4em);
  }

  .treeWrapper {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100%;
    min-height: 100%;
  }

  .cell-link {
    position: absolute;
    
    &.top-left,
    &.top-right {
      border-top: 1px solid var(--colorNeutral);
      border-left: 1px solid var(--colorNeutral);
      border-top-left-radius: var(--defaultRadius);
    }
    &.bottom-left,
    &.bottom-right {
      border-bottom: 1px solid var(--colorNeutral);
      border-left: 1px solid var(--colorNeutral);
      border-bottom-left-radius: var(--defaultRadius);
    }
  }

  &.closed,
  &.semi-closed {
    // Gradient for overflow
    &::after {
      content: '';
      display: block;
      position: absolute;
      height: 100%;
      width: 3em;
      right: 0;
      top: 0;
      background-image: linear-gradient(to right, transparent, var(--colorPurple));
    }
  }

  &.semi-closed,
  &.closed {
    .cell-link {
      display: none;
    }

    .treeGrid {
      display: flex;
    }
  }

  &.semi-closed {

  }

  &.open {
    .treeGrid {
      display: grid;
      min-width: 1500px;
      min-height: 1000px;
    }
  }
`;

const NavContainer = ({ navContainerRef, navTree, navResizeStage, navResizeY, setSelectedContentNodes }) => {

  const isNavOpen = navResizeStage === 'open';

  const [startXY, setStartXY] = useState([0,0]);
  const [dragStarted, setDragStarted] = useState(false);
  
  const defaultExpandedBranches = ['cell-1-8', 'cell-5-8']; // Hardcoded starting state for our prototype
  const [expandedBranches, setExpandedBranches] = useState(defaultExpandedBranches);

  const treeWrapperRef = useRef(null);

  // ==== Handle map drag interactions ====
  const handleStart = (e) => {
    // Exclude right mouse button click
    if (e.button !== undefined && e.button !== 0) {
      return;
    }

    setStartXY([
      e.clientX || e.touches[0].clientX,
      e.clientY || e.touches[0].clientY
    ]);
    setDragStarted(true);
    // Prevent text selection
    document.body.style.userSelect = 'none';
  };

  const handleMove = (e, isTouch = false) => {
    if (!dragStarted && !isTouch) return; // Ignore if drag hasn't started
    
    const treeWrapper = treeWrapperRef.current;
    
    // Get mouse/touch coordinates
    const currentX = e.clientX || e.touches[0].clientX;
    const currentY = e.clientY || e.touches[0].clientY;
    const deltaX = currentX - startXY[0];
    const deltaY = currentY - startXY[1];
  
    let newLeft = treeWrapper.offsetLeft + deltaX;
    
    // Don't move beyond horizontal boundaries
    if (!isNavOpen && newLeft > 0) newLeft = 0;
    if (!isNavOpen && (newLeft + treeWrapper.offsetWidth) < (navContainerRef.current.offsetWidth - 24)) return;
    treeWrapper.style.left = `${newLeft}px`;

    // Only do vertical movement if nav is open
    if (isNavOpen) {
      const newTop = treeWrapper.offsetTop + deltaY;
      treeWrapper.style.top = `${newTop}px`;
    }

    setStartXY([currentX, currentY]);
  };

  const handleEnd = () => {
    setStartXY([0,0]);
    setDragStarted(false);
    // Re-enable text selection
    document.body.style.userSelect = '';
  };

  const handleWheel = (e) => {  
    // Modify treeWrapper's position based on the wheel delta
    const treeWrapper = treeWrapperRef.current;
    
    // Don't move beyond horizontal boundaries
    let newLeft = treeWrapper.offsetLeft - e.deltaX;
    if (!isNavOpen && newLeft > 0) newLeft = 0;
    if (!isNavOpen && (newLeft + treeWrapper.offsetWidth) < (navContainerRef.current.offsetWidth - 24)) return;
    
    treeWrapper.style.left = `${newLeft}px`; // Horizontal movement
    if (isNavOpen) {
      treeWrapper.style.top = `${treeWrapper.offsetTop - e.deltaY}px`; // Vertical movement
    }
  };
  
  const handleTouchMove = (e) => {
    // e.preventDefault();
    handleMove(e, true);
  };
  // ===== End interaction handlers ====

  // Format navigation grid
  const navColumns = navTree[0].length;
  const navRows = navTree.length;
  const treeGridStyles = {
    gridTemplateColumns: `repeat(${navColumns}, auto)`, 
    gridTemplateRows: `repeat(${navRows}, auto)`
  };

  const centerTree = () => {
    // Reset position when closing
    const treeWrapper = treeWrapperRef.current;
    treeWrapper.style.left = `-${treeWrapper.offsetWidth / 4}px`;
    treeWrapper.style.top = `-${treeWrapper.offsetHeight / 4}px`;
  }

  const setLinkBoxPositions = () => {
    const linkBoxes = document.querySelectorAll('.cell-link');
    linkBoxes.forEach(linkBox => {
      const parentId = linkBox.getAttribute('data-parent-id');
      const childId = linkBox.getAttribute('data-child-id');
      const parentCell = document.getElementById(parentId);
      const childCell = document.getElementById(childId);
      
      if (parentCell && childCell) {
        const parentRect = parentCell.getBoundingClientRect();
        const parentBox = {
          top: parentCell.offsetTop, 
          left: parentCell.offsetLeft,
          right: parentCell.offsetLeft + parentRect.width,
          bottom: parentCell.offsetTop + parentRect.height,
          width: parentRect.width, 
          height: parentRect.height
        };
        const childRect = childCell.getBoundingClientRect();
        const childBox = {
          top: childCell.offsetTop, 
          left: childCell.offsetLeft, 
          right: childCell.offsetLeft + childRect.width,
          bottom: childCell.offsetTop + childRect.height,
          width: childRect.width, 
          height: childRect.height
        };
        
        // Calculate position and dimensions based on orientation
        const horizontalTuck = 40;
        const titleHeightTuck = 20;
        const gap = 10;
        const orientation = linkBox.getAttribute('data-orientation');
        let top, left, height, width;
        switch (orientation) {
          case 'top-right':
            top = childBox.bottom - (childBox.height * 0.5);
            left = parentBox.right - horizontalTuck;
            height = parentBox.top - top + titleHeightTuck;
            width = childBox.left - parentBox.right + horizontalTuck - gap;
            break;
          case 'bottom-right':
            top = parentBox.bottom;
            left = parentBox.right - horizontalTuck;
            height = childBox.top - parentBox.bottom + (childBox.height * 0.5);
            width = childBox.left - parentBox.right + horizontalTuck - gap;
            break;
          case 'bottom-left':
            top = parentBox.bottom;
            left = parentBox.left + horizontalTuck;
            height = childBox.top - parentBox.bottom + (childBox.height * 0.5);
            width = childBox.left - parentBox.left - horizontalTuck - gap;
            break;
          case 'top-left':
            top = childBox.bottom - (childBox.height * 0.5); // Center left
            left = parentBox.left + horizontalTuck;
            height = parentBox.top - top;
            width = childBox.left - parentBox.left - horizontalTuck - gap;
            break;
          default: break;
        }
      
        // Set styles
        linkBox.style.top = `${top}px`;
        linkBox.style.left = `${left}px`;
        linkBox.style.height = `${height}px`;
        linkBox.style.width = `${width}px`;
      }
    });
  };

  // Set size and position of link elements when any expanded state changes
  useEffect(() => {
    setLinkBoxPositions();

    // Update on resize 
    window.addEventListener('resize', setLinkBoxPositions);

    // Clean up
    return () => {
      window.removeEventListener('resize', setLinkBoxPositions);
    };
  }, []);
  
  useEffect(() => {
    setLinkBoxPositions();
  }, [navResizeStage, navResizeY, expandedBranches]);


  // Reset when opening/closing
  useEffect(() => {
    if (navResizeStage !== 'open') {
      const treeWrapper = treeWrapperRef.current;
      treeWrapper.style.left = '0px';
      treeWrapper.style.top = '0px';
    }
    if (navResizeStage === 'open') {
      centerTree();
    }
  }, [navResizeStage])

  return (
    <NavContainerStyles
      id="navContainer"
      className={navResizeStage}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onTouchEnd={handleEnd}
      onTouchMove={handleTouchMove}
      onWheel={handleWheel}
      ref={navContainerRef}
    >
      <div className="treeWrapper" ref={treeWrapperRef}>
        <div className="treeGrid" style={treeGridStyles}>
          {/* {navTree.map(navItem => showNavItem(navItem))} */}
          {navTree.map((navRow, indexRow) => {
            return navRow.map((navItem, indexColumn) => {
              const navItemId = `cell-${indexColumn + 1}-${indexRow + 1}`;
                
              // Add a navigation item in this cell
              if(navItem.name) { 
                return <NavItem 
                  navItem={navItem} 
                  navResizeStage={navResizeStage}
                  id={navItemId} 
                  key={navItemId}
                  expandedBranches={expandedBranches}
                  setExpandedBranches={setExpandedBranches}
                  setSelectedContentNodes={setSelectedContentNodes}
                >
                  {/* If this item has children, add link elements */}
                  {navItem.children ? navItem.children.map((child, index) => {
                    if (!child) return null;
                    const corners = {
                      0: 'top-right',
                      1: 'bottom-right',
                      2: 'bottom-left',
                      3: 'top-left',
                    };
                    const corner = corners[index];
                    return <div 
                      id={`${navItemId}-link-${index}`}
                      key={`${navItemId}-link-${index}`}
                      className={`cell-link ${corner}`} 
                      data-orientation={corner}
                      data-parent-id={navItemId} 
                      data-child-id={`cell-${child[0]}-${child[1]}`}
                    />;
                  }) : null}
                </NavItem> 
              }

              //  Nothing in this cell, add an empty element
              return <div className="empty-cell" id={navItemId} key={navItemId} />
            })
          })}
        </div>
      </div>
    </NavContainerStyles>
  );
};

export default NavContainer;
