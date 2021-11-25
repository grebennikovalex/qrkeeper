import * as React from "react";
import Svg, { Path } from "react-native-svg";

function DocIcon(props) {
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
        d="M.805.805A2.75 2.75 0 012.75 0h8a.75.75 0 01.53.22l6 6c.141.14.22.331.22.53v12a2.75 2.75 0 01-2.75 2.75h-12A2.75 2.75 0 010 18.75v-16C0 2.02.29 1.321.805.805zM2.75 1.5A1.25 1.25 0 001.5 2.75v16A1.25 1.25 0 002.75 20h12A1.25 1.25 0 0016 18.75V7.5h-5.25a.75.75 0 01-.75-.75V1.5H2.75zm8.75 1.06L14.94 6H11.5V2.56zM8.75 10a.75.75 0 01.75.75V13h2.25a.75.75 0 010 1.5H9.5v2.25a.75.75 0 01-1.5 0V14.5H5.75a.75.75 0 010-1.5H8v-2.25a.75.75 0 01.75-.75z"
        fill={props.fill}
      />
    </Svg>
  );
}

export default DocIcon;
