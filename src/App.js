import Contact from "./components/contact/Contact";
import InteractiveGrid from "./components/interactive-grid/InteractiveGrid";
import Intro from "./components/intro/Intro";
import Navbar from "./components/navbar/Navbar";
import Portfolio from "./components/portfolio/Portfolio";
import Education from "./components/education/Education";
import Experience from "./components/experience/Experience";
import Skills from "./components/skills/Skills";
import './app.css'

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="sections">
        <InteractiveGrid />
        <Intro />
        <Education />
        <Experience />
        <Skills />
        <Portfolio />
        <Contact />
      </div>
    </div>
  );
}

export default App;
