import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

function SvgComponent({ title, titleId, color, ...props }) {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#clip0_915_880)">
        <Path
          d="M3.63601 7.99997C3.63601 7.71322 3.74078 7.4265 3.94987 7.20788L10.533 0.328227C10.9518 -0.109409 11.6307 -0.109409 12.0493 0.328227C12.4679 0.765686 12.4679 1.4751 12.0493 1.91277L6.22421 7.99997L12.0491 14.0872C12.4677 14.5249 12.4677 15.2342 12.0491 15.6716C11.6305 16.1095 10.9516 16.1095 10.5328 15.6716L3.94967 8.79207C3.74054 8.57334 3.63601 8.28662 3.63601 7.99997Z"
          fill={color? color : "white"}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_915_880">
          <Rect
            width="16"
            height="16"
            fill={color? color : "white"}
            transform="translate(16) rotate(90)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
