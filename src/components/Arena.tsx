import React, {ReactElement, useEffect, useState} from "react";
import {GridGenerator, Hex, Hexagon, HexGrid, HexUtils, Layout} from "react-hexgrid";

import {Colors} from "../styles/Colors";
import {ArenaConfig} from "../config/ArenaConfig";
import {Figure} from "../config/Figure";

export default function Arena(props: {config: ArenaConfig}): ReactElement {
  const [shape, setShape] = useState<Hex[]>([]);
  const [figures, setFigures] = useState<Figure[]>([]);

  useEffect(() => {
    const shape = GridGenerator.spiral({q: 0, r: 0, s: 0}, props.config.radius);
    setShape(shape);
  }, [props.config.radius]);

  useEffect(() => {
    setFigures(props.config.figures);
  }, [props.config.figures]);

  return (
    <>
      <HexGrid
        width={props.config.dimension}
        height={props.config.dimension}
      >
        <Layout
          size={{x: props.config.sizeX, y: props.config.sizeY}}
          spacing={props.config.spacing}
          flat={props.config.flat}
        >
          {shape.map((hexa, index) => {
            const character = findMatchingPlayer(figures, hexa);

            return (
              <Hexagon
                key={`Hexa#${index}`}
                q={hexa.q}
                r={hexa.r}
                s={hexa.s}
                fill={undefined}
                className={undefined}
                cellStyle={{fill: character ? character.color : Colors.SAND}}
                data={{...character}}
                onMouseEnter={(event, source) => {}}
                onMouseOver={(event, source) => {
                  // console.log("Hex", source.state.hex)
                }}
                onMouseLeave={(event, source) => {}}
                onClick={(event, source) => {}}
                /* Control if element is draggable */
                onDragStart={(event, source) => {
                  if (!source.data.name) {
                    event.preventDefault();
                  }
                }}
                /* onDragEnd you can do some logic, e.g. to clean up hexagon if drop was success */
                onDragEnd={(event, source, success) => {
                  if (!success) {
                    return;
                  }
                }}
                /* Decide here if you want to allow drop to this node */
                onDragOver={(event, source) => {
                  const character = findMatchingPlayer(figures, hexa);
                  if (!character) {
                    // Call preventDefault if you want to allow drop
                    event.preventDefault();
                  }
                }}
                /* onDrop you can read information of the hexagon that initiated the drag */
                onDrop={(event, source, targetProps) => {
                  console.log({eventName:"onDrop", source, targetProps})

                  console.log("Change", {from: targetProps.hex, to: source.state.hex})
                  const activeCharacter = targetProps.data;
                  activeCharacter.position = source.state.hex;
                  const newState: Figure[] = [];
                  newState.push(activeCharacter);
                  figures.filter(player => player.name !== activeCharacter.name).forEach(player => newState.push(player));
                  setFigures(newState);
                }}
              >

              </Hexagon>
            )
          })}
        </Layout>
      </HexGrid>
    </>
  );
}

function findMatchingPlayer(players: Figure[], toMatch: Hex): Figure | undefined {
  let match = players.find(player => HexUtils.equals(player.position, toMatch));
  return match;
}
