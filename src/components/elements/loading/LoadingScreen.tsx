export default function LoadingScreen() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 50 50"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="#00B4D8"
        stroke-width="5"
        fill="none"
        opacity="0.2"
      />
      <path
        fill="none"
        stroke="#00B4D8"
        stroke-width="5"
        stroke-linecap="round"
        d="M25 5 a 20 20 0 0 1 0 40 a 20 20 0 0 1 0 -40"
        stroke-dasharray="90 150"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
