import * as React from "react";
import Svg, { Path } from "react-native-svg";

function PlusIcon(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12 2v20m10-9.697H2"
        stroke={props.color}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default PlusIcon;
