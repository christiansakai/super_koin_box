class Enemy extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 1);
    this.body.gravity.y = 500;
    this.body.velocity.x = 100;
    this.body.bounce.x = 1;
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
  }
}

export default Enemy;
