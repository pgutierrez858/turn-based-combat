import { GameCard } from "./GameCard.js";

export class PlayCardZone extends Phaser.GameObjects.Zone {
  /**
   * @inheritdoc
   */
  constructor(scene, x, y, width, height) {
    super(scene, x, y, width, height);
    this.setRectangleDropZone(width, height).setOrigin(0.5);

    const dropZoneGraphics = this.scene.add.graphics();
    dropZoneGraphics.lineStyle(2, 0xffffff);
    dropZoneGraphics.strokeRect(x - 200, y - 250, 400, 250);
  }

  /**
   * @param {GameCard} card
   */
  cardDropped(card) {
    // Card dropped in drop zone
    card.x = this.x;
    card.y = this.y;
    card.clearInteractions();
  } // cardDropped
} // PlayCardZone
