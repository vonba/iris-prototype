// import logo from './logo.svg';
import { useState } from 'react';
import NavContainer from './components/NavContainer';
import VideoContainer from './components/VideoContainer';
import navTree from './navigationTree';
import './App.css';
import ActiveUsers from './components/ActiveUsers';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

    // if (isNavOpen && deltaY < -touchThreshold) {
    //   setIsNavOpen(false); // Collapse the nav if deltaY is negative and nav is open
    // } else if (!isNavOpen && deltaY > touchThreshold) {
    //   setIsNavOpen(true); // Expand the nav if deltaY is positive and nav is closed
    // }


  return (
    <div 
      className="App"
    >
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <NavContainer 
        navTree={navTree}
        isNavOpen={isNavOpen} 
        setIsNavOpen={setIsNavOpen} 
      />
      <VideoContainer isNavOpen={isNavOpen} />
      <ActiveUsers isNavOpen={isNavOpen} />
    </div>
  );
}

export default App;
