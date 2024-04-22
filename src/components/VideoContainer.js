import { useState } from "react";
import styled from "styled-components"
import { MEDIA } from "../constants";

import playIcon from '../images/play.svg';
import thumbnail1 from '../images/thumbnail1.jpg';
import thumbnail2 from '../images/thumbnail2.jpg';
import thumbnail3 from '../images/thumbnail3.jpg';
import thumbnail4 from '../images/thumbnail4.jpg';
import thumbnail5 from '../images/thumbnail5.jpg';
import thumbnail6 from '../images/thumbnail6.jpg';
import thumbnail7 from '../images/thumbnail7.jpg';

const VideoContainerStyles = styled.div`
  position: fixed;
  height: 100%;
  width: 100vw;
  bottom: 0;
  left: 0;
  padding: 6em 1em calc(3em + var(--activeUsersHeight)) 1em;
  
  @media (min-width: ${MEDIA['large']}) {
    padding: 7em 2em calc(4em + var(--activeUsersHeight)) 2em;
  }
  
  .videoWrapper {
    width: 100%;
    height: 100%;
    border-radius: var(--defaultRadius);
    overflow: hidden;
    position: relative;

    &.notInitiated {
      video {
        filter: blur(10px);
      }
    }
  }
  
  video {
    /* width: 100%;
    height: 100%; */
    object-fit: cover;
  }

  button.play {
    text-indent: -9999em;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    /* margin-left: calc(50% - 3.5em);
    margin-top: calc(50% - 3.5em); */
    background: transparent url("${playIcon}") center no-repeat;
    background-size: 7em;
    border: none;
    animation: pulsateSize 2.5s infinite;
    filter: invert(1);
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
      filter: none;
    }
  }

  // Group of thumbnails in home screen
  ul.thumbnails {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto auto;
    border-radius: var(--defaultRadius);
    height: 100%;

    li {
      max-width: 100%;
      max-height: 100%;
      cursor: pointer;
      transition: all 0.5s;
      position: relative;

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
      &.blue2 {
        background: var(--colorBlue) url("${thumbnail7}") center no-repeat;
        background-size: cover;
      }
    }
  }
`;

const VideoContainer = ({selectedContentNodes, videoContainerRef}) => {
  const [initiated, setInitiated] = useState(false);

  const handleInitiate = () => {
    setInitiated(true);
    const mainVideo = document.getElementById('mainVideo');
    mainVideo.play();
  }

  const renderContentNodes = (ref) => {
    if (!ref || !ref.current) return null;
    const innerHTML = ref.current.innerHTML;
    return <ul className="thumbnails" dangerouslySetInnerHTML={{ __html: innerHTML }} />;
  };

  return <VideoContainerStyles ref={videoContainerRef}>
    
    <div className={`videoWrapper ${initiated ? '' : 'notInitiated'}`}>
      {/* If any contents is passed to the component we show it */}
      {selectedContentNodes && renderContentNodes(selectedContentNodes)}
      
      {/* Otherwise the default contents is this video */}
      {!selectedContentNodes && <video id="mainVideo" width="100%" height="100%">
        <source src="https://static.balthazaurus.com/iris-prototype.mp4?v=2" type="video/mp4" />
      </video>}
      
      {/* The user must interact with the app before we can play the video */}
      {!initiated && !selectedContentNodes 
        && <button type="button" className="play" onClick={handleInitiate}>Play</button>
      }
    </div>
  </VideoContainerStyles>
}

export default VideoContainer;