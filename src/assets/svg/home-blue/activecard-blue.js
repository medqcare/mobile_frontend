import React from "react"
import Svg, { Defs, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

function SvgComponent({ title, titleId, ...props }) {
  return (
    <Svg
      width={35}
      height={35}
      fill={"#FDC830"}
      viewBox="0 0 62 62"
      aria-labelledby={titleId}
      {...props}
    >
      <Path d="M43 34.71a1 1 0 00-1 1V51H9V12h16.51a1 1 0 100-2H8a1 1 0 00-1 1v41a1 1 0 001 1h35a1 1 0 001-1V35.71a1 1 0 00-1-1z"></Path>
      <Path d="M44 6a12 12 0 1012 12A12 12 0 0044 6zm0 22a10 10 0 1110-10 10 10 0 01-10 10zM19 17a1 1 0 00-1-1h-5a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1zm-2 4h-3v-3h3zM21 19a1 1 0 001 1h5a1 1 0 000-2h-5a1 1 0 00-1 1zM19 29a1 1 0 00-1-1h-5a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1zm-2 4h-3v-3h3zM32 30H22a1 1 0 000 2h10a1 1 0 000-2zM18 40h-5a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1v-5a1 1 0 00-1-1zm-1 5h-3v-3h3zM21 43a1 1 0 001 1h16a1 1 0 000-2H22a1 1 0 00-1 1z"></Path>
      <Path d="M45 17.59V12a1 1 0 00-2 0v6a1 1 0 00.29.71l4 4a1 1 0 001.42 0 1 1 0 000-1.42z"></Path>
    
    </Svg>
  )
}

export default SvgComponent
