import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useNav } from '../../customHooks/useNav';
import PortfolioList from './PortfolioList';
import LoadingComponent from '../../components/LoadingComponent';
import Project from './Project';
import './portfolio.css';
import '../pages.css';

const Portfolio = () => {
    const portfolioRef = useNav('Portfolio');
    const [baseURL, setBaseURL] = useState('http://localhost:5001');
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState();
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const [selected, setSelected] = useState('all');
    
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
        const envBaseURL = process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : 'http://localhost:5001';
        setBaseURL(envBaseURL);
        const curr_selection = window.localStorage.getItem('selected');
        const selection = curr_selection == "undefined" ? 'all' : curr_selection;
        setSelected(selection);
    }, []);

    useEffect(() => {
      console.log(`selected: ${selected}`)
        const getRelatedProjects = async () => {
            try {
                const response = await fetch(`${baseURL}/:${selected}`);
                if (!response.ok) {
                    throw new Error(`An error occurred: ${response.statusText}`);
                }
                const relatedProjects = await response.json();
                console.log(`----setProjects: ${relatedProjects}\n`)

                setProjects([...relatedProjects]);

            } catch (error) {
                console.error('Failed to fetch projects:', error);
            }
        };
        getRelatedProjects();
        navigate(`/${selected}`);
    }, [selected, baseURL]);

    const openProject = async (id) => {
        try {
            const response = await fetch(`${baseURL}/:${selected}/:${id}`);
            if (!response.ok) {
                throw new Error(`An error occurred: ${response.statusText}`);
            }
            const project = await response.json();
            setSelectedProject(project);
            setOpenModal(true);
            navigate(`/${selected}/${id}`);
        } catch (error) {
            console.error('Failed to open project:', error);
        }
    };

    const closeModal = () => {
        setOpenModal(false);
        navigate(-1); // go back one page
    };

    useEffect(() => {
      console.log(projects);
      // projects.map((project) => (
      //   setPosterImages({...posterImages, [project.id]: [project.poster_image]})
      // ))
      // console.log(posterImages);
    }, [projects]);

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
        {projects.map((project) => (
            <NavLink
                to={`/${selected}/${project.id}`}
                onClick={() => openProject(project.id)}
                key={project.id}
                className={({ isActive }) => (isActive ? 'active' : '')} // Apply 'active' class to the active link
            >
                <div className="item">
                    <img src={project.poster_image} alt="" />
                    <h3>{project.project_name}</h3>
                </div>
            </NavLink>
        ))}
        <Routes>
            <Route
                path="/"
                element={<Navigate to="all" />} // replace prop will prevent creating a new entry in the history
            />
            {projects && projects.map((project) => (
                <Route
                    key={project.id}
                    path={`${selected}/*`} // Nested routes will be relative in v6
                    element={
                        <Project 
                            project={selectedProject || project} 
                            selected={selected} 
                            openModal={openModal} 
                            closeModal={closeModal} 
                        />
                    }
                />
            ))}
        </Routes>
        {/* <Routes>
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
        </Routes> */}
    </div>
    </section>
  );
};

export default Portfolio;