import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

function SvgComponent({ title, titleId, ...props }) {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M12 23.9874C18.6274 23.9874 24 18.6184 24 11.9953C24 5.37223 18.6274 0.00317383 12 0.00317383C5.37258 0.00317383 0 5.37223 0 11.9953C0 18.6184 5.37258 23.9874 12 23.9874Z"
        fill="#9A9A9A"
      />
      <Path
        d="M8.19373 6.33679L6.33789 8.19263L15.8065 17.6612L17.6623 15.8054L8.19373 6.33679Z"
        fill="white"
      />
      <Path
        d="M15.8055 6.33634L6.33691 15.8049L8.19275 17.6608L17.6613 8.19218L15.8055 6.33634Z"
        fill="white"
      />
    </Svg>
  );
}

export default SvgComponent;
