import { Component } from "./Component.js";
import { ComponentType } from "../CoreConstants.js";

export class Card extends Component {
  /**
   * Energy points required to play this card.
   * @type {integer}
   */
  energyCost;

  /**
   * Unique identifier of this component's base card.
   * @type {integer}
   */
  uid;

  /**
   * Name of this card as displayed on top.
   * @type {string}
   */
  name;

  /**
   * What type of card this is (attack, skill, power, status, curse...).
   */
  cardType;

  /**
   * Text displayed as an effect for this card.
   * @type {string}
   */
  annotation;

  /**
   * List of effects to execute *sequentially* after card is played.
   * @type {Array}
   */
  immediateEffects;

  /**
   * @param {string} name
   */
  constructor(name) {
    super(ComponentType.CARD, name);
    this.immediateEffects = [];
  } // constructor

  /**
   * Attempts to generate a card based on a given definition in JSON format.
   * @param {Object} cardDef the definition of the card that we wish to instantiate.
   * @returns a new card from the provided definition if this was valid, null otherwise.
   */
  static loadCardFromJSON(cardDef) {
    if (!this.isValidCharacterCard(cardDef)) return null;

    let card = new Card();
    Object.assign(card, cardDef);
    return card;
  } // loadCardFromJSON

  /**
   * @param {Object} cardDef the definition of the card that we wish to validate.
   * @returns whether the card definition is a valid character card.
   */
  static isValidCharacterCard(cardDef) {
    const propertiesToCheck = [
      "name",
      "energyCost",
      "cardType",
      "annotation",
      "immediateEffects",
    ];
    /** @todo Check types + immediateEffects is a valid array of actual effects. For this example,
     * I'm just adding a very basic properties check, but this should be as thorough as possible! */
    return propertiesToCheck.every((p) => Object.hasOwn(cardDef, p));
  } // isValidCharacterCard
} // Card
