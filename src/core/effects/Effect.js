import { GameState } from "../state/GameState.js";

/**
 * Base class for any effect that is executed in the game.
 */
export class Effect {
  effectAction;

  constructor(effectAction) {
    this.effectAction = effectAction;
  } // constructor

  /**
   * @abstract
   * @param {GameState} gameState
   * @param {*} actionTaken
   */
  canExecute(gameState, actionTaken) {} // canExecute

  execute(gameState, actionTaken) {
    if (this.canExecute(gameState, actionTaken)) {
      this.effectAction.execute(gs);
    }
  } // execute
} // Effect
