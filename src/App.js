import { useEffect, useRef, useState } from 'react';
import NavContainer from './components/NavContainer';
import VideoContainer from './components/VideoContainer';
import ActiveUsers from './components/ActiveUsers';
import NavSizer from './components/NavSizer';
import navTree from './navigationTree';
import './App.css';
import { MEDIA } from './constants';

const navContainerMinHeight = 48;
const videoContainerMinHeight = 150;
const activeUsersHeight = 30;

function App() {
  const [selectedContentNodes, setSelectedContentNodes] = useState(null);
  const [isNavResizing, setIsNavResizing] = useState(false);
  const [navResizeStage, setNavResizeStage] = useState('closed');
  const [navResizeY, setNavResizeY] = useState('closed');
  const navContainerRef = useRef(null);
  const navSizerRef = useRef(null);
  const videoContainerRef = useRef(null);

  // Define --vh variable to get accurate viewport size on mobile
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  // ==== Handle row sizer drag interactions ====
  const handleStart = (e) => {
    // Exclude right mouse button click
    if (e.button !== undefined && e.button !== 0) {
      return;
    }

    const currentX = e.clientX || e.touches[0].clientX;
    const currentY = e.clientY || e.touches[0].clientY;

    // Check if currentX, currentY is within the bounds of navResizeRef element
    const navSizer = navSizerRef.current;
    const rect = navSizer.getBoundingClientRect();
    if (
      !(currentX >= rect.left &&
      currentX <= rect.right &&
      currentY >= rect.top &&
      currentY <= rect.bottom)
    ) {
      return;
    }

    setIsNavResizing(true);
    // Prevent text selection
    document.body.style.userSelect = 'none';
  };

  const handleMove = (e) => {
    if (!isNavResizing) return; // Ignore if drag hasn't started
    
    const navSizer = navSizerRef.current;
    const navContainer = navContainerRef.current;
    const videoContainer = videoContainerRef.current;
    const viewportHeight = window.innerHeight;
    const videoContainerExtraPadding = window.innerWidth > parseInt(MEDIA['large']) ? 36 : 25;
    
    // Get mouse/touch coordinates
    const currentY = e.clientY || (e.touches && e.touches[0].clientY);
    const relativePosY = currentY / viewportHeight;
    
    // Calculate new position for navSizer
    const newNavSizerTop = viewportHeight * relativePosY;
    // Calculate new height for navContainer (2px accounts for borders)
    const newNavContainerHeight = viewportHeight * relativePosY - navContainer.offsetTop - 2;
    // Calculate new videoContainer height (inverse of nav container height)
    const newVideoContainerPaddingTop = newNavContainerHeight + videoContainerExtraPadding + 2;
    
    // Check dimensions
    let restrictions = false;
    // Check navigation container min height
    if (newNavContainerHeight < navContainerMinHeight) restrictions = true;
    // Check video container min height
    if ((viewportHeight - newVideoContainerPaddingTop - activeUsersHeight) < videoContainerMinHeight) restrictions = true;

    // Apply changes
    if (!restrictions) {
      navSizer.style.top = `${newNavSizerTop}px`;
      navContainer.style.height = `${newNavContainerHeight}px`;
      videoContainer.style.paddingTop = `${newVideoContainerPaddingTop}px`;
      setNavResizeY(currentY);

      // Change the resize stage of the navigation as it hits specific breakpoints
      if (newNavContainerHeight < 100) setNavResizeStage('closed');
      if (newNavContainerHeight >= 100) setNavResizeStage('semi-closed');
      if (newNavContainerHeight > 200) setNavResizeStage('open');
    }
  };

  const handleEnd = () => {
    setNavResizeY(0);
    setIsNavResizing(false);
    // Re-enable text selection
    document.body.style.userSelect = '';
  };

  const handleTouchMove = (e) => {
    // e.preventDefault();
    handleMove(e, true);
  };
  // ===== End interaction handlers ====

  return (
    <div 
      className="App"
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onTouchEnd={handleEnd}
      onTouchMove={handleTouchMove}
    >
      <NavContainer 
        navTree={navTree}
        navResizeStage={navResizeStage}
        navContainerRef={navContainerRef}
        navResizeY={navResizeY}
        setSelectedContentNodes={setSelectedContentNodes}
      />
      <NavSizer navSizerRef={navSizerRef} />
      <VideoContainer videoContainerRef={videoContainerRef} selectedContentNodes={selectedContentNodes} />
      <ActiveUsers />
    </div>
  );
}

export default App;
