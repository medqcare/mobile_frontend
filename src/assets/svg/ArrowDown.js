import React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ title, titleId, ...props }) {
  return (
    <Svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M5.49998 6.49976C5.30284 6.49976 5.10572 6.42773 4.95542 6.28398L0.225656 1.75807C-0.0752187 1.47017 -0.0752187 1.00338 0.225656 0.715596C0.526409 0.427809 1.01413 0.427809 1.31503 0.715596L5.49998 4.72037L9.68496 0.715736C9.98584 0.427949 10.4735 0.427949 10.7742 0.715736C11.0753 1.00352 11.0753 1.47031 10.7742 1.75821L6.04455 6.28411C5.89417 6.42789 5.69705 6.49976 5.49998 6.49976Z" fill="#F37335"/>
    </Svg>

  )
}

export default SvgComponent
