import styled from "styled-components";

import playIcon from '../images/play.svg';
import thumbnail1 from '../images/thumbnail1.jpg';
import thumbnail2 from '../images/thumbnail2.jpg';
import thumbnail3 from '../images/thumbnail3.jpg';
import thumbnail4 from '../images/thumbnail4.jpg';
import thumbnail5 from '../images/thumbnail5.jpg';
import thumbnail6 from '../images/thumbnail6.jpg';
import thumbnail7 from '../images/thumbnail7.jpg';
import profileSister1 from '../images/profile-sister1.jpg';
import profileSister2 from '../images/profile-sister2.jpg';
import lockIconLight from '../images/lock-light.svg';
import liveIconGreen from '../images/live-on.png';
import homeIconLight from '../images/home-light.svg';
import { useEffect, useState } from "react";
// import homeIconBlue from '../images/home-blue.svg';
// import homeIconPink from '../images/home-pink.svg';
// import { MEDIA } from "../constants";

const NavItemStyles = styled.div`
  margin: 0.5em;
  max-width: max-content; // Avoid expanding to fill a wide cell
  min-width: 16em;

  .title {
    text-transform: uppercase;
  }

  // Hover state for title
  &:not(.disabled) {
    .title {
      cursor: pointer;
      transition: color 0.5s;
    
      &:hover {
        color: var(--colorBlue);
      }
    }
  }

  // Group of thumbnails in home screen
  ul.thumbnails {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: 8em 8em;
    grid-template-rows: calc(var(--nodeHeight) / 2) calc(var(--nodeHeight) / 2);

    li {
      width: 100%;
      height: 100%;
      cursor: pointer;
      transition: all 0.5s;
      position: relative;

      &::after {
        z-index: 1;
        display: block;
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        opacity: 0.5;
        transition: all 0.5s;
      }

      &.blue {
        background: var(--colorBlue) url("${thumbnail1}") center no-repeat;
        background-size: cover;
      }
      &.green {
        background: var(--colorGreen) url("${thumbnail2}") center no-repeat;
        background-size: cover;
      }
      &.pink {
        background: var(--colorPink) url("${thumbnail3}") center no-repeat;
        background-size: cover;
      }
      &.neutral {
        background: var(--colorNeutral) url("${thumbnail4}") center no-repeat;
        background-size: cover;
      }
      &.red {
        background: var(--colorPink) url("${thumbnail5}") center no-repeat;
        background-size: cover;
      }
      &.purple {
        background: var(--colorPurple) url("${thumbnail6}") center no-repeat;
        background-size: cover;
      }
      
      &:hover {
        border-color: var(--colorPink);

        &.blue::after {
          background-color: var(--colorBlue);
        }
        &.green::after {
          background-color: var(--colorGreen);
        }
        &.pink::after {
          background-color: var(--colorPink);
        }
        &.neutral::after {
          background-color: var(--colorNeutral);
        }
        &.red::after {
          background-color: var(--colorPink);
        }
        &.purple::after {
          background-color: var(--colorPurple);
        }

      }
    }
  }

  // Leaves on branch (storyline elements)
  ul.leaves {
    list-style: none;
    padding: 0 0 0.25em 0;
    display: inline-flex;

    li {
      display: block;
      color: var(--colorNeutral);
      transition: opacity 0.5s;
      white-space: nowrap;
      padding-right: 1em;
      cursor: pointer;
      position: relative;

      .name {
        opacity: 0.6;
        transition: opacity 0.5s;
      }
    }

    // Avatar of a person watching the piece of content at this leaf
    .watcher {
      position: absolute;
      width: 2em;
      height: 4em;
      border: 1px solid var(--colorGreen);
      border-radius: 0.25em;
      margin-top: -5em;
      margin-left: -3em;
      animation: pulsateOpacity 3s infinite;

      // These represent example users
      &.sister1 {
        background: transparent url("${profileSister1}") center no-repeat;
        background-size: cover;
      }
      &.sister2 {
        background: transparent url("${profileSister2}") center no-repeat;
        background-size: cover;
        margin-left: -0.75em;
      }
    }

    &:not(.disabled) li {
      &::before {
        display: block;
        content: '';
        height: 0.5em;
        background-color: var(--colorNeutral);
        border-radius: 0.25em;
        width: 100%;
        margin-bottom: 0.25em;
        opacity: 0.6;
        transition: opacity 0.5s;
      }

      &:hover {
        .name,
        &::before {
          opacity: 1;
        }
      }
    }
  }
  
  &.live,
  &.home {
    width: 16em;

    .title {
      margin-top: 0;
      margin-bottom: 0.5em;
      background: transparent url("${homeIconLight}") left no-repeat;
      background-size: 1em;
      padding-left: 1.5em;
      margin-left: 1em;
      margin-right: 1em;
      white-space: nowrap;
    }
    .contents {
      border-radius: var(--defaultRadius);
      border: 2px solid var(--colorNeutral);
      height: var(--nodeHeight);
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--colorOverlay);
      overflow: hidden;
    }
  }

  &.live {
    .title {
      color: var(--colorGreen);
      background-image: url("${liveIconGreen}");
      animation: pulsateOpacity 2.5s infinite;
    }

    .contents {
      border-color: var(--colorGreen);
    }
  }

  // Selected branch
  &.branch.expanded {
    .title {
      padding-left: 1em;
      color: var(--colorBlue);
    }

    /* .contents {
      padding-bottom: 2em;
    } */

    .leaves {
      padding: 0.5em 1em;
      height: var(--nodeHeight);
      border: 2px solid var(--colorBlue);
      border-radius: var(--defaultRadius);
      background-color: var(--colorPink);
      display: inline-flex;
      gap: 0.5em;
      margin-top: 0.5em;
      margin-bottom: 0;
      overflow: hidden;

      li {
        position: relative;
        background: transparent url("${thumbnail2}") center no-repeat;
        background-size: cover;
        border-radius: 0.25em;
        border: 1px solid var(--colorNeutral);
        width: 6em;
        flex-basis: 6em;
        height: 100%;
        flex-shrink: 0;
        white-space: normal;

        &.blue {
          background-image: url("${thumbnail1}");
        }
        &.pink {
          background-image: url("${thumbnail2}");
        }
        &.green {
          background-image: url("${thumbnail3}");
        }
        &.neutral {
          background-image: url("${thumbnail4}");
        }

        .name {
          /* position: absolute;
          top: calc(100% + 2em);
          width: 6em;
          z-index: 99; */
          display: none;
        }

        .watcher {
          margin-top: 1em;
          margin-left: 1em;
        }

        &::before {
          display: none;
        }

        &:hover {
          &::before {
            content: '';
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            background: transparent url("${playIcon}") center no-repeat;
            background-size: 4em;
          }
        }
      }
    }
  }

  // Disabled branch
  &.branch.disabled {
    .title {
      margin-top: 0;
      margin-bottom: 0.5em;
      background: transparent url("${lockIconLight}") left no-repeat;
      background-size: 1em;
      padding-left: 1.5em;
      margin-right: 1em;
    }
  }
  
  // Surrounding navigation is closed
  &.closed {    
    border-radius: var(--defaultRadius);
    border: 1px solid var(--colorNeutral);
    height: 100%;
    padding: 0.75em 1.5em 0.25em 0.5em;
    background-color: var(--colorOverlay);

    &:not(.home):not(.live) {
      display: none;
    }

    .contents {
      display: none;
    }
  }
`;

