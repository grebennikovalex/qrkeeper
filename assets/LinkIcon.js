import * as React from "react";
import Svg, { Path } from "react-native-svg";

function LinkIcon(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.949 1.93a5.75 5.75 0 018.13 8.131l-.009.01-3 3a5.752 5.752 0 01-8.67-.622.75.75 0 111.2-.898 4.249 4.249 0 006.41.459l2.995-2.996a4.25 4.25 0 00-6.01-6.008l-1.716 1.706a.75.75 0 01-1.058-1.064l1.728-1.717zM6.987 7.608A5.75 5.75 0 0113.6 9.551a.75.75 0 01-1.202.898A4.249 4.249 0 005.99 9.99l-2.995 2.995a4.25 4.25 0 006.01 6.01l1.705-1.705a.75.75 0 111.06 1.06l-1.719 1.72a5.75 5.75 0 01-8.13-8.131l.009-.01 3-3a5.75 5.75 0 012.057-1.322z"
        fill={props.fill}
      />
    </Svg>
  );
}

export default LinkIcon;
