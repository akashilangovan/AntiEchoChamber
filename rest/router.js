const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "Rest Api for chat server is running. This server only serves the rest element of the application. " }).status(200);
});

module.exports = router;