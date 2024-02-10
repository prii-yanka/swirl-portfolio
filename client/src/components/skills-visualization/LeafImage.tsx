import React from "react";
import "./skillsStyles.css";

interface MyComponentProps {
  imagePath: string;
}

const LeafImage: React.FC<MyComponentProps> = ({ imagePath }) => {
  // const LeafImage: React.FC = ({}) => {
  return (
    // <body>
    <div
      className="image-container skillsLeaf"
    >
      <img src={imagePath} className="skillsLeafIcon" />
      {/* image */}
    </div>
    // </body>
  );
};

export default LeafImage;
