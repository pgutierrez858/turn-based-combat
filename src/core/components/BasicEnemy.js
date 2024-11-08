import { ComponentType } from "../CoreConstants.js";
import { Component } from "./Component.js";

export class BasicEnemy extends Component {
  /**
   * Unique identifier of this component's base enemy.
   * @type {integer}
   */
  uid;

  /**
   * Name of this enemy as displayed on top.
   * @type {string}
   */
  name;

  /**
   * Text displayed as an effect for this enemy.
   * @type {string}
   */
  annotation;

  /**
   * Current Health Points for this enemy.
   * @type {integer}
   */
  hp;

  /**
   * Maximum HP for this enemy.
   * @type {integer}
   */
  maxHp;

  constructor() {
    super(ComponentType.BASIC_ENEMY, "");
  } // constructor

  /**
   * Attempts to generate an enemy based on a given definition in JSON format.
   * @param {Object} enemyDef the definition of the enemy that we wish to instantiate.
   * @returns {BasicEnemy} a new enemy from the provided definition if this was valid, null otherwise.
   */
  static loadEnemyFromJSON(enemyDef) {
    if (!this.isValidEnemy(enemyDef)) return null;

    const enemy = new BasicEnemy();
    enemy.hp = enemyDef["maxHp"]; // if isValidEnemy then should be safe
    return Object.assign(enemy, structuredClone(enemyDef));
  } // loadEnemyFromJSON

  /**
   * @param {Object} enemyDef the definition of the enemy that we wish to validate.
   * @returns whether the definition is a valid enemy.
   */
  static isValidEnemy(enemyDef) {
    const propertiesToCheck = ["uid", "name", "maxHp", "annotation"];
    // TODO: Decent check
    return propertiesToCheck.every((p) => Object.hasOwn(enemyDef, p));
  } // isValidEnemy

  getMaxHp() {
    return this.maxHp;
  } // getMaxHp

  getCurrentHp() {
    return this.hp;
  } // getHp

  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
  } // takeDamage
} // BasicEnemy
