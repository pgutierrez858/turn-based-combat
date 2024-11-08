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
  _setup(firstState) {} // _next

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
  _next(currentState, action) {
    // TODO: _beforeAction
    if (!!action) {
      action.execute(currentState);
    } else {
      console.error("No action selected by current player.");
    }

    /**
     * Register the action on top of the stack (unless it's the same as the one we just executed,
     * in which case we just move on to the next one).
     */
    const actionsInProgressCount = currentState.actionsInProgress.length;
    if (actionsInProgressCount > 0) {
      const topOfStack =
        currentState.actionsInProgress[actionsInProgressCount - 1];
      if (topOfStack !== action) {
        topOfStack._afterAction(currentState, action);
      } else {
        if (actionsInProgressCount > 1) {
          const nextOnStack =
            currentState.actionsInProgress[actionsInProgressCount - 2];
          nextOnStack._afterAction(currentState, action);
        }
      }
      this._afterAction(currentState, action);
    }
  } // _next

  /**
   * Applies the given action to the game state and executes any other game rules.
   * @param {AbstractGameState} currentState
   * @param {AbstractAction} action
   */
  next(currentState, action) {
    if (!!action) {
      // TODO: this is a good point to record actions
      this._next(currentState, action);
    } else {
      // TODO: handle illegal actions
      console.error("Tried to play an illegal action.");
    }
    // TODO: good point to advance ticks if we implement them
  } // next

  /**
   * Computes a list of available actions in the current game state.
   * @public
   * @param {AbstractGameState} gameState The state from which to compute the available actions.
   * @returns {Array<AbstractAction>} available actions at the current state
   */
  computeAvailableActions(gameState) {
    if (gameState.isActionInProgress()) {
      return gameState.actionsInProgress[
        gameState.actionsInProgress.length - 1
      ]._computeAvailableActions(gameState);
    } else {
      return this._computeAvailableActions(gameState);
    }
  } // computeAvailableActions

  /**
   * To be implemented by each specific forward model. Calculate the list of
   * currently available actions.
   * @protected
   * @abstract
   * @param {AbstractGameState} gameState
   */
  _computeAvailableActions(gameState) {} // _computeAvailableActions

  /**
   * Apply any after-action rules to the current game state.
   * @protected
   * @abstract
   * @param {AbstractGameState} currentState
   * @param {AbstractAction} actionTaken
   */
  _afterAction(currentState, actionTaken) {} // _afterAction

  /**
   * Handles the end of the player's current turn.
   * @protected
   * @abstract
   * @param {AbstractGameState} gameState
   */
  endPlayerTurn(gameState) {}
} // AbstractForwardModel
