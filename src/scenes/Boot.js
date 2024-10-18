/**
 * Class used to load in any assets that we require for our Preloader, such as a game logo, a background, etc.
 * The smaller the better in this case, as the Boot Scene itself has no preloader.
 * Think of this as a minimal scene to get the assets required for the preloader one ready and then passing the baton
 * to the latter so that it can load the rest of the game assets with some sort of GUI to give feedback to the player.
 */
export class Boot extends Phaser.Scene {
  constructor() {
    console.log("constructor de Boot");
    super("Boot");
  }

  preload() {
    this.load.image("background", "assets/bg.png");
  }

  create() {
    window.localStorage.setItem("cartas", [1, 2, 3])
    window.localStorage.getItem("cartas") // [1, 2, 3]
    this.scene.start("Preloader");
  }
}
