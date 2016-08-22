/**
 * Class representing Score.
 * @extends Phaser.Text
 */
class Score extends Phaser.Text {

  /**
   * Create a new score board.
   * Also resets the global score to 0.
   * @param {object} config scoreboard configuration
   * @param {number} config.x x-axis location of this scoreboard
   * @param {number} config.y y-axis location of this scoreboard
   * @param {string} config.text scoreboard text
   * @param {string} config.font font style and size
   * @param {string} config.fill font color
   */
  constructor({ game, x, y, text, font, fill }) {
    super(game, x, y, text, { font, fill });

    this.game.global.score = 0;
  }

  /**
   * Update score board by the number
   * and display it on the text.
   * @param {number} number increment value
   */
  updateAmountBy(number) {
    this.game.global.score += number;
    this.text = `score ${this.game.global.score}`;
  }

}

export default Score;
