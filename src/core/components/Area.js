import { ComponentType } from "../CoreConstants.js";
import { Component } from "./Component.js";

/**
 * An Area can be understood as a collection of components (Decks, Tokens,
 * Enemies, Cards, and so on). This includes a mapping to their corresponding IDs.
 */
export class Area extends Component {
  /**
   * Collection of components in the area mapped to their IDs.
   * @protected
   * @type {Map<integer, Component>}
   */
  components;

  constructor(ownerID, name) {
    super(ComponentType.AREA, name);
    this.components = new Map();
    this.ownerId = ownerID;
  }

  /**
   * Clears the collection of components.
   */
  clear() {
    this.components.clear();
  } // clear

  /**
   * Retrieve the collection of components in this area.
   */
  getComponentsMap() {
    return this.components;
  } // getComponentsMap

  /**
   * Retrieve a list of available components (only the components without IDs).
   */
  getComponents() {
    return Array.from(this.components.values());
  } // getComponents

  /**
   * Retrieve a component by its ID key.
   * @param {integer} key key to look for.
   */
  getComponent(key) {
    return this.components.get(key);
  } // getComponent

  /**
   * Adds a component to the collection.
   * @param {Component} component
   */
  putComponent(component) {
    this.components.set(component.componentID, component);
  } // putComponent

  /**
   * Calls putComponent for each individual component in the components array.
   * @param {Array<Component>} components
   */
  putComponents(components) {
    components.forEach((c) => {
      this.putComponent(c);
    });
  } // putComponents

  /**
   * Removes given component from the collection.
   * @param {Component} component
   */
  removeComponent(component) {
    if (this.components.has(component.componentID)) {
      this.components.delete(component.componentID);
    }
  } // removeComponent
} // Area
