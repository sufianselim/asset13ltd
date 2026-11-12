export default function Logo({ className = "", size = 42 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="1"
        y="1"
        width="46"
        height="46"
        fill="#0A1F33"
        stroke="#C9A227"
        strokeWidth="1.5"
      />
      <path
        d="M14 34.5 24 12.5 34 34.5"
        fill="none"
        stroke="#C9A227"
        strokeWidth="2"
        strokeLinejoin="miter"
      />
      <path d="M18.6 27.5h10.8" fill="none" stroke="#C9A227" strokeWidth="2" />
      <path d="M14 38.5h20" stroke="#C9A227" strokeWidth="1" opacity="0.55" />
    </svg>
  );
}
