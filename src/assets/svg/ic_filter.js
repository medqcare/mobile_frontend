import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg";


const SvgComponent = (props) => (
  <Svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      stroke="#DDD"
      strokeWidth={2.303}
      strokeLinecap="round"
      d="M3.233 18.201h10.698"
    />
    <Circle cx={20.5} cy={18.5} r={2.5} fill="#DDD" />
    <Path
      stroke="#DDD"
      strokeWidth={2.303}
      strokeLinecap="round"
      d="M22.806 7.839H12.108"
    />
    <Circle r={2.5} transform="matrix(-1 0 0 1 5.5 7.5)" fill="#DDD" />
  </Svg>
)

export default SvgComponent
