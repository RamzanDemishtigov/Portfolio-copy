const express = require('express');
const dotenv = require("dotenv");
const logger = require("morgan");

dotenv.config({path: "./config/config.env"});

const envelopesRouter = require("./routes/envelopes");
const docsRouter = require("./routes/docs");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' })
});

app.use("/api/docs",docsRouter);

app.use("/api/envelopes", envelopesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`Example app listening on port ${PORT}`)
})