// Larghezze alternate barra/spazio: puro ornamento da etichetta.
const BARS = [
  4, 1, 1, 2, 2, 1, 1, 1, 3, 1, 2, 2, 1, 1, 1, 4, 1, 1, 2, 1, 3, 1, 1, 2, 2,
  1, 1, 3, 1, 1, 2, 1, 1, 1, 4, 1, 2, 1, 1, 2, 3, 1, 1, 1, 2,
];

const TOTAL_WIDTH = BARS.reduce((sum, w) => sum + w, 0);

export function Barcode() {
  let x = 0;
  const bars = BARS.map((width, i) => {
    const bar =
      i % 2 === 0 ? (
        <rect key={i} x={x} y={0} width={width} height={40} />
      ) : null;
    x += width;
    return bar;
  });

  return (
    <div aria-hidden="true">
      <svg
        viewBox={`0 0 ${TOTAL_WIDTH} 40`}
        className="barcode"
        focusable="false"
      >
        {bars}
      </svg>
      <p className="barcode-numero">8 010042 001001</p>
    </div>
  );
}
