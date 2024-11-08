import { ironCladStartingDeck } from "../cardDefinitions/indices.js";
import { ironcladCards } from "../cardDefinitions/definitions.js";
import { Card } from "./components/Card.js";
import { Deck } from "./components/Deck.js";
import { actOneEnemies } from "../enemyDefinitions/definitions.js";
import { instantiateFromClassData, randomIntFromInterval } from "../utils.js";
import { BasicEnemy } from "./components/BasicEnemy.js";

export class CardData {
  /**
   * Loads preset starter deck from data into the game deck provided.
   * @param {Deck} deck
   */
  static loadStarterDeck(deck) {
    this.loadCards(
      deck,
      ironCladStartingDeck.map((idx) =>
        ironcladCards.find((e) => e.data.uid === idx)
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
      const card = instantiateFromClassData(obj);
      deck.add(card);
    }
  } // loadCards
} // CardData

export class EnemyData {
  /**
   * Returns a random enemy from the list of enemies available in act 1.
   * @returns {Array<BasicEnemy>} A random enemy from the list of enemies available in act 1
   */
  static loadRandomEncounterFromActOne() {
    return BasicEnemy.loadEnemyFromJSON(
      actOneEnemies[randomIntFromInterval(0, actOneEnemies.length - 1)]
    );
  } // loadRandomEncounterFromAct
} // EnemyData
