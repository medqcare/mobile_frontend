import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function SvgComponent({title, titleId, ...props}) {
  return (
    <Svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle cx="2" cy="2" r="2" fill="#8E8E8E"/>
      <Circle cx="10" cy="2" r="2" fill="#8E8E8E"/>
      <Circle cx="18" cy="2" r="2" fill="#8E8E8E"/>
    </Svg>

  );
}

export default SvgComponent;
