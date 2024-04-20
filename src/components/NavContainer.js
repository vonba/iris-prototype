import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import styled from "styled-components";

import navContainerBackground from '../images/nav-background.jpg';
import unfoldMore from '../images/unfold-more.svg';
import unfoldLess from '../images/unfold-less.svg';
import { MEDIA } from "../constants";

const NavContainerStyles = styled.div`
  position: fixed;
  z-index: 9;
  width: calc(100% - 2em);
  border-radius: var(--defaultRadius);
  top: 1em;
  left: 1em;
  overflow: hidden;
  transition: height 0.5s;
  background: var(--colorPurple) url("${navContainerBackground}") center no-repeat;
  background-size: cover;

  @media (min-width: ${MEDIA['large']}) {
    top: 2em;
    left: 2em;
    width: calc(100% - 4em);
  }

  .toggleNavigation {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 4em;
    height: 4em;
    border: none;
    color: var(--colorPurple);
    background: var(--colorPurple) url("${unfoldMore}") center no-repeat;
    background-size: 1.5em;
    padding: 1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.5s;
    text-indent: -9999em;
    
    @media (min-width: ${MEDIA['large']}) {
      &:hover {
        background-color: var(--colorBlue);
      }
    }
  }

  .treeWrapper {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100%;
    min-height: 100%;
  }

  .treeGrid {
    display: grid;
    /* position: relative; */
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

  &.closed {
    height: 4em;

    .cell-link {
      display: none;
    }

    .treeGrid {
      display: flex;
    }

    .toggleNavigation::before {
      content: '';
      display: block;
      position: absolute;
      height: 4em;
      width: 1em;
      left: -1em;
      top: 0;
      background-image: linear-gradient(to right, transparent, var(--colorPurple));
    }
  }

  &.open {
    /* height: calc(100vh - 2em); */
    // Using the --vh variable which is set through JS to get accurate viewport height on mobile devices
    height: calc(var(--vh, 1vh) * 100 - var(--minVideoHeight) - var(--activeUsersHeight));
    
    // Allow for nav bar on phone
    /* @media (max-width: ${MEDIA['large']}) {
      height: calc(var(--vh, 1vh) * 100 - 2em);
    } */
    
    @media (min-width: ${MEDIA['large']}) {
      // On desktop we increase the main layout margin to 2em
      bottom: 2em;
      height: calc(100vh - 2em - var(--minVideoHeight) - var(--activeUsersHeight));
    }

    .treeGrid {
      min-width: 1500px;
      min-height: 1000px;
    }

    .toggleNavigation {
      border-top-left-radius: var(--defaultRadius);
      background-image: url("${unfoldLess}");
      border-top: 1px solid var(--colorNeutral); 
      border-left: 1px solid var(--colorNeutral); 
    }
  }
`;

const NavContainer = ({ navTree, isNavOpen, setIsNavOpen }) => {

  const [startXY, setStartXY] = useState([0,0]);
  const [dragStarted, setDragStarted] = useState(false);
  
  const defaultExpandedBranches = ['cell-1-8', 'cell-5-8']; // Hardcoded starting state for our prototype
  const [expandedBranches, setExpandedBranches] = useState(defaultExpandedBranches);

  const treeWrapperRef = useRef(null);
  const navContainerRef = useRef(null);

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
    if (!isNavOpen && (newLeft + treeWrapper.offsetWidth) < (navContainerRef.current.offsetWidth - 100)) return;
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

  const handleNavToggle = (event) => {
    setIsNavOpen(!isNavOpen);
    // Blur the button
    const buttonElement = event.target;
    buttonElement.blur();
  }

  const handleWheel = (e) => {  
    // Modify treeWrapper's position based on the wheel delta
    const treeWrapper = treeWrapperRef.current;
    treeWrapper.style.left = `${treeWrapper.offsetLeft - e.deltaX}px`; // Horizontal movement
    if (isNavOpen) {
      treeWrapper.style.top = `${treeWrapper.offsetTop - e.deltaY}px`; // Vertical movement
    }
    // TODO: constrain horizontally when !isNavOpen
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

  // Set size and position of link elements when any expanded state changes
  useEffect(() => {
    const setLinkBoxPosition = () => {
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

    setLinkBoxPosition();

    // Update on resize 
    window.addEventListener('resize', setLinkBoxPosition);

    // Clean up
    return () => {
      window.removeEventListener('resize', setLinkBoxPosition);
    };
  }, [isNavOpen, expandedBranches]);

  // Reset when opening/closing
  useEffect(() => {
    if (!isNavOpen) {
      const treeWrapper = treeWrapperRef.current;
      treeWrapper.style.left = '0px';
      treeWrapper.style.top = '0px';
    } else {
      centerTree();
    }
  }, [isNavOpen])

  return (
    <NavContainerStyles
      id="navContainer"
      className={isNavOpen ? 'open' : 'closed'}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onTouchEnd={handleEnd}
      onTouchMove={handleTouchMove}
      onWheel={handleWheel}
      ref={navContainerRef}
      // onTouchStart={handleStart}
      // onTouchEnd={handleEnd}
    >
      <div className="treeWrapper" ref={treeWrapperRef}>
        <div className="treeGrid" style={treeGridStyles}>
          {/* {navTree.map(navItem => showNavItem(navItem))} */}
          {navTree.map((navRow, indexRow) => {
            return navRow.map((navItem, indexColumn) => {
              const navItemId = `cell-${indexColumn + 1}-${indexRow + 1}`;
              return <>
                
                {/* Add a navigation item in this cell */}
                {navItem.name 
                  ? <NavItem 
                      navItem={navItem} 
                      isNavOpen={isNavOpen}
                      setIsNavOpen={setIsNavOpen}
                      id={navItemId} 
                      key={navItemId}
                      expandedBranches={expandedBranches}
                      setExpandedBranches={setExpandedBranches}
                    /> 
                  : null
                }
                
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
                    id={`cell-link-${indexColumn}-${indexRow}-${index}`}
                    key={`cell-link-${indexColumn}-${indexRow}-${index}`}
                    className={`cell-link ${corner}`} 
                    data-orientation={corner}
                    data-parent-id={`cell-${indexColumn + 1}-${indexRow + 1}`} 
                    data-child-id={`cell-${child[0]}-${child[1]}`}
                  />;
                }) : null}

                {/* Nothing in this cell, add an empty cell */}
                {!navItem.name ? <div className="empty-cell" id={`cell-${indexColumn + 1}-${indexRow + 1}`} key={`cell-${indexColumn + 1}-${indexRow + 1}`} /> : null}
              </>
            })
          })}
        </div>
      </div>
      <button className="toggleNavigation" type="button" onClick={handleNavToggle}>
        {isNavOpen ? 'Close' : 'Open'}
      </button>
    </NavContainerStyles>
  );
};

export default NavContainer;
