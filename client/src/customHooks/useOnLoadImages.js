import { useState, useEffect } from "react";

export const useOnLoadImages = ({ref}) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    console.log(`ref: ${ref}`);
    const updateStatus = ({images}) => {
        console.log(`setStatus`);
      setStatus(
        images.map((image) => image.complete).every((item) => item === true)
      );
    };

    if (!ref?.current) return;

    const imagesLoaded = Array.from(ref.current.querySelectorAll("img"));

    if (imagesLoaded.length === 0) {
      setStatus(true);
      return;
    }

    imagesLoaded.forEach((image) => {
      image.addEventListener("load", () => updateStatus(imagesLoaded), {
        once: true
      });
      image.addEventListener("error", () => updateStatus(imagesLoaded), {
        once: true
      });
    });

    return;
  }, [ref]);

  return status;
};