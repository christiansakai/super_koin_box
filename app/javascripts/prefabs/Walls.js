class Walls extends Phaser.Group {
  constructor({ game, parent, verticalWallAsset, horizontalWallAsset }) {
    super(game, parent);

    this.createWalls(verticalWallAsset, horizontalWallAsset);
  }

  // Create 10 walls as children of this group
  createWalls(verticalWallAsset, horizontalWallAsset) {
    // with physics, so that all the children has body too
    // if not, or if this comes later, all the cildren screwed
    this.enableBody = true;
    this.game.add.sprite(0, 0, verticalWallAsset, 0, this); // Left
    this.game.add.sprite(480, 0, verticalWallAsset, 0, this); // Right

    this.game.add.sprite(0, 0, horizontalWallAsset, 0, this); // Top Left
    this.game.add.sprite(300, 0, horizontalWallAsset, 0, this); // Top Right
    this.game.add.sprite(0, 320, horizontalWallAsset, 0, this); // Bottom Left
    this.game.add.sprite(300, 320, horizontalWallAsset, 0, this); // Bottom Right

    this.game.add.sprite(-100, 160, horizontalWallAsset, 0, this); // Middle Left
    this.game.add.sprite(400, 160, horizontalWallAsset, 0, this); // Middle Right

    const middleTop = this.game.add.sprite(100, 80, horizontalWallAsset, 0, this);
    middleTop.scale.setTo(1.5, 1);
    const middleBottom = this.game.add.sprite(100, 240, horizontalWallAsset, 0,this);
    middleBottom.scale.setTo(1.5, 1);

    this.setAllChildren("body.immovable", true);
  }


}

export default Walls;
