import React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent() {
  return (
    <Svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M8.24456 0.308594L7.47951 9.02649H1.87081L1.10592 0.308594L0.136719 0.393552L0.91557 9.26955C0.956561 9.67867 1.31153 9.99942 1.7239 9.99942H7.62643C8.03864 9.99942 8.39375 9.67883 8.43543 9.26372L9.21378 0.393552L8.24456 0.308594Z"
        fill="#DDDDDD"
      />
    </Svg>
  );
}

export default SvgComponent;
