import React from "react";
import "../components.css";

const LeftArrow = () => {
  return (
    <div className="left container">
      <svg
        id="Layer_2"
        data-name="Layer 2"
        xmlns="http://www.w3.org/2000/svg"
        width='3rem'
        height='3rem'
        viewBox="0 0 100 100"
      >
        <g id="Layer_1-2" data-name="Layer 1">
          <g>
            <circle cx="50" cy="50" r="50" fill="#ffe8ac" />
            <path
              d="M31.03,47.18l25.95-25.01v7.22l-21.87,20.51v.21l21.87,20.51v7.22l-25.95-25.01v-5.65Z"
              fill="#f1807f"
              stroke="#f1807f"
              stroke-miterlimit="10"
              stroke-width="6"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default LeftArrow;
