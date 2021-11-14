import * as React from "react";
import Svg, { Path } from "react-native-svg";

function PasteIcon(props) {
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
        d="M2.814 1.535a1.279 1.279 0 00-1.28 1.279v9.21a1.28 1.28 0 001.28 1.278h1.023a.767.767 0 010 1.535H2.814A2.814 2.814 0 010 12.023V2.814A2.814 2.814 0 012.814 0h9.21a2.814 2.814 0 012.813 2.814v1.023a.767.767 0 11-1.535 0V2.814a1.279 1.279 0 00-1.279-1.28H2.814zm7.163 7.163a1.28 1.28 0 00-1.28 1.279v9.209c0 .706.573 1.28 1.28 1.28h9.209c.706 0 1.28-.574 1.28-1.28v-9.21c0-.706-.574-1.278-1.28-1.278h-9.21zM7.163 9.977a2.814 2.814 0 012.814-2.814h9.209A2.814 2.814 0 0122 9.977v9.209A2.814 2.814 0 0119.186 22h-9.21a2.814 2.814 0 01-2.813-2.814v-9.21z"
        fill={props.color}
      />
    </Svg>
  );
}

export default PasteIcon;
