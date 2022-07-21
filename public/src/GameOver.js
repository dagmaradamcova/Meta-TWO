MetaTWO.GameOver = function () {};

MetaTWO.GameOver.stateKey = "GameOver";

MetaTWO.GameOver.prototype.init = function () {};

MetaTWO.GameOver.prototype.preload = function () {};

MetaTWO.GameOver.prototype.create = function () {
  this.stage.backgroundColor = 0x050505; // 0x444444;
  // 240, 50
  gameoverText = MetaTWO.game.add.text(
    0,
    0,
    "Game over.\nPress ENTER to continue.", // or A Button
    {
      font: "bold 32px Arial",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle",
      align: "center",
    }
  );

  gameoverText.setTextBounds(0, 100, MetaTWO.SCREEN_WIDTH, 100);

  /* Display game summary */

  summaryText = MetaTWO.game.add.text(0, 0, "GAME SUMMARY", {
    font: "bold 26px Arial",
    fill: "#fff",
    boundsAlignH: "center",
    boundsAlignV: "middle",
    align: "center",
  });
  summaryText.setTextBounds(0, 250, MetaTWO.SCREEN_WIDTH, 100);

  scoresString = `Score:\nLines cleared:\nLevel:`;
  scores2String = `${MetaTWO.scores.score}\n${MetaTWO.scores.lines}\n${MetaTWO.scores.level}`;

  scoresText = MetaTWO.game.add.text(0, 0, scoresString, {
    font: "bold 26px Arial",
    fill: "#00FF00",
    boundsAlignH: "left",
    boundsAlignV: "middle",
    align: "left",
  });
  scoresText.setTextBounds(250, 350, 150, 100);

  scores2Text = MetaTWO.game.add.text(0, 0, scores2String, {
    font: "bold 26px Arial",
    fill: "#00FF00",
    boundsAlignH: "right",
    boundsAlignV: "middle",
    align: "right",
  });
  scores2Text.setTextBounds(400, 350, 150, 100);

  /* Keys */

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

  if (MetaTWO.gameNumber > MetaTWO.config.maxGames) {
    // this.state.start(MetaTWO.TimesUp.stateKey);

    // REDIRECT IF EXCEEDED MAX N GAMES
    if (this.enter.isDown || this.gamepad.isDown(MetaTWO.config.AButton)) {
      window.open(
        // "https://app.prolific.co/submissions/complete?cc=54166CF6",
        `https://sheffieldpsychology.eu.qualtrics.com/jfe/form/SV_9RjTZkz1XZA3HE2?ParticipantID=${MetaTWO.config.subjectNumber}`,
        "_self"
      );
    }
  } else {
    this.state.start(MetaTWO.Game.stateKey);
  }

  /* Set startLevel for next game */
  // if (MetaTWO.config.ECID == 0) {
  //   MetaTWO.config.startLevel = 0;
  // } else if (MetaTWO.config.ECID == 1) {
  //   MetaTWO.config.startLevel = MetaTWO.gameNumber + 2;
  // }

  console.log(MetaTWO.gameNumber);
  console.log(MetaTWO.config.startLevel);
};
