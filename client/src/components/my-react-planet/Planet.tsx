import React, { useEffect, useState, useRef, CSSProperties, ReactElement } from 'react';
import { ClickAwayListener } from '@mui/material';
import { styled } from '@mui/material/styles';
import useResizeObserver from '@react-hook/resize-observer';
import { DraggableContainer } from './DraggableContainer';
import { Orbit } from './Orbit';
import { Satellite } from './Satellite';

const DEFAULT_MASS = 1;
const DEFAULT_TENSION = 500;
const DEFAULT_FRICTION = 17;
const DEFAULT_ROTATION = 0;
const DEFAULT_RADIUS = 100;

interface Props {
  centerContent?: React.ReactNode;
  children?: React.ReactNode;
  open?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  mass?: number;
  tension?: number;
  friction?: number;
  orbitStyle?: (defaultStyle: CSSProperties) => CSSProperties;
  orbitRadius?: number;
  rotation?: number;
  hideOrbit?: boolean;
  autoClose?: boolean;
  onClose?: (
    e: React.MouseEvent<Document | HTMLDivElement, MouseEvent>
  ) => void;
  dragablePlanet?: boolean;
  dragRadiusPlanet?: number;
  dragableSatellites?: boolean;
  dragRadiusSatellites?: number;
  bounceRadius?: number;
  bounce?: boolean;
  bounceOnOpen?: boolean;
  bounceOnClose?: boolean;
  bounceDirection?: "TOP" | "BOTTOM" | "LEFT" | "RIGHT";
  satelliteOrientation?: "DEFAULT" | "INSIDE" | "OUTSIDE" | "READABLE";
}

const Root = styled('div')({
  position: 'relative',
});

const PlanetContent = styled('div')({
  position: 'absolute',
  zIndex: 100,
});

export function Planet(props: Props) {

  const {
    centerContent,
    children,
    open,
    onClick,
    mass,
    tension,
    friction,
    orbitRadius,
    rotation,
    orbitStyle,
    hideOrbit,
    onClose,
    autoClose,
    dragablePlanet,
    dragRadiusPlanet,
    dragableSatellites,
    dragRadiusSatellites,
    bounceRadius,
    bounce,
    bounceOnOpen,
    bounceOnClose,
    bounceDirection,
    satelliteOrientation,
  } = props;

  const defaultOrbitStyle: CSSProperties = {
    position: 'absolute',
    borderRadius: '100%',
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: 'lightgrey',
    zIndex: 0,
  };

    // Ensure orbitStyle is a function that returns CSSProperties
    const defaultOrbitStyleFunction = (defaultStyle: CSSProperties): CSSProperties => {
      // return default styles or modified styles
      return { ...defaultStyle }; // This is where you can modify default styles if needed
    };
  
    // Use props.orbitStyle if provided, otherwise use default function
    const appliedOrbitStyleFunction = props.orbitStyle || defaultOrbitStyleFunction;

  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useResizeObserver(ref, (entry) => {
    setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
  });

  const [_open, setOpen] = useState(!!props.open);

  useEffect(() => {
    setOpen(!!props.open);
  }, [props.open]);

  var satellites: ReactElement<any>[] = [];
  var satelliteCount = React.Children.count(children);
  React.Children.forEach(children, (c, i) => {
    satellites[i] = (
      <Satellite
        key={i}
        index={i}
        open={_open}
        satelliteCount={satelliteCount}
        planetHeight={size.height}
        planetWidth={size.width}
        mass={mass ? mass : DEFAULT_MASS}
        friction={friction ? friction : DEFAULT_FRICTION}
        tension={tension ? tension : DEFAULT_TENSION}
        orbitRadius={orbitRadius ? orbitRadius : DEFAULT_RADIUS}
        rotation={rotation ? rotation : DEFAULT_ROTATION}
        draggable={!!dragableSatellites}
        dragRadius={dragRadiusSatellites}
        orientation={satelliteOrientation}
      >
        {c}
      </Satellite>
    );
  });

  const onPlanet = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    } else {
      if (_open && autoClose) {
        setOpen(false);
        if (onClose) {
          onClose(e);
        }
      } else {
        setOpen(true);
      }
    }
  };

  const onClickAway = (event: MouseEvent | TouchEvent) => {
    if (autoClose) {
      setOpen(false);
    }

    if (onClose && _open) {
      onClose(event as unknown as React.MouseEvent<Document, MouseEvent>);
    }
  };

    return (
      <ClickAwayListener onClickAway={onClickAway}>
        <Root>
          {!hideOrbit && (
            <Orbit
              // ... props
              open={_open}
            orbitStyle={appliedOrbitStyleFunction}
            planetHeight={size.height}
            planetWidth={size.width}
            mass={mass ? mass : DEFAULT_MASS}
            friction={friction ? friction : DEFAULT_FRICTION}
            tension={tension ? tension : DEFAULT_TENSION}
            orbitRadius={orbitRadius ? orbitRadius : DEFAULT_RADIUS}
            />
          )}
          <>{satellites}</>
          <PlanetContent onClick={onPlanet}>
            <DraggableContainer
              // ... props
              on={
                          !!dragablePlanet || !!bounce || !!bounceOnOpen || !!bounceOnClose
                        }
                        draggable={!!dragablePlanet}
                        dragRadius={dragRadiusPlanet}
                        open={_open}
                        bounceRadius={bounceRadius}
                        bounceOnOpen={(bounce && !!!bounceOnClose) || bounceOnOpen}
                        bounceOnClose={(bounce && !!!bounceOnOpen) || bounceOnClose}
                        bounceDirection={bounceDirection}
            >
              <div ref={ref}>{centerContent}</div>
            </DraggableContainer>
          </PlanetContent>
        </Root>
      </ClickAwayListener>
    );
}
