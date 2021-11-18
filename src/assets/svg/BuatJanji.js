import React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ title, titleId, ...props }) {
  return (
    <Svg width="14" height="18" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M0.546387 4.7019H9.45839" stroke="#DDDDDD" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/>
      <Path d="M7.02197 1V2.6455" stroke="#DDDDDD" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/>
      <Path d="M2.98291 1V2.6455" stroke="#DDDDDD" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/>
      <Path fill-rule="evenodd" clip-rule="evenodd" d="M7.11913 1.78955H2.88548C1.41714 1.78955 0.5 2.60752 0.5 4.11106V8.63589C0.5 10.1631 1.41714 11 2.88548 11H7.1145C8.58748 11 9.5 10.1773 9.5 8.67371V4.11106C9.50461 2.60752 8.59211 1.78955 7.11913 1.78955Z" stroke="#DDDDDD" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>

  )
}

export default SvgComponent
