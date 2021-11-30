import React from "react";
import Svg, { Path, G, Defs, Rect, ClipPath } from "react-native-svg";

function SvgComponent({ title, titleId, color, ...props }) {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#clip0_915_878)">
        <Path
          d="M12.364 8.00003C12.364 8.28678 12.2592 8.5735 12.0501 8.79212L5.467 15.6718C5.04823 16.1094 4.36927 16.1094 3.95067 15.6718C3.53207 15.2343 3.53207 14.5249 3.95067 14.0872L9.77579 8.00003L3.95087 1.91279C3.53227 1.47515 3.53227 0.765811 3.95087 0.328387C4.36947 -0.109461 5.04843 -0.109461 5.4672 0.328387L12.0503 7.20793C12.2595 7.42666 12.364 7.71338 12.364 8.00003Z"
          fill={color? color : "white"}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_915_878">
          <Rect
            width="16"
            height="16"
            fill={color? color : "white"}
            transform="translate(0 16) rotate(-90)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
