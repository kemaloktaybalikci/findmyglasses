import type { Shape } from "@/lib/products";

type Props = {
  shape: Shape;
  frameColor: string;
  lensColor: string;
  className?: string;
};

export function GlassesSvg({ shape, frameColor, lensColor, className }: Props) {
  const sw = 2.6;
  const stroke = frameColor;
  const fill = lensColor;
  const lensProps = {
    fill,
    stroke,
    strokeWidth: sw,
    strokeLinejoin: "round" as const,
  };
  const lineProps = {
    stroke,
    strokeWidth: sw,
    strokeLinecap: "round" as const,
  };

  return (
    <svg
      viewBox="0 0 120 50"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {shape === "round" && (
        <>
          <circle cx="32" cy="25" r="18" {...lensProps} />
          <circle cx="88" cy="25" r="18" {...lensProps} />
          <line x1="50" y1="25" x2="70" y2="25" {...lineProps} />
          <line x1="14" y1="22" x2="4" y2="20" {...lineProps} />
          <line x1="106" y1="22" x2="116" y2="20" {...lineProps} />
        </>
      )}

      {shape === "square" && (
        <>
          <rect x="14" y="10" width="36" height="28" rx="3" {...lensProps} />
          <rect x="70" y="10" width="36" height="28" rx="3" {...lensProps} />
          <line x1="50" y1="22" x2="70" y2="22" {...lineProps} />
          <line x1="14" y1="14" x2="4" y2="12" {...lineProps} />
          <line x1="106" y1="14" x2="116" y2="12" {...lineProps} />
        </>
      )}

      {shape === "aviator" && (
        <>
          <path
            d="M 14 12 Q 32 7 50 14 L 49 28 Q 32 43 16 30 Z"
            {...lensProps}
          />
          <path
            d="M 70 14 Q 88 7 106 12 L 104 30 Q 88 43 71 28 Z"
            {...lensProps}
          />
          <line x1="50" y1="16" x2="70" y2="16" {...lineProps} />
          <line x1="14" y1="16" x2="4" y2="14" {...lineProps} />
          <line x1="106" y1="16" x2="116" y2="14" {...lineProps} />
        </>
      )}

      {shape === "catEye" && (
        <>
          <path
            d="M 4 8 L 20 16 Q 34 12 50 16 L 50 28 Q 48 38 32 38 Q 14 38 14 18 Z"
            {...lensProps}
          />
          <path
            d="M 116 8 L 100 16 Q 86 12 70 16 L 70 28 Q 72 38 88 38 Q 106 38 106 18 Z"
            {...lensProps}
          />
          <line x1="50" y1="18" x2="70" y2="18" {...lineProps} />
        </>
      )}

      {shape === "wayfarer" && (
        <>
          <path
            d="M 13 12 L 50 11 L 49 30 Q 49 37 32 38 Q 14 37 13 28 Z"
            {...lensProps}
          />
          <path
            d="M 70 11 L 107 12 L 107 28 Q 106 37 88 38 Q 71 37 71 30 Z"
            {...lensProps}
          />
          <line x1="50" y1="18" x2="70" y2="18" {...lineProps} />
          <line x1="13" y1="14" x2="3" y2="12" {...lineProps} />
          <line x1="107" y1="14" x2="117" y2="12" {...lineProps} />
        </>
      )}
    </svg>
  );
}
