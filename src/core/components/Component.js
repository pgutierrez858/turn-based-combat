import { ComponentType } from "../CoreConstants.js";

/**
 * @abstract
 * Base class for any element that can appear in the game and should have a unique ID
 * (cards, decks, tokens, and so on).
 */
export class Component {
  /**
   * Every component is assigned a unique and constant ID from this counter (which is always increasing).
   * @private
   * @type {integer}
   */
  static ID = 0;

  /**
   * Unique ID of this particular component.
   * @protected
   * @type {integer}
   */
  componentID;

  /**
   * ID of owner or parent component. By default, this is set to -1 to indicate that the component belongs to "the game".
   * @protected
   * @type {integer}
   */
  ownerId = -1;

  /**
   * Name of this component.
   * @protected
   * @type {string}
   */
  componentName;

  /**
   * Component type based on the available core constants.
   * @protected
   * @type {ComponentType}
   */
  componentType;

  /**
   * List of components present in this deck.
   * @type {Array<Component>}
   */
  components;

  /**
   * @param {ComponentType} type
   * @param {string} name
   */
  constructor(type, name) {
    this.componentID = Component.ID++;
    this.componentType = type;
    this.componentName = name;
  } // constructor

  /**
   * Checks whether this component can contain other components inside of it.
   */
  isComponentContainer() {
    return !!this.components;
  } // isComponentContainer

  /**
   * Returns the array of components of the current object. To be used for iterations mostly.
   * Returns null if the component cannot hold nested items.
   */
  getComponents() {
    return this.components;
  } // getComponents

  setOwnerId(id) {
    this.ownerId = id;
  } // setOwnerId

  getComponentId() {
    return this.componentID;
  } // getComponentId
} // Component
