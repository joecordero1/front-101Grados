import React from "react";
import Tetris from "./tetris/tetris";

const GamesHome = () => {
  return (
    <div>
      <Tetris boardWidth="10" boardHeight="20" />
    </div>
  );
};

export default GamesHome;
