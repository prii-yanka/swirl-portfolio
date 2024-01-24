import React, { useEffect, useRef, useState } from "react";
// import function to register Swiper custom elements
import LeftArrow from "../../components/arrows/LeftArrow";
import RightArrow from "../../components/arrows/RightArrow";
import { motion, useScroll, useTransform } from "framer-motion";
import useMediaQuery from '@mui/material/useMediaQuery';

const ImageSwipe = ({ images, onLoad, imageStyle, imageDescriptions }) => {
  const sliderRef = useRef(null);
  const [currImage, setCurrImage] = useState();
  const [currImgContStyle, setCurrImgContStyle] = useState({ width: "45rem" });
  const [sliderData, setSliderData] = useState(0);
  const [currentPrecent, setCurrentPercent] = useState(null);
  const { scrollXProgress } = useScroll({
    container: sliderRef,
  });
  const xRange = useTransform(scrollXProgress, [0, 1], [0, 100], {
    clamp: false,
  });
  const matches = useMediaQuery('(max-aspect-ratio : 3/4)');

  // useEffect(
  //   () => {
  //     console.log(images.map((image, i) => `${images[i]} : ${imageDescriptions[i]}`))
  //   },
  //   [images]
  // );

  useEffect(
    () =>{
      setCurrentPercent(Math.ceil( (sliderData / images.length)* 100 / 20) * 20);  // incements of 20
    },
    [sliderData, images]
  );

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
  }, []);

  useEffect(() => {
    let myImg = document.querySelector("#imgId");
    let realWidth = myImg.naturalWidth;
    let realHeight = myImg.naturalHeight;
    if (realWidth/realHeight <= 3 / 4) {
      if(matches) {
        console.log('mathces !=')
        setCurrImgContStyle({ width: "14rem", height: "24rem" });
      }
      else {
        setCurrImgContStyle({ width: "14rem", height: `${(14*realHeight/realWidth) + 5}rem` });
      }
      console.log("14rem")
    } 
    else if (realWidth/realHeight >= 4 / 3){
      if(matches) {
        console.log('mathces !=')
        setCurrImgContStyle({ width: "14rem", height: "24rem" });
      }
      else {
        setCurrImgContStyle({ width: "20rem", height: `${(20*realHeight/realWidth) + 5}rem` });
      }
      console.log("20rem")
    }
    else {
      console.log("25rem")
      if(matches) {
        console.log('mathces')
        setCurrImgContStyle({ width: "14rem", height: "10rem" });
      }
      else {
        setCurrImgContStyle({ width: "25rem", height: `${(25*realHeight/realWidth) + 5}rem` });
      }
    }
  }, [currImage]);

  // useEffect(() => {
  //   console.log(`sliderdata: ${sliderData}`);
  // }, [images, sliderData]);

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
        <div className="current-image-container" style={currImgContStyle}>
          <a href={images[sliderData]} target="_blank" rel="noreferrer">
            <img
              id="imgId"
              src={images[sliderData]}
              alt="placeholder alt text"
              onLoad={() => setCurrImage(images[sliderData])}
            />
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
              </div>
            );
          })}
        </div>
      </div>
      <div className="x-scroll-progress">
        <div
          className={
            currentPrecent <= 20
              ? "progress-range one active"
              : "progress-range one"
          }
        ></div>
        <div
          className={
            currentPrecent <= 40 && currentPrecent > 20
              ? "progress-range two active"
              : "progress-range two"
          }
        ></div>
        <div
          className={
            currentPrecent <= 60 && currentPrecent > 40
              ? "progress-range three active"
              : "progress-range three"
          }
        ></div>
        <div
          className={
            currentPrecent <= 80 && currentPrecent > 60
              ? "progress-range four active"
              : "progress-range four"
          }
        ></div>
        <div
          className={
            currentPrecent <= 100 && currentPrecent > 80
              ? "progress-range five active"
              : "progress-range five"
          }
        ></div>
      </div>
    </div>
  );
};

export default ImageSwipe;
