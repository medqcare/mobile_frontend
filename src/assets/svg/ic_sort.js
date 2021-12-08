import React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ title, titleId, color, ...props }) {
  return (
    <Svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M7.00016 3.33333H4.33416L4.3335 11.3333H3.00016V3.33333H0.333496L3.66683 0L7.00016 3.33333ZM13.6668 8.66667L10.3335 12L7.00016 8.66667H9.66683V0.666667H11.0002V8.66667H13.6668Z" fill="#B5B5B5"/>
    </Svg>
  );
}

export default SvgComponent;
