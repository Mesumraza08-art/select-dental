import type { SVGProps } from "react";

const paths: Record<string, React.ReactNode> = {
  phone: <path d="M5.5 3.5h3l1.5 4-2 1.25a11 11 0 0 0 5.25 5.25L14.5 12l4 1.5v3a2 2 0 0 1-2 2A13.5 13.5 0 0 1 3.5 5.5a2 2 0 0 1 2-2Z" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),
  chevron: <path d="m9 6 6 6-6 6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  play: <path d="M8 5.5v13l10-6.5-10-6.5Z" />,
  pause: <path d="M8 5.5v13M16 5.5v13" />,
  camera: (
    <>
      <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.8l1.4-2h4.6l1.4 2h1.8A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-8Z" />
      <circle cx="12" cy="12.5" r="3.2" />
    </>
  ),
  shield: <path d="M12 3.5 5 6v5.5c0 4.3 3 7.8 7 9 4-1.2 7-4.7 7-9V6l-7-2.5Z" />,
  file: (
    <>
      <path d="M7 3.5h7l4 4v13H7a1.5 1.5 0 0 1-1.5-1.5V5A1.5 1.5 0 0 1 7 3.5Z" />
      <path d="M14 3.5v4h4M9 12.5h6M9 16h6" />
    </>
  ),
  arrowLeft: <path d="M15 6l-6 6 6 6" />,
  car: (
    <>
      <path d="M5 16.5V12l1.8-4.5h10.4L19 12v4.5" />
      <path d="M3.5 12h17v4.5h-17zM7 16.5V19M17 16.5V19" />
    </>
  ),
  bus: (
    <>
      <rect x="5" y="3.5" width="14" height="14" rx="2.5" />
      <path d="M5 11h14M8 17.5V20M16 17.5V20" />
    </>
  ),
  access: (
    <>
      <circle cx="12" cy="4.8" r="1.6" />
      <path d="M6 8.5h12M12 8.5V14m0 0-3 6m3-6 3 6" />
    </>
  ),
  smile: <path d="M5 9c1.6 4.2 4 6.3 7 6.3S17.4 13.2 19 9" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </>
  ),
  tiktok: <path d="M14 4v10.2a3.3 3.3 0 1 1-3.3-3.3M14 4c.4 2.4 2.1 4.1 4.5 4.4" />,
  chat: <path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8.5A1.5 1.5 0 0 1 19 17H10l-4.5 3.5V17H5a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 5 5.5Z" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  arrow: <path d="M4.5 12h14.5M13.5 6.5 19 12l-5.5 5.5" />,
  arrowUpRight: <path d="M7 17 17 7M9 7h8v8" />,
  star: <path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8L12 3.6Z" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5.5M12 16.2v.3" />
    </>
  ),
};

export type IconName = keyof typeof paths;

export function Icon({ name, className = "size-5", ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
