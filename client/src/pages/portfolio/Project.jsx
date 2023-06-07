import React, { useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import "./project.css";
import "../pages.css";

const Project = ({ project, selected, openModal, closeModal }) => {
  // const [id, setId] = useState();
  const [images, setImages] = useState([]);
  const [imageCompare, setImageCompare] = useState();
  // // const [imgs, setImgs] = useState([]);
  // const [projectName, setProjectName] = useState();
  // const [tags, setTags] = useState([]);
  // const [technologies, setTechnologies] = useState([]);
  // const [video, setVideo] = useState();
  // const [description, setDescription] = useState();
  // const [when, setWhen] = useState([]);
  // const [linkTo, setLinkTo] = useState();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    // <Navigate to={`/${selected}`}/>
    console.log("handle modal close");
    setOpen(false);
    closeModal(true);
  };

  useEffect(() => {
    if (openModal) {
      // console.log(`HANDLE OPEN: ${JSON.stringify(project)}`)
      handleOpen();
    }
    // else {
    //   handleClose();
    // }
  }, [openModal]);

  const handleOpen = () => {
    // window.location.reload(false);
    setOpen(true);

    //   // console.log("id " + d.id);
    //   // console.log("title " + d.title);
    //   // console.log("img " + d.img);
    //   setId(project.id);
    //   setProjectName(project.project_name);
    //   setTags(project.tags);
    //   setVideo(project.video);
    //   setDescription(project.description);
    //   setWhen(project.when);
    //   setLinkTo(project.link_to);
  };

  useEffect(() => {
    setImages([...project.images]);
    setImageCompare(project.images[0]);
    // window.location.reload(false);
  }, [project, imageCompare]);

  return (
    <Modal className="portfolio-modal" open={open} onClose={handleClose}>
      <div className="project-container">
        <h1> {project.project_name} </h1>
        {/* <div>{project.id}</div> */}
        <div className="images-container">
          {images.map((image, idx) => {
            return (
              <div key={idx}>
                <img src={image} alt="placeholder alt text" />
              </div>
            );
          })}
        </div>
        <div className="tags-container">
          <div className="label">
            {" "}
            <div>Tags: </div>{" "}
          </div>
          {project.tags.map((tag) => (
            <div className="tags"> {tag} </div>
          ))}
        </div>
        <div className="technologies-container">
          <div className="label">
            {" "}
            <div> Technologies: </div>{" "}
          </div>
          {project.technologies.map((technology) => (
            <div className="technologies"> {technology} </div>
          ))}
        </div>
        <div className="description">
          <div className="label">
            {" "}
            <div>
              {" "}
              Description: <br /> <br />{" "}
            </div>{" "}
          </div>
          <div> {project.description} </div>
        </div>
        <div>
          <div className="label">
            {" "}
            <div>
              {" "}
              Video: <br /> <br />{" "}
            </div>{" "}
          </div>
          <video src={project.video} width="100%">
            {/* <source  type="video/mp4" /> */}
          </video>
        </div>
        <div> {project.when} </div>
        <div> {project.linkTo} </div>
      </div>
    </Modal>
  );
};

export default Project;
