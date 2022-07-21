const mongoose = require("mongoose");

/* Define schema */
const logSchema = new mongoose.Schema({
  subjectID: String,
  unixTimestamp: Number,
  userAgent: String,
  EXP_ID: String,
  ECID: Number,
  session: String,
  gameType: String,
  gameNumber: Number,

  gameTime: Number,
  episode: Number,
  level: Number,
  score: Number,
  linesCleared: Number,

  completed: Boolean,
  gameDuration: Number,
  avgEpDuration: Number,

  eventType: String,

  eventID: String,
  eventData1: String,
  eventData2: String,

  currZoid: String,
  nextZoid: String,

  are: Number,
  das: Number,
  softdrop: Number,

  zoidSequence: String,
  boardRep: String,
  zoidRep: String,
});

/* Export model */
module.exports = mongoose.model("log", logSchema); // change "log" to the name of your collection
