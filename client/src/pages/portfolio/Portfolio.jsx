import React, { useContext, useEffect, useState } from "react";
// import { Buffer } from "buffer";
import "./portfolio.css";
import "../pages.css";
import { useNav } from "../../customHooks/useNav";
import PortfolioList from "./PortfolioList";

import Modal from "@mui/material/Modal";
// import { TagContext, TagDispatchContext } from "../../context/TagsContext";
import { Link, Navigate, NavLink, Route, Routes } from "react-router-dom";
import Project from "./Project";
// import ProjectThumbnail from "./ProjectThumbnail";
const Portfolio = () => {
  const portfolioRef = useNav("Portfolio");

  // const getBase64StringFromDataURL = (dataURL) =>
  //   dataURL.replace("data:", "").replace(/^.+,/, "");

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [posterImage, setPosterImage] = useState();
  // const [closeModal, setCloseModal] = useState(true);
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

  // const getProjects =  async () => {
  //   let response;

  //   if (selected) {
  //     response = await fetch(`http://localhost:5001/:${selected}`);
  //     <Navigate to={"/" + selected} />;
  //   } else {
  //     response = await fetch(`http://localhost:5001`);
  //     <Navigate to="/" />;
  //   }

  //   if (!response.ok) {
  //     const message = `An error occurred loading initial: ${response.statusText}`;
  //     console.log(message);
  //     return;
  //   }

  //   const projects = await response.json();
  //   // console.log(projects);
  //   setProjects(projects);
  // }

  useEffect(() => {
    console.log("saving state between refresh:");

    // const curr_selection = window.localStorage.getItem("selected");

    // if (curr_selection) {
    //   setSelected(curr_selection);
    // }
    // else {
    //   setSelected("");
    // }

    const getProjects =  async () => {
      let response;
  
      if (selected) {
        response = await fetch(`http://localhost:5001/:${selected}`);
        <Navigate to={"/" + selected} />;
      } else {
        response = await fetch(`http://localhost:5001`);
        <Navigate to="/" />;
      }
  
      if (!response.ok) {
        const message = `An error occurred loading initial: ${response.statusText}`;
        console.log(message);
        return;
      }
  
      const projects = await response.json();
      // console.log(`----setProjects: ${projects}\n`);
      setProjects([...projects]);
    }
    getProjects();
  }, []);

  useEffect(() => {
    // if (selected)
    if (selected) {
      // window.localStorage.setItem("selected", selected);

      async function getRelatedProjects() {
        const response = await fetch(`http://localhost:5001/:${selected}`);

        if (!response.ok) {
          const message = `An error occurred getting selected projects: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const relatedProjects = await response.json();
        // console.log(`----setProjects: ${relatedProjects}\n`)
        setProjects([...relatedProjects]);
      }
      getRelatedProjects();
      <Navigate to={"/" + selected} />;
    }
  }, [selected]);

  // useEffect(() => {
  //   const getProjects =  async () => {
  //     let response;
  
  //     if (selected) {
  //       response = await fetch(`http://localhost:5001/:${selected}`);
  //       <Navigate to={"/" + selected} />;
  //     } else {
  //       response = await fetch(`http://localhost:5001`);
  //       <Navigate to="/" />;
  //     }
  
  //     if (!response.ok) {
  //       const message = `An error occurred loading initial: ${response.statusText}`;
  //       console.log(message);
  //       return;
  //     }
  
  //     const projects = await response.json();
  //     // console.log(projects);
  //     setProjects(projects);
  //   }
  //   getProjects();
  // }, [projects.length]);

  useEffect(() => {
    console.log(projects);
    
  }, [projects]);

  // useEffect(() => {
  //   if (selectedProject) {
  //     <Navigate to={`/${selected}/${selectedProject.id}`} />;
  //   }
  // }, [selected, selectedProject]);

  const openProject = async (id) => {
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

    await openProjectById();
    <Navigate to={`/${selected}/${id}`} />    
    setOpenModal(true);
  };

  useEffect(() => {

  }, [openModal]);

  if (projects.length === 0) {
    // console.log("NO PROJECTS");
    return (
      <section className="portfolio" ref={portfolioRef} id="portfolioContainer">
        <div className="portfolio-header">
          <h1>Portfolio </h1>
        </div>

        {/* <ul>
        {list.map((item) => (
          <NavLink to={`/${item.id}`}>
            <PortfolioList
              title={item.title}
              active={selected === item.id}
              setSelected={setSelected}
              id={item.id}
            />
          </NavLink>
        ))}
      </ul> */}
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
          <NavLink to={`/${item.id}`}>
            <PortfolioList
              title={item.title}
              active={selected === item.title}
              setSelected={setSelected}
              id={item.id}
            />
          </NavLink>
        ))}
      </ul>
      <div className="portfolio-item-container">
      {projects && !selected &&
          projects.map((d) => (
            <NavLink
              to={`/*`}
              onClick={() => openProject(d.id)}
            >
              <div className="item">
                <img src={d.poster_image} alt="" />
                <h3> Default Route::{d.project_name}</h3>
              </div>
            </NavLink>
          ))}
        {projects && selected && 
          projects.map((d) => (
            <NavLink
              to={`/${selected}/${d.id}`}
              onClick={() => openProject(d.id)}
            >
              <div className="item">
                <img src={d.poster_image} alt="" />
                <h3> Selected Route::{d.project_name}</h3>
              </div>
            </NavLink>
          ))}
        {/* <Routes>
        
        </Routes> */}
        <Routes>
          {/* {projects &&
            projects.map((d) => (
              <Route
                key={d.id}
                path={`/*`}
                element={<Project project={d} selected=""/>}
              ></Route>
            ))} */}
             {/* <Route
                path={`/`}
              > */}
               { projects &&
            projects.map((d) => (
              <Route
                key={d.id}
                exact
                path="/*"
                element={<Project project={d} selected={selected} openModal={openModal} closeModal={(closeValue)=>{setOpenModal(closeValue)}}/>}
              ></Route>
            ))}
          { projects && selectedProject &&
            projects.map((d) => (
              <Route
                key={d.id}
                exact
                path={`/${selected}/*`}
                element={<Project project={selectedProject} selected={selected} openModal={openModal} closeModal={(closeValue)=>{setOpenModal(closeValue)}}/>}
              ></Route>
            ))}
            {/* </Route> */}
        </Routes>
      </div>
    </section>
  );
};

export default Portfolio;
