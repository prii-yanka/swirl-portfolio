// import Contact from "./pages/contact/Contact";
// import InteractiveGrid from "./pages/interactive-grid/InteractiveGrid";
// import Intro from "./pages/intro/Intro";
// import Navbar from "./pages/navbar/Navbar";
// import Portfolio from "./pages/portfolio/Portfolio";
// import Education from "./pages/education/Education";
// import Experience from "./pages/experience/Experience";
// import Skills from "./pages/skills/Skills";
import './app.css'
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import React, { useContext, useEffect } from 'react';
// import ScrollToTop from "./ScrollToTop";

// const App = () => {
//   return (
//     <div className="app">
//       <Navbar />
//       <Router>
//         <Navbar />
//         <div className="sections">
//           <ScrollToTop>
//             <Routes>
//               <React.Fragment>
//                 <Route path='/' element={<InteractiveGrid />} />
//                 <Route path='/intro' element={<Intro />} />
//                 <Route path='/education' element={<Education />} />
//                 <Route path='/experience' element={<Experience />} />
//                 <Route path='/skills' element={<Skills />} />
//                 <Route path='/portfolio' element={<Portfolio />} />
//                 <Route path='/Contact' element={<Contact />} />
//                 <Route path="*" element={<Navigate replace to="/home" />} />
//               </React.Fragment>
//             </Routes>
//           </ScrollToTop>
//         </div>
//       </Router>

//     </div>
//   );
// }

import { Nav } from './nav';
import { Main } from './pages';
import NavProvider from './context/NavContext';

const App = () => {
  return (
    <div className='appContainer'>
      <NavProvider>
        <Nav />
        <Main />
      </NavProvider>
    </div>
  );
}

export default App;
