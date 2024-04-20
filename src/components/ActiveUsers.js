import styled from "styled-components";

import liveIconGreen from '../images/live-on.png';
import offlineIconRed from '../images/offline.png';
import { MEDIA } from "../constants";

const ActiveUsersStyles = styled.div`
  position: fixed;
  bottom: 1em;
  left: 1em;
  width: calc(100% - 2em);
  z-index: 10;
  background-color: var(--colorOverlay);
  border-radius: var(--defaultRadius);
  transition: all 0.5s;
  overflow: hidden;
  /* padding-right: 2em; */

  @media (min-width: ${MEDIA['large']}) {
    // On desktop we increase the main layout margin to 2em
    bottom: 2em;
    left: 2em;
    width: calc(100% - 4em);
  }

  &.navOpen {
    /* width: calc(100% - 8em);

    @media (min-width: ${MEDIA['large']}) {
      width: 33%;
    } */

    &::before {
      position: absolute;
      content: '';
      display: block;
      background-image: linear-gradient(to right, transparent, var(--colorPurple));
      width: 4em;
      height: 100%;
      right: 0;
      top: 0;
    }
  }

  .activeUsers {
    list-style: none;
    padding: 0.5em 0;
    margin: 0;
    overflow-y: hidden;
    overflow-x: hidden;
    text-align: left;
    display: flex;
    
    @media (max-width: ${MEDIA['medium']}) {
      overflow-x: auto;
    }

    li {
      white-space: nowrap;
      display: inline-block;
      padding-right: 1em;
      background: transparent url("${offlineIconRed}") 0.5em center no-repeat;
      background-size: 1em;
      margin-left: 1em;
      padding: 0.5em 1em 0.5em 2em;
      background-color: var(--colorPurple);
      border-radius: var(--defaultRadius);
      border: 1px solid var(--colorNeutral);

      &.online {
        background-image: url("${liveIconGreen}");
      }
    }
  }
`;

const ActiveUsers = ({isNavOpen}) => {
  return <ActiveUsersStyles className={`${isNavOpen ? 'navOpen' : ''}`}>
    <ul className="activeUsers">
      <li className="online">Guest (You)</li>
      <li className="online">Simon Balthazar</li>
      <li>Princess Momo</li>
      <li className="online">Andrii</li>
      <li>Lidia</li>
    </ul>
  </ActiveUsersStyles>;
}

export default ActiveUsers;