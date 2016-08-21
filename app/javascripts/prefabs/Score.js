class Score extends Phaser.Text {
  constructor({ game, x, y, text, font, fill }) {
    super(game, x, y, text, { font, fill });

    this.amount = 0;
  }

  updateAmountBy(number) {
    this.amount += number;
    this.text = `Score ${this.amount}`;
  }
}

export default Score;
