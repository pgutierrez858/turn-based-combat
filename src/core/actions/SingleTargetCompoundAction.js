import { implementsInterface } from "../../utils.js";
import { ExtendedSequence } from "../components/interfaces/ExtendedSequence.js";
import { TargetedEffect } from "../components/interfaces/TargetedEffect.js";
import { GameState } from "../state/GameState.js";
import { AbstractAction } from "./AbstractAction.js";
import { singleEnemyTarget } from "./TargetTypes.js";

/**
 * @implements {ExtendedSequence}
 */
export class SingleTargetCompoundAction extends AbstractAction {
  /**
   * Sequence of single target actions that will be applied by this one.
   * @type {Array<AbstractAction>}
   */
  actions;

  /**
   * Component ID of the element to apply these effects to.
   * @type {integer}
   */
  targetComponentId = -1;

  /**
   * True if no possible target was found for this action.
   * @type {boolean}
   */
  impossible;

  /**
   * True if this action has been marked as completed.
   * This can be due to either the action having received a target, or
   * due to it no longer being needed after being replaced by a new action.
   * @type {boolean}
   */
  completed;

  /**
   * @param {Array<AbstractAction>} actions
   */
  constructor({ actions }) {
    super();
    this.actions = actions;
    this.impossible = false;
    this.completed = false;
  } // constructor

  /**
   * @param {GameState} gameState
   */
  _computeAvailableActions(gameState) {
    if (this.targetComponentId == -1) {
      // still haven't selected a target
      // TODO: For now this is only valid for enemies as targets
      return singleEnemyTarget(gameState).map((et) => {
        const ca = new SingleTargetCompoundAction({ actions: this.actions });
        ca.setTarget(et.getComponentId());
        return ca;
      });
    } else {
      // no action can be performed
      this.impossible = true;
      return [];
    }
  } // _computeAvailableActions

  /**
   * Recursively sets the target of this actions' effects.
   * @param {integer} targetComponentId
   */
  setTarget(targetComponentId) {
    this.targetComponentId = targetComponentId;
    for (const a of this.actions) {
      if (implementsInterface(a, TargetedEffect)) {
        a.setTargetEntityId(this.targetComponentId);
      }
    }
  } // setTarget

  /**
   * @param {GameState} gs
   */
  execute(gs) {
    if (this.targetComponentId !== -1) {
      this.completed = true;
      let success = true;
      for (const a of this.actions) {
        success &= a.execute(gs);
      }
      // a target has been chosen and all actions have been applied on it
      return success;
    }
    gs.setActionInProgress(this);
    return true;
  } // execute

  _executionComplete(_) {
    // the only point of this action is to select a target for the nested effects.
    return this.impossible || this.completed;
  } // _executionComplete

  /**
   * @param {AbstractAction} action
   */
  _afterAction(_, action) {
    // if the action that was just played is a SingleTargetCompoundAction and its target
    // ID has been set, then we can safely mark this as completed.
    if (implementsInterface(action, ExtendedSequence)) {
      /** @type {ExtendedSequence} */
      const eSeqAction = action;
      if (eSeqAction._executionComplete()) {
        this.completed = true;
      }
    }
  } // _afterAction

  getString() {
    return (
      this.actions.map((a) => a.getString()).join(" and ") +
      ` to target with ID ${this.targetComponentId}.`
    );
  } // getString
} // SingleTargetCompoundAction
