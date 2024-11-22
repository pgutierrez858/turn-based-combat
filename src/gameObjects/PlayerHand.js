import { Card } from "../core/components/Card.js";
import { Deck } from "../core/components/Deck.js";
import { GameCard } from "./GameCard.js";

export class PlayerHand {
  /**
   * @param {Deck} handDeck
   */
  constructor(scene, handDeck) {
    this.scene = scene;
    this.cards = [];
    this.centerX = scene.cameras.main.centerX;
    this.centerY = scene.cameras.main.height + 100; // Bottom of screen
    this.arcRadius = 330;

    // Create cards
    const handSize = handDeck.components.length;
    for (let i = 0; i < handSize; i++) {
      const angle = Phaser.Math.DegToRad(-30 + (60 / (handSize - 1)) * i);
      const x = this.centerX + this.arcRadius * Math.sin(angle);
      const y = this.centerY - this.arcRadius * Math.cos(angle);

      /** @type {Card} */
      const cardData = handDeck.components[i];
      const card = new GameCard(
        scene,
        x,
        y,
        "ironclad-start-cards",
        cardData.uid,
        () => this.cardDropped(card)
      );
      card.originalAngle = Phaser.Math.RadToDeg(angle);
      this.cards.push(card);
    }
  } // constructor
} // PlayerHand
