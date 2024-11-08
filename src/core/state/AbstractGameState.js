import { Area } from "../components/Area.js";
import { Component } from "../components/Component.js";
import { ExtendedSequence } from "../components/interfaces/ExtendedSequence.js";
import { GameParameters } from "../GameParameters.js";

/**
 * @abstract
 * Class containing all game state information.
 *
 * This is different from the Game itself, of which this game state is a component.
 */
export class AbstractGameState {
  /**
   * Parameters, forward model of the game, and so on.
   * @protected
   * @constant
   * @type {GameParameters}
   */
  gameParameters;

  /**
   * Stack for actions that are yet to be executed fully.
   * @type {Array<ExtendedSequence>}
   */
  actionsInProgress;

  /**
   * Game area containing all game components in this game state.
   * @private
   * @type {Area}
   */
  allComponents;

  /**
   *
   * @param {GameParameters} gameParameters
   */
  constructor(gameParameters) {
    this.gameParameters = gameParameters;
  }

  reset() {
    this.allComponents = new Area(-1, "All Components");
    this.actionsInProgress = [];
  } // reset

  /**
   * Returns a list including all components present in this state. This is left
   * as a pending task for each individual state implementation.
   * @protected
   * @abstract
   * @returns {Array<Component>}
   */
  _getAllComponents() {} // getAllComponents

  /**
   * Adds all components given by the game to the allComponents area after clearing its contents.
   * @protected
   */
  addAllComponents() {
    this.allComponents.clear();
    this.allComponents.putComponents(this._getAllComponents());
  } // addAllComponents

  /**
   * Returns an array with all the components registered by the game.
   * @returns {Array<Component>}
   */
  getAllTopLevelComponents() {
    return this._getAllComponents();
    // TODO: This is for top level components, but we also want one for low level nested components.
  } // getAllTopLevelComponents

  getComponentById(id) {
    let c = this.allComponents.getComponent(id);
    if (!c) {
      this.addAllComponents();
      c = this.allComponents.getComponent(id);
    }
    return c;
  } // getComponentById

  /**
   * @public
   * Checks whether an action is currently in progress, with the side effect of calling
   * checkActionsInProgress to remove already completed actions from stack.
   * @returns true if there is at least one action not fully finished in the stack.
   */
  isActionInProgress() {
    this.checkActionsInProgress();
    return this.actionsInProgress.length > 0;
  } // isActionInProgress

  /**
   * @private
   * Since actions are not removed from the queue actively when they finish (instead, they set
   * one of their flags to completed, accesible from ExtendedSequence.executionComplete()),
   * whenever we check the actionsInProgress stack we first need to remove any completed actions
   * to check whether there really are pending actions to complete.
   */
  checkActionsInProgress() {
    while (
      this.actionsInProgress.length > 0 &&
      this.currentActionInProgress()?._executionComplete(this)
    ) {
      this.actionsInProgress.pop();
    }
  } // checkActionsInProgress

  /**
   * @public
   * Gets current action in progress if any, or null otherwise.
   * @returns {ExtendedSequence}
   */
  currentActionInProgress() {
    return this.actionsInProgress.length > 0
      ? this.actionsInProgress[this.actionsInProgress.length - 1]
      : null;
  } // currentActionInProgress

  /**
   * @public
   * @param {ExtendedSequence} action
   */
  setActionInProgress(action) {
    if (!action && this.actionsInProgress.length > 0) {
      this.actionsInProgress.pop();
    } else {
      this.actionsInProgress.push(action);
    }
    return true;
  } // setActionInProgress
} // AbstractGameState
