import React from "react";
import Tetris from "./tetris/tetris";
import { useProgram } from "~/hooks";

const GamesHome = () => {
  const { program } = useProgram();
  return (
    <div
      style={{
        backgroundImage: `url("${program.logo}")`,
        backgroundSize: "10%",
        justifyContent: "center",
        alignContent: "center",
        display: "flex",
      }}
    >
      <Tetris boardWidth={10} boardHeight={20} />
    </div>
  );
};

export default GamesHome;
