import { SVGProps } from "react";

export const RightArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={4}
    className="feather feather-chevron-right"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);
