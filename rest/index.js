const express = require("express");
const router = require('./router');
const cors = require('cors');

const app = express();
const PORT = 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors()); 
app.use(router);


app.listen(PORT, () => {
console.log(`Server running on port  ${PORT}`);
});