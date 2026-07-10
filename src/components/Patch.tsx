interface PatchProps {
  cx: number;
  cy: number;
  r: number;
}

// Il "timbro" di marca: un badge circolare riusato su ogni capo come
// una vera etichetta cucita/stampata, per coerenza visiva nel catalogo.
export function Patch({ cx, cy, r }: PatchProps) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle r={r} fill="var(--inchiostro)" />
      <circle
        r={r * 0.86}
        fill="none"
        stroke="var(--marmellata)"
        strokeWidth={r * 0.05}
        strokeDasharray={`${r * 0.1} ${r * 0.12}`}
      />
      <text
        y={r * 0.16}
        textAnchor="middle"
        fontSize={r * 0.58}
        fontWeight={900}
        letterSpacing={-1}
        fill="var(--marmellata)"
      >
        figa
      </text>
    </g>
  );
}
