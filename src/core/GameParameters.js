/**
 * @todo docs
 */
export class GameParameters {
  /**
   * Random seed for this game.
   * @type {integer}
   */
  randomSeed;

  constructor() {}

  getRandomSeed() {
    return this.randomSeed;
  }

  /**
   * Sets the random seed to be used in the game.
   * @param {integer} randomSeed
   */
  setRandomSeed(randomSeed) {
    this.randomSeed = randomSeed;
  }
} // GameParameters
