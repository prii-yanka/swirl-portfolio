import React, { useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import useResizeObserver from '@react-hook/resize-observer';
import { styled } from '@mui/material/styles';
import { DraggableContainer } from './DraggableContainer';

interface Props {
  index: number;
  open: boolean;
  satelliteCount: number;
  children?: React.ReactNode;
  planetWidth: number;
  planetHeight: number;
  mass: number;
  tension: number;
  friction: number;
  orbitRadius: number;
  rotation: number;
  draggable: boolean;
  dragRadius?: number;
  orientation?: 'DEFAULT' | 'INSIDE' | 'OUTSIDE' | 'READABLE';
}

interface SatelliteStyleProps {
  style: {
    top: any;  // Use 'any' or a more specific type if you know the structure
    left: any; // Same here
    opacity: any; // And here
    transform?: string;
  };
}

const SatelliteDiv = styled(animated.div)({
  position: 'absolute',
  zIndex: 100,
  // You can add default styles here if needed
});

export function Satellite(props: Props) {
  const {
    children,
    index,
    satelliteCount,
    open,
    planetWidth,
    planetHeight,
    tension,
    friction,
    mass,
    orbitRadius,
    rotation,
    draggable,
    dragRadius,
    orientation,
  } = props;


  const ref = useRef(null); // Create a ref for the target element
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useResizeObserver(ref, (entry) => {
    setWidth(entry.contentRect.width);
    setHeight(entry.contentRect.height);
  });

  const position = useSpring({
    reverse: !open,
    from: getInitialSatellitePosition(width, height, planetWidth, planetHeight),
    to: getFinalSatellitePosition(
      index,
      satelliteCount,
      width,
      height,
      planetWidth,
      planetHeight,
      orbitRadius,
      rotation,
      orientation
    ),
    config: { mass, tension, friction },
  });

  return (
    <SatelliteDiv style={position}>
      <DraggableContainer
        on={draggable}
        dragRadius={dragRadius}
        draggable={draggable}
      >
        <div ref={ref}>{children}</div>
      </DraggableContainer>
    </SatelliteDiv>
  );
}

// ... (keep the rest of the functions the same)
function getFinalSatellitePosition(
  index: number,
  satelliteCount: number,
  width: number,
  height: number,
  planetWidth: number,
  planetHeight: number,
  orbitRadius: number,
  rotation: number,
  orientation: "DEFAULT" | "INSIDE" | "OUTSIDE" | "READABLE" | undefined
) {
  let { deltaX, deltaY, angle } = getFinalDeltaPositions(
    index,
    satelliteCount,
    width,
    height,
    orbitRadius,
    rotation
  );

  let transform = {};
  switch (orientation) {
    case "OUTSIDE":
      transform = { transform: "rotate(" + angle + "deg)" };
      break;
    case "INSIDE":
      transform = { transform: "rotate(" + (angle + 180) + "deg)" };
      break;
    case "READABLE":
      transform =
        angle > 90 && angle < 270
          ? { transform: "rotate(" + (angle + 180) + "deg)" }
          : { transform: "rotate(" + angle + "deg)" };
      break;
    default:
      transform = { transform: "rotate(" + 0 + "deg)" };
  }

  return {
    top: planetHeight / 2 + deltaX,
    left: planetWidth / 2 - deltaY,
    opacity: 1,
    ...transform,
  };
}

function getInitialSatellitePosition(
  width: number,
  height: number,
  planetWidth: number,
  planetHeight: number
) {
  return {
    top: planetHeight / 2 - height / 2,
    left: planetWidth / 2 - width / 2,
    opacity: 0,
  };
}

function getFinalDeltaPositions(
  index: number,
  satelliteCount: number,
  width: number,
  height: number,
  orbitRadius: number,
  rotation: number
) {
  const SEPARATION_ANGLE = 360 / satelliteCount;
  const FAN_ANGLE = (satelliteCount - 1) * SEPARATION_ANGLE;
  const BASE_ANGLE = (180 - FAN_ANGLE) / 2 + 90 + rotation;

  let TARGET_ANGLE = BASE_ANGLE + index * SEPARATION_ANGLE;
  return {
    deltaX: orbitRadius * Math.cos(toRadians(TARGET_ANGLE)) - height / 2,
    deltaY: orbitRadius * Math.sin(toRadians(TARGET_ANGLE)) + width / 2,
    angle: TARGET_ANGLE,
  };
}


// UTILITY FUNCTIONS
const DEG_TO_RAD = 0.0174533;
function toRadians(degrees: number) {
  return degrees * DEG_TO_RAD;
}
