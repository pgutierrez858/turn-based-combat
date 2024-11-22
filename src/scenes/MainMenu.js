import { Deck } from "../core/components/Deck.js";
import { CardData } from "../core/StSTypes.js";
import { PlayCardZone } from "../gameObjects/PlayCardZone.js";
import { PlayerHand } from "../gameObjects/PlayerHand.js";

export class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    // Create drop zone
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;
    this.dropZone = new PlayCardZone(this, centerX, centerY, 400, 400);

    // Create the player's hand
    this.playerDeck = new Deck("Player Deck", false);
    this.playerHand = new Deck("Player Hand", true);
    CardData.loadStarterDeck(this.playerDeck);

    for (let i = 0; i < 5; i++) {
      this.playerHand.add(this.playerDeck.draw());
    }
    this.playerHandObject = new PlayerHand(this, this.playerHand);
  }
} // MainMenu
