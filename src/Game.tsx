import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import { GridEngine } from "grid-engine";

import BootScene from "./scenes/BootScene";
import TitleScene from "./scenes/TitleScene";
import WorldScene from "./scenes/WorldScene";
import BattleScene from "./scenes/BattleScene";
import { GAME_HEIGHT, GAME_WIDTH } from "./constants/game";
import { UI } from "./ui/UI";

const gameConfig: Phaser.Types.Core.GameConfig = {
  parent: "game",
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [BootScene, TitleScene, WorldScene, BattleScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  plugins: {
    scene: [
      {
        key: "gridEngine",
        plugin: GridEngine,
        mapping: "gridEngine",
      },
    ],
  },
};

export default class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

export const GameComponent = () => {
  const game = new Game(gameConfig);

  return (
    <>
      <UI game={game} />
      <div id="game" />
    </>
  );
};

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(<GameComponent />);
} else {
  throw new Error("Root element not found");
}
