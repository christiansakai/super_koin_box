/**
 * Class representing Player.
 * @extends Phaser.Sprite
 */
class Player extends Phaser.Sprite {

  /**
   * Create the player.
   * @param {object} config player configuration
   * @param {Phaser.Game} config.game the current game object
   * @param {number} config.x x-axis location for the player
   * @param {number} config.y y-axis location for the player
   * @param {string} config.asset preloaded asset for the player
   * @param {string} config.particleAsset preloaded asset for explosion
   * @param {object} config.sound sound configuration
   * @param {string} config.sound.jump sound to be played when player jumps
   * @param {string} config.sound.koin sound to be played when player obtain a koin
   * @param {string} config.sound.dead sound to be played when player dies
   */
  constructor({ game, x, y, asset, particleAsset, sound }) {
    super(game, x, y, asset);

    this.setupBasics();
    this.setAnimations();
    this.setSounds(sound.jump, sound.koin, sound.dead);
    this.setExplosion(particleAsset);
  }

  /**
   * Sets up basic setting
   * and physics.
   */
  setupBasics() {
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this);
    this.body.gravity.y = 500;
  }

  /**
   * Add animations for player movement.
   */
  setAnimations() {
    this.animations.add("moveRight", [1, 2], 8, true);
    this.animations.add("moveLeft", [3, 4], 8, true);
  }

  /**
   * Set sounds.
   */
  setSounds(jump, koin, dead) {
    this.sounds = {
      jump: this.game.add.audio(jump),
      koin: this.game.add.audio(koin),
      dead: this.game.add.audio(dead)
    };
  }

  /**
   * Create a particle emitter
   * to emulate an explosion.
   * @param {string} particleAsset preloaded asset for explosion
   */
  setExplosion(particleAsset) {
    // 15 particles explosion
    this.explosion = this.game
      .add.emitter(0, 0, 15);
    this.explosion.makeParticles(particleAsset);
    // Randomly choose particle speed between
    // -150 and 150
    this.explosion.setYSpeed(-150, 150);
    this.explosion.setXSpeed(-150, 150);
    // Disable gravity for the particles
    this.explosion.gravity = 0;
  }

  /**
   * Move the player
   * according to pressed cursor.
   * @param {object} cursor an object contains `up`, `down`, `left`, `right` of Phaser.Key object
   * @param {Phaser.Key} cursor.up Phaser.Key object for `up`
   * @param {Phaser.Key} cursor.down Phaser.Key object for `down`
   * @param {Phaser.Key} cursor.left Phaser.Key object for `left`
   * @param {Phaser.Key} cursor.right Phaser.Key object for `right`
   */
  move(cursor) {
    if (cursor.left.isDown) {
      this.body.velocity.x = -200;
      this.animations.play("moveLeft");
    } else if (cursor.right.isDown) {
      this.body.velocity.x = 200;
      this.animations.play("moveRight");
    } else {
      this.body.velocity.x = 0;
      // Stop the animation
      // and sets the player frame
      // to 0 (stand still).
      this.animations.stop();
      this.frame = 0;
    }

    // Only jumps if the player is on the ground
    if (cursor.up.isDown && this.body.touching.down) {
      this.sounds.jump.play();
      this.body.velocity.y = -320;
    }
  }

  /**
   * Animate the explosion
   * animation to the player.
   */
  explode() {
    this.explosion.x = this.x;
    this.explosion.y = this.y;
    this.explosion.start(true, 1000, null, 100);
  }

  /**
   * Kill the player.
   * Add explosion animations.
   */
  kill() {
    // The update calls this function
    // 60 times / second.
    // Since now we have the 1 second delay
    // before in Play.js going to Main state, 
    // we are hearing `this.sounds.dead.play()`
    // being called 60 times / second.
    // This line below is to avoid that
    if (!this.alive) return;

    this.sounds.dead.play();
    this.explode();
    super.kill();
  }

  /**
   * Tween the player.
   */
  growAndShrink() {
    this.game.add.tween(this.scale)
      .to({ x: 1.3, y: 1.3 }, 50)
      .to({ x: 1, y: 1 }, 150)
      .start();
  }

}

export default Player;
