import Contact from "./components/contact/Contact";
import InteractiveGrid from "./components/interactive-grid/InteractiveGrid";
import Intro from "./components/intro/Intro";
import Navbar from "./components/navbar/Navbar";
import Portfolio from "./components/portfolio/Portfolio";
import Education from "./components/education/Education";
import Experience from "./components/experience/Experience";
import Skills from "./components/skills/Skills";
import './app.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import ScrollToTop from "./ScrollToTop";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Router>
        <Navbar />
        <div className="sections">
          <ScrollToTop>
            <Routes>
              <React.Fragment>
                <Route path='/' element={<InteractiveGrid />} />
                <Route path='/intro' element={<Intro />} />
                <Route path='/education' element={<Education />} />
                <Route path='/experience' element={<Experience />} />
                <Route path='/skills' element={<Skills />} />
                <Route path='/portfolio' element={<Portfolio />} />
                <Route path='/Contact' element={<Contact />} />
                <Route path="*" element={<Navigate replace to="/home" />} />
              </React.Fragment>
            </Routes>
          </ScrollToTop>
        </div>
      </Router>

    </div>
  );
}

export default App;
