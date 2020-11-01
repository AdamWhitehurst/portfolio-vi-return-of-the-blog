import styled from 'styled-components';
import { ReactComponent as SVG } from './signature.svg';

export const Sgntr = styled(SVG)`
  position: absolute;
  right: 0;
  top: 10px;
  height: 70px;
  z-index: -99;

  & #sig-path {
    fill: none;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 4;
    stroke-opacity: 50%;
    stroke: goldenrod;
    /* stroke-dasharray: 1200;
    stroke-dashoffset: 1200; */
    /* animation: draw 20s linear infinite; */
    /* animation-timing-function: linear; */
  }

  /* @keyframes draw {
    15% {
      stroke-dashoffset: 160;
    }
    16% {
      stroke-dashoffset: 105;
    }
    20.5% {
      stroke-dashoffset: 63;
    }
    24% {
      stroke-dashoffset: 0;
    }
    90% {
      stroke-dashoffset: 0;

    }
    100% {
      stroke-dashoffset: -1200;

    } */
  }
`;
