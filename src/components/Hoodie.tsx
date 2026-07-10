import { Patch } from "./Patch";

export function Hoodie() {
  return (
    <svg
      viewBox="0 0 320 320"
      role="img"
      aria-labelledby="hoodie-titolo"
      className="capo"
    >
      <title id="hoodie-titolo">
        La felpa ufficiale: felpa girocollo con cappuccio, tasca centrale e la
        patch f.i.g.a. sul petto
      </title>

      {/* Cappuccio */}
      <path
        d="M108,50 Q160,15 212,50 L205,78 Q160,58 115,78 Z"
        fill="none"
        stroke="var(--inchiostro)"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Corpo */}
      <path
        d="M100,60 L28,92 L52,158 L100,122 L100,290 L220,290 L220,122 L268,158 L292,92 L220,60 Q160,88 100,60 Z"
        fill="none"
        stroke="var(--inchiostro)"
        strokeWidth="7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Tasca marsupio */}
      <path
        d="M112,220 Q160,238 208,220 L208,268 Q160,286 112,268 Z"
        fill="none"
        stroke="var(--inchiostro)"
        strokeWidth="4.5"
        strokeLinejoin="round"
        opacity="0.7"
      />

      {/* Coulisse */}
      <line
        x1="146"
        y1="82"
        x2="140"
        y2="112"
        stroke="var(--inchiostro)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.55"
      />
      <line
        x1="174"
        y1="82"
        x2="180"
        y2="112"
        stroke="var(--inchiostro)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.55"
      />

      <Patch cx={160} cy={168} r={38} />
    </svg>
  );
}
