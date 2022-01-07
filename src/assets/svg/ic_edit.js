import React from "react";
import Svg, { Path } from "react-native-svg";

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
        d="M8.54213 16.4935L16.1811 8.85455L15.1161 7.78952L7.47711 15.4285V16.4935H8.54213ZM9.16654 17.9999H5.9707V14.8041L14.5836 6.19123C14.7248 6.05003 14.9163 5.9707 15.1161 5.9707C15.3158 5.9707 15.5073 6.05003 15.6486 6.19123L17.7794 8.32204C17.9206 8.46328 17.9999 8.65483 17.9999 8.85455C17.9999 9.05427 17.9206 9.24582 17.7794 9.38706L9.16654 17.9999Z"
        fill="#DDDDDD"
      />
    </Svg>
  );
}

export default SvgComponent;
