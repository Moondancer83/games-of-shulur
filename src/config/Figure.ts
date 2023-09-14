import {HexCoordinates} from "react-hexgrid/lib/models/Hex";

export interface Figure {
  name: string;
  color: string;
  position: HexCoordinates;
}
