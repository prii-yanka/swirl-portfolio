import React from "react";
import "./skillsStyles.css"

interface MyComponentProps {
  imagePath: string;
}

const LeafImage: React.FC<MyComponentProps> = ({ imagePath }) => {
  return (
    <div className="image-container skillsLeaf">
      <img src={imagePath} className="skillsLeafIcon" />
    </div>
  );
};

export default LeafImage;
