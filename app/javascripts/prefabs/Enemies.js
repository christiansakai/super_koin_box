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

    this.createMultiple(10, "enemy"); // ???
    // let enemy;
    // for (let i = 0; i < 5; i++){
    //   enemy = new Enemy({
    //     game: this.game,
    //     x: this.game.world.centerX,
    //     y: 0,
    //     asset: "enemy"
    //   });

    //   this.add(enemy);
    // }

    // console.log(this);

    // const enemyTimer = this.game.time.events.loop(2000,
    //                                          this.addEnemy,
    //                                          this);

    // enemyTimer.start();
  }

  addEnemy() {
    let enemy = this.getFirstDead();

    if (!enemy) return;

    enemy.reset(this.game.world.centerX, 0);

    


  }
}

export default Enemies;
