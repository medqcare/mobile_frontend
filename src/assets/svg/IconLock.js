import * as React from 'react';
import Svg, {
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

const IconLock = (props) => (
  <Svg
    width={34}
    height={34}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={17} cy={17} r={16.5} stroke="url(#a)" />
    <Path
      d="M17.002 17.8a1.193 1.193 0 0 0-.8 2.088V21a.8.8 0 1 0 1.6 0v-1.112a1.191 1.191 0 0 0-.8-2.088Zm4-3.2V13a4 4 0 0 0-8 0v1.6a2.4 2.4 0 0 0-2.4 2.4v5.6a2.4 2.4 0 0 0 2.4 2.4h8a2.4 2.4 0 0 0 2.4-2.4V17a2.4 2.4 0 0 0-2.4-2.4Zm-6.4-1.6a2.4 2.4 0 1 1 4.8 0v1.6h-4.8V13Zm7.2 9.6a.8.8 0 0 1-.8.8h-8a.8.8 0 0 1-.8-.8V17a.8.8 0 0 1 .8-.8h8a.8.8 0 0 1 .8.8v5.6Z"
      fill="#8B8B8B"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={39}
        y1={-5}
        x2={2}
        y2={34}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#6F0E7E" />
        <Stop offset={1} stopColor="#0E4AA5" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default IconLock;
