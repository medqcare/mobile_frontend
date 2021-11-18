import React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ title, titleId, ...props }) {
  return (
    <Svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M5.50002 0.500244C5.69716 0.500244 5.89428 0.572272 6.04458 0.716025L10.7743 5.24193C11.0752 5.52983 11.0752 5.99662 10.7743 6.2844C10.4736 6.57219 9.98587 6.57219 9.68497 6.2844L5.50002 2.27964L1.31504 6.28426C1.01416 6.57205 0.526495 6.57205 0.225766 6.28426C-0.0752545 5.99648 -0.0752545 5.52969 0.225766 5.24179L4.95545 0.715886C5.10583 0.572108 5.30295 0.500244 5.50002 0.500244Z" fill="#F37335"/>
    </Svg>
  )
}

export default SvgComponent
