import { ForwardModel } from "./core/forwardModel/ForwardModel.js";
import { GameParameters } from "./core/GameParameters.js";
import { GameState } from "./core/state/GameState.js";

/*
import { Boot } from "./scenes/Boot.js";
import { Game } from "./scenes/Game.js";
import { GameOver } from "./scenes/GameOver.js";
import { MainMenu } from "./scenes/MainMenu.js";
import { Preloader } from "./scenes/Preloader.js";

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#028af8",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Boot, Preloader, MainMenu, Game, GameOver],
};

new Phaser.Game(config);
*/
const gameState = new GameState(new GameParameters());
gameState.reset();
const forwardModel = new ForwardModel();
forwardModel.setup(gameState);
const actions = forwardModel.computeAvailableActions(gameState);
console.log(actions);
