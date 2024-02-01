import React from 'react';
import { animated, useSpring } from 'react-spring';
import { styled } from '@mui/material/styles';
import { CSSProperties } from 'react';

interface Props {
  orbitStyle?: (defaultStyle: CSSProperties) => CSSProperties;
  orbitRadius: number;
  planetWidth: number;
  planetHeight: number;
  open: boolean;
  mass: number;
  tension: number;
  friction: number;
}

// Define default styles
const orbitDefaultStyle: CSSProperties = {
	position: 'absolute',
	borderRadius: '100%',
	borderWidth: 2,
	borderStyle: 'dotted',
	borderColor: 'lightgrey',
	zIndex: 0,
  };

// Styled component using @mui/system or @mui/material/styles
const StyledOrbit = styled(animated.div)<Props>(({ orbitStyle }) => ({
	...orbitDefaultStyle,
	...(orbitStyle ? orbitStyle(orbitDefaultStyle) : {}),
  }));
  
  export function Orbit(props: Props) {
	const { orbitRadius, planetWidth, planetHeight, open, tension, friction, mass } = props;
  
	const position = useSpring({
	  reverse: !open,
	  from: getInitialOrbitPosition(planetWidth, planetHeight),
	  to: getFinalOrbitPosition(planetWidth, planetHeight, orbitRadius),
	  config: { mass, tension, friction },
	});
  
	return <StyledOrbit style={position} {...props} />;
  }
  
  function getInitialOrbitPosition(planetWidth: number, planetHeight: number) {
	return {
	  width: 0,
	  height: 0,
	  top: planetWidth / 2,
	  left: planetHeight / 2,
	  opacity: 0,
	};
  }
  
  function getFinalOrbitPosition(planetWidth: number, planetHeight: number, orbitRadius: number) {
	return {
	  width: orbitRadius * 2,
	  height: orbitRadius * 2,
	  top: 0 - orbitRadius + planetHeight / 2,
	  left: 0 - orbitRadius + planetWidth / 2,
	  opacity: 1,
	};
  }