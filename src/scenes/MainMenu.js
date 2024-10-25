export class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
    console.log("main menu");
  }

  create() {
    this.add.image(512, 384, "background");

    this.add.image(512, 300, "logo");

    this.add.sprite(200, 650, "ironclad-start-cards", "bash").setScale(0.25);
    this.add.sprite(400, 650, "ironclad-start-cards", "strike").setScale(0.25);
    this.add.sprite(600, 650, "ironclad-start-cards", "defend").setScale(0.25);

    this.add
      .text(512, 460, "Main Menu", {
        fontFamily: "Arial Black",
        fontSize: 38,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}
