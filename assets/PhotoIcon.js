import * as React from "react";
import Svg, { Path } from "react-native-svg";

function PhotoIcon(props) {
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
        d="M8.126.334A.75.75 0 018.75 0h6a.75.75 0 01.624.334L17.151 3h3.599a2.75 2.75 0 012.75 2.75v11a2.75 2.75 0 01-2.75 2.75h-18A2.75 2.75 0 010 16.75v-11A2.75 2.75 0 012.75 3h3.599L8.126.334zM9.151 1.5L7.374 4.166a.75.75 0 01-.624.334h-4A1.25 1.25 0 001.5 5.75v11A1.25 1.25 0 002.75 18h18A1.25 1.25 0 0022 16.75v-11a1.25 1.25 0 00-1.25-1.25h-4a.75.75 0 01-.624-.334L14.349 1.5H9.15zm2.599 6a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5zM7 10.75a4.75 4.75 0 119.5 0 4.75 4.75 0 01-9.5 0z"
        fill={props.fill}
      />
    </Svg>
  );
}

export default PhotoIcon;
