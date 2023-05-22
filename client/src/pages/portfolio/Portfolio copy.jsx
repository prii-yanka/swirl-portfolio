import React, { useContext, useEffect, useState } from "react";
// import { Buffer } from "buffer";
import "./portfolio.css";
import "../pages.css";
import { useNav } from "../../customHooks/useNav";
import PortfolioList from "./PortfolioList";
// import {
//   featuredPortfolio,
//   webPortfolio,
//   mobilePortfolio,
//   designPortfolio,
//   contentPortfolio,
// } from "../../data";
// import Modal from '../../components/Modal';
import Modal from "@mui/material/Modal";
// import { TagContext, TagDispatchContext } from "../../context/TagsContext";
import { Link, Navigate, NavLink, Route, Routes } from "react-router-dom";
import Project from "./Project";
// import { BrowserRouter } from "react-router-dom";
// import axios from "axios";

// const modalStyle = {
//   position: 'absolute',
//   margin: '5vh 10vw',
//   top: '0',
//   // left: '50%',
//   // transform: 'translate(-50%, 0)',
//   width: '80vw',
//   height: '90vh',
//   backgroundColor: 'white',
//   borderRadius: '10px'
// }

const Portfolio = () => {
  const portfolioRef = useNav("Portfolio");

  // const getBase64StringFromDataURL = (dataURL) =>
  //   dataURL.replace("data:", "").replace(/^.+,/, "");

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(); 
  // const [featuredProjects, setFeaturedProjects] = useState([]);
  // const [webProjects, setWebProjects] = useState([]);
  // const [mobileProjects, setMobileProjects] = useState([]);
  // const [designProjects, setDesignProjects] = useState([]);
  // const [loading, setLoading] = useState(projects ? false : true);
  const [selected, setSelected] = useState("");
  // const [data, setData] = useState([]);
  const list = [
    {
      id: "",
      title: "All",
    },
    {
      id: "featured",
      title: "Featured",
    },
    {
      id: "web",
      title: "Web App",
    },
    {
      id: "mobile",
      title: "Mobile App",
    },
    {
      id: "design",
      title: "Design",
    },
    // {
    //   id: "content",
    //   title: "Content",
    // },
  ];

  useEffect(() => {
    console.log("saving state between refresh:");

    const curr_selection = window.localStorage.getItem("selected");

    if (curr_selection) {
      setSelected(curr_selection);
    }

    async function getProjects() {
      let response;

      if (curr_selection) {
        response = await fetch(`http://localhost:5001/:${curr_selection}`);
        <Navigate to={"/" + curr_selection} />
      } else {
        response = await fetch(`http://localhost:5001`);
        <Navigate to="/"/>
      }

      if (!response.ok) {
        const message = `An error occurred loading initial: ${response.statusText}`;
        console.log(message);
        return;
      }

      const projects = await response.json();
      // console.log(projects);
      setProjects(projects);
    }
    getProjects();
  }, []);

  useEffect(() => {
    // if (selected)
    window.localStorage.setItem("selected", selected);
    if (selected) {
      async function getRelatedProjects() {
        const response = await fetch(`http://localhost:5001/:${selected}`);

        if (!response.ok) {
          const message = `An error occurred getting selected projects: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const relatedProjects = await response.json();
        setProjects(relatedProjects);
      }
      getRelatedProjects();
      <Navigate to={"/" + selected} />;
    }
  }, [selected]);

  // useEffect(() => {
  //   async function getImgs() {
  //     await fetch(`http://localhost:5001/:${selected}/:${id}`).then((res) =>
  //       setImgs(res)
  //     );
  //   }
  //   if (imgs.length > 2) {
  //     getImgs();
  //   }
  // }, [selected, id]);

  useEffect(() => {
    async function getProjects() {
      const response = await fetch(`http://localhost:5001`);

      if (!response.ok) {
        const message = `An error occurred getting projects: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const projects = await response.json();
      // console.log(projects);
      setProjects(projects);
    }

    getProjects();
  }, [projects.length]);


  useEffect(() => {
    if(selectedProject) {
      <Navigate to={`/:${selected}/:${selectedProject.id}`} />
    }
  }, [selected, selectedProject])

  const openProject = (id) => {
    async function openProjectById() {
      const response = await fetch(`http://localhost:5001/:${selected}/:${id}`);

      if (!response.ok) {
        const message = `An error occurred opening project: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const curr_project = await response.json();
      console.log(curr_project);
      setSelectedProject(curr_project);
    }

    openProjectById();
  }

  if (projects.length === 0) {
    // console.log("NO PROJECTS");
    return (
      <section className="portfolio" ref={portfolioRef} id="portfolioContainer">
        <div className="portfolio-header">
          <h1>Portfolio </h1>
        </div>
        <div>
          <h1> Loading </h1>
        </div>
      </section>
    );
    }

  // console.log("projects: " + projects[0].project_name);

  return (
    <section className="portfolio" ref={portfolioRef} id="portfolioContainer">
      <div className="portfolio-header">
        <h1>Portfolio </h1>
      </div>

      <ul>
        {list.map((item) => (
          <NavLink to={item.id}>
            <PortfolioList
              title={item.title}
              active={selected === item.id}
              setSelected={setSelected}
              id={item.id}
            />
          </NavLink>
        ))}
      </ul>
      <div className="portfolio-item-container">
        <Routes>
          <Route
            exact
            path="/*"
            element={projects.map((d) => (
              <>
                <NavLink to={d.id} onClick={() => openProject(d.id)}>
                  <div className="item">
                    <img src={d.images[0]} alt="" />
                    <h3> Defualt Route::{d.project_name}</h3>
                  </div>
                </NavLink>

                <Routes>
                  <Route path={`/:id`} element={<Project project={selectedProject} />} />
                </Routes>
              </>
            ))}
          />
          <Route
            exact
            path={`/:selected/*`}
            element={projects.map((d) => (
              <>
                <NavLink to={d.id} onClick={() => openProject(d.id)} >
                  <div className="item">
                    <img src={d.images[0]} alt="" />
                    <h3> Selected Route::{d.project_name}</h3>
                  </div>
                </NavLink>
                <Routes>
                  <Route path={`/:id`} element={<Project project={selectedProject} />} />
                </Routes>
              </>
            ))}
          />
        </Routes>
      </div>
    </section>
  );
};

export default Portfolio;
