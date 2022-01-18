import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconInformation = (props) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10 2.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Zm0 13.75a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5Z"
      fill="#DC650F"
    />
    <Path
      d="M9.997 8.562a.625.625 0 0 0-.625.625v4.25a.625.625 0 1 0 1.25 0v-4.25a.625.625 0 0 0-.625-.625Zm0-2.562a.662.662 0 0 0-.638.65v.1a.587.587 0 0 0 .638.587.65.65 0 0 0 .625-.625v-.15A.562.562 0 0 0 9.997 6Z"
      fill="#DC650F"
    />
  </Svg>
);

export default IconInformation;
