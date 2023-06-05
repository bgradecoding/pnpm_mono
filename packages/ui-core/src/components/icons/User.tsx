import type { SVGProps } from "react";
const User = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#D9D9D9"
      fillRule="evenodd"
      d="M7.95 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3.724 4c.633 0 1.096-.596.72-1.105C11.562 9.769 9.884 9 7.949 9c-1.934 0-3.612.77-4.444 1.895-.376.509.087 1.105.72 1.105h7.449Z"
      clipRule="evenodd"
    />
  </svg>
);
export default User;
