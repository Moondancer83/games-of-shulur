import {Figure} from "./Figure";

export interface ArenaConfig {
  dimension: string,
  radius: number,
  sizeX: number,
  sizeY: number,
  spacing: number,
  flat: boolean,
  figures: Figure[]
}
