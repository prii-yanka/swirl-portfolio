import React, { useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import "./project.css";
import "../pages.css";
import moment from "moment";
import LoadingComponent from "../../components/LoadingComponent";
import ImageSwipe from "./ImageSwipe";
// import Divider from '@mui/material/Divider';
import Timeline from "@mui/lab/Timeline";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";
import HailIcon from "@mui/icons-material/Hail";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import OutputIcon from "@mui/icons-material/Output";
import GroupsIcon from "@mui/icons-material/Groups";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProjectDescriptionItem from "./ProjectDescriptionItem";

const descList = [
  {
    label: "aboutTheClient",
    icon: HailIcon,
  },
  {
    label: "goalAndSituation",
    icon: AdsClickIcon,
  },
  {
    label: "processAndWhy",
    icon: PsychologyAltIcon,
  },
  {
    label: "theOutcome",
    icon: OutputIcon,
  },
  {
    label: "theTeam",
    icon: GroupsIcon,
  },
];

const webTimelineStyle = {
  [`& .${timelineOppositeContentClasses.root}`]: {
    flex: 0.3,
  },
};

const mobileTimelineStyle = {
  [`& .${timelineItemClasses.root}:before`]: {
    flex: 0,
    padding: 0,
  },
};

const Project = ({ project, selected, openModal, closeModal }) => {
  // const [id, setId] = useState();
  const [images, setImages] = useState([]);
  const [imageCompare, setImageCompare] = useState();
  const [isVideo, setIsVideo] = useState(false);
  const [videoAspectRatio, setVideoAspectRatio] = useState(0);
  const [imgLoadedCount, setImgLoadedCount] = useState(0);
  const [imageStyle, setImageStyle] = useState({
    // border: '1px solid black'
    visibility: "hidden",
  });
  const matches = useMediaQuery("(max-aspect-ratio : 3/4)");

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
    setImageStyle({ visibility: "hidden" });
    closeModal(true);
  };

  const onLoad = () => {
    setImgLoadedCount(imgLoadedCount + 1);
  };

  const handleOpen = () => {
    // window.location.reload(false);
    setOpen(true);
    setImageStyle({ visibility: "hidden" });
  };


  const handleVideoMetadata = () => {
    if(isVideo) {
      var video = document.getElementById('demo-video');
      const width = video.videoWidth;
      const height = video.videoHeight;
      console.log(`width: ${width} -- height: ${height} -- width/height: ${width/height}`);
      setVideoAspectRatio(width/height);
    }
  }

  useEffect(() => {
    if (images.length == imgLoadedCount) {
      console.log(`here where images.length == imgLoadedCount`);
      // imageStyle = {
      //   // height: 'auto'
      //   width: '250px'
      // }
      setImageStyle({
        // height: 'auto'
        visibility: "visible",
      });
    }
  }, [images, imgLoadedCount]);

  useEffect(() => {
    if (openModal) {
      // console.log(`HANDLE OPEN: ${JSON.stringify(project)}`)
      handleOpen();
    }
    // else {
    //   handleClose();
    // }
  }, [openModal]);

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
        <p className="close-button" onClick={handleClose}>
          {" "}
          X{" "}
        </p>
        <h1> {project.project_name} </h1>
        {/* <div>{project.id}</div> */}
        {images.length != imgLoadedCount && <LoadingComponent />}
        {/* <div className="images-container">
          {images.map((image, idx) => {
            return (
              <div key={idx}>
                <a href={image} target="_blank" rel="noreferrer"> 
                  <img src={image} onLoad={onLoad} alt="placeholder alt text" style={imageStyle}/>
                 </a>
              </div>
            );
          })}
        </div> */}
        {
          <ImageSwipe
            images={images}
            onLoad={onLoad}
            imageStyle={imageStyle}
            imageDescriptions={project.imageDescriptions}
          />
        }
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
          <Timeline sx={!matches ? webTimelineStyle : mobileTimelineStyle}>
            {descList.map((descItem, i) => (
              <ProjectDescriptionItem
                content={project.description[descItem.label]}
                label={Object.keys(project.description)[i]}
                icon={descItem.icon}
                matches={matches}
              />
            ))}
          </Timeline>
        </div>
        {isVideo && (
          <div className={videoAspectRatio >= 4/3 ? "video-container landscape" : "video-container portrait"}>
            <div className="label">Demo Video:</div>
            <video id="demo-video" src={project.video} controls onLoadedMetadata={handleVideoMetadata}></video>
          </div>
        )}
        <div className="projectDate">
          {" "}
          {moment(project.when[0]).format("MMMM Do, YYYY")} -{" "}
          {moment(project.when[1]).format("MMMM Do, YYYY")} {" "}
        </div>
        {project.linkTo && (
          <div className="projectLink">
            {" "}
            <a href={project.linkTo} target="_blank" rel="noreferrer">
              {" "}
              {project.linkTo}{" "}
            </a>{" "}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default Project;
