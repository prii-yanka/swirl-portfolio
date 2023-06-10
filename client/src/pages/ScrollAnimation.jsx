import { useEffect, useState } from "react";
import {
    motion,
    useViewportScroll,
    useSpring,
    useTransform,
    AnimatePresence
} from "framer-motion";
import styled from 'styled-components';
import useMediaQuery from '@mui/material/useMediaQuery';
import "./main.css";

const ProgressContainer = styled(motion.div)`
    pointer-events: none;    
    position: absolute;
    top: 0;
    zIndex: 100;
    width: 100vw;
    text-align: center;  
    overflow-x: hidden;
`;

export const ScrollAnimation = () => {
    const [currentPrecent, setCurrentPercent] = useState(null)
    const [currentProgressColor, setCurrentProgressColor] = useState(null)
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const { scrollYProgress } = useViewportScroll();
    const yRange = useTransform(scrollYProgress, [0, 1], [0, 100], { clamp: false });
    const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });
    const matches = useMediaQuery('(max-width:480px)');

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
        // <div className="scroll-animation-container">
            <ProgressContainer className="progress-container">
            {!matches && <svg className="progress-icon" viewBox="0 0 1920 5400">
                <motion.path
                    fill="none"
                    // {currentPrecent === 100 ? "#CDFF00" : "none"}
                    strokeWidth="9"
                    stroke={currentProgressColor}
                    strokeDasharray="0 1"
                    // d='M422.18,2.5q2.4,318.86,4.79,637.7c-7.13,1.33-108.74,22.12-148.27,119.57-26.95,66.44-16.55,147.62,33.48,200.87,71.08,75.65,205.66,77.42,272.61,4.78,49.74-54,71.65-159.26,14.35-210.44-49-43.79-150.26-42.81-186.52,19.13-23.8,40.65-14.92,99.54,23.91,143.48v851.32c-24.63-.94-202.79-4.71-330,138.7-93,104.84-128.93,254.7-86.09,392.18,53.08,170.36,201.83,240.62,243.91,258.27,15,6.31,262.55,105.4,435.23-52.61C789.4,2423.26,851.15,2278.67,804.8,2142c-6.7-19.74-53.12-149.51-186.53-191.3-157.52-49.35-285.95,71-296.52,81.3-15.81,15.33-138.17,134-90.87,267.83,28.72,81.29,107.17,131.87,181.74,143.48,92.27,14.38,215-25.23,243.92-119.56,24.26-79.1-19.84-188.76-81.31-196.09-51.07-6.1-120,57.73-138.7,162.61q-2.38,466.3-4.78,932.62c-9,1.9-120.7,27.41-162.61,133.92-33.27,84.55-9.76,187.63,62.17,243.92,89.85,70.31,236.14,52.7,291.75-33.48,40.3-62.47,40.54-172.69-23.92-210.44-62.71-36.73-171.09,4.29-186.52,71.74-8.6,37.58,14.11,72.66,23.91,86.09v328.09'
                    d="M970.63,0c1.59,212.57,3.19,425.13,4.78,637.7-7.13,1.33-108.74,22.12-148.26,119.57-26.95,66.45-16.55,147.62,33.48,200.87,71.08,75.66,205.66,77.42,272.61,4.78,49.74-53.96,71.64-159.26,14.35-210.44-49.02-43.8-150.26-42.81-186.53,19.13-23.8,40.65-14.92,99.54,23.91,143.48v851.32c-24.63-.94-202.79-4.71-330.01,138.7-93,104.84-128.93,254.7-86.09,392.18,53.08,170.35,201.84,240.62,243.92,258.27,15.04,6.31,262.55,105.4,435.23-52.61,89.82-82.19,151.57-226.78,105.22-363.48-6.7-19.75-53.12-149.51-186.53-191.31-157.52-49.35-285.96,71.06-296.53,81.31-15.81,15.33-138.17,133.97-90.87,267.83,28.72,81.29,107.18,131.86,181.74,143.48,92.27,14.38,214.98-25.24,243.92-119.57,24.26-79.1-19.83-188.76-81.31-196.09-51.07-6.09-119.95,57.74-138.7,162.61-1.59,310.88-3.19,621.75-4.78,932.63-8.99,1.89-120.7,27.4-162.61,133.92-33.27,84.55-9.75,187.63,62.18,243.92,89.84,70.31,236.13,52.7,291.74-33.48,40.31-62.47,40.54-172.69-23.91-210.44-62.72-36.73-171.09,4.3-186.53,71.74-8.6,37.58,14.11,72.66,23.91,86.09,0,109.37,0,218.73,0,328.1,0,30.5,0,61,0,91.5v297.39c-24.63-.94-202.79-4.71-330.01,138.7-93,104.84-128.93,254.7-86.09,392.18,53.08,170.35,201.84,240.62,243.92,258.27,15.04,6.31,262.55,105.4,435.23-52.61,89.82-82.19,151.57-226.78,105.22-363.48-6.7-19.75-53.12-149.51-186.53-191.31-157.52-49.35-285.96,71.06-296.53,81.31-15.81,15.33-138.17,133.97-90.87,267.83,28.72,81.29,107.18,131.86,181.74,143.48,92.27,14.38,214.98-25.24,243.92-119.57,24.26-79.1-19.83-188.76-81.31-196.09-51.07-6.09-119.95,57.74-138.7,162.61-.51,216.53-1.02,433.07-1.53,649.6"
                    style={{
                        pathLength,
                        // rotate: 90,
                        translateX: 5,
                        translateY: 5,
                        opacity: 1,
                        scaleX: -1
                    }}
                />
            </svg>}

            {matches && <svg className="progress-icon" viewBox="0 0 112.5 1923.94">
                <motion.path
                    fill="none"
                    // {currentPrecent === 100 ? "#CDFF00" : "none"}
                    strokeWidth="2"
                    stroke={currentProgressColor}
                    strokeDasharray="0 1"
                    d="M55.27,2c.16,21.26,.32,42.51,.48,63.77-.71,.13-10.87,2.21-14.83,11.96-2.7,6.64-1.66,14.76,3.35,20.09,7.11,7.57,20.57,7.74,27.26,.48,4.97-5.4,7.16-15.93,1.43-21.04-4.9-4.38-15.03-4.28-18.65,1.91-2.38,4.06-1.49,9.95,2.39,14.35v85.13c-2.46-.09-20.28-.47-33,13.87-9.3,10.48-12.89,25.47-8.61,39.22,5.31,17.04,20.18,24.06,24.39,25.83,1.5,.63,26.25,10.54,43.52-5.26,8.98-8.22,15.16-22.68,10.52-36.35-.67-1.97-5.31-14.95-18.65-19.13-15.75-4.94-28.6,7.11-29.65,8.13-1.58,1.53-13.82,13.4-9.09,26.78,2.87,8.13,10.72,13.19,18.17,14.35,9.23,1.44,21.5-2.52,24.39-11.96,2.43-7.91-1.98-18.88-8.13-19.61-5.11-.61-12,5.77-13.87,16.26-.16,31.09-.32,62.18-.48,93.26-.9,.19-12.07,2.74-16.26,13.39-3.33,8.46-.98,18.76,6.22,24.39,8.98,7.03,23.61,5.27,29.17-3.35,4.03-6.25,4.05-17.27-2.39-21.04-6.27-3.67-17.11,.43-18.65,7.17-.86,3.76,1.41,7.27,2.39,8.61v32.81c0,1.38,0,2.75,0,4.13,0,21.26,.15,42.51,.48,63.77-.71,.13-10.87,2.21-14.83,11.96-2.7,6.64-1.66,14.76,3.35,20.09,7.11,7.57,20.57,7.74,27.26,.48,4.97-5.4,7.16-15.93,1.43-21.04-4.9-4.38-15.03-4.28-18.65,1.91-2.38,4.06-1.49,9.95,2.39,14.35v85.13c-2.46-.09-20.28-.47-33,13.87-9.3,10.48-12.89,25.47-8.61,39.22,5.31,17.04,20.18,24.06,24.39,25.83,1.5,.63,26.25,10.54,43.52-5.26,8.98-8.22,15.16-22.68,10.52-36.35-.58-1.7-5.35-15.08-18.65-19.13-11.89-3.63-23.61,2.34-29.65,8.13-.14,.13-.3,.29-.48,.47-1.27,1.28-13,13.44-8.6,26.31,2.72,7.97,10.59,13.17,18.17,14.35,9.22,1.44,21.5-2.52,24.39-11.96,2.43-7.91-1.98-18.88-8.13-19.61-5.11-.61-12,5.77-13.87,16.26l-.48,93.26c-.9,.19-12.07,2.74-16.26,13.39-3.33,8.46-.98,18.76,6.22,24.39,8.98,7.03,23.61,5.27,29.17-3.35,4.03-6.25,4.05-17.27-2.39-21.04-6.27-3.67-17.11,.43-18.65,7.17-.86,3.76,1.41,7.27,2.39,8.61,.13,7.3,.24,18.66,0,32.81-.08,4.63-.17,7.9-.2,9.09-.27,10.55-.35,29.02,.48,63.77-.71,.13-10.87,2.21-14.83,11.96-2.7,6.64-1.66,14.76,3.35,20.09,7.11,7.57,20.57,7.74,27.26,.48,4.97-5.4,7.16-15.93,1.43-21.04-4.9-4.38-15.03-4.28-18.65,1.91-2.38,4.06-1.49,9.95,2.39,14.35v85.13c-2.46-.09-20.28-.47-33,13.87-9.3,10.48-12.89,25.47-8.61,39.22,5.31,17.04,20.18,24.06,24.39,25.83,1.5,.63,26.25,10.54,43.52-5.26,8.98-8.22,15.16-22.68,10.52-36.35-.57-1.7-5.35-15.08-18.65-19.13-11.89-3.63-23.61,2.34-29.65,8.13-.14,.13-.3,.29-.48,.47-1.27,1.28-13,13.44-8.6,26.31,2.72,7.97,10.59,13.17,18.17,14.35,9.22,1.44,21.5-2.52,24.39-11.96,2.43-7.91-1.98-18.88-8.13-19.61-5.11-.61-12,5.77-13.87,16.26l-.48,93.26c-.9,.19-12.07,2.74-16.26,13.39-3.33,8.46-.98,18.76,6.22,24.39,8.98,7.03,23.61,5.27,29.17-3.35,4.03-6.25,4.05-17.27-2.39-21.04-6.27-3.67-17.11,.43-18.65,7.17-.86,3.76,1.41,7.27,2.39,8.61,0,7.8,.01,19,0,32.81,0,.38,0,3.7,0,4.13-.01,9.96,.09,28.21,.48,63.77-1.54,.32-3.79,.97-6.2,2.37-1.57,.91-6.3,3.94-8.63,9.58-2.56,6.18-1.84,14.55,3.35,20.09,7.09,7.57,20.56,7.74,27.26,.48,4.97-5.4,7.16-15.93,1.43-21.04-4.9-4.38-15.03-4.28-18.65,1.91-2.38,4.06-1.49,9.95,2.39,14.35v85.13c-2.46-.09-20.28-.47-33,13.87-9.3,10.48-12.89,25.47-8.61,39.22,5.31,17.04,20.18,24.06,24.39,25.83,1.5,.63,26.25,10.54,43.52-5.26,8.98-8.22,15.16-22.68,10.52-36.35-.57-1.68-5.36-15.09-18.65-19.13,0,0-16.34-4.63-29.65,8.13-.08,.08-.16,.15-.16,.15,0,0-.16,.16-.33,.32-13.08,13.18-8.6,26.31-8.6,26.31,2.72,7.97,10.59,13.17,18.17,14.35,9.22,1.44,21.5-2.52,24.39-11.96,2.43-7.91-1.98-18.88-8.13-19.61-5.11-.61-12,5.77-13.87,16.26l-.48,93.26c-.9,.19-12.07,2.74-16.26,13.39-3.33,8.46-.98,18.76,6.22,24.39,8.98,7.03,23.61,5.27,29.17-3.35,4.03-6.25,4.05-17.27-2.39-21.04-6.27-3.67-17.11,.43-18.65,7.17-.86,3.76,1.41,7.27,2.39,8.61,.09,10.8,.09,21.74,0,32.81-.13,16.38-.46,32.47-.96,48.26-1.54,.32-3.79,.97-6.2,2.37-1.57,.91-6.3,3.94-8.63,9.58-2.56,6.18-1.84,14.55,3.35,20.09,7.09,7.57,20.56,7.74,27.26,.48,4.97-5.4,7.16-15.93,1.43-21.04-4.9-4.38-15.03-4.28-18.65,1.91-2.38,4.06-1.49,9.95,2.39,14.35v85.13c-2.46-.09-20.28-.47-33,13.87-9.3,10.48-12.89,25.47-8.61,39.22,5.31,17.04,20.18,24.06,24.39,25.83,1.5,.63,26.25,10.54,43.52-5.26,8.98-8.22,15.16-22.68,10.52-36.35-.57-1.68-5.36-15.09-18.65-19.13,0,0-16.35-4.63-29.65,8.13,0,0-.16,.15-.16,.15-.08,.07-.19,.19-.33,.32-1.23,1.24-12.99,13.44-8.6,26.31,2.72,7.97,10.59,13.17,18.17,14.35,9.22,1.44,21.5-2.52,24.39-11.96,2.43-7.91-1.98-18.88-8.13-19.61-5.11-.61-12,5.77-13.87,16.26-.16,31.09-.32,62.17-.48,93.26-.9,.19-12.07,2.74-16.26,13.39-3.33,8.46-.98,18.76,6.22,24.39,8.98,7.03,23.61,5.27,29.17-3.35,4.03-6.25,4.05-17.27-2.39-21.04-6.27-3.67-17.11,.43-18.65,7.17-.86,3.76,1.41,7.27,2.39,8.61v32.81"
                    style={{
                        pathLength,
                        // rotate: 90,
                        // translateX: 5,
                        // translateY: 5,
                        opacity: 1,
                        // scaleX: -1,
                        // scaleY: 5
                    }}
                />
            </svg>

            }
        </ProgressContainer> 
        // </div>
    )
}
