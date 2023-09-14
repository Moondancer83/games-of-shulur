import {ArenaConfig} from "./ArenaConfig";
import {Colors} from "../styles/Colors";

export const BasicSetup: ArenaConfig =  {
  dimension: "100vh",
  radius: 4,
  sizeX: 5,
  sizeY: 5,
  spacing: 1.1,
  flat: true,
  figures: [
    {
      name: "Blue",
      color: Colors.BLUE,
      position: {q: 3, s: -1, r: -2}
    },
    {
      name: "Red",
      color: Colors.RED,
      position: {q: -3, s: 1, r: 2}
    }
  ],
};
