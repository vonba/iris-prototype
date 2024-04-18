import styled from "styled-components";

import lockIconLight from '../images/lock-light.svg';
import liveIconGreen from '../images/live-on.png';
import homeIconLight from '../images/home-light.svg';
// import homeIconBlue from '../images/home-blue.svg';
// import homeIconPink from '../images/home-pink.svg';
// import { MEDIA } from "../constants";

const NavItemStyles = styled.div`
  margin: 0.5em;
  max-width: max-content; // Avoid expanding to fill a wide cell
  min-width: 200px;

  .title {
    text-transform: uppercase;
    margin-top: 0.5em;
  }
  
  &.live,
  &.home {
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
      padding: 1em;
      border-radius: var(--defaultRadius);
      border: 2px solid var(--colorNeutral);
      height: var(--nodeHeight);
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--colorOverlay);
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

  ul.thumbnails {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: 7em 7em;
    grid-template-rows: 2.5em 2.5em;
    grid-column-gap: 0.5em;
    grid-row-gap: 0.25em;

    li {
      width: 100%;
      height: 100%;
      border-radius:  var(--defaultRadius);
      border: 1px solid var(--colorNeutral);
      cursor: pointer;
      transition: all 0.5s;

      &:hover {
        border-color: var(--colorPink);

        &.blue {
          background-color: var(--colorBlue);
        }
        &.green {
          background-color: var(--colorGreen);
        }
        &.pink {
          background-color: var(--colorPink);
        }
      }
    }
  }

  ul.pills {
    list-style: none;
    padding: 0 0 0.25em 0;
    display: flex;

    li {
      display: block;
      color: var(--colorNeutral);
      opacity: 0.6;
      transition: opacity 0.5s;
      white-space: nowrap;
      padding-right: 1em;
      cursor: pointer;
    }

    &:not(.disabled) li {
        &:hover {
          opacity: 1;
        }
  
        &::before {
          display: block;
          content: '';
          height: 0.5em;
          background-color: var(--colorNeutral);
          border-radius: 0.25em;
          width: 100%;
          margin-bottom: 0.25em;
        }
      }
  }
`;

const NavItem = ({navItem, isNavOpen, id}) => {
  return <NavItemStyles id={id} className={`navItem ${navItem.type} ${isNavOpen ? 'open' : 'closed'} ${navItem.disabled ? 'disabled' : ''}`} key={navItem.name}>
    <div className="title">
      {navItem.name}
    </div>
    <div className="contents">
      {navItem.type === 'home' && <ul className="thumbnails">
        <li className="blue" />
        <li className="pink" />
        <li className="green" />
        <li className="blue" />
      </ul>}
      {navItem.type === 'branch' && navItem.leaves && <ul className="pills">
        {navItem.leaves.map((leaf) => {
          return <li>{leaf.name}</li>
        })}
      </ul>}
      {navItem.type === 'branch' && navItem.disabled && <ul className="pills disabled">
        <li>Starting 21 of May</li>
      </ul>}
    </div>
  </NavItemStyles>
}

export default NavItem;