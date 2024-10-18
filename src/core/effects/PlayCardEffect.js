import { Effect } from "./Effect.js";

export class PlayCardEffect extends Effect {
  constructor(effectAction) {
    super(effectAction);
  }

  execute(gameState, actionTaken) {
    if (this.canExecute(gameState, actionTaken)) {
      const action = actionTaken.action;
      this.effectAction.execute(gameState);
    }
  } // execute

  canExecute(gameState, actionTaken) {
    
  } // canExecute
} // PlayCardEffect
