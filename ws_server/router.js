const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "Socket.io chat server is running. This server only serves the websocket element of the application. " }).status(200);
});

module.exports = router;