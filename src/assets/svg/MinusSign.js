import React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgComponent = ({propSize}) => (
  <Svg width={propSize} height={propSize} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M9.5 0C4.26149 0 0 4.26149 0 9.5C0 14.7385 4.26149 19 9.5 19C14.7385 19 19 14.7385 19 9.5C19 4.26149 14.7385 0 9.5 0ZM13.6562 10.2916H5.34375C4.9067 10.2916 4.55213 9.93705 4.55213 9.5C4.55213 9.06295 4.9067 8.70838 5.34375 8.70838H13.6562C14.0933 8.70838 14.4479 9.06295 14.4479 9.5C14.4479 9.93705 14.0933 10.2916 13.6562 10.2916Z" fill="#DDDDDD"/>
  </Svg>

)

export default SvgComponent

