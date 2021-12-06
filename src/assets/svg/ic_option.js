import React from "react";
import Svg, { Circle } from "react-native-svg";

function SvgComponent({ title, titleId, color, ...props }) {
  return (
    <Svg width="3" height="15" viewBox="0 0 3 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle cx="1.5" cy="1.5" r="1.5" fill="#B5B5B5"/>
      <Circle cx="1.5" cy="7.5" r="1.5" fill="#B5B5B5"/>
      <Circle cx="1.5" cy="13.5" r="1.5" fill="#B5B5B5"/>
    </Svg>
  );
}

export default SvgComponent;
