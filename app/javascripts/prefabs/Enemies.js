import Enemy from "./Enemy";

/**
 * Class representing enemies.
 * @extends Phaser.Group
 */
class Enemies extends Phaser.Group {
  
  /**
   * Create a group of enemies
   * that constantly respawn.
   * @param {object} config enemies configuration
   * @param {Phaser.Game} config.game the current running game
   * @param {Phaser.Group|Phaser.World} config.parent the parent of this group
   */
  constructor({ game, parent }) {
    super(game, parent);

    this.spawnFirstBatchOfEnemies(2);

    this.game.time.events.loop(2000,
                               this.addEnemy,
                               this);
  }

  /**
   * Spawn first batch of enemies.
   * These enemies will be reused later
   * on `this.addEnemy`. To increase
   * difficulty, just adjus the number
   * of spawned enemies here.
   * @param {number} enemies number of spawned enemies
   */
  spawnFirstBatchOfEnemies(enemies) {
    let spawner = setInterval(() => {
      if (this.children.length >= enemies) {
        return clearInterval(spawner);
      }

      let enemy = new Enemy({
        game: this.game,
        x: this.game.world.centerX,
        y: 0,
        asset: "enemy",
        firstOrientation: this.game.rnd.sign()
      });

      this.add(enemy);
    }, 1000);
  }

  /**
   * Adding enemies
   * by reusing the previous dead enemies.
   */
  addEnemy() {
    let enemy = this.getFirstDead();

    if (!enemy) return;

    enemy.reset(this.game.world.centerX, 0);
    enemy.setAttributes(this.game.rnd.sign());
  }

}

export default Enemies;
