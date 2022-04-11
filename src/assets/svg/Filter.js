import React from "react";
import Svg, { Circle, Line } from "react-native-svg";

function IconFilter({ title, titleId, ...props }) {
  return (
    <Svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Line
        x1="3.23481"
        y1="18.2007"
        x2="13.9322"
        y2="18.2007"
        stroke="#DDDDDD"
        strokeWidth="2.30263"
        strokeLinecap="round"
      />
      <Circle cx="20.5" cy="18.4998" r="2.5" fill="#DDDDDD" />
      <Line
        x1="1.15132"
        y1="-1.15132"
        x2="11.8487"
        y2="-1.15132"
        transform="matrix(-1 0 0 1 23.9585 8.98975)"
        stroke="#DDDDDD"
        strokeWidth="2.30263"
        strokeLinecap="round"
      />
      <Circle r="2.5" transform="matrix(-1 0 0 1 5.5 7.5)" fill="#DDDDDD" />
    </Svg>
  );
}

export default IconFilter;
