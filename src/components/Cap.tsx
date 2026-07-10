import { Patch } from "./Patch";

export function Cap() {
  return (
    <svg
      viewBox="0 0 320 320"
      role="img"
      aria-labelledby="cap-titolo"
      className="capo"
    >
      <title id="cap-titolo">
        Il cappellino ufficiale: cappello con visiera curva e la patch
        f.i.g.a. sulla calotta
      </title>

      {/* Calotta */}
      <path
        d="M62,168 C62,84 118,42 160,42 C202,42 258,84 258,168 Q160,186 62,168 Z"
        fill="none"
        stroke="var(--inchiostro)"
        strokeWidth="7"
        strokeLinejoin="round"
      />

      {/* Cuciture della calotta */}
      <path
        d="M160,42 L160,178 M108,52 Q126,120 116,175 M212,52 Q194,120 204,175"
        fill="none"
        stroke="var(--inchiostro)"
        strokeWidth="2.5"
        opacity="0.4"
      />

      {/* Bottone in cima */}
      <circle cx="160" cy="46" r="6" fill="var(--inchiostro)" />

      {/* Visiera */}
      <path
        d="M40,164 Q160,208 280,164 Q160,196 40,164 Z"
        fill="none"
        stroke="var(--inchiostro)"
        strokeWidth="7"
        strokeLinejoin="round"
      />

      <Patch cx={160} cy={128} r={36} />
    </svg>
  );
}
