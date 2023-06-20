import React from "react";
import "../components.css";

const RightArrow = () => {
  return (
    <div className="right container">
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
              d="M68.97,47.18l-25.95-25.01v7.22l21.87,20.51v.21l-21.87,20.51v7.22l25.95-25.01v-5.65Z"
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

export default RightArrow;
