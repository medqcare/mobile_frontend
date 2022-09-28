import React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ title, titleId, darkMode, ...props }) {
  return (
    <Svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M4.99998 5.72701C4.82076 5.72701 4.64156 5.66153 4.50493 5.53084L0.205142 1.41639C-0.0683806 1.15466 -0.0683806 0.730304 0.205142 0.468679C0.478554 0.207055 0.921935 0.207055 1.19548 0.468679L4.99998 4.10938L8.80451 0.468807C9.07803 0.207182 9.52137 0.207182 9.79476 0.468807C10.0684 0.730431 10.0684 1.15478 9.79476 1.41651L5.49504 5.53097C5.35834 5.66168 5.17914 5.72701 4.99998 5.72701Z" fill={darkMode ? "#DDDDDD" : "#4B4B4B"}/>
    </Svg>


  )
}

export default SvgComponent
