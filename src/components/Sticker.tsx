export function Sticker() {
  return (
    <svg
      viewBox="0 0 420 420"
      role="img"
      aria-labelledby="sticker-titolo"
      className="sticker"
    >
      <title id="sticker-titolo">
        Il timbro di marca f.i.g.a.: tondo in vinile nero con il marchio in
        arancione e la dicitura Facciamo Italia Grande Ancora
      </title>
      <defs>
        {/* Percorso circolare (r=148) per il testo ad anello, partenza in alto */}
        <path
          id="sticker-orbita"
          d="M 210 62 a 148 148 0 1 1 -0.1 0"
          fill="none"
        />
      </defs>

      {/* Bordo die-cut bianco con linea di fustella */}
      <circle cx="210" cy="210" r="208" fill="var(--carta)" />
      <circle
        cx="210"
        cy="210"
        r="198"
        fill="none"
        stroke="oklch(0.31 0.06 55 / 0.3)"
        strokeWidth="1.5"
        strokeDasharray="5 6"
      />

      {/* Disco in vinile */}
      <circle cx="210" cy="210" r="188" fill="var(--inchiostro)" />

      <text className="sticker-anello">
        <textPath
          href="#sticker-orbita"
          startOffset="0"
          textLength="920"
          lengthAdjust="spacing"
        >
          FACCIAMO ITALIA GRANDE ANCORA · DAL 2026 ·
        </textPath>
      </text>

      <text x="210" y="152" textAnchor="middle" className="sticker-stella">
        ✦
      </text>
      <text x="210" y="244" textAnchor="middle" className="sticker-marchio">
        f.i.g.a.
      </text>
      <text x="210" y="298" textAnchor="middle" className="sticker-sotto">
        VINILE OPACO · Ø 10 CM
      </text>

      {/* Riflesso del vinile */}
      <ellipse
        cx="146"
        cy="122"
        rx="112"
        ry="54"
        fill="white"
        opacity="0.09"
        transform="rotate(-30 146 122)"
        pointerEvents="none"
      />
    </svg>
  );
}
