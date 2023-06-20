import React, { useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import "./project.css";
import "../pages.css";
import moment from "moment";
import LoadingComponent from "../../components/LoadingComponent";

const Project = ({ project, selected, openModal, closeModal }) => {
  // const [id, setId] = useState();
  const [images, setImages] = useState([]);
  const [imageCompare, setImageCompare] = useState();
  const [isVideo, setIsVideo] = useState(false);
  const [imgLoadedCount, setImgLoadedCount] = useState(0);
  const [imageStyle, setImageStyle] = useState({
    // border: '1px solid black'
    width: '0'
  });
  
  // let imageStyle = {
  //   // border: '1px solid black'
  //   width: '0'
  // };
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
    setImgLoadedCount(0);
    setImageStyle({width: '0'})
    closeModal(true);
  };

  const onLoad = () => {
    setImgLoadedCount(imgLoadedCount+1);
  }

  useEffect(()=> {
    if(images.length == imgLoadedCount) {
      console.log(`here where images.length == imgLoadedCount`)
      // imageStyle = {
      //   // height: 'auto'
      //   width: '250px'
      // }
      setImageStyle({
        // height: 'auto'
        width: '250px'
      });
    }
  }, [images, imgLoadedCount])

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
    setImageStyle({width: '0'})
  };

  useEffect(() => {
    setImages([...project.images]);
    setImageCompare(project.images[0]);
    // window.location.reload(false);
    async function checkVideo() {
      const response = await fetch(project.video);
      if (!response.ok) {
        // const message = `An error occurred getting video: ${response.statusText}`;
        // console.log(message)
        setIsVideo(false);
      } else {
        setIsVideo(true);
      }
    }
    checkVideo();
  }, [project, imageCompare]);
 

  return (
    <Modal className="portfolio-modal" open={open} onClose={handleClose}>
      <div className="project-container">
        <h1> {project.project_name} </h1>
        {/* <div>{project.id}</div> */}
        { images.length != imgLoadedCount && <LoadingComponent/>}
        {<div className="images-container">
          {images.map((image, idx) => {
            return (
              <div key={idx}>
                <a href={image} target="_blank" rel="noreferrer"> 
                  <img src={image} onLoad={onLoad} alt="placeholder alt text" style={imageStyle}/>
                  {/* <p> {image_description/label}</p> */}
                 </a>
              </div>
            );
          })}
        </div>}
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
            <div>
              Description: <br /> <br />
            </div>
          </div>
          <div className="item">
            <div className="label">
              <div> About The Client:</div>
            </div>
            <div>{project.description.aboutTheClient.map((data) => <div> {data} </div>)}</div>
          </div>
          <div className="item">
            <div className="label">
              <div> Goal And Situation:</div>
            </div>
            <div>{project.description.goalAndSituation.map((data) => <div> {data} </div>)}</div>
          </div>
          <div className="item">
            <div className="label">
              <div> Process And Why:</div>
            </div>
            <div>{project.description.processAndWhy.map((data) => <div> {data} </div>)} </div>
          </div>
          <div className="item">
            <div className="label">
              <div> The Outcome:</div>
            </div>
            <div>{project.description.theOutcome.map((data) => <div> {data} </div>)} </div>
          </div>
          <div className="item">
            <div className="label">
              <div> The Team:</div>
            </div>
            <div> {project.description.theTeam.map((data) => <div> {data} </div>)} </div>
          </div>
        </div>
        {isVideo && (
          <div className="video-container">
            <div className="label">
              <div>
                Video: <br /> <br />
              </div>
            </div>
            <video src={project.video} controls>
              {/* <source  type="video/mp4" /> */}
            </video>
            <br /> <br />
          </div>
        )}
        <div>
          {" "}
          {moment(project.when[0]).format("MMMM Do, YYYY")} -{" "}
          {moment(project.when[1]).format("MMMM Do, YYYY")} <br /> <br />{" "}
        </div>
        <div> <a href={project.linkTo} target="_blank" rel="noreferrer"> {project.linkTo} </a> </div>
      </div>
    </Modal>
  );
};

export default Project;
