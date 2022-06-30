const express = require("express");
const router = express.Router();
const Log = require("../models/log");

/* Handle data */
router.post("/", async (req, res) => {
  const log = new Log(req.body);

  try {
    const newLog = await log.save(); // save data to database
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* Export router */
module.exports = router;
