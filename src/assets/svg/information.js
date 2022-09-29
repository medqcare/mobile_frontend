import React from "react";
import Svg, { Path } from "react-native-svg";

function InformationIcon({ title, titleId, color, darkMode = true, ...props }) {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M6 0C2.68352 0 0 2.68376 0 6C0 9.31648 2.68376 12 6 12C9.31648 12 12 9.31624 12 6C12 2.68352 9.31622 0 6 0ZM6 11.0625C3.20173 11.0625 0.9375 8.79809 0.9375 6C0.9375 3.20173 3.20191 0.9375 6 0.9375C8.79827 0.9375 11.0625 3.20191 11.0625 6C11.0625 8.79827 8.79806 11.0625 6 11.0625Z"
        fill={darkMode ? "#B5B5B5" : "#005EA2"}
      />
      <Path
        d="M6 5.02344C5.74111 5.02344 5.53125 5.2333 5.53125 5.49219V8.51078C5.53125 8.76967 5.74111 8.97953 6 8.97953C6.25889 8.97953 6.46875 8.76965 6.46875 8.51076V5.49219C6.46875 5.2333 6.25889 5.02344 6 5.02344Z"
        fill={darkMode ? "#B5B5B5" : "#005EA2"}
      />
      <Path
        d="M6 4.44922C6.34949 4.44922 6.63281 4.1659 6.63281 3.81641C6.63281 3.46691 6.34949 3.18359 6 3.18359C5.65051 3.18359 5.36719 3.46691 5.36719 3.81641C5.36719 4.1659 5.65051 4.44922 6 4.44922Z"
        fill={darkMode ? "#B5B5B5" : "#005EA2"}
      />
    </Svg>
  );
}

export default InformationIcon;
