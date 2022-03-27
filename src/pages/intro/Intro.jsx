import './intro.css'
import '../pages.css'
import { useNav } from '../../customHooks/useNav';
import React, { useRef, useState, useLayoutEffect } from "react"

const Intro = () => {

  const table_ref = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);
    console.log("scroll");
    return () => window.removeEventListener('Scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (!table_ref.current) return
    const topPos = table_ref.current.getBoundingClientRect().top
    const scrollPos = window.scrollY + window.innerHeight
    if (topPos < scrollPos) {
      // enter animation code here
      console.log("top less then scroll");
      setOffsetY(window.scrollY);
    }
  }

  const introRef = useNav('Intro')

  return (
    <section className="intro" ref={introRef} id='introContainer'>
      <div className="container" ref={table_ref}>
        <img src="/images/table_top@72x.png" className="table_top" />
        <div className="image-container">
          <img src="/images/base@72x.png" className="base" />
        </div>
        <div className="image-container"
          style={{ transform: `translateY(-${offsetY * 0.5}px)` }}>
          <img src="/images/folders@72x.png" className="folders" />
        </div>
        <div className="image-container"
          style={{ transform: `translateX(-${offsetY * 0.5}px)` }}>
          <img src="/images/color_cards@72x.png" className="color_cards" />
        </div>
        <div className="image-container"
          style={{ transform: `translateX(-${offsetY * 0.5}px)` }}>
          <img src="/images/tablet@72x.png" className="tablet" />
        </div>
        <div className="image-container"
          style={{ transform: `translateX(-${offsetY * 0.3}px)` }}>
          <img src="/images/camera@72x.png" className="camera" />
        </div>
        <div className="image-container"
          style={{ transform: `translateX(${offsetY * 0.5}px)` }}>
          <img src="/images/phone@72x.png" className="phone" />
        </div>
        <div className="image-container"
          style={{ transform: `translateY(-${offsetY * 0.5}px)` }}>
          <img src="/images/ruler@72x.png" className="ruler" />
        </div>
        <div className="image-container"
          style={{ transform: `translateX(${offsetY * 0.3}px)` }}>
          <img src="/images/marker@72x.png" className="marker" />
        </div>
        <div className="image-container"
          style={{ transform: `translateX(${offsetY * 0.5}px)` }}>
          <img src="/images/book@72x.png" className="book" />
        </div>
      </div>
      <div className="container">
        hello
      </div>
    </section>
  )
}

export default Intro