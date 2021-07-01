const { default: axios } = require("axios");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const events = [];

app.get(/^\/$/, (req, res) => {
  res.send("Event Bus Service");
});

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  // Post Service
  axios.post("http://post-clusterip-srv:4001/events", event);
  // // Comment Service
  // axios.post("http://localhost:4002/events", event);
  // // Query Service
  // axios.post("http://localhost:4003/events", event);
  // // Moderation Service
  // axios.post("http://localhost:4004/events", event);

  res.json({ status: "OK" });
});

app.get("/events/", (req, res) => {
  res.json(events);
});

app.listen(4000, () => {
  console.log("Event bus running at 4000");
});
