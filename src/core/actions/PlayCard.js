import { Card } from "../components/Card.js";
import { GameState } from "../state/GameState.js";
import { AbstractAction } from "./AbstractAction.js";

export class PlayCard extends AbstractAction {
  /**
   * Component ID of the card used to play this action (defaults to -1).
   * @private
   * @type {integer}
   */
  cardComponentID = -1;

  /**
   *
   * @param {integer} cardUID
   */
  constructor({ cardUID }) {
    super();
    this.cardUID = cardUID;
  } // constructor

  /**
   * @returns @type {integer}
   */
  getCardComponentID() {
    return this.cardComponentID;
  } // getCardUID

  /**
   * @param {integer} uid
   */
  setCardComponentID(id) {
    this.cardComponentID = id;
  } // setCardUID

  /**
   * Checks whether this card is playable in the current game state.
   * @param {GameState} gs
   */
  canBePlayed(gs) {
    const cid = this.getCardComponentID();

    if (cid != -1) {
      // there is an actual card associated to this action
      /** @type {Card} */
      const c = gs.getComponentById(cid);

      if (c != null) {
        // the card is in the player's hand and they have enough energy to play it
        return (
          c.energyCost <= gs.playerEnergy &&
          gs.playerHand.getComponents().includes(c)
        );
      }
    }

    return false;
  } // canBePlayed

  /**
   * @param {GameState} gs
   */
  execute(gs) {
    const card = gs.getComponentById(this.getCardComponentID());
    this.playCard(gs, card);
    return true;
  } // execute

  /**
   *
   * @param {GameState} gameState
   * @param {Card} card
   */
  playCard(gameState, card) {
    // remove card from hand
    gameState.playerHand.remove(card);

    // pay the cost of playing the card
    gameState.playerEnergy -= card.energyCost;

    for (let action of card.immediateEffects) {
      card.actionPlayed = false; // this is set by each action, preventing the next ones (but all will be executed)
      action.execute(gameState);
    }
    card.actionPlayed = false;
  } // playCard

  /**
   *
   * @param {GameState} gs
   * @returns
   */
  getString(gs) {
    if (this.cardComponentID < 0) return "Invalid Play Card Action.";
    /** @type {Card} */
    const card = gs.getComponentById(this.cardComponentID);
    return `Play card "${card.name}" [ID: ${this.cardComponentID}]`;
  } // getString
} // PlayCard
