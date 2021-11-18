import React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ title, titleId, ...props }) {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M16.3637 8.07955H5.16175L10.3025 2.93882L9.00003 1.63638L1.63641 9L9.00003 16.3636L10.3025 15.0612L5.16175 9.92046H16.3637V8.07955Z" fill="#DDDDDD"/>
    </Svg>

  )
}

export default SvgComponent
