import { AbstractAction } from "../../actions/AbstractAction.js";
import { AbstractGameState } from "../../state/AbstractGameState.js";

export const ExtendedSequence = {
  /**
   * Forward Model will delegate to this from its own computeAvailableActions() if this extended
   * sequence is currently active.
   * @param {AbstractGameState} gameState
   * @returns {Array<AbstractAction>}
   */
  _computeAvailableActions: (gameState) => {},

  /**
   * Called by Forward Model whenever an action has just been taken. Enables the extended sequence
   * to maintain local state in whichever way it finds most suitable.
   * @param {AbstractGameState} gameState
   * @param {AbstractAction} action
   */
  _afterAction: (gameState, action) => {},

  /**
   * Returns true if this extended sequence has been completed and nothing is left to do.
   * @param {AbstractGameState} gameState
   * @returns {boolean} true if all subactions have been completed.
   */
  _executionComplete: (gameState) => {},
}; // ExtendedSequence
