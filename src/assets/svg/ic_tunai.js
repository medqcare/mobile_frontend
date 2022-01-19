import * as React from "react"
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={36}
    height={23}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={36.001} height={22.671} rx={11.335} fill="#414141" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m11.986 8.923.002-1.604c0-.221.18-.4.401-.4l12.835.011c.222 0 .401.18.401.402l-.006 6.417c0 .222-.18.401-.401.401l-1.605-.001"
      fill="#545454"
    />
    <Path
      d="m11.986 8.923.002-1.604c0-.221.18-.4.401-.4l12.835.011c.222 0 .401.18.401.402l-.006 6.417c0 .222-.18.401-.401.401l-1.605-.001"
      stroke="url(#a)"
      strokeWidth={0.802}
    />
    <Path
      d="M17.195 14.945A2.808 2.808 0 1 0 17.2 9.33a2.808 2.808 0 0 0-.005 5.615Z"
      fill="#fff"
    />
    <Path
      d="m23.216 8.532-12.033-.011a.802.802 0 0 0-.803.801l-.005 5.616c0 .443.358.802.801.803l12.033.011a.802.802 0 0 0 .803-.801l.005-5.616a.802.802 0 0 0-.801-.803Z"
      fill="#545454"
      stroke="url(#b)"
      strokeWidth={0.802}
    />
    <Path
      d="M17.197 14.543a2.407 2.407 0 1 0 .004-4.813 2.407 2.407 0 0 0-.004 4.813Z"
      fill="#545454"
      stroke="url(#c)"
      strokeWidth={0.802}
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={14.566}
        y1={8.544}
        x2={18.892}
        y2={16.734}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FDC830" />
        <Stop offset={1} stopColor="#F37335" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={12.958}
        y1={10.146}
        x2={17.285}
        y2={18.336}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FDC830" />
        <Stop offset={1} stopColor="#F37335" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={15.704}
        y1={10.811}
        x2={19.195}
        y2={14.308}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FDC830" />
        <Stop offset={1} stopColor="#F37335" />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default SvgComponent
