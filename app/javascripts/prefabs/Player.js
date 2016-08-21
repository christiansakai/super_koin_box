class Player extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    this.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this);
    this.body.gravity.y = 500;
  }

  move(cursor) {
    if (cursor.left.isDown)
      this.body.velocity.x = -200;
    else if (cursor.right.isDown)
      this.body.velocity.x = 200;
    else
      this.body.velocity.x = 0;

    if (cursor.up.isDown && this.body.touching.down)
      this.body.velocity.y = -320;
  }
}

export default Player;
