import { Text, View, StyleSheet } from "react-native";
import Cell from "./Cell.js";
import { useEffect, useState } from "react";

export default function Board() {
  const [player, setPlayer] = useState(1);
  const [box, setBox] = useState(
    Array(3)
      .fill(null)
      .map(() => {
        return Array(3).fill(null);
      })
  );
  const [count, setCount] = useState(0);

  const checkWin = () => {
    for (let i = 0; i < 3; i++) {
      if (box[i][0] === player && box[i][1] === player && box[i][2] === player)
        return true;
    }
    for (let i = 0; i < 3; i++) {
      if (box[0][i] === player && box[1][i] === player && box[2][i] === player)
        return true;
    }
    if (box[0][0] === player && box[1][1] === player && box[2][2] === player)
      return true;
    if (box[0][2] === player && box[1][1] === player && box[2][0] === player)
      return true;
    return false;
  };

  useEffect(() => {
    setCount(count + 1);
    if (checkWin()) {
      alert(`player ${player} win!`);
      reset();
    }
  }, [box]);

  useEffect(() => {
    if (count === 10) {
      alert("draw!");
      reset();
    }
  }, [count]);

  const reset = () => {
    setPlayer(1);
    setCount(0);
    newBox = Array(3)
      .fill(null)
      .map(() => Array(3).fill(null));
    setBox(newBox);
  };

  const onPress = async (row, col) => {
    if (box[row][col] !== null || checkWin()) return;

    const newBox = box.map((r, rowIndex) =>
      r.map((val, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return player;
        }
        return val;
      })
    );
    await setBox(newBox);
    setPlayer(player === 1 ? 2 : 1);
  };

  return (
    <View style={styles.board}>
      {box.map((row, rowIndex) => (
        <View
          key={`row-${rowIndex}`}
          style={styles.row}
        >
          {row.map((val, colIndex) => (
            <View
              key={`cell-${rowIndex}-${colIndex}`}
              style={styles.container}
            >
              <Cell
                onPress={() => onPress(rowIndex, colIndex)}
                player={val}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 5,
    backgroundColor: "white",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  board: {
    flex: 1,
    flexDirection: "column",
  },
});
