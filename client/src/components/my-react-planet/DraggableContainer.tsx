import React, { useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { styled } from '@mui/material/styles';

const DEFAULT_DRAG_RADIUS = 12;
const DEFAULT_BOUNCE_RADIUS = 3;

const RootDiv = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
});

const DraggableDiv = styled(animated.div)({
  position: 'absolute',
});

interface Props {
  children: React.ReactNode;
  on: boolean;
  draggable?: boolean;
  dragRadius?: number;
  bounceRadius?: number;
  open?: boolean;
  bounceOnOpen?: boolean;
  bounceOnClose?: boolean;
  bounceDirection?: 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT';
}

export function DraggableContainer(props: Props) {
  const {
    children,
    on,
    draggable,
    dragRadius,
    bounceRadius,
    open,
    bounceOnOpen,
    bounceOnClose,
    bounceDirection,
  } = props;

  const [{ x, y, cursor }, set] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 400, friction: 7, precision: 0.1 },
    cursor: 'pointer',
  }));

  useEffect(() => {
    if ((open && bounceOnOpen) || (!open && bounceOnClose)) {
      const bRadius = bounceRadius || DEFAULT_BOUNCE_RADIUS;
      let x = bRadius;
      let y = bRadius;
      switch (bounceDirection) {
        case 'LEFT':
          x = -bRadius;
          y = 0;
          break;
        case 'RIGHT':
          x = bRadius;
          y = 0;
          break;
        case 'TOP':
          x = 0;
          y = -bRadius;
          break;
        case 'BOTTOM':
          x = 0;
          y = bRadius;
          break;
        default:
          break;
      }
      set({ x, y });
      setTimeout(() => set({ x: 0, y: 0 }), 100);
    }
  }, [open, bounceOnOpen, bounceOnClose, bounceDirection, set, bounceRadius]);

  const bind = useDrag(({ down, movement: [dX, dY] }) => {
    if (draggable) {
      const rMax = dragRadius || DEFAULT_DRAG_RADIUS;
      const r = Math.sqrt(dX ** 2 + dY ** 2);
      if (r > rMax) {
        const ratio = rMax / r;
        dX *= ratio;
        dY *= ratio;
      }
      set({
        x: down ? dX : 0,
        y: down ? dY : 0,
        immediate: down,
        cursor: down ? 'grabbing' : 'pointer',
      });
    }
  });

  if (on) {
    return (
      <RootDiv>
        <DraggableDiv {...bind()} style={{ cursor: cursor, x: x, y: y }}>
          {children}
        </DraggableDiv>
      </RootDiv>
    );
  } else {
    return <>{children}</>;
  }
}
