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
   * @param {Card} card
   */
  constructor(card) {
    super();
    this.cardUID = card.uid;
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

      console.log(c);
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
    gameState.getPlayerHand().remove(card);

    // pay the cost of playing the card
    gameState.playerEnergy -= card.energyCost;

    for (let action of card.immediateEffects) {
      action.execute(gameState);
    }
  } // playCard

  getString(_) {
    return `Play card with ID ${this.cardID}`;
  } // getString
} // PlayCard
