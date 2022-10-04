import React, { useContext, useEffect, useState } from "react";
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
import { TagContext, TagDispatchContext } from "../../context/TagsContext";
import { Link, Navigate, NavLink, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

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
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [img, setImg] = useState();
  const [title, setTitle] = useState();
  const handleOpen = (d) => {
    setOpen(true);
    // console.log("id " + d.id);
    // console.log("title " + d.title);
    // console.log("img " + d.img);
    setId(d._id);
    setImg(d.images[0]);
    setTitle(d.project_name);
  };
  const handleClose = () => setOpen(false);

  const [projects, setProjects] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [webProjects, setWebProjects] = useState([]);
  const [mobileProjects, setMobileProjects] = useState([]);
  const [designProjects, setDesignProjects] = useState([]);
  // const [loading, setLoading] = useState(projects ? false : true);
  const [selected, setSelected] = useState("");
  const [data, setData] = useState([]);
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
    // const featured = window.localStorage.getItem("featuredProjects");
    // const web = window.localStorage.getItem("webProjects");
    // const mobile = window.localStorage.getItem("mobileProjects");
    // const design = window.localStorage.getItem("designProjects");

    if(curr_selection) {
      setSelected(curr_selection);
    }
   
    async function getProjects() {

      let response;

      if (curr_selection == "featured") {
        response = await fetch(`http://localhost:5001/featured`);
      }
      else if (curr_selection == "web") {
        response = await fetch(`http://localhost:5001/web`);
      }
      else if (curr_selection == "mobile") {
        response = await fetch(`http://localhost:5001/mobile`);
      }
      else if (curr_selection == "design") {
        response = await fetch(`http://localhost:5001/design`);
      } else {
        response = await fetch(`http://localhost:5001`);
      }

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const projects = await response.json();
      // console.log(projects);
      setData(projects);

    }
    getProjects();

  }, []);

  useEffect(() => {
    // if (selected) 
    window.localStorage.setItem("selected", selected);
    // if (featuredProjects) window.localStorage.setItem("featuredProjects", featuredProjects);
    // if (webProjects) window.localStorage.setItem("webProjects", webProjects);
    // if (mobileProjects) window.localStorage.setItem("mobileProjects", mobileProjects);
    // if (designProjects) window.localStorage.setItem("designProjects", designProjects);
  }, [selected]);

  // }, [selected, featuredProjects, webProjects, mobileProjects, designProjects]);

  // useEffect(() => {
  //   async function getProjects() {

  //     let response;

  //     if (selected == "featured") {
  //       response = await fetch(`http://localhost:5001/featured`);
  //     }
  //     else if (selected == "web") {
  //       response = await fetch(`http://localhost:5001/web`);
  //     }
  //     else if (selected == "mobile") {
  //       response = await fetch(`http://localhost:5001/mobile`);
  //     }
  //     else if (selected == "design") {
  //       response = await fetch(`http://localhost:5001/design`);
  //     } else {
  //       response = await fetch(`http://localhost:5001`);
  //     }

  //     if (!response.ok) {
  //       const message = `An error occurred: ${response.statusText}`;
  //       window.alert(message);
  //       return;
  //     }
  // 
  //     const projects = await response.json();
  //     // console.log(projects);
  //     setData(projects);
  //     // setFeaturedProjects(projects);
  //     // setWebProjects(projects);
  //     // setMobileProjects(projects);
  //     // setDesignProjects(projects);
  //   }
  //   // const getProjects = async() => {
  //   //   try {
  //   //     const response = await fetch("http://localhost:5001")
  //   //     const json = await response.json();
  //   //     setData(json);
  //   //   } catch (error){
  //   //     const message = `An error occurred: ${error}`;
  //   //     window.alert(message);
  //   //   }
  //   // }

  //   getProjects();
  // }, []);

  useEffect(() => {
    async function getProjects() {
      const response = await fetch(`http://localhost:5001`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const projects = await response.json();
      // console.log(projects);
      setProjects(projects);
    }

    getProjects();
  }, [projects.length]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getFeaturedProjects() {
      const response = await fetch(`http://localhost:5001/featured`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const featuredProjects = await response.json();
      setFeaturedProjects(featuredProjects);
    }
    getFeaturedProjects();
    // setLoading(false);
    // return;
  }, [featuredProjects.length]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getWebProjects() {
      const response = await fetch(`http://localhost:5001/web`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const webProjects = await response.json();
      setWebProjects(webProjects);
    }

    getWebProjects();
    return;
  }, [webProjects.length]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getMobileProjects() {
      const response = await fetch(`http://localhost:5001/mobile`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const mobileProjects = await response.json();
      setMobileProjects(mobileProjects);
    }

    getMobileProjects();
    return;
  }, [mobileProjects.length]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getDesignProjects() {
      const response = await fetch(`http://localhost:5001/design`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const designProjects = await response.json();
      setDesignProjects(designProjects);
    }

    getDesignProjects();
    return;
  }, [designProjects.length]);

  // }, [projects.length]);

  useEffect(() => {
    switch (selected) {
      case "featured":
        setData(featuredProjects);
        break;
      case "web":
        setData(webProjects);
        break;
      case "mobile":
        setData(mobileProjects);
        break;
      case "design":
        setData(designProjects);
        break;
      default:
        setData(projects);
    }
    // setLoading(false); //set loading to false once data is set
  }, [selected]);

  if (data.length === 0) {
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
        <Modal open={open} onClose={handleClose}>
          <div className="portfolio-modal">
            Modal
            {/* style={modalStyle} */}
            <div>{id}</div>
            {/* <img
            src={img}
            alt=""
          /> */}
            {/* {img.map((image) => {

          })} */}
            <div> {title}</div>
          </div>
        </Modal>
        <ul>
          {/* <NavLink to={"/"}>
            <PortfolioList
              title="All"
              active={selected === "all"}
              setSelected={setSelected}
              id="all"
            />
          </NavLink> */}
          {list.map((item) => (
            <NavLink to={"/" + item.id}>
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
          {/* {console.log(selected)} */}
          {/* {console.log(data)} */}
          <Routes>
            <Route
              exact
              path="/"
              element={data.map((d) => (
                <div className="item" onClick={() => handleOpen(d)}>
                  <img src={d.images[0]} alt="" />
                  <h3>Default Route:: {d.project_name}</h3>
                </div>
              ))}
            />
            <Route
              exact
              path={"/" + selected}
              element={data.map((d) => (
                <div className="item" onClick={() => handleOpen(d)}>
                  <img src={d.images[0]} alt="" />
                  <h3> Selected Route::{d.project_name}</h3>
                </div>
              ))}
            />
          </Routes>
        </div>
      </section>
    );
};

export default Portfolio;