const colorOptions = ['red', 'purple', 'blue', 'pink', 'green', 'neutral'];

const NavItem = ({navItem, isNavOpen, setIsNavOpen, id, expandedBranches, setExpandedBranches}) => {
  const handleSelectItem = () => { 
    if (isNavOpen && navItem.type === 'branch' && !navItem.disabled) {
      if (expandedBranches.includes(id)) {
        // Remove id from expanded branches
        setExpandedBranches(expandedBranches.filter(branchId => branchId !== id));
      } else {
        // Add id to expanded branches
        setExpandedBranches([...expandedBranches, id])
      }
    }
  }

  const [randomColors, setRandomColors] = useState([]);
  useEffect(() => {
    const newColors = Array.from({length: 12}, () => colorOptions[Math.floor(Math.random() * colorOptions.length)]);
    setRandomColors(newColors);
  }, [])

  return <NavItemStyles 
    id={id} 
    className={`navItem ${navItem.type} ${isNavOpen ? 'open' : 'closed'} ${navItem.disabled ? 'disabled' : ''} ${expandedBranches.includes(id) ? 'expanded' : ''}`} 
    key={navItem.name}
  >
    <div className="title" role="navigation" onClick={handleSelectItem}>
      {navItem.name}
    </div>
    
    <div className="contents">
      {/* Thumbnails in a home screen */}
      {navItem.type === 'home' && <ul className="thumbnails">
        <li className={randomColors[0]} onClick={() => setIsNavOpen(false)} />
        <li className={randomColors[1]} onClick={() => setIsNavOpen(false)} />
        <li className={randomColors[2]} onClick={() => setIsNavOpen(false)} />
        <li className={randomColors[3]} onClick={() => setIsNavOpen(false)} />
      </ul>}
      
      {/* Items on a storyline (branch) */}
      {navItem.type === 'branch' 
      && navItem.leaves 
      && <ul className="leaves">
        {navItem.leaves.map((leaf, index) => {
          return <li key={`${id}-leaf-${index}`} onClick={() => setIsNavOpen(false)} className={randomColors[index]}>
            <span className="name" role="navigation">{leaf.name}</span>
            {leaf.watching && leaf.watching.map(watcher => <span className={`watcher ${watcher}`} />)}
          </li>
        })}
      </ul>}
      
      {/* Disabled storyline (branch) */}
      {navItem.type === 'branch' 
      && navItem.disabled 
      && <ul className="leaves disabled">
        <li>Starting 21 of May</li>
      </ul>}
    </div>

  </NavItemStyles>
}

export default NavItem;