/** @constructor */
let spacebar, input, enter;

MetaTWO.MainMenu = function () {};

MetaTWO.MainMenu.stateKey = "MainMenu";

MetaTWO.MainMenu.prototype.init = function () {};

MetaTWO.MainMenu.prototype.preload = function () {};

MetaTWO.MainMenu.prototype.create = function () {
  this.stage.backgroundColor = 0x050505; // 0x444444;
  // 240, 50
  // titleText = MetaTWO.game.add.text(0, 0, "META-TWO", {
  //   font: "bold 32px Arial",
  //   fill: "#fff",
  //   boundsAlignH: "center",
  //   boundsAlignV: "middle",
  // });
  // titleText.setTextBounds(0, 50, MetaTWO.SCREEN_WIDTH, 100);
  // 310, 150
  subjectText = MetaTWO.game.add.text(0, 0, "Participant ID", {
    font: "bold 24px Arial",
    fill: "#ff0000",
    boundsAlignH: "center",
    boundsAlignV: "middle",
  });
  subjectText.setTextBounds(0, 140, MetaTWO.SCREEN_WIDTH, 100);
  // 235, 300
  // levelText = MetaTWO.game.add.text(
  //   0,
  //   0,
  //   "Desired start level (default is 0)",
  //   {
  //     font: "bold 24px Arial",
  //     fill: "#fff",
  //     boundsAlignH: "center",
  //     boundsAlignV: "middle",
  //   }
  // );
  // levelText.setTextBounds(0, 280, MetaTWO.SCREEN_WIDTH, 100);
  keysString =
    "Press A, S, D to move left, down, right.\nPress K or L to rotate.\n\nPlease don't refresh the page during the experiment.";
  keysText = MetaTWO.game.add.text(0, 0, keysString, {
    font: "bold 24px Arial",
    fill: "#fff",
    boundsAlignH: "center",
    boundsAlignV: "middle",
    align: "center",
  });
  keysText.setTextBounds(0, 280, MetaTWO.SCREEN_WIDTH, 200);
  // 210, 350
  beginText = MetaTWO.game.add.text(0, 0, "Press ENTER to begin.", {
    // or A button
    font: "bold 24px Arial",
    fill: "#fff",
    boundsAlignH: "center",
    boundsAlignV: "middle",
  });
  beginText.setTextBounds(0, 440, MetaTWO.SCREEN_WIDTH, 100);
  // text.setTextBounds(0, 100, 800, 100);
  //spacebar =  MetaTWO.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  enter = MetaTWO.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  // 375, 200
  xCoord = MetaTWO.SCREEN_WIDTH / 2 - (25 + 8);
  xCoord2 = MetaTWO.SCREEN_WIDTH / 2 - (150 + 8);
  subjectNumber = MetaTWO.game.add.inputField(xCoord2, 220, {
    font: "18px Arial",
    fill: "#212121",
    fontWeight: "bold",
    // width: 50,
    width: 300,
    padding: 8,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    placeHolder: "Enter your ID here",
    min: 0,
    max: 9999,
    type: PhaserInput.InputType.string,
    //blockInput: false
  });
  if (MetaTWO.config.queryID != null) {
    subjectNumber.setText(`${MetaTWO.config.queryID}`);
  } else {
    subjectNumber.setText("");
  }
  subjectNumber.blockInput = false;
  subjectNumber.startFocus();

  /*
  input = MetaTWO.game.add.inputField(xCoord, 360, {
    font: "18px Arial",
    fill: "#212121",
    fontWeight: "bold",
    width: 50,
    padding: 8,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    placeHolder: MetaTWO.config.startLevel,
    min: 0,
    max: 29,
    type: PhaserInput.InputType.number,
    //blockInput: false
  });
  input.setText(MetaTWO.config.startLevel);
  input.blockInput = false;
  */

  //input.setText(0);
  // input.startFocus();
  //console.log(input);
}; // end create function

MetaTWO.MainMenu.prototype.update = function () {
  if (enter.isDown) {
    this.gotoNextScreen();
  }

  if (MetaTWO.gamepad.isDown(Phaser.Gamepad.BUTTON_0)) {
    // assuming a Tomee converted gamepad
    MetaTWO.config.AButton = Phaser.Gamepad.BUTTON_0;
    MetaTWO.config.BButton = Phaser.Gamepad.BUTTON_1;
    MetaTWO.config.leftButton = Phaser.Gamepad.BUTTON_5;
    MetaTWO.config.rightButton = Phaser.Gamepad.BUTTON_6;
    MetaTWO.config.downButton = Phaser.Gamepad.BUTTON_4;
    MetaTWO.config.startButton = Phaser.Gamepad.BUTTON_3;
    MetaTWO.config.pad = "axis";

    this.gotoNextScreen();
  }
  if (MetaTWO.gamepad.isDown(Phaser.Gamepad.BUTTON_1)) {
    // assuming NES-Retro gamepad
    MetaTWO.config.AButton = Phaser.Gamepad.BUTTON_1;
    MetaTWO.config.BButton = Phaser.Gamepad.BUTTON_0;
    MetaTWO.config.leftButton = Phaser.Gamepad.BUTTON_4;
    MetaTWO.config.rightButton = Phaser.Gamepad.BUTTON_6;
    MetaTWO.config.downButton = Phaser.Gamepad.BUTTON_5;
    MetaTWO.config.startButton = Phaser.Gamepad.BUTTON_3;
    this.gotoNextScreen();
  }
};

MetaTWO.MainMenu.prototype.gotoNextScreen = function () {
  // input.endFocus();
  subjectNumber.endFocus();
  // input.value = input.value === "" ? 0 : input.value;
  if (typeof MetaTWO.config.startLevel !== "number") {
    MetaTWO.config.fixedLevel = true;
  }
  if (MetaTWO.config.fixedLevel == false) {
    // MetaTWO.config.startLevel = input.value;
  }
  MetaTWO.config.subjectNumber = subjectNumber.value;
  this.state.start(MetaTWO.Game.stateKey);
};
