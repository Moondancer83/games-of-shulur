import React, {ReactElement, useEffect, useState} from "react";
import {GridGenerator, Hex, Hexagon, HexGrid, HexUtils, Layout} from "react-hexgrid";
import {Colors} from "../styles/Colors";
import {HexCoordinates} from "react-hexgrid/lib/models/Hex";

interface Player {
  name: string;
  color: string;
  position: HexCoordinates;
}

export default function Arena(props: {radius: number}): ReactElement {
  const dimension = "100vh"
  let sizeX = 5;
  let sizeY = 5;
  let spacing = 1.1;
  let flat = true;

  const [shape, setShape] = useState<Hex[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const shape = GridGenerator.spiral({q: 0, r: 0, s: 0}, props.radius);
    setShape(shape);
  }, [props.radius]);

  useEffect(() => {
    const playerBlue: Player = {
      name: "Blue",
      color: Colors.BLUE,
      position: {q: 3, s: -1, r: -2}
    };
    const playerRed: Player = {
      name: "Red",
      color: Colors.RED,
      position: {q: -3, s: 1, r: 2}
    }

    setPlayers([playerBlue, playerRed]);
  }, []);

  return (
    <>
      <HexGrid
        width={dimension}
        height={dimension}
      >
        <Layout
          size={{x: sizeX, y: sizeY}}
          spacing={spacing}
          flat={flat}
        >
          {shape.map((hexa, index) => {
            const character = findMatchingPlayer(players, hexa);

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
                  const character = findMatchingPlayer(players, hexa);
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
                  const newState: Player[] = [];
                  newState.push(activeCharacter);
                  players.filter(player => player.name !== activeCharacter.name).forEach(player => newState.push(player));
                  setPlayers(newState);
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

function findMatchingPlayer(players: Player[], toMatch: Hex): Player | undefined {
  let match = players.find(player => HexUtils.equals(player.position, toMatch));
  return match;
}
