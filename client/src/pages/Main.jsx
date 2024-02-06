import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import "./main.css";
import { Contact, Education, Experience, Intro, Portfolio, Skills } from "./";
// import { useSpring, animated } from 'react-spring'
// import styled, { css } from 'styled-components'
import { ScrollAnimation } from "./ScrollAnimation";
import { BrowserRouter } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const Main = (props) => {
  const mainContainerRef = useRef(null);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);

  const handleResize = () => {
    let highestSlide = 0;
    let widestSlide = 0;
    if (
      mainContainerRef.current &&
      highestSlide < mainContainerRef.current.offsetHeight
    ) {
      highestSlide = mainContainerRef.current.offsetHeight;
    }
    if (
      mainContainerRef.current &&
      widestSlide < mainContainerRef.current.offsetWidth
    ) {
      widestSlide = mainContainerRef.current.offsetWidth;
    }
    setHeight(highestSlide);
    setWidth(widestSlide);
  };

  useEffect(() => setHeight(mainContainerRef.current.offsetHeight), []);
  useEffect(() => setWidth(mainContainerRef.current.offsetWidth), []);

  useEffect(() => {
    console.log(`height: ${height}`);
    console.log(`width: ${width}`);
  }, [height, width]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const router = createBrowserRouter([
    { path: "*", Component: Portfolio },
  ]);

  return (
    <div className="main-container">
      <ScrollAnimation
        mainContainerHeight={height || "5400"}
        mainContainerWidth={width || "1920"}
      />
      <main className="parts" ref={mainContainerRef}>
        <Intro />
        <Education />
        <Skills />
        {/* <Routes>
            <Route exact path="/" element={<Portfolio/>} />
        </Routes> */}
        {/* <BrowserRouter>
          <Portfolio />
        </BrowserRouter> */}
        <RouterProvider router={router}/>
        <Contact />
      </main>
    </div>
  );
};

export default Main;
