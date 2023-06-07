import { useEffect, useState } from "react";
import {
    motion,
    useViewportScroll,
    useSpring,
    useTransform,
    AnimatePresence
} from "framer-motion";
import styled from 'styled-components';
import "./main.css";

const ProgressContainer = styled(motion.div)`
    pointer-events: none;    
    position: absolute;
    top: 0;
    zIndex: 100;
    width: 106vh;
    text-align: center; 
    @media screen and (max-width : 450px) {
        height: 650vh;
    }  
`;

export const ScrollAnimation = () => {
    const [currentPrecent, setCurrentPercent] = useState(null)
    const [currentProgressColor, setCurrentProgressColor] = useState(null)
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const { scrollYProgress } = useViewportScroll();
    const yRange = useTransform(scrollYProgress, [0, 1], [0, 100], { clamp: false });
    const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

    useEffect(
        () =>
            yRange.onChange((v) => {
                // console.log(Math.trunc(yRange.current))
                setCurrentPercent(Math.trunc(yRange.current))
            }),
        [yRange]
    );

    useEffect(() => {
        setCurrentProgressColor(
            currentPrecent >= 90 ? "#CDFF00" :
                currentPrecent >= 45 ? "#31A9D5" :
                    currentPrecent >= 20 ? "#F2BD1D" :
                        "#FF3B77"
        )
    }, [currentPrecent])

    return (
        <ProgressContainer className="progress-container">
            <svg className="progress-icon" viewBox="0 0 823.1 3845.19">
                <motion.path
                    fill="none"
                    // {currentPrecent === 100 ? "#CDFF00" : "none"}
                    strokeWidth="8"
                    stroke={currentProgressColor}
                    strokeDasharray="0 1"
                    // d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                    d='M422.18,2.5q2.4,318.86,4.79,637.7c-7.13,1.33-108.74,22.12-148.27,119.57-26.95,66.44-16.55,147.62,33.48,200.87,71.08,75.65,205.66,77.42,272.61,4.78,49.74-54,71.65-159.26,14.35-210.44-49-43.79-150.26-42.81-186.52,19.13-23.8,40.65-14.92,99.54,23.91,143.48v851.32c-24.63-.94-202.79-4.71-330,138.7-93,104.84-128.93,254.7-86.09,392.18,53.08,170.36,201.83,240.62,243.91,258.27,15,6.31,262.55,105.4,435.23-52.61C789.4,2423.26,851.15,2278.67,804.8,2142c-6.7-19.74-53.12-149.51-186.53-191.3-157.52-49.35-285.95,71-296.52,81.3-15.81,15.33-138.17,134-90.87,267.83,28.72,81.29,107.17,131.87,181.74,143.48,92.27,14.38,215-25.23,243.92-119.56,24.26-79.1-19.84-188.76-81.31-196.09-51.07-6.1-120,57.73-138.7,162.61q-2.38,466.3-4.78,932.62c-9,1.9-120.7,27.41-162.61,133.92-33.27,84.55-9.76,187.63,62.17,243.92,89.85,70.31,236.14,52.7,291.75-33.48,40.3-62.47,40.54-172.69-23.92-210.44-62.71-36.73-171.09,4.29-186.52,71.74-8.6,37.58,14.11,72.66,23.91,86.09v328.09'

                    style={{
                        pathLength,
                        // rotate: 90,
                        translateX: 5,
                        translateY: 5,
                        opacity: 1,
                        scaleX: -1
                    }}
                />
            </svg>
        </ProgressContainer>
    )
}
