import type { SVGProps } from "react";
const Calendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#AAA"
      fillRule="evenodd"
      d="M6 3h4V2h1v1h2a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2V2h1v1ZM3 4h10v2H3V4Zm0 3v6h10V7H3Z"
      clipRule="evenodd"
    />
  </svg>
);
export default Calendar;
