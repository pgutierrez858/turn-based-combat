import { AbstractAction } from "../actions/AbstractAction.js";
import { AbstractGameState } from "../state/AbstractGameState.js";

export class AbstractForwardModel {
  constructor() {}

  /**
   * Performs initial game setup according to game rules.
   * @protected
   * @abstract
   * @param {AbstractGameState} firstState the state to be converted into the initial game state.
   */
  setup(firstState) {}

  /**
   * Applies the given action to the game state and executes any relevant game rules
   * that might be applicable at the time. This is done in the following order:
   * - execute player action
   * - execute any applicable rules
   * - check game over conditions and modify the game status and results accordingly
   * - if needed, advance to the next game stage
   * @protected
   * @abstract
   * @param {AbstractGameState} currentState state to be modified by action
   * @param {AbstractAction} action action to apply over the state
   */
  next(currentState, action) {} // next

  /**
   * Computes a list of available actions in the current game state.
   * @protected
   * @abstract
   * @param {AbstractGameState} gameState The state from which to compute the available actions.
   * @returns {Array<AbstractAction>} available actions at the current state
   */
  computeAvailableActions(gameState) {}

  /**
   * Handles the end of the player's current turn.
   * @protected
   * @abstract
   * @param {AbstractGameState} gameState
   */
  endPlayerTurn(gameState) {}
} // AbstractForwardModel
