type SFLogoProps = {
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { width: 60, height: 80 },
  md: { width: 80, height: 106 },
  lg: { width: 120, height: 160 },
};

export default function SFLogo({
  className = "",
  variant = "dark",
  size = "md",
}: SFLogoProps) {
  const { width, height } = sizes[size];
  const primaryColor = variant === "light" ? "#FFFFFF" : "#2D2D2D";
  const accentColor = variant === "light" ? "#FFFFFF" : "#2D2D2D";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 106"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SF 1031 Logo"
    >
      {/* Main "SF" letters styled like Carolwood's elegant C. */}
      <g>
        {/* S letter - elegant serif style */}
        <path
          d="M8 28C8 28 12 16 28 16C44 16 48 24 48 32C48 40 40 44 28 48C16 52 8 56 8 68C8 80 16 88 32 88C48 88 52 80 52 80"
          stroke={primaryColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* F letter */}
        <path
          d="M56 16H72M56 16V88M56 48H68"
          stroke={primaryColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Decorative dot like Carolwood's period */}
        <circle
          cx="72"
          cy="84"
          r="4"
          fill={primaryColor}
        />
      </g>
      
      {/* "1031" text underneath */}
      <text
        x="40"
        y="102"
        textAnchor="middle"
        fontFamily="Montserrat, sans-serif"
        fontSize="10"
        fontWeight="400"
        letterSpacing="0.25em"
        fill={accentColor}
      >
        1031
      </text>
    </svg>
  );
}

export function SFLogoMinimal({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const primaryColor = variant === "light" ? "#FFFFFF" : "#2D2D2D";

  return (
    <svg
      width="100"
      height="60"
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SF 1031"
    >
      {/* Stylized SF with period - matching Carolwood's C. aesthetic exactly */}
      <text
        x="5"
        y="42"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="48"
        fontWeight="400"
        fill={primaryColor}
        style={{ fontStyle: "normal" }}
      >
        SF
      </text>
      
      {/* Decorative period */}
      <circle
        cx="78"
        cy="38"
        r="5"
        fill={primaryColor}
      />
      
      {/* 1031 underneath */}
      <text
        x="5"
        y="56"
        fontFamily="Montserrat, sans-serif"
        fontSize="9"
        fontWeight="400"
        letterSpacing="0.35em"
        fill={primaryColor}
      >
        1031
      </text>
    </svg>
  );
}

export function SFLogoLarge({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const primaryColor = variant === "light" ? "#FFFFFF" : "#2D2D2D";

  return (
    <svg
      width="160"
      height="180"
      viewBox="0 0 160 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SF 1031"
    >
      {/* Large decorative SF */}
      <text
        x="10"
        y="120"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="120"
        fontWeight="300"
        fill={primaryColor}
        style={{ fontStyle: "normal" }}
      >
        SF
      </text>
      
      {/* Large decorative period */}
      <circle
        cx="145"
        cy="110"
        r="8"
        fill={primaryColor}
      />
      
      {/* 1031 underneath */}
      <text
        x="10"
        y="165"
        fontFamily="Montserrat, sans-serif"
        fontSize="14"
        fontWeight="400"
        letterSpacing="0.4em"
        fill={primaryColor}
      >
        1031
      </text>
    </svg>
  );
}
