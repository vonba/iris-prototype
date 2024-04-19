// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import NavContainer from './components/NavContainer';
import VideoContainer from './components/VideoContainer';
import navTree from './navigationTree';
import './App.css';
import ActiveUsers from './components/ActiveUsers';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

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
