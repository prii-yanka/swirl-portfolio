import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import './main.css';
import { Contact, Education, Experience, InteractiveGrid, Intro, Portfolio, Skills } from './';
import { motion, useViewportScroll, useSpring, useTransform } from 'framer-motion';
// import { useSpring, animated } from 'react-spring'
import styled, { css } from 'styled-components'
import { ScrollAnimation } from "./ScrollAnimation";
import { Route, Routes } from 'react-router-dom';

const Main = (props) => {

  // const [path, setPath] = useState(0);
  // const [scrollPercentage, setScrollPercentage] = useState(0);
  // const [currentPrecent, setCurrentPercent] = useState(null);
  // // const [drawOffset, setDrawOffset] = useState(0);
  // // const yRange = useTransform(scrollPercentage, [0, 1], [0, 100]);
  // const pathLength = useSpring(scrollPercentage, { stiffness: 400, damping: 90 });

  // useEffect(() => {
  //   const svg = document.querySelector('path');
  //   console.log(svg);
  //   setPath(svg);
  //   //setTotalLength(svg.getTotalLength());
  // }, []);

  // // useEffect(() => {
  // //   if (path) {
  // //     console.log("strokedasharray");
  // //     // path.style.strokeDasharray = pathLength + pathLength + pathLength;
  // //     // path.style.strokeDashoffset = pathLength;
  // //   }
  // // }, [path]);

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll2);
  //   console.log('scroll2');
  //   return () => {
  //     window.removeEventListener('Scroll', handleScroll2);
  //   };
  // }, []);

  // // **************update farthest point and re-render

  // const handleScroll2 = () => {
  //   var scrollPercentage =
  //     (document.documentElement.scrollTop + document.body.scrollTop) /
  //     (document.documentElement.scrollHeight - document.documentElement.clientHeight);
  //   console.log('scroll %: ' + scrollPercentage);
  //   setScrollPercentage(scrollPercentage);
  //   // let drawLength = pathLength * scrollPercentage;
  //   // path.style.strokeDashoffset = pathLength - drawLength;
  //   // setDrawOffset(pathLength - drawLength);
  //   // console.log("strokeDashoffset: " + strokeDashoffset)
  //   // console.log("path.style.strokeDashoffset: " + path.style.strokeDashoffset);
  // };

  // // let pathVariants = {
  // //   initial: {
  // //     style: {
  // //       strokeDasharray: 2566 ,
  // //       strokeDashoffset: pathLength
  // //     }
  // //     // opacity: 0,}
  // //     // scale: 0
  // //     // pathLength: 0
  // //   },
  // //   final: {
  // //     style: {
  // //       strokeDasharray: drawOffset
  // //     },
  // //     // opacity: 1,
  // //     // scale: 1,
  // //     // pathLength: 1,
  // //     transition: {
  // //       repeat: Infinity,
  // //       ease: "easeInOut"
  // //     }
  // //   }
  // // }

  // useEffect(() => {
  //   console.log("scrollPercentage: " + scrollPercentage);
  //   console.log("pathLength: " + pathLength);
  //   // edit strokeDashoffset here and re-render
  //   // path.style.strokeDashoffset = drawOffset;
  //   // usemotionvalue
  // }, [pathLength]);

  return (
    <div className="main-container">
      <ScrollAnimation />
      <main className='parts'>
        <Intro />
        <Education />
        <Skills />
        <Routes>
          <Route exact path="/" element={<Portfolio/>} />
        </Routes>
        {/* <Portfolio /> */}
        <Contact />
      </main>
    </div>
  );
};

export default Main;

