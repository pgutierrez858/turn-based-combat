import { ironCladStartingDeck } from "../cardDefinitions/indices.js";
import { ironcladCards } from "../cardDefinitions/definitions.js";
import { Card } from "./components/Card.js";
import { Deck } from "./components/Deck.js";

export class CardData {
  static loadStarterDeck(deck) {
    this.loadCards(
      deck,
      ironCladStartingDeck.map((idx) =>
        ironcladCards.find((e) => e.uid === idx)
      )
    );
  } // loadStarterDeck

  /**
   *
   * @param {Deck} deck Deck to populate with the specified cards.
   * @param {Object} jsonObj JSON Object containing the cards that need to be added.
   */
  static loadCards(deck, jsonObj) {
    for (const obj of jsonObj) {
      const card = Card.loadCardFromJSON(obj);
      deck.add(card);
    }
  } // loadCards
} // CardData
