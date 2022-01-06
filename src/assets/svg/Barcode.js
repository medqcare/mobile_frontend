import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const BarcodeSvg = (props) => (
  <Svg
    width={172}
    height={172}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M136.55 12.4a1.6 1.6 0 0 0 0 3.2v-3.2Zm20.8 22.4a1.6 1.6 0 0 0 3.2 0h-3.2Zm-20.8-19.2H152.552v-3.2H136.55v3.2Zm20.8 4.8v14.4h3.2V20.4h-3.2Zm-4.798-4.8a4.798 4.798 0 0 1 4.798 4.8h3.2c0-4.418-3.579-8-7.998-8v3.2Z"
      fill="url(#a)"
    />
    <Path
      d="M34.55 12.4a1.6 1.6 0 0 1 0 3.2v-3.2Zm-20.8 22.4a1.6 1.6 0 0 1-3.2 0h3.2Zm20.8-19.2H18.548v-3.2H34.55v3.2Zm-20.8 4.8v14.4h-3.2V20.4h3.2Zm4.798-4.8a4.798 4.798 0 0 0-4.798 4.8h-3.2c0-4.418 3.58-8 7.998-8v3.2Z"
      fill="url(#b)"
    />
    <Path
      d="M34.95 159.6a1.6 1.6 0 1 0 0-3.2v3.2Zm-20.8-22.4a1.6 1.6 0 1 0-3.2 0h3.2Zm20.8 19.2H18.948v3.2H34.95v-3.2Zm-20.8-4.8v-14.4h-3.2v14.4h3.2Zm4.798 4.8a4.798 4.798 0 0 1-4.798-4.8h-3.2c0 4.418 3.58 8 7.998 8v-3.2Z"
      fill="url(#c)"
    />
    <Path
      d="M135.75 159.6a1.6 1.6 0 0 1 0-3.2v3.2Zm20.8-22.4a1.6 1.6 0 0 1 3.2 0h-3.2Zm-20.8 19.2H151.752v3.2H135.75v-3.2Zm20.8-4.8v-14.4h3.2v14.4h-3.2Zm-4.798 4.8a4.798 4.798 0 0 0 4.798-4.8h3.2c0 4.418-3.579 8-7.998 8v-3.2Z"
      fill="url(#d)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={140.786}
        y1={18.676}
        x2={155.843}
        y2={34.891}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FDC830" />
        <Stop offset={1} stopColor="#F37335" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={30.314}
        y1={18.676}
        x2={15.258}
        y2={34.891}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FDC830" />
        <Stop offset={1} stopColor="#F37335" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={30.714}
        y1={153.324}
        x2={15.658}
        y2={137.109}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FDC830" />
        <Stop offset={1} stopColor="#F37335" />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={139.986}
        y1={153.324}
        x2={155.043}
        y2={137.109}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FDC830" />
        <Stop offset={1} stopColor="#F37335" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default BarcodeSvg;
