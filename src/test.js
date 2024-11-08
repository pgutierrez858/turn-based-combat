import { ForwardModel } from "./core/forwardModel/ForwardModel.js";
import { GameParameters } from "./core/GameParameters.js";
import { GameState } from "./core/state/GameState.js";
import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const gameState = new GameState(new GameParameters());
gameState.reset();
const forwardModel = new ForwardModel();
forwardModel._setup(gameState);

let actions;
let choice;

do {
  console.log("-------------------------");
  console.log(`Game State:`);
  console.log("-------------------------");
  console.log(gameState);

  actions = forwardModel.computeAvailableActions(gameState);

  console.log("-------------------------");
  console.log(`Available Actions:`);
  console.log("-------------------------");
  console.log(
    actions.map((a, i) => `[${i}] - ${a.getString(gameState)}`).join("\n")
  );
  console.log("-------------------------");

  const question = new Promise((resolve) => {
    rl.question("Select one of the available actions:\n", resolve);
    console.log("-------------------------");
  });
  const i = await question;

  choice = parseInt(i);
  if (choice >= 0 && choice < actions.length) {
    forwardModel.next(gameState, actions[choice]);
  } else if (choice !== -1) {
    console.log("Invalid action index provided.");
  }

  process.stdout.write("\x1Bc");
} while (actions.length > 0 && choice !== -1);

rl.close();
