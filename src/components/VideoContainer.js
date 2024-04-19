import { useEffect, useState } from "react";
import styled from "styled-components"
import { MEDIA } from "../constants";

import playIcon from '../images/play.svg';
import videoContainerBackground from '../images/video-background.jpg';

const VideoContainerStyles = styled.div`
  position: fixed;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100); // Adapt to mobile
  width: 100vw;
  top: 0;
  left: 0;
  background: var(--colorPurple) url("${videoContainerBackground}") center no-repeat;
  background-size: cover;
  padding: 6em 1em 1em 1em;
  
  @media (min-width: ${MEDIA['large']}) {
    padding: 7em 2em 2em 2em;
  }
  
  .videoWrapper {
    width: 100%;
    height: 100%;
    border-radius: var(--defaultRadius);
    overflow: hidden;

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
    width: 7em;
    height: 7em;
    left: calc(50% - 3.5em);
    top: calc(50% - 3.5em);
    background: transparent url("${playIcon}") center no-repeat;
    background-size: contain;
    border: none;
    animation: pulsateSize 2.5s infinite;
    filter: invert(1);
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
      filter: none;
    }
  }
`;

const VideoContainer = ({isNavOpen}) => {
  const [initiated, setInitiated] = useState(false);

  const handleInitiate = () => {
    setInitiated(true);
    const mainVideo = document.getElementById('mainVideo');
    mainVideo.play();
  }
  
  useEffect(() => {
    const mainVideo = document.getElementById('mainVideo');
    if (isNavOpen && !mainVideo.paused) {
      mainVideo.pause();
      mainVideo.setAttribute('data-play-interrupted', 'true');
    }
    if (!isNavOpen && mainVideo.getAttribute('data-play-interrupted') === 'true') {
      mainVideo.play();
      mainVideo.setAttribute('data-play-interrupted', 'false');
    }
  }, [isNavOpen])

  return <VideoContainerStyles>
    <div className={`videoWrapper ${initiated ? '' : 'notInitiated'}`}>
      <video id="mainVideo" width="100%" height="100%">
        <source src="https://static.balthazaurus.com/iris-prototype.mp4?v=2" type="video/mp4" />
      </video>
      {!initiated && <button type="button" className="play" onClick={handleInitiate}>Play</button>}
    </div>
  </VideoContainerStyles>
}

export default VideoContainer;