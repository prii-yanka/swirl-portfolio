import './intro.css'
import '../pages.css'
import { useNav } from '../../customHooks/useNav';
import React, { useRef, useState, useLayoutEffect } from "react"
import { Typewriter } from 'react-simple-typewriter'

const Intro = () => {

  const table_ref = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  // var mySVG = ('svg').drawsvg();

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);
    console.log("scroll1");
    return () => window.removeEventListener('Scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (!table_ref.current) return
    const topPos = table_ref.current.getBoundingClientRect().top
    const scrollPos = window.scrollY + window.innerHeight
    if (topPos < scrollPos) {
      // enter animation code here
      // console.log("top less then scroll");
      setOffsetY(window.scrollY);
    }
  }

  const introRef = useNav('Intro')

  return (
    <section className="intro" ref={introRef} id='introContainer'>
      <div className="container">

        <div className="about-me">
          <div> hello, I am Priyanka</div>
          <div style={{ color: 'red', fontWeight: 'bold' }}>
            {/* Style will be inherited from the parent element */}
            <Typewriter
              words={[' Front-End Developer', ' UX Designer', ' UI Engineer']}
              loop
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </div>
        </div>
        <div className="table-container" ref={table_ref}>
          <div className="image-container">
            <img src="/images/intro@72x.png" className="intro-bg" />
          </div>
          {/* <div className="image-container">
            <img src="/images/base@72x.png" className="base" />
          </div>
          <div className="image-container"
            style={{ transform: `translateX(${offsetY * 0.1}px)` }}>
            <img src="/images/folders@72x.png" className="folders" />
          </div>
          <div className="image-container"
            style={{ transform: `translateX(-${offsetY * 0.1}px)` }}>
            <img src="/images/color-cards@72x.png" className="color-cards" />
          </div>
          <div className="image-container"
            style={{ transform: `translateX(-${offsetY * 0.1}px)` }}>
            <img src="/images/tablet@72x.png" className="tablet" />
          </div>
          <div className="image-container"
            style={{ transform: `translateX(${offsetY * 0.1}px)` }}>
            <img src="/images/camera@72x.png" className="camera" />
          </div>
          <div className="image-container"
            style={{ transform: `translateX(-${offsetY * 0.1}px)` }}>
            <img src="/images/phone@72x.png" className="phone" />
          </div>
          <div className="image-container"
            style={{ transform: `translateX(-${offsetY * 0.1}px)` }}>
            <img src="/images/ruler@72x.png" className="ruler" />
          </div>
          <div className="image-container"
            style={{ transform: `translateX(${offsetY * 0.1}px)` }}>
            <img src="/images/marker@72x.png" className="marker" />
          </div>
          <div className="image-container"
            style={{ transform: `translateX(${offsetY * 0.1}px)` }}>
            <img src="/images/book@72x.png" className="book" />
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default Intro