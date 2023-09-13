import {GridGenerator, Hexagon, HexGrid, Layout, Text} from "react-hexgrid";
import {Colors} from "../styles/Colors";

/**
 * size: 4, 4 => 100, 86
 */

export default function CustomGrid(props: {radius: number, size: number}) {
  const shape = GridGenerator.spiral({q: 0, r: 0, s: 0}, props.radius);
  console.log("shape.length", shape.length)
  const dimension = "100vh"; //`${(1 + props.radius) * 36}px`;
  console.log({shape})

  return (
    <HexGrid
      width={dimension}
      height={dimension}
      // viewBox={"-50 -55 100 110"}
    >
      <Layout size={{x: props.size, y: props.size}} spacing={1.03} flat={true}>
        {shape.map(hexa => {
          const color = calculateFillColor(hexa.q, hexa.r, hexa.s);
          return (
            <Hexagon q={hexa.q} r={hexa.r} s={hexa.s} style={{fill: color}}>
              <Text style={{fontSize: "0.02em", fill: "gray"}}>{`${hexa.q}, ${hexa.r}, ${hexa.s}`}</Text>
            </Hexagon>
          )
        })}
      </Layout>
    </HexGrid>
  )
}

function isOrigo(q: number, r: number, s: number) {
  return q === 0 && r === 0 && s === 0;
}

function isPerimeterOf(distance: number, q: number, r: number, s: number) {
  return Math.abs(q) + Math.abs(r) + Math.abs(s) === 2 * distance;
}

function isOnDiagonal(q: number, r: number, s: number): boolean {
  return Math.abs(q) === Math.abs(r) && s === 0
    || Math.abs(q) === Math.abs(s) && r === 0
    || Math.abs(s) === Math.abs(r) && q === 0;

}

function isInside(distance: number, q: number, r: number, s: number) {
  return Math.abs(q) < distance
      && Math.abs(r) < distance
      && Math.abs(s) < distance;
}

function calculateFillColor(q: number, r: number, s: number): string {
  const inner = 5, middle = 11, outer = 19;
  if (
    false
    // isOrigo(q, r, s)
    || isPerimeterOf(inner, q, r, s)
    || isPerimeterOf(middle, q, r, s)
    || isPerimeterOf(outer, q, r, s)
    || (isOnDiagonal(q, r, s) && !isInside(inner, q, r, s) && !isPerimeterOf(7, q, r, s) && !isPerimeterOf(14, q, r, s))
  ) {
    return Colors.ROCK;
  } else if(isInside(inner, q, r, s)) {
    return Colors.SAND;
  } else if(isInside(middle, q, r, s)) {
    return Colors.LIGHT_ORANGE;
  } else {
    return Colors.LIGHT_GREEN;
  }
}

type GridShape = { q: number; r: number; s: number };
