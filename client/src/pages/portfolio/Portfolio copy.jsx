import React, { useContext, useEffect, useState } from "react";
// import { Buffer } from "buffer";
import "./portfolio.css";
import "../pages.css";
import { useNav } from "../../customHooks/useNav";
import PortfolioList from "./PortfolioList";
import LoadingComponent from "../../components/LoadingComponent";
import { Link, Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Project from "./Project";

const Portfolio = () => {
  const portfolioRef = useNav("Portfolio");

  // const getBase64StringFromDataURL = (dataURL) =>
  //   dataURL.replace("data:", "").replace(/^.+,/, "");
  const [baseURL, setBaseURL] = useState("")
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  // const [posterImages, setPosterImages] = useState({});
  const navigate = useNavigate();
  // const [closeModal, setCloseModal] = useState(true);
  // const [featuredProjects, setFeaturedProjects] = useState([]);
  // const [webProjects, setWebProjects] = useState([]);
  // const [mobileProjects, setMobileProjects] = useState([]);
  // const [designProjects, setDesignProjects] = useState([]);
  // const [loading, setLoading] = useState(projects ? false : true);
  const [selected, setSelected] = useState();
  // const [data, setData] = useState([]);
  const list = [
    {
      id: "all",
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
    {
      id: "development",
      title: "Development",
    },
    {
      id: "internship",
      title: "Internship",
    },
    {
      id: "paintings",
      title: "Paintings",
    },
    {
      id: "studio",
      title: "Studio Art",
    },
  ];

  useEffect(() => {
    console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)
    if(process.env.NODE_ENV == "production") {
      setBaseURL(process.env.PUBLIC_URL);
    } else if (process.env.NODE_ENV == "development") {
      setBaseURL("http://localhost:5001");
    }
    // console.log("saving state between refresh:");
    const curr_selection = window.localStorage.getItem("selected");

    if (curr_selection && curr_selection !== "undefined") {
      setSelected(curr_selection);
      console.log(`current selection from local storage: ${curr_selection}`)
      // getProjects();
      // navigate(`/${selected}`);
    }
    else {
      setSelected("all");
      // getProjects();
    }
  }, []);

  useEffect(() => {
    // if (selected)
    // if (selected) {
      console.log("Base URL:", baseURL);
      console.log("Selected Category:", selected);
      window.localStorage.setItem("selected", selected);

      async function getRelatedProjects() {
        // const response = await fetch(`http://localhost:5001/:${selected}`);
        const response = await fetch(`${baseURL}/:${selected}`);


        if (!response.ok) {
          const message = `An error occurred getting selected projects: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const relatedProjects = await response.json();
        // console.log(`----setProjects: ${relatedProjects}\n`)
        setProjects([...relatedProjects]);
      }
       if (selected) {
    getRelatedProjects();
    navigate(`/${selected}`);
  }
      // setPosterImages({});
    // }
  }, [selected, baseURL]);

  useEffect(() => {
    console.log(projects);
    // projects.map((project) => (
    //   setPosterImages({...posterImages, [project.id]: [project.poster_image]})
    // ))
    // console.log(posterImages);
  }, [projects]);

  const openProject = async (id) => {
    async function openProjectById() {
      const response = await fetch(`${baseURL}/:${selected}/:${id}`);

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

  const closeModal = (closeValue) => {
    setOpenModal(!closeValue);
    navigate(-1); // go back one page
    // if (selected) {
      // <Navigate to={`/${selected}`} />
    // } else {
    //   <Navigate to={`/`} />
    // }
  }

  if (projects.length === 0 ) {
    // console.log("NO PROJECTS");
    return (
      <section className="portfolio" ref={portfolioRef} id="portfolioContainer">
        <div className="portfolio-header">
          <h1>Portfolio </h1>
        </div>

        <div className="loading">
          <h1> Projects Loading </h1>
          <LoadingComponent/>
        </div>
      </section>
    );
  }
  else return (
    <section className="portfolio" ref={portfolioRef} id="portfolioContainer">
      <div className="portfolio-header">
        <h1>Portfolio </h1>
      </div>

      <ul className="filter">
        {list.map((item) => (
          <NavLink to={`/${item.id}`} key={item.id}>
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
        { projects.map((d) => { 
          // console.log(`d.poster_image: ${d.poster_image}`);
          return (
            <NavLink
              to={`/${selected}/${d.id}`}
              onClick={() => openProject(d.id)}
              key={d.id}
            >
              <div className="item">
                <img src={d.poster_image} alt="" />
                <h3> {d.project_name}</h3>
              </div>
            </NavLink>
          )})}
        <Routes>
              <Route
                exact
                path={`/`}
                element={<Navigate to={`all`}/>}
              ></Route>
          { projects && 
            projects.map((d) => (
              <Route
                key={d.id}
                exact
                path={`/${selected}/*`}
                element={<Project project={selectedProject? selectedProject : d} selected={selected} openModal={openModal} closeModal={closeModal}/>}
              ></Route>
            ))}
        </Routes>
      </div>
    </section>
  );
};

export default Portfolio;
