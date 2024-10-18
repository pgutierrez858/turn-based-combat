import { GameState } from "../state/GameState.js";

/**
 * @abstract
 * Base class for any game actions, enforcing *execute* and *getString* methods on newly created actions.
 * Actions are always thought of as things that the player can do and decide on actively while playing the game,
 * which can in turn trigger effects, which happen as a consequence of an action being played (or as a response to
 * another effect, but in all cases an action starts an effect chain).
 */
export class AbstractAction {
  /**
   * @abstract
   * Execute this action, applying its effect to the given game state.
   * @param {GameState} gameState the game state which will be modified by this action.
   * @returns {boolean} true if applied successfully, false otherwise.
   */
  execute(gameState) {}

  /**
   * @abstract
   * Get a string representation of the action being performed. Useful for logging purposes and
   * terminal based instances of the game.
   * @param {GameState} gameState
   * @returns {string}
   */
  getString(gameState) {}
} // Action
