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
    this.setupControls();
    this.createWalls();
    this.createPlayer();
    this.createEnemies();
    this.createKoin();
    this.createScore();
  }

  /**
   * Assign cursor keys
   * as controls.
   */
  setupControls() {
    this.cursor = this.game.input.keyboard.createCursorKeys();
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
      particleAsset: "pixel",
      sound: {
        jump: "jump",
        dead: "dead",
        koin: "koin"
      }
    });
    this.game.add.existing(this.player);
  }

  /**
   * Create enemies.
   */
  createEnemies() {
    this.enemies = new Enemies({
      game: this.game
    });
    this.game.add.existing(this.enemies);
  }

  /**
   * Create koins.
   */
  createKoin() {
    const coinPositions = [
      { x: 140, y: 60 }, { x: 360, y: 60 }, // Top row
      { x: 60, y: 140 }, { x: 440, y: 140 }, // Middle row
      { x: 130, y: 300 }, { x: 370, y: 300 } // Bottom row
    ];

    this.koin = new Koin({
      game: this.game,
      x: 60,
      y: 140,
      asset: "koin",
      spawningPositions: coinPositions
    });
    this.game.add.existing(this.koin);
  }

  /**
   * Create score label.
   * Automatically resets the 
   * global.score to 0.
   */
  createScore() {
    this.score = new Score({
      game: this.game,
      x: 30,
      y: 30,
      text: "score: 0",
      fill: "#FFFFFF"
    });
    this.game.add.existing(this.score);
  }

  /**
   * Automatically gets called by 
   * Phaser engine every framerate.
   */
  update() {
    // This has to come before `this.player.move`
    // because the latter requires
    // Physics to check whether the bottom part
    // of the player touches the wall or not
    this.checkCollisions();

    this.player.move(this.cursor);

    if (!this.player.inWorld) 
      this.playerDie();
  }

  /**
   * Check collisions between
   * the player and the walls,
   * the enemies and the walls,
   * the player and the enemies,
   * and between the player and the koin.
   */
  checkCollisions() {
    this.game.physics.arcade.collide(this.player, this.walls);
    this.game.physics.arcade.collide(this.walls, this.enemies);
    this.game.physics.arcade.overlap(this.player, this.koin, this.takeAndRespawnKoin, null, this);
    this.game.physics.arcade.collide(this.player, this.enemies, this.playerDie, null, this);
  }

  /**
   * When the player dies, the
   * game restarts into Menu State.
   * We add delay because the animation
   * of player dying needs to be
   * completed first.
   */
  playerDie() {
    this.player.kill();

    // Call the `this.goToMenu` function
    // in 1000 ms
    this.game.time.events.add(1000, this.goToMenu, this);
  }

  /**
   * Transition to Menu state.
   */
  goToMenu() {
    this.game.state.start("Menu");
  }

  /**
   * Take the coin and update
   * the score by 5, also respawn
   * the koin.
   */
  takeAndRespawnKoin() {
    this.player.sounds.koin.play();
    this.player.growAndShrink();
    this.score.updateAmountBy(5);
    this.koin.shrinkAndGrow();
    this.koin.respawn();
  }
    
}

export default Play;
