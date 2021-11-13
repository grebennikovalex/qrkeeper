import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ChevronIcon(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2 12L.586 10.586a2 2 0 000 2.828L2 12zm11.414-8.586A2 2 0 1010.586.586l2.828 2.828zm-2.828 20a2 2 0 102.828-2.828l-2.828 2.828zm0-22.828l-10 10 2.828 2.828 10-10L10.586.586zm2.828 20l-10-10-2.828 2.828 10 10 2.828-2.828z"
        fill={props.color}
      />
    </Svg>
  );
}

export default ChevronIcon;
