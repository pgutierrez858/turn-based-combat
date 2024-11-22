import { PlayCardZone } from "./PlayCardZone.js";

const cardWidth = 150;
const cardWidthHeightRatio = 1.289;

export class GameCard extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture, frame, onDragEnd = () => {}) {
    super(scene, x, y, texture, frame);
    this.name = texture + "_" + frame;
    this.setDisplayMultiplier(1);
    this.setInteractive({ draggable: true });
    this.onDragEnd = onDragEnd;

    // Store original properties for resetting
    this.originalX = x;
    this.originalY = y;
    this.originalAngle = 0;

    scene.add.existing(this);

    this.setupInteractions();
  }

  clearInteractions() {
    this.off("pointerover");
    this.off("pointerout");
    this.off("dragstart");
    this.off("drag");
    this.off("dragend");
    this.off("drop");
  } // clearInteractions

  setupInteractions() {
    /** @see https://docs.phaser.io/api-documentation/event/input-events#gameobject_pointer_over */
    this.on("pointerover", () => this.hoverEffect());

    /** @see https://docs.phaser.io/api-documentation/event/input-events#gameobject_pointer_out */
    this.on("pointerout", () => this.resetHoverEffect());

    /** @see https://docs.phaser.io/api-documentation/event/input-events#gameobject_drag_start */
    this.on("dragstart", () => this.setDepth(2));

    /**
     * @see https://docs.phaser.io/api-documentation/event/input-events#gameobject_drag
     */
    this.on("drag", (_, dragX, dragY) => {
      this.x = dragX;
      this.y = dragY;
    });

    /** @see https://docs.phaser.io/api-documentation/event/input-events#gameobject_drag_end */
    this.on("dragend", () => this.resetPosition());

    /** @see https://docs.phaser.io/api-documentation/event/input-events#gameobject_drop */
    this.on(
      "drop",
      /**
       * @param {Phaser.GameObjects.GameObject} target
       */
      (_, target) => {
        if (target instanceof PlayCardZone) {
          target.cardDropped(this);
        }
      }
    );
  } // setupInteractions

  setDisplayMultiplier(multiplier = 1) {
    this.setDisplaySize(
      cardWidth * multiplier,
      cardWidth * cardWidthHeightRatio * multiplier
    );
  } // setDisplayMultiplier

  hoverEffect() {
    this.setDisplayMultiplier(1.1);
    this.setDepth(1);
    this.setAngle(0);
    this.y -= 30;
  } // hoverEffect

  resetHoverEffect() {
    this.setDisplayMultiplier(1);
    this.setDepth(0);
    this.setAngle(this.originalAngle);
    this.y = this.originalY;
  } // resetHoverEffect

  resetPosition() {
    this.x = this.originalX;
    this.y = this.originalY;
  } // resetPosition
} // GameCard
