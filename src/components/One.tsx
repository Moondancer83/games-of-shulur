import {Hexagon, HexGrid, Layout, Text} from "react-hexgrid";

export default function One() {
  return (
    <HexGrid>
      <Layout>
        <Hexagon q={0} r={0} s={0} style={{ fill: "gold" }}>
          <Text style={{fontSize: "0.3em", fill: "gray"}}>0, 0, 0</Text>
        </Hexagon>
      </Layout>
    </HexGrid>
  )
}