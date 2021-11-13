import * as React from "react";
import Svg, { Path } from "react-native-svg";

function BurgerIcon(props) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M22 12H2M22 2H2m20 20H2"
        stroke={props.color}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default BurgerIcon;
