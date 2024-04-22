import styled from "styled-components";

import { MEDIA } from "../constants";

const NavSizerStyles = styled.button`
    --navButtonWidth: 8em;
    --topDistance: 61px;

    position: absolute;
    z-index: 10;
    left: calc(50% - (var(--navButtonWidth) / 2));
    top: var(--topDistance);
    /* margin-top: calc(var(--topDistance) - 1px); */
    width: var(--navButtonWidth);
    height: 0.75em;
    border: none;
    background-color: var(--colorBlue);
    text-transform: uppercase;
    text-indent: -9999em;
    border-radius: var(--defaultRadius);
    cursor: row-resize;

    &::before {
      display: block;
      position: absolute;
      content: '';
      top: 2%.5;
      left: 32px;
      width: calc(100% - 64px);
      border-top: 4px solid var(--colorNeutral);
      border-radius: 4px;
    }
    
    @media (min-width: ${MEDIA['large']}) {
      --topDistance: 73px;

      &:hover {
        background-color: var(--colorPink);
      }
    }
`;

const NavSizer = ({navSizerRef}) => {

  return  <NavSizerStyles 
    className="toggleNavigation" 
    type="button"
    ref={navSizerRef}
  >
    Navigation size
  </NavSizerStyles>
}

export default NavSizer;