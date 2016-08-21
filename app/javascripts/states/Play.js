import Player from "../prefabs/Player";
import Koin from "../prefabs/Koin";
import Walls from "../prefabs/Walls";
import Score from "../prefabs/Score";
import Enemies from "../prefabs/Enemies";

/**
 * Class representing Play State.
 * This is where the actual game play
 * takes place.
 * @extends Phaser.State
 */
class Play extends Phaser.State {
  
  /**
   * Create all the objects 
   * and setup needed for the game
   * aside from background color
   * and physics engine (beause
   * we did that in Boot.js).
   */
  create() {
    this.createWalls();
    this.createPlayer();
    this.setupControls();
    this.createKoin();
    this.createScore();

    this.enemies = new Enemies({
      game: this.game
    });
    this.game.add.existing(this.enemies);
  }

  /**
   * Create walls for the player
   * to move around.
   */
  createWalls() {
    this.walls = new Walls({
      game: this.game,
      verticalWallAsset: "wallVertical",
      horizontalWallAsset: "wallHorizontal"
    });
    this.game.add.existing(this.walls);
  }

  /**
   * Create the player.
   */
  createPlayer() {
    this.player = new Player({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: "playerAnimated",
      sound: {
        jump: "jump",
        dead: "dead",
        koin: "koin"
      }
    });
    this.game.add.existing(this.player);
  }

  createKoin() {
    this.koin = new Koin({
      game: this.game,
      x: 60,
      y: 140,
      asset: "koin"
    });
    this.game.add.existing(this.koin);
  }

  createScore() {
    this.score = new Score({
      game: this.game,
      x: 30,
      y: 30,
      text: "Score: 0",
      fill: "#FFFFFF"
    });
    this.game.add.existing(this.score);
  }

  setupControls() {
    this.cursor = this.game.input.keyboard.createCursorKeys();
  }

  update() {
    this.game.physics.arcade.collide(this.player, this.walls);
    this.player.move(this.cursor);

    this.game.physics.arcade.overlap(this.player, this.koin, this.takeCoin, null, this);

    this.game.physics.arcade.collide(this.walls, this.enemies);

    if (!this.player.inWorld) 
      this.playerDie();
  }

  playerDie() {
    this.game.state.start("Main");
  }

  takeCoin() {
    const coinPosition = [
      { x: 140, y: 60 }, { x: 360, y: 60 }, // Top row
      { x: 60, y: 140 }, { x: 440, y: 140 }, // Middle row
      { x: 130, y: 300 }, { x: 370, y: 300 }
    ];

    this.score.updateAmountBy(5);
    this.koin.respawnRandomly(coinPosition);
  }
    
}

export default Play;
