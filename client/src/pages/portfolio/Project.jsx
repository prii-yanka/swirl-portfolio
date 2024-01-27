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
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import HailIcon from "@mui/icons-material/Hail";
import AdsClickIcon from '@mui/icons-material/AdsClick';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import OutputIcon from '@mui/icons-material/Output';
import GroupsIcon from '@mui/icons-material/Groups';
import useMediaQuery from '@mui/material/useMediaQuery';


const labelStyle = {
  color: "#EF8181",
  fontWeight: "700",
  padding: "0.5rem",
  fontSize: "1.5rem",
  fontFamily: "Inconsolata, monospace"
};

const contentStyle = {
  borderRadius: "0.5rem",
  padding: "0.5rem",
  border: "1px solid #EF8181",
};

const iconStyle = {
  color: "#EF8181",
  backgroundColor: "#8FE1F3",
  fontSize: "2rem",
};

const dotStyle = {
  backgroundColor: "#8FE1F3",
  justifyItems: 'flex-start'
};

const connectorStyle = {
  bgcolor: "#ffffff",
};

const webTimelineStyle = {
  [`& .${timelineOppositeContentClasses.root}`]: {
    flex: 0.3,
  },
}

const mobileTimelineStyle = {
  [`& .${timelineItemClasses.root}:before`]: {
    flex: 0,
    padding: 0,
  },
}



const Project = ({ project, selected, openModal, closeModal }) => {
  // const [id, setId] = useState();
  const [images, setImages] = useState([]);
  const [imageCompare, setImageCompare] = useState();
  const [isVideo, setIsVideo] = useState(false);
  const [imgLoadedCount, setImgLoadedCount] = useState(0);
  const [imageStyle, setImageStyle] = useState({
    // border: '1px solid black'
    visibility: "hidden",
  });
  const matches = useMediaQuery('(max-aspect-ratio : 3/4)')

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

  const handleOpen = () => {
    // window.location.reload(false);
    setOpen(true);
    setImageStyle({ visibility: "hidden" });
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
          <Timeline
            sx={!matches ? webTimelineStyle : mobileTimelineStyle}
          >
            <TimelineItem>
              {!matches && <TimelineOppositeContent sx={{ m: "auto 0" }} align="right">
                <Typography sx={labelStyle}> About The Client </Typography>
              </TimelineOppositeContent>}
              <TimelineSeparator>
                <TimelineConnector sx={connectorStyle} />
                <TimelineDot sx={dotStyle}>
                  <HailIcon sx={iconStyle} />
                </TimelineDot>
                <TimelineConnector sx={connectorStyle} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                {matches && <Typography sx={labelStyle}> About The Client </Typography>}
                <Typography sx={contentStyle}>
                  <ul>
                  {project.description.aboutTheClient.map((data) => (
                    <li> {data} </li>
                  ))}
                  </ul>
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              {!matches && <TimelineOppositeContent sx={{ m: "auto 0" }} align="right">
                <Typography sx={labelStyle}> Goal And Situation </Typography>
              </TimelineOppositeContent>}
              <TimelineSeparator>
                <TimelineConnector sx={connectorStyle} />
                <TimelineDot sx={dotStyle}>
                  <AdsClickIcon sx={iconStyle} />
                </TimelineDot>
                <TimelineConnector sx={connectorStyle} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                {matches && <Typography sx={labelStyle}> Goal And Situation </Typography>}
                <Typography sx={contentStyle}>
                  <ul>
                  {project.description.goalAndSituation.map((data) => (
                    <li> {data} </li>
                  ))}
                  </ul>
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              {!matches && <TimelineOppositeContent sx={{ m: "auto 0" }} align="right">
                <Typography sx={labelStyle}> Process And Why </Typography>
              </TimelineOppositeContent>}
              <TimelineSeparator>
                <TimelineConnector sx={connectorStyle} />
                <TimelineDot sx={dotStyle}>
                  <PsychologyAltIcon sx={iconStyle} />
                </TimelineDot>
                <TimelineConnector sx={connectorStyle} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                {matches && <Typography sx={labelStyle}> Process And Why </Typography>}
                <Typography sx={contentStyle}>
                  <ul>
                  {project.description.processAndWhy.map((data) => (
                    <li> {data} </li>
                  ))}
                  </ul>
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              {!matches && <TimelineOppositeContent sx={{ m: "auto 0" }} align="right">
                <Typography sx={labelStyle}> The Outcome </Typography>
              </TimelineOppositeContent>}
              <TimelineSeparator>
                <TimelineConnector sx={connectorStyle} />
                <TimelineDot sx={dotStyle}>
                  <OutputIcon sx={iconStyle} />
                </TimelineDot>
                <TimelineConnector sx={connectorStyle} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                {matches && <Typography sx={labelStyle}> The Outcome </Typography>}
                <Typography sx={contentStyle}>
                  <ul>
                  {project.description.theOutcome.map((data) => (
                    <li> {data} </li>
                  ))}
                  </ul>
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              {!matches && <TimelineOppositeContent sx={{ m: "auto 0" }} align="right">
                <Typography sx={labelStyle}> The Team </Typography>
              </TimelineOppositeContent>}
              <TimelineSeparator>
                <TimelineConnector sx={connectorStyle} />
                <TimelineDot sx={dotStyle}>
                  <GroupsIcon sx={iconStyle} />
                </TimelineDot>
                <TimelineConnector sx={connectorStyle} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                {matches && <Typography sx={labelStyle}> The Team </Typography>}
                <Typography sx={contentStyle}>
                  <ul>
                  {project.description.theTeam.map((data) => (
                    <li> {data} </li>
                  ))}
                  </ul>
                </Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
        {isVideo && (
          <>
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
          </>
        )}
        <div>
          {" "}
          {moment(project.when[0]).format("MMMM Do, YYYY")} -{" "}
          {moment(project.when[1]).format("MMMM Do, YYYY")} <br /> <br />{" "}
        </div>
        <div>
          {" "}
          <a href={project.linkTo} target="_blank" rel="noreferrer">
            {" "}
            {project.linkTo}{" "}
          </a>{" "}
        </div>
      </div>
    </Modal>
  );
};

export default Project;
