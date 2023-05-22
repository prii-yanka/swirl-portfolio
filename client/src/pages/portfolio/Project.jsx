import React, { useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import Modal from "@mui/material/Modal";

const Project = ({ project, selected }) => {
  const [id, setId] = useState();
  // const [image, setImage] = useState();
  // const [imgs, setImgs] = useState([]);
  const [projectName, setProjectName] = useState();
  const [tags, setTags] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [video, setVideo] = useState();
  const [description, setDescription] = useState();
  const [when, setWhen] = useState([]);
  const [linkTo, setLinkTo] = useState();

  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    <Navigate to={`/${selected}`}/>
  }

  useEffect(()=> {
    handleOpen();
  }, []); 

  const handleOpen = () => {
    setOpen(true);
    // console.log("id " + d.id);
    // console.log("title " + d.title);
    // console.log("img " + d.img);
    setId(project.id);
    // setImgs(d.images);
    setProjectName(project.project_name);
    setTags(project.tags);
    setVideo(project.video);
    setDescription(project.description);
    setWhen(project.when);
    setLinkTo(project.link_to);
  };
  return (
    <Modal className="portfolio-modal" open={open} onClose={handleClose}>
      <div className="project-container">
        Modal
        {/* style={modalStyle} */}
        <div>{id}</div>
        {/* {imgs.map((image) => {
            <img src={image} alt="" />;
          })} */}
        <div>
          <img src={project.images[0]} alt="placeholder alt text" />
        </div>
        <div> {projectName} </div>
        <div> {tags} </div>
        <div> {technologies} </div>
        <div> {description} </div>
        <div> {video} </div>
        <div> {when} </div>
        <div> {linkTo} </div>
      </div>
    </Modal>
  );
};

export default Project;
