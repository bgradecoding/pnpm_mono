import type { SVGProps } from "react";
const Search = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#333"
      fillRule="evenodd"
      d="M6.961 1a5.961 5.961 0 0 1 4.616 9.734L15 14.157l-.843.843-3.423-3.423A5.961 5.961 0 1 1 6.96 1Zm0 1.192a4.769 4.769 0 1 0 0 9.538 4.769 4.769 0 0 0 0-9.538Z"
      clipRule="evenodd"
    />
  </svg>
);
export default Search;
