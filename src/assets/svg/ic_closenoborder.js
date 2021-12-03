import React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ title, titleId, ...props }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M6.62141 3.99763L3.99892 6.62012L17.379 20.0002L20.0015 17.3777L6.62141 3.99763Z" fill="#888888"/>
      <Path d="M17.379 3.99688L3.99892 17.377L6.62141 19.9994L20.0015 6.61937L17.379 3.99688Z" fill="#888888"/>
    </Svg>

  );
}

export default SvgComponent;
