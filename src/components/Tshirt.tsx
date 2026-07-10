import { Patch } from "./Patch";

export function Tshirt() {
  return (
    <svg
      viewBox="0 0 320 320"
      role="img"
      aria-labelledby="tshirt-titolo"
      className="capo"
    >
      <title id="tshirt-titolo">
        La maglietta ufficiale: t-shirt a girocollo con la patch f.i.g.a. sul
        petto
      </title>
      <path
        d="M95,35 L25,70 L50,140 L95,105 L95,285 L225,285 L225,105 L270,140 L295,70 L225,35 Q160,75 95,35 Z"
        fill="none"
        stroke="var(--inchiostro)"
        strokeWidth="7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M128,44 Q160,66 192,44"
        fill="none"
        stroke="var(--inchiostro)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.55"
      />
      <Patch cx={160} cy={165} r={44} />
    </svg>
  );
}
