import React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgComponent = ({width='30', height='30'}) => (
  <Svg width={width} height={height} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M15 0C6.73021 0 0 6.7302 0 15C0 23.2698 6.73021 30 15 30C23.2698 30 30 23.2698 30 15C30 6.7302 23.2698 0 15 0ZM15 27.8885C7.91789 27.8885 2.11144 22.1261 2.11144 15C2.11144 7.87389 7.8739 2.11144 15 2.11144C22.0821 2.11144 27.8886 7.87389 27.8886 15C27.8886 22.1261 22.0821 27.8885 15 27.8885Z" fill="white"/>
    <Path d="M21.2201 14.3265H11.7581L16.1004 9.98418L15.0002 8.88403L8.78027 15.104L15.0002 21.3239L16.1004 20.2238L11.7581 15.8815H21.2201V14.3265Z" fill="white"/>
  </Svg>

)

export default SvgComponent