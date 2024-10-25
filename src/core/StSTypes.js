import { ironCladStartingDeck } from "../cardDefinitions/indices.js";
import { ironcladCards } from "../cardDefinitions/definitions.js";
import { Card } from "./components/Card.js";
import { Deck } from "./components/Deck.js";

export class CardData {
  /**
   * Loads preset starter deck from data into the game deck provided.
   * @param {Deck} deck 
   */
  static loadStarterDeck(deck) {
    this.loadCards(
      deck,
      ironCladStartingDeck.map((idx) =>
        ironcladCards.find((e) => e.uid === idx)
      )
    );
  } // loadStarterDeck

  /**
   * Populate given deck with the data from a json object including a list of cards.
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
