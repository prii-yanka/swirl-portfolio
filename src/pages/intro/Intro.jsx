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
          <br /> <br />
          <h1> hello, I am Priyanka</h1>
          <div className="type">
            {/* Style will be inherited from the parent element */}
            <Typewriter
              words={['Front-End Developer', 'UX Designer', 'UX/UI Engineer']}
              loop
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </div>
          <div className="content"> Creative computer science student seeking opportunities in designing and developing experiences that will let humans interact with computers in novel ways.</div>
          <div className="content"> Tackling problems from the perspective of a programmer as well as an artist creates puzzles and challenges that make me excited to be in my field. It gives me the ability to think critically and analyze the problem from different angles.</div>
          <div className="content specialize">
            <div >I specialize in building experiences that are: </div>
            <div className="ugh">
              <div className="specialize-item"><span>Fast:</span> Fast load times and lag free interaction, my highest priority.</div>
              <div className="specialize-item"><span>Dynamic:</span> Websites don't have to be static, I love making pages come to life.</div>
              <div className="specialize-item"><span>Responsive:</span> My layouts will work on any device, big or small.</div>
              <div className="specialize-item"><span>Intuitive:</span> Strong preference for easy to use, intuitive UX/UI.</div>
            </div>
          </div>
        </div>
        <div className="intro-illustration-container" ref={table_ref}>
          <div className="image-container">
            <img src="images/intro@72x.png" className="intro-bg" />
          </div>
          {/* <div className="image-container">
            <img src="/images/base@72x.png" className="base" />
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default Intro