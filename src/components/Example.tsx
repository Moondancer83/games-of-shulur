import {Hex, Hexagon, HexGrid, Layout, Path, Pattern, Text} from "react-hexgrid";

export default function Example() {
  return (
    <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
      {/* Grid with manually inserted hexagons */}
      <Layout size={{ x: 10, y: 10 }} flat={true} spacing={1.1} origin={{ x: 0, y: 0 }}>
        <Hexagon q={0} r={0} s={0} />
        {/* Using pattern (defined below) to fill the hexagon */}
        <Hexagon q={0} r={-1} s={1} fill="pat-1" />
        <Hexagon q={0} r={1} s={-1} />
        <Hexagon q={1} r={-1} s={0}>
          <Text>1, -1, 0</Text>
        </Hexagon>
        <Hexagon q={1} r={0} s={-1}>
          <Text>1, 0, -1</Text>
        </Hexagon>
        {/* Pattern and text */}
        <Hexagon q={-1} r={1} s={0} fill="pat-2">
          <Text>-1, 1, 0</Text>
        </Hexagon>
        <Hexagon q={-1} r={0} s={1} />
        <Hexagon q={-2} r={0} s={1} />
        <Path start={new Hex(0, 0, 0)} end={new Hex(-2, 0, 1)} />
      </Layout>
      <Pattern id="pat-1" link="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Windows_Settings_app_icon.png/1024px-Windows_Settings_app_icon.png" />
      <Pattern id="pat-2" link="https://img.icons8.com/ios-filled/250/000000/mac-os.png" />
    </HexGrid>
  );
}