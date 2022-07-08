const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "Socket.io chat server is running" }).status(200);
});

module.exports = router;