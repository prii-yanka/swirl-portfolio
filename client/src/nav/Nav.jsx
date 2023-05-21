import React, { useCallback, useEffect, useState } from "react";
import NavLink from "./NavLink";
import { navLinks } from "./navLinks";
import "./nav.css";
import { motion } from "framer-motion";

import { Planet } from "react-planet";

let textVariants = {
  initial: {
    opacity: 1,
    // scale: 0
    // pathLength: 0
  },
  final: {
    opacity: 0,
    // scale: 1,
    // pathLength: 1,
    transition: {
      duration: 3,
      ease: "easeInOut",
    },
  },
};

// let navVariants = {
//   initial: {
//     opacity: 1,
//     // scale: 0
//     // pathLength: 0
//   },
//   final: {
//     // scale: 1,
//     // pathLength: 1,

//     transition: {
//       duration: 0.2,
//       ease: "easeInOut"
//     }
//   }
// }

const Nav = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = useCallback(() => {
    // find current scroll position
    const currentScrollPos = window.pageYOffset;
    // set state based on location info (explained in more detail below)
    // setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 30) || currentScrollPos < 10 || currentScrollPos == prevScrollPos);
    setVisible(prevScrollPos > currentScrollPos);
    // set state to new scroll position
    setPrevScrollPos(currentScrollPos);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // console.log("prevScroll: " + prevScrollPos + " " + "visibe: " + visible);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);
  return (
    <div className="navButton" style={{ transition: "top 0.3s",top: visible ? "0" : "-14rem" }}>
      <div className="logo-container">
        <img src="images/logo.png" className="logo" />
        <motion.div
          style={{ color: "#000000" }}
          variants={textVariants}
          initial="initial"
          animate="final"
        >
          {" "}
          Click Me{" "}
        </motion.div>
        {/* <div> Menu </div> */}
      </div>

      <motion.nav animate={{ x: [0, 15, -15, 0] }}>
        <Planet
          centerContent={<div className="center" />}
          autoClose
          hideOrbit
          orbitRadius={130}
          rotation={30}
          mass={2}
          tension={100}
          friction={15}
        >
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          {navLinks.map(({ navLinkId, scrollToId }, idx) => (
            <NavLink key={idx} navLinkId={navLinkId} scrollToId={scrollToId} />
          ))}
        </Planet>
      </motion.nav>
    </div>
  );
};

export default Nav;
