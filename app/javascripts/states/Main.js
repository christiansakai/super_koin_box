import Player from "../prefabs/Player";
import Koin from "../prefabs/Koin";
import Walls from "../prefabs/Walls";
import Score from "../prefabs/Score";
import Enemies from "../prefabs/Enemies";

class Main extends Phaser.State {
  preload() {
    this.game.load.image("player", "/player.png");
    this.game.load.image("wallVertical", "/wallVertical.png");
    this.game.load.image("wallHorizontal", "/wallHorizontal.png");
    this.game.load.image("koin", "/coin.png");
    this.game.load.image("enemy", "/enemy.png");
  }

  create() {
    this.setupBasics();
    this.createPlayer();
    this.createWalls();
    this.setupControls();
    this.createKoin();
    this.createScore();

    this.enemies = new Enemies({
      game: this.game
    });
    this.game.add.existing(this.enemies);
  }

  setupBasics() {
    this.game.stage.backgroundColor = "#3498db";
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  }

  createWalls() {
    this.walls = new Walls({
      game: this.game,
      verticalWallAsset: "wallVertical",
      horizontalWallAsset: "wallHorizontal"
    });
    this.game.add.existing(this.walls);
  }

  createPlayer() {
    this.player = new Player({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: "player"
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

export default Main;
