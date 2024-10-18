/**
 * Enum-style class with a set of values representing possible component types.
 */
export class ComponentType {
  static _DECK = "Deck";
  static _CARD = "Card";
  static _COUNTER = "Counter";
  static _DICE = "Dice";
  static _TOKEN = "Token";
  static _BASIC_ENEMY = "Basic Enemy";
  static _AREA = "Area";

  static get DECK() {
    return this._DECK;
  }

  static get CARD() {
    return this._CARD;
  }

  static get COUNTER() {
    return this._COUNTER;
  }

  static get DICE() {
    return this._DICE;
  }

  static get TOKEN() {
    return this._TOKEN;
  }

  static get BASIC_ENEMY() {
    return this._BASIC_ENEMY;
  }

  static get AREA() {
    return this._AREA;
  }
} // ComponentType
