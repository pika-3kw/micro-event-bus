const { default: axios } = require("axios");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/events", (req, res) => {
  const event = req.body;

  // Post Service
  axios.post("http://localhost:4001/events", event);
  // Comment Service
  axios.post("http://localhost:4002/events", event);
  // Query Service -- SOON
  axios.post("http://localhost:4003/events", event);

  res.json({ status: "OK" });
});

app.listen(4000, () => {
  console.log("Event bus running at 4000");
});
