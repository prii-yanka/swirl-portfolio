import React, { createRef, useEffect } from 'react'
import lottie from "lottie-web"
import loading from "./loading.json"
import './components.css'

const LoadingComponent = () => {
    const loadingAnimationContainer = createRef();

    useEffect(() => {
      const anim = lottie.loadAnimation({
        container: loadingAnimationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: loading
      });
    //   return () => anim.destroy(); // optional clean up for unmounting
    }, []);
  
    return (
      <div className='loading_animation_container' ref={loadingAnimationContainer}>
        {/* <div> Bodymovin animations in react </div> */}
      </div>
    )
}

export default LoadingComponent


