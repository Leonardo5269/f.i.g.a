import { Patch } from "./Patch";

export function Scarf() {
  return (
    <svg
      viewBox="0 0 320 320"
      role="img"
      aria-labelledby="scarf-titolo"
      className="capo"
    >
      <title id="scarf-titolo">
        La sciarpa ufficiale: sciarpa lunga in jacquard con frange e la patch
        f.i.g.a.
      </title>

      {/* Nastro */}
      <path
        d="M124,18 C90,80 158,132 108,196 C82,232 96,270 122,302 L168,302 C144,268 132,232 156,198 C204,134 138,80 170,18 Z"
        fill="none"
        stroke="var(--inchiostro)"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Frange superiori */}
      <g stroke="var(--inchiostro)" strokeWidth="3.5" strokeLinecap="round">
        <line x1="130" y1="20" x2="120" y2="8" />
        <line x1="142" y1="20" x2="136" y2="6" />
        <line x1="154" y1="20" x2="152" y2="6" />
        <line x1="164" y1="20" x2="168" y2="7" />
      </g>

      {/* Frange inferiori */}
      <g stroke="var(--inchiostro)" strokeWidth="3.5" strokeLinecap="round">
        <line x1="126" y1="302" x2="118" y2="315" />
        <line x1="138" y1="302" x2="133" y2="316" />
        <line x1="152" y1="302" x2="153" y2="317" />
        <line x1="162" y1="302" x2="168" y2="315" />
      </g>

      {/* Motivo jacquard: righe diagonali ripetute */}
      <g stroke="var(--inchiostro)" strokeWidth="2.5" opacity="0.35">
        <line x1="100" y1="70" x2="130" y2="55" />
        <line x1="150" y1="100" x2="180" y2="85" />
        <line x1="95" y1="180" x2="125" y2="165" />
        <line x1="140" y1="240" x2="170" y2="225" />
        <line x1="115" y1="270" x2="145" y2="255" />
      </g>

      <Patch cx={140} cy={150} r={34} />
    </svg>
  );
}
