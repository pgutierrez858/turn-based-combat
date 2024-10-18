import { BasicEnemy } from "../components/BasicEnemy.js";
import { Deck } from "../components/Deck.js";
import { AbstractGameState } from "./AbstractGameState.js";

/**
 * @todo docs
 */
export class GameState extends AbstractGameState {
  /**
   * Current phase of the game. Used now to determine player vs enemy turn.
   * @type {GamePhase}
   */
  gamePhase;

  //---------------------------------------------------------------------
  //                       Player Data
  //---------------------------------------------------------------------

  /**
   * Drawing deck for the player.
   * @type {Deck}
   */
  playerDeck;

  /**
   * Discard pile for the player.
   * @type {Deck}
   */
  discardPile;

  /**
   * Exhaust pile for the player.
   * @type {Deck}
   */
  exhaustPile;

  /**
   * Current cards in player's hand.
   * @type {Deck}
   */
  playerHand;

  /**
   * Current player's remaining health points.
   * @type {integer}
   */
  playerHealth;

  /**
   * Current player's remaining energy points.
   * @type {integer}
   */
  playerEnergy;

  /**
   * Current player's remaining block points.
   * @type {integer}
   */
  playerBlock;

  /**
   * Relics obtained by player up to now;
   * @type {Array}
   */
  playerRelics;

  //---------------------------------------------------------------------

  /**
   * List of enemies in combat.
   * @type {Array<BasicEnemy>}
   */
  enemies;

  constructor(gameParameters) {
    super(gameParameters);
  }

  _getAllComponents() {
    return [
      this.discardPile,
      this.playerDeck,
      this.playerHand,
      this.exhaustPile,
    ];
  } // _getAllComponents
} // GameState

/**
 * Enum-style class with a set of values representing possible game stages.
 */
export class GamePhase {
  static _PLAYER_TURN_START = "Start of Player Turn";
  static _PLAYER_TURN = "Player Turn";
  static _PLAYER_TURN_END = "End of Player Turn";
  static _ENEMY_TURN_START = "Start of Enemy Turn";
  static _ENEMY_TURN = "Enemy Turn";
  static _ENEMY_TURN_END = "End of Enemy Turn";

  static get PLAYER_TURN() {
    return this._PLAYER_TURN;
  }

  static get ENEMY_TURN() {
    return this._ENEMY_TURN;
  }

  static get PLAYER_TURN_START() {
    return this._PLAYER_TURN_START;
  }

  static get ENEMY_TURN_START() {
    return this._ENEMY_TURN_START;
  }

  static get PLAYER_TURN_END() {
    return this._PLAYER_TURN_END;
  }

  static get ENEMY_TURN_END() {
    return this._ENEMY_TURN_END;
  }
} // GamePhase
