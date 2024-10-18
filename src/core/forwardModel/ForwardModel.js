import { AbstractAction } from "../actions/AbstractAction.js";
import { PlayCard } from "../actions/PlayCard.js";
import { Deck } from "../components/Deck.js";
import { GamePhase, GameState } from "../state/GameState.js";
import { CardData } from "../StSTypes.js";
import { AbstractForwardModel } from "./AbstractForwardModel.js";

export class ForwardModel extends AbstractForwardModel {
  setup(firstState) {
    /** @type {GameState} */
    const gs = firstState;

    gs.playerDeck = new Deck("Player Deck", false);
    gs.discardPile = new Deck("Discard Pile", true);
    gs.exhaustPile = new Deck("Exhaust Pile", true);
    gs.playerHand = new Deck("Player Hand", true);

    gs.playerBlock = 0;
    gs.playerEnergy = 3;
    gs.playerHealth = 10;
    gs.playerRelics = [];
    gs.enemies = [];

    gs.gamePhase = GamePhase.PLAYER_TURN;

    CardData.loadStarterDeck(gs.playerDeck);

    for (let i = 0; i < 5; i++) {
      gs.playerHand.add(gs.playerDeck.draw());
    }
  } // setup

  computeAvailableActions(gameState) {
    const actions = [];
    /** @type {GameState} */
    const gs = gameState;

    /** @type {Array<AbstractAction>} */
    const possibleActions = this.getAllActions(gs);
    for (const act of possibleActions) {
      console.log(act);
      if (act !== null && act.canBePlayed(gs)) {
        actions.push(act);
      }
    }

    return actions;
  } // computeAvailableActions

  /**
   * Create a list of all actions that might be possible in the current state, regardless
   * of whether they are playable or not at the moment. Requirements in the action should
   * inform of why it might not be possible at the time. This is useful to display full
   * information on the GUI for unplayable (but technically possible) actions.
   * @param {GameState} gs
   * @returns {Array<AbstractAction>}
   */
  getAllActions(gs) {
    const actions = [];
    if (gs.gamePhase === GamePhase.PLAYER_TURN) {
      actions.push(
        ...gs.playerHand.getComponents().map((c) => {
          const pc = new PlayCard(c);
          pc.setCardComponentID(c.componentID);
          return pc;
        })
      );
    }

    return actions;
  } // getAllActions
} // ForwardModel
