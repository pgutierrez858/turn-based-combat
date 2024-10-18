import { Area } from "../components/Area.js";
import { Component } from "../components/Component.js";
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
   * @protected
   * @type {Array}
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
} // AbstractGameState
