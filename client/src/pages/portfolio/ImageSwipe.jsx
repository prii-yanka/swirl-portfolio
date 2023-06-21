import React, { useEffect, useRef, useState } from "react";
// import function to register Swiper custom elements
import LeftArrow from "../../components/arrows/LeftArrow";
import RightArrow from "../../components/arrows/RightArrow";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

const ImageSwipe = ({ images, onLoad, imageStyle, imageDescriptions }) => {
  const sliderRef = useRef(null);
  const [sliderData, setSliderData] = useState(0);
  // const scrollXRef = useRef(null);

  const [currentPrecent, setCurrentPercent] = useState(null)
  const { scrollXProgress } = useScroll({
    container: sliderRef
  });
  const xRange = useTransform(scrollXProgress, [0, 1], [0, 100], { clamp: false });

  useEffect(
    () =>
        xRange.onChange((v) => {
            console.log(Math.trunc(xRange.current))
            setCurrentPercent(Math.trunc(xRange.current))
        }),
    [xRange]
);

// useEffect(() => {
//   console.log(scrollXProgress);
// }, [scrollXProgress])
  // const [left, setLeft] = useState(0);
  // const [right, setRight] = useState(0);

  // const handleLeft = () => {
  //   setLeft(left + 1);
  //   console.log("left: " + left);
  // };
  // const handleRight = () => {
  //   setRight(right + 1);
  //   console.log("right: " + right);
  // };

  const handleLeftImage = () => {
    if (sliderData > 0) {
      setSliderData(sliderData - 1);
    }
    // setLeft(left + 1);
    sliderRef.current.scrollLeft -= 150;
    // console.log("left: " + left);
  };
  const handleRightImage = () => {
    if (sliderData < images.length - 1) {
      setSliderData(sliderData + 1);
    }
    // setRight(right + 1);
    sliderRef.current.scrollLeft += 150;
    // console.log("right: " + right);
  };

  useEffect(() => {
    sliderRef.current.scrollLeft = 0;
  }, [])

  // useEffect(() => {
  //   if (imageStyle.visibility == "visible") {
  //     sliderRef.current.scrollLeft -= 150;
  //     console.log("scrolling left: " + left);
  //   }
  // }, [imageStyle, left]);

  // useEffect(() => {
  //   if (imageStyle.visibility == "visible") {
  //     sliderRef.current.scrollLeft += 150;
  //     console.log("scrolling right: " + right);
  //   }
  // }, [imageStyle, right]);

  useEffect(() => {
    console.log(`sliderdata: ${sliderData}`);
  }, [sliderData]);

  return (
    <div className="project-images-container" style={imageStyle}>
      {/* <p>Image swipe</p> */}
      <div className="carousel">
        <div onClick={handleLeftImage}>
        {/* <div> */}
          <LeftArrow
            isVisible={
              sliderData != 0 && imageStyle.visibility == "visible"
                ? "visible"
                : "hidden"
            }
          />
        </div>
        <div className="current-image-container">
          <a href={images[sliderData]} target="_blank" rel="noreferrer">
            <img src={images[sliderData]} alt="placeholder alt text" />
          </a>
          <p> {imageDescriptions[sliderData]}</p>
        </div>
        <div onClick={handleRightImage}>
        {/* <div> */}
          <RightArrow
            isVisible={
              sliderData != images.length - 1 &&
              imageStyle.visibility == "visible"
                ? "visible"
                : "hidden"
            }
          />
        </div>
      </div>

      <div className="images-container">
        <div ref={sliderRef} id="slider" className="scroll_bar">
          {images.map((image, idx) => {
            return (
              <div
                key={idx}
                onClick={() => {
                  setSliderData(idx);
                }}
                className={
                  sliderData == idx
                    ? "thumbnail current-image-thumbnail"
                    : "thumbnail"
                }
              >
                <img src={image} onLoad={onLoad} alt="placeholder alt text" />
                {/* <p> {image_description/label}</p> */}
              </div>
            );
          })}
        </div>
      </div>
      <div className="x-scroll-progress">
          <div className={currentPrecent <= 20 && currentPrecent >! 20? "progress-range one active":"progress-range one"}></div>
          <div className={currentPrecent <= 40 && currentPrecent > 20? "progress-range two active":"progress-range two"}></div>
          <div className={currentPrecent <= 60 && currentPrecent > 40? "progress-range three active":"progress-range three"}></div>
          <div className={currentPrecent <= 80 && currentPrecent > 60?  "progress-range four active":"progress-range four"}></div>
          <div className={currentPrecent <= 100 && currentPrecent > 80? "progress-range five active":"progress-range five"}></div>
        </div>
    </div>
  );
};

export default ImageSwipe;
