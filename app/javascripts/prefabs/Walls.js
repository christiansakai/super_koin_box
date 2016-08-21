/**
 * Class representing Walls.
 * This class encapsulates
 * all the walls built for the game.
 * @extends Phaser.Group
 */
class Walls extends Phaser.Group {

  /**
   * Create the Walls.
   * @param {object} config walls configuration
   * @param {Phaser.Game} config.game the current running game
   * @param {Phaser.World} config.parent the parent of this object
   * @param {string} config.verticalWallAsset the image for vertical wall
   * @param {string} config.horizontalWallAsset the image for horizontal wall
   */
  constructor({ game, parent, verticalWallAsset, horizontalWallAsset }) {
    super(game, parent);

    this.createWalls(verticalWallAsset, horizontalWallAsset);
  }

  /**
   * Create all the walls.
   * @param {string} verticalWallAsset the image for vertical wall
   * @param {string} horizontalWallAsset the image for horizontal wall
   */
  createWalls(verticalWallAsset, horizontalWallAsset) {
    // Set the Physics here so all the following sprites 
    // below will receive enabled Physics.
    this.enableBody = true;

    // Left & Right walls
    this.game.add.sprite(0, 0, verticalWallAsset, 0, this); // Left
    this.game.add.sprite(480, 0, verticalWallAsset, 0, this); // Right

    // Corner walls
    this.game.add.sprite(0, 0, horizontalWallAsset, 0, this); // Top Left
    this.game.add.sprite(300, 0, horizontalWallAsset, 0, this); // Top Right
    this.game.add.sprite(0, 320, horizontalWallAsset, 0, this); // Bottom Left
    this.game.add.sprite(300, 320, horizontalWallAsset, 0, this); // Bottom Right

    // Middle walls
    this.game.add.sprite(-100, 160, horizontalWallAsset, 0, this); // Middle Left
    this.game.add.sprite(400, 160, horizontalWallAsset, 0, this); // Middle Right

    const middleTop = this.game.add.sprite(100, 80, horizontalWallAsset, 0, this);
    middleTop.scale.setTo(1.5, 1);

    const middleBottom = this.game.add.sprite(100, 240, horizontalWallAsset, 0,this);
    middleBottom.scale.setTo(1.5, 1);

    // Set so that all created walls are immovable
    // (so when it collides with other objects, it
    // stays in place).
    this.setAllChildren("body.immovable", true);
  }

}

export default Walls;
