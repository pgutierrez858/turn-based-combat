import { ComponentType } from "../CoreConstants.js";
import { Component } from "./Component.js";

/**
 * Class for a deck of components.
 * Examples of this are for instance a hand of cards, a deck to draw from,
 * components that have been played on the player's area, and so forth.
 */
export class Deck extends Component {
  /**
   * Maximum number of elements that can be placed in the deck.
   * @type {integer}
   */
  capacity;

  /**
   * Visibility mode of this particular deck (whether it should be viewable or not).
   * @type {boolean}
   */
  visible;

  constructor(name, visible) {
    super(ComponentType.DECK, name);
    this.visible = visible;
    this.components = [];
  } // constructor

  /**
   * Draws the first component of the deck.
   * @returns {Component}
   */
  draw() {
    return this.pick(0);
  } // draw

  /**
   * Picks the component in position index from the deck.
   * @param {integer} index
   * @returns {Component}
   */
  pick(index) {
    if (
      this.components.length > 0 &&
      index >= 0 &&
      index < this.components.length
    ) {
      const elem = this.components[index];
      this.components = this.components.filter((_, i) => i !== index);
      elem.ownerId = -1;
      return elem;
    }
    return null;
  } // pick

  /**
   * Adds a given component to the deck.
   * @param {Component} c component to add.
   */
  add(c) {
    if (c !== null) {
      c.ownerId = this.componentID;
      this.components.push(c);
    }
  } // add

  /**
   * Remove the given component.
   * @param {Component} c component to remove.
   */
  remove(c) {
    c.setOwnerId(-1);
    const index = this.components.indexOf(c);
    if (index >= 0) {
      return this.removeAtIndex(index);
    }
    return false;
  } // remove

  removeAtIndex(idx) {
    if (idx >= 0 && idx < this.components.length) {
      this.components[idx].setOwnerId(-1);
      this.components.splice(idx, 1);
      return true;
    }
    return false;
  } // removeAtIndex
} // Deck
