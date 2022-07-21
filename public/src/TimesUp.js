MetaTWO.TimesUp = function () {};

MetaTWO.TimesUp.stateKey = "TimesUp";

MetaTWO.TimesUp.prototype.init = function () {};

MetaTWO.TimesUp.prototype.preload = function () {};

MetaTWO.TimesUp.prototype.create = function () {
  this.stage.backgroundColor = 0x050505; // 0x444444;
  // 240, 50
  text = MetaTWO.game.add.text(0, 0, "Time's up!\nThanks for playing.", {
    font: "bold 32px Arial",
    fill: "#fff",
    boundsAlignH: "center",
    boundsAlignV: "middle",
    align: "center",
  });

  text.setTextBounds(0, 100, MetaTWO.SCREEN_WIDTH, 200);

  returnText = MetaTWO.game.add.text(
    0,
    0,
    "Press ENTER to return to Prolific.",
    {
      font: "bold 32px Arial",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle",
      align: "center",
    }
  );

  returnText.setTextBounds(0, 300, MetaTWO.SCREEN_WIDTH, 200);

  this.enter = MetaTWO.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  this.gamepad = MetaTWO.gamepad;
}; // end create function

MetaTWO.TimesUp.prototype.update = function () {
  if (this.enter.isDown || this.gamepad.isDown(MetaTWO.config.AButton)) {
    window.open(
      `https://sheffieldpsychology.eu.qualtrics.com/jfe/form/SV_9RjTZkz1XZA3HE2?ParticipantID=${MetaTWO.config.subjectNumber}`,
      "_self"
    );
  }
};

// MetaTWO.TimesUp.prototype.gotoNextScreen = function(){
//   MetaTWO.gameNumber++;
//   this.state.start(MetaTWO.Game.stateKey);
// };
