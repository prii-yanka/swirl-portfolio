import React from "react";
import startCase from "lodash/startCase"
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";

const labelStyle = {
  color: "#EF8181",
  fontWeight: "700",
  padding: "0.5rem",
  fontSize: "1.5rem",
  fontFamily: "Inconsolata, monospace",
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
  justifyItems: "flex-start",
};

const connectorStyle = {
  bgcolor: "#ffffff",
};

const ProjectDescriptionItem = ({ content, label, icon, matches }) => {
  const Icon = icon;
  return (
    <TimelineItem>
      {!matches && (
        <TimelineOppositeContent sx={{ m: "auto 0" }} align="right">
          <Typography sx={labelStyle}> {startCase(label)} </Typography>
        </TimelineOppositeContent>
      )}
      <TimelineSeparator>
        <TimelineConnector sx={connectorStyle} />
        <TimelineDot sx={dotStyle}>
          <Icon sx={iconStyle} />
        </TimelineDot>
        <TimelineConnector sx={connectorStyle} />
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        {matches && <Typography sx={labelStyle}> {startCase(label)} </Typography>}
        <Typography sx={contentStyle}>
          <ul>
            {content.map((data) => (
              <li> {data} </li>
            ))}
          </ul>
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};

export default ProjectDescriptionItem;
