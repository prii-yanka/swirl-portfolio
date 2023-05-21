import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Modal from "@mui/material/Modal";

const Project = ({ project }) => {
    // const [id, setId] = useState();
    // // const [image, setImage] = useState();
    // const [imgs, setImgs] = useState([]);
    // const [projectName, setProjectName] = useState();
    // const [tags, setTags] = useState([]);
    // const [technologies, setTechnologies] = useState([]);
    // const [video, setVideo] = useState();
    // const [description, setDescription] = useState();
    // const [when, setWhen] = useState([]);
    // const [linkTo, setLinkTo] = useState();


    // const [open, setOpen] = useState(false);
    // const handleClose = () => setOpen(false);

    // const handleOpen = (d) => {
    //     setOpen(true);
    //     // console.log("id " + d.id);
    //     // console.log("title " + d.title);
    //     // console.log("img " + d.img);
    //     setId(d.id);
    //     // setImgs(d.images);
    //     setProjectName(d.project_name);
    //     setTags(d.tags);
    //     setVideo(d.video);
    //     setDescription(d.description);
    //     setWhen(d.when);
    //     setLinkTo(d.link_to);
    //   };
  return (
   
        // <Modal open={open} onClose={handleClose}>
        <div className="project-container">
          Modal
          {/* style={modalStyle} */}
          <div>{project.id}</div>
          {/* {imgs.map((image) => {
            <img src={image} alt="" />;
          })} */}
          <div>
            <img src={project.imgs[0]} alt="placeholder alt text" />
          </div>
          <div> {project.project_name} </div>
          <div> {project.tags} </div>
          <div> {project.technologies} </div>
          <div> {project.description} </div>
          <div> {project.video} </div>
          <div> {project.when} </div>
          <div> {project.linkTo} </div>
        </div>
    //   </Modal>
  )
}




export default Project