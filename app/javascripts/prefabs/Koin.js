class Koin extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 0.5);
  }

  respawnRandomly(coinPositions) {
    for (let i = 0; i < coinPositions.length; i++)
      if (coinPositions[i].x == this.x)
        coinPositions.splice(i, 1);

    const newPosition = coinPositions[
      this.game.rnd.integerInRange(0, coinPositions.length - 1)
    ];

    this.reset(newPosition.x, newPosition.y);
  }
}

export default Koin;
