import React from 'react';
import NavLink from './NavLink';
import { navLinks } from './navLinks';
import './nav.css';

import { Planet } from 'react-planet';

const Nav = () => {
  return (
    <div>
      <div className='logo-container'>
        <img src="images/logo.png" className="logo" />
        {/* <div> Menu </div> */}
      </div>

      <nav>
        <Planet
          centerContent={
            <div className='center'
            />
          }
          close
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
      </nav>
    </div>
  );
};

export default Nav;