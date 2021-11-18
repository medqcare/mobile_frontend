import React from "react"
import Svg, { Defs, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

function SvgComponent({ title, titleId, ...props }) {
  return (
    <Svg
      width={35}
      height={35}
      fill={'#FDC830'}
      viewBox="0 0 62 62"
      aria-labelledby={titleId}
      {...props}
    >
      <Path d="M46 26.71a1 1 0 00-1 1V51H12V12h19.51a1 1 0 100-2H11a1 1 0 00-1 1v41a1 1 0 001 1h35a1 1 0 001-1V27.71a1 1 0 00-1-1z"></Path>
      <Path d="M53 10h-4V6a1 1 0 00-1-1h-5a1 1 0 00-1 1v4h-4a1 1 0 00-1 1v5a1 1 0 001 1h4v4a1 1 0 001 1h5a1 1 0 001-1v-4h4a1 1 0 001-1v-5a1 1 0 00-1-1zm-1 5h-4a1 1 0 00-1 1v4h-3v-4a1 1 0 00-1-1h-4v-3h4a1 1 0 001-1V7h3v4a1 1 0 001 1h4zM28.5 19a4.51 4.51 0 00-4.5 4.5v1a4.5 4.5 0 009 0v-1a4.51 4.51 0 00-4.5-4.5zm2.5 5.5a2.5 2.5 0 01-5 0v-1a2.5 2.5 0 015 0zM20 39.5V43a1 1 0 002 0v-3.5a6.5 6.5 0 0113 0V43a1 1 0 002 0v-3.5a8.5 8.5 0 00-17 0z"></Path>

    </Svg>
  )
}

export default SvgComponent
