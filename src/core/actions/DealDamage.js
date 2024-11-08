import { implementsInterface } from "../../utils.js";
import { Damageable } from "../components/interfaces/Damageable.js";
import { GameState } from "../state/GameState.js";
import { AbstractAction } from "./AbstractAction.js";

export class DealDamage extends AbstractAction {
  /**
   * Component ID of the entity that will be targeted by this action.
   * @type {integer}
   */
  targetEntityId = -1;

  /**
   * Amount of damage to apply in this action.
   * @type {integer}
   */
  damage;

  /**
   * @param {integer} damage
   */
  constructor({ damage }) {
    super();
    this.damage = damage;
  } // constructor

  /**
   * @inheritdoc
   * @param {GameState} gs
   */
  execute(gs) {
    if (this.targetEntityId !== -1) {
      /** @type {Damageable} */
      const target = gs.getComponentById(this.targetEntityId);
      if (implementsInterface(target, Damageable)) {
        target.takeDamage(this.damage);
        return true;
      }
    }

    return false;
  } // execute

  /**
   * @param {integer} id
   */
  setTargetEntityId(id) {
    this.targetEntityId = id;
  } // setTargetEntityId

  getString() {
    return `Deal ${this.damage} damage`;
  } // getString
} // DealDamage
