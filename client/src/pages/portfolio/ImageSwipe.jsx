import React, { useEffect, useRef, useState } from "react";
// import function to register Swiper custom elements
import LeftArrow from "../../components/arrows/LeftArrow";
import RightArrow from "../../components/arrows/RightArrow";

const ImageSwipe = ({ images, onLoad, imageStyle }) => {
  const sliderRef = useRef(null);
  const [sliderData, setSliderData] = useState(0);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [cursor, setCursor] = useState(0);

  const handleLeft = () => {
    setLeft(left + 1);
    // console.log("left: " + left);
  };
  const handleRight = () => {
    setRight(right + 1);
    // console.log("right: " + right);
  };

//   const handleSelection = (idx) => {
//     console.log(`idx: ${idx}`)
//   }

  useEffect(() => {
    sliderRef.current.scrollLeft -= 150;
    // console.log("scrolling left: " + left);
  }, [left]);

  useEffect(() => {
    sliderRef.current.scrollLeft += 150;
    // console.log("scrolling right: " + right);
  }, [right]);

  useEffect(() => {
    console.log(`sliderdata: ${sliderData}`)
  }, [sliderData])

  return (
    <div className="project-images-container" style={imageStyle}>
      {/* <p>Image swipe</p> */}
      <div className="current-image-container">
                <a href={images[sliderData]} target="_blank" rel="noreferrer" >

      <img
                    src={images[sliderData]}
                    alt="placeholder alt text"
                  />
                  </a>
      </div>

      <div className="images-container">
        <div onClick={handleLeft}>
          <LeftArrow />{" "}
        </div>
        <div ref={sliderRef} id="slider" className="scroll_bar">
          {images.map((image, idx) => {
            return (
              <div key={idx} onClick={()=>{setSliderData(idx)}} className={sliderData == idx? "thumbnail current-image-thumbnail" : "thumbnail"}>
                  <img
                    src={image}
                    onLoad={onLoad}
                    alt="placeholder alt text"
                  />
                  {/* <p> {image_description/label}</p> */}
              </div>
            );
          })}
        </div>
        <div>
          <div onClick={handleRight}>
            <RightArrow />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSwipe;
