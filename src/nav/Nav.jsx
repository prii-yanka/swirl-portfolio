import React from 'react';
import NavLink from './NavLink';
import { navLinks } from './navLinks';
import './nav.css';
import { motion } from 'framer-motion';

import { Planet } from 'react-planet';

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
      ease: "easeInOut"
    }
  }
}

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
  return (
    <div>
      <div className='logo-container'>
        <img src="images/logo.png" className="logo" />
        <motion.div style={{ color: "#000000" }} variants={textVariants} initial="initial" animate="final"> Click Me </motion.div>
        {/* <div> Menu </div> */}
      </div>

      <motion.nav animate={{ x: [0, 15, -15, 0] }} >
        <Planet
          centerContent={
            <div className='center'
            />
          }
          open
          autoClose
          hideOrbit
          bounceOnClose
          orbitRadius={130}
          rotation={30}
          mass={4}
          tension={500}
          friction={19}
        >
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          {navLinks.map(({ navLinkId, scrollToId }, idx) => (
            <NavLink navLinkId={navLinkId} scrollToId={scrollToId} />
          ))}

        </Planet>
      </motion.nav>

    </div >
  );
};

export default Nav;