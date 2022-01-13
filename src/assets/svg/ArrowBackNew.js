import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

const SvgComponent = (props) => (
  <Svg
    width={12}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M1.032 6.413 3.589 3.87a.489.489 0 0 1 .69.693L2.562 6.27h10.356a.489.489 0 0 1 0 .978H2.563l1.716 1.708a.489.489 0 1 1-.69.693L1.033 7.106a.49.49 0 0 1 0-.693Z"
        fill="#fff"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path
          fill="#fff"
          transform="matrix(-1 0 0 1 13.408 .5)"
          d="M0 0h12.519v12.519H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SvgComponent;
