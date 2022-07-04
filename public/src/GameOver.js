MetaTWO.GameOver = function () {};

MetaTWO.GameOver.stateKey = "GameOver";

MetaTWO.GameOver.prototype.init = function () {};

MetaTWO.GameOver.prototype.preload = function () {};

MetaTWO.GameOver.prototype.create = function () {
  this.stage.backgroundColor = 0x050505; // 0x444444;
  MetaTWO.game.add.text(
    240,
    50,
    "Game complete.\nPress Enter or A Button to continue",
    {
      font: "bold 32px Arial",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle",
    }
  );

  this.enter = MetaTWO.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  this.gamepad = MetaTWO.gamepad;
}; // end create function

MetaTWO.GameOver.prototype.update = function () {
  if (this.enter.isDown || this.gamepad.isDown(MetaTWO.config.AButton)) {
    this.gotoNextScreen();
  }
};

MetaTWO.GameOver.prototype.gotoNextScreen = function () {
  MetaTWO.gameNumber++;

  /* Set startLevel for next game */
  if (MetaTWO.config.ECID == 0) {
    MetaTWO.config.startLevel = 0;
  } else if (MetaTWO.config.ECID == 1) {
    MetaTWO.config.startLevel = MetaTWO.gameNumber + 2;
  }

  console.log(MetaTWO.gameNumber);
  console.log(MetaTWO.config.startLevel);

  this.state.start(MetaTWO.Game.stateKey);
};
