import React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ title, titleId, ...props }) {
  return (
    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M1.54639 4.7019H10.4584" stroke="#DDDDDD" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M8.02197 1V2.6455" stroke="#DDDDDD" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M3.98291 1V2.6455" stroke="#DDDDDD" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" />
      <Path fill-rule="evenodd" clip-rule="evenodd" d="M8.11913 1.78955H3.88548C2.41714 1.78955 1.5 2.60752 1.5 4.11106V8.63589C1.5 10.1631 2.41714 11 3.88548 11H8.1145C9.58748 11 10.5 10.1773 10.5 8.67371V4.11106C10.5046 2.60752 9.59211 1.78955 8.11913 1.78955Z" stroke="#DDDDDD" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>

  )
}

export default SvgComponent
