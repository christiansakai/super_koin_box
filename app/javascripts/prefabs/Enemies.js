import Enemy from "./Enemy";

class Enemies extends Phaser.Group {
  constructor({ game, parent }) {
    super(game, parent);

    // this.enableBody = true;

    // this.createMultiple(10, "enemy"); // ???
    for (let i = 0; i < 5; i++){
      let enemy = new Enemy({
        game: this.game,
        x: this.game.world.centerX,
        y: 0,
        asset: "enemy"
      });

      this.add(enemy);
    }

    const enemyTimer = this.game.time.events.loop(2200,
                                             this.addEnemy,
                                             this);

                                             // connsole.log(enemyTimer);
    // enemyTimer.start();
  }

  addEnemy() {
    console.log("E");

    let enemy = this.getFirstDead();

    if (!enemy) return;

    enemy.reset(this.game.world.centerX, 0);

    


  }
}

export default Enemies;
