import { useEffect, useState } from "react";
import {
  motion,
  useViewportScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import styled from "styled-components";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./main.css";

const ProgressContainer = styled(motion.div)`
  pointer-events: none;
  position: absolute;
  top: 0;
  zindex: 100;
  text-align: center;
  overflow-y: hidden;
	overflow-x: hidden;
`;

export const ScrollAnimation = ({ mainContainerHeight, mainContainerWidth }) => {
  const [currentPrecent, setCurrentPercent] = useState(null);
  const [currentProgressColor, setCurrentProgressColor] = useState(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const { scrollYProgress } = useViewportScroll();
	const [translateXPos, setTranslateXPos] = useState(0);
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100], {
    clamp: false,
  });
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  });
  const matches = useMediaQuery("(max-aspect-ratio : 3/4)");

  useEffect(
    () =>
      yRange.onChange((v) => {
        // console.log(Math.trunc(yRange.current))
        setCurrentPercent(Math.trunc(yRange.current));
      }),
    [yRange]
  );

	useEffect(() => {	
		let myPathBox = document.getElementById("myPathBox").getBBox();
		console.log(`myPathBox: ${myPathBox.x} ${myPathBox.y} ${myPathBox.width} ${myPathBox.height}`);
		// const x = (myPathBox.width - mainContainerWidth)/2;
		// const adjustX = x - myPathBox.x;
		setTranslateXPos(`${(myPathBox.x)}`);
	}, [mainContainerWidth])

  useEffect(() => {
    setCurrentProgressColor(
      currentPrecent >= 90
        ? "#CDFF00"
        : currentPrecent >= 45
        ? "#31A9D5"
        : currentPrecent >= 20
        ? "#F2BD1D"
        : "#FF3B77"
    );
  }, [currentPrecent]);

  return (
    <ProgressContainer className="progress-container" style={{ height: mainContainerHeight, width: mainContainerWidth}}>
      <svg
        className="progress-icon"
        viewBox="0 0 1920 5400"
				preserveAspectRatio="xMidYMid slice"
      >
        <motion.path
          fill="none"
					id="myPathBox"
          // {currentPrecent === 100 ? "#CDFF00" : "none"}
          strokeWidth="9"
          stroke={currentProgressColor}
          strokeDasharray="0 1"
          transition={{
            ease: "easeOut",
          }}
					transform="translate(550, 0)"
          // d='M422.18,2.5q2.4,318.86,4.79,637.7c-7.13,1.33-108.74,22.12-148.27,119.57-26.95,66.44-16.55,147.62,33.48,200.87,71.08,75.65,205.66,77.42,272.61,4.78,49.74-54,71.65-159.26,14.35-210.44-49-43.79-150.26-42.81-186.52,19.13-23.8,40.65-14.92,99.54,23.91,143.48v851.32c-24.63-.94-202.79-4.71-330,138.7-93,104.84-128.93,254.7-86.09,392.18,53.08,170.36,201.83,240.62,243.91,258.27,15,6.31,262.55,105.4,435.23-52.61C789.4,2423.26,851.15,2278.67,804.8,2142c-6.7-19.74-53.12-149.51-186.53-191.3-157.52-49.35-285.95,71-296.52,81.3-15.81,15.33-138.17,134-90.87,267.83,28.72,81.29,107.17,131.87,181.74,143.48,92.27,14.38,215-25.23,243.92-119.56,24.26-79.1-19.84-188.76-81.31-196.09-51.07-6.1-120,57.73-138.7,162.61q-2.38,466.3-4.78,932.62c-9,1.9-120.7,27.41-162.61,133.92-33.27,84.55-9.76,187.63,62.17,243.92,89.85,70.31,236.14,52.7,291.75-33.48,40.3-62.47,40.54-172.69-23.92-210.44-62.71-36.73-171.09,4.29-186.52,71.74-8.6,37.58,14.11,72.66,23.91,86.09v328.09'
          d="M970.63,0c1.59,212.57,3.19,425.13,4.78,637.7-7.13,1.33-108.74,22.12-148.26,119.57-26.95,66.45-16.55,147.62,33.48,200.87,71.08,75.66,205.66,77.42,272.61,4.78,49.74-53.96,71.64-159.26,14.35-210.44-49.02-43.8-150.26-42.81-186.53,19.13-23.8,40.65-14.92,99.54,23.91,143.48v851.32c-24.63-.94-202.79-4.71-330.01,138.7-93,104.84-128.93,254.7-86.09,392.18,53.08,170.35,201.84,240.62,243.92,258.27,15.04,6.31,262.55,105.4,435.23-52.61,89.82-82.19,151.57-226.78,105.22-363.48-6.7-19.75-53.12-149.51-186.53-191.31-157.52-49.35-285.96,71.06-296.53,81.31-15.81,15.33-138.17,133.97-90.87,267.83,28.72,81.29,107.18,131.86,181.74,143.48,92.27,14.38,214.98-25.24,243.92-119.57,24.26-79.1-19.83-188.76-81.31-196.09-51.07-6.09-119.95,57.74-138.7,162.61-1.59,310.88-3.19,621.75-4.78,932.63-8.99,1.89-120.7,27.4-162.61,133.92-33.27,84.55-9.75,187.63,62.18,243.92,89.84,70.31,236.13,52.7,291.74-33.48,40.31-62.47,40.54-172.69-23.91-210.44-62.72-36.73-171.09,4.3-186.53,71.74-8.6,37.58,14.11,72.66,23.91,86.09,0,109.37,0,218.73,0,328.1,0,30.5,0,61,0,91.5v297.39c-24.63-.94-202.79-4.71-330.01,138.7-93,104.84-128.93,254.7-86.09,392.18,53.08,170.35,201.84,240.62,243.92,258.27,15.04,6.31,262.55,105.4,435.23-52.61,89.82-82.19,151.57-226.78,105.22-363.48-6.7-19.75-53.12-149.51-186.53-191.31-157.52-49.35-285.96,71.06-296.53,81.31-15.81,15.33-138.17,133.97-90.87,267.83,28.72,81.29,107.18,131.86,181.74,143.48,92.27,14.38,214.98-25.24,243.92-119.57,24.26-79.1-19.83-188.76-81.31-196.09-51.07-6.09-119.95,57.74-138.7,162.61-.51,216.53-1.02,433.07-1.53,649.6"
          style={{
            pathLength,
            // rotate: 90,
            // translateX: translateX,
            // translateY: 5,
            opacity: 1,
            scaleX: -1,
          }}
        />
      </svg>
    </ProgressContainer>
  );
};
