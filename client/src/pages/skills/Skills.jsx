import React from "react";
import "./skills.css";
import "../pages.css";
import { useNav } from "../../customHooks/useNav";
import { CircularPacking2Levels } from "../../components/skills-visualization/CircularPacking2Levels";

const Skills = () => {
  const skillsRef = useNav("Skills");

  return (
    <section className="skills" ref={skillsRef} id="skillsContainer">
      <div className="skills-container">
        <div className="about-skills">
          <h1> Skills </h1>
          {/* <div className="content">
            <div className="development-skills">
              <h4> Development</h4>
              <div className="skill-item main-item">
                <p> HTML </p>
                <div className="skill-level">
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot empty"> </div>
                </div>
              </div>
              <div className="skill-item main-item">
                <p> CSS </p>
                <div className="skill-level">
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot empty"> </div>
                </div>
              </div>
              <div className="skill-item main-item">
                <p> JavaScript </p>
                <div className="skill-level">
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot empty"> </div>
                </div>
                <div className="related">
                  <div className="skill-item">
                    <p> React </p>
                    <div className="skill-level">
                      <div className="dot filled"> </div>
                      <div className="dot filled"> </div>
                      <div className="dot filled"> </div>
                      <div className="dot filled"> </div>
                      <div className="dot empty"> </div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <p> Node </p>
                    <div className="skill-level">
                      <div className="dot filled"> </div>
                      <div className="dot filled"> </div>
                      <div className="dot filled"> </div>
                      <div className="dot empty"> </div>
                      <div className="dot empty"> </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="skill-item main-item">
                <p> Databases </p>
                <div className="skill-level">
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot empty"> </div>
                </div>
                <div className="related">
                  <div className="skill-item">
                    <p> MySQL </p>
                    <div className="skill-level">
                      <div className="dot filled"> </div>
                      <div className="dot filled"> </div>
                      <div className="dot filled"> </div>
                      <div className="dot filled"> </div>
                      <div className="dot empty"> </div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <p> MongoDB </p>
                    <div className="skill-level">
                      <div className="dot filled"> </div>
                      <div className="dot filled"> </div>
                      <div className="dot filled"> </div>
                      <div className="dot empty"> </div>
                      <div className="dot empty"> </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="skill-item main-item">
                <p> Machine Learning </p>
                <div className="skill-level">
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot empty"> </div>
                  <div className="dot empty"> </div>
                </div>
                <div className="related">
                  <div className="skill-item">
                    <p> R/RStudio </p>
                    <div className="skill-level">
                      <div className="dot filled"> </div>
                      <div className="dot filled"> </div>
                      <div className="dot filled"> </div>
                      <div className="dot empty"> </div>
                      <div className="dot empty"> </div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <p> Python </p>
                    <div className="skill-level">
                      <div className="dot filled"> </div>
                      <div className="dot filled"> </div>
                      <div className="dot filled"> </div>
                      <div className="dot empty"> </div>
                      <div className="dot empty"> </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="design-skills">
              <h4> Design </h4>
              <div className="skill-item main-item">
                <p> Adobe Photoshop </p>
                <div className="skill-level">
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot empty"> </div>
                </div>
              </div>
              <div className="skill-item main-item">
                <p> Adobe Illustrator </p>
                <div className="skill-level">
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot empty"> </div>
                </div>
              </div>
              <div className="skill-item main-item">
                <p> Adobe Premiere </p>
                <div className="skill-level">
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot empty"> </div>
                </div>
              </div>
              <div className="skill-item main-item">
                <p> Blender (3D + animation) </p>
                <div className="skill-level">
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot empty"> </div>
                </div>
              </div>
              <div className="skill-item main-item">
                <p> Wireframing and Prototyping </p>
                <div className="skill-level">
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot filled"> </div>
                  <div className="dot empty"> </div>
                </div>
                <div className="related">
                  <div className="skill-item">
                    <p> AdobeXD </p>
                    <div className="skill-level">
                      <div className="dot filled"> </div>
                      <div className="dot filled"> </div>
                      <div className="dot filled"> </div>
                      <div className="dot filled"> </div>
                      <div className="dot empty"> </div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <p> Figma </p>
                    <div className="skill-level">
                      <div className="dot filled"> </div>
                      <div className="dot filled"> </div>
                      <div className="dot filled"> </div>
                      <div className="dot empty"> </div>
                      <div className="dot empty"> </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="other">
            {" "}
            I have also worked with:
            <br /> Java | C/C++ | Git & GitHub | Linux Environment | SCRUM{" "}
            <br /> as part of my projects and classes
          </div> */}
          <CircularPacking2Levels/>
        </div>
        <div className="skills-illustration-container">
          <div className="image-container">
            <img src="images/skills@72x.png" className="skills-bg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
