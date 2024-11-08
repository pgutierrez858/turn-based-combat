import { Component } from "./Component.js";
import { ComponentType } from "../CoreConstants.js";
import { AbstractAction } from "../actions/AbstractAction.js";

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
   * @type {Array<AbstractAction>}
   */
  immediateEffects;

  /**
   * Whether this card's action has already been played and completed.
   */
  actionPlayed = false;

  constructor({
    uid,
    name,
    cardType,
    annotation,
    energyCost,
    immediateEffects,
  }) {
    super(ComponentType.CARD, "");
    this.uid = uid;
    this.name = name;
    this.cardType = cardType;
    this.annotation = annotation;
    this.energyCost = energyCost;
    this.immediateEffects = immediateEffects;
  } // constructor
} // Card
