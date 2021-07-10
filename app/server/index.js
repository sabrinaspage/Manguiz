const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Goodbye" });
});

leaders = [
  { avatar: "https://www.quackit.com/pix/samples/18m.jpg", name: "Simun", points: 40, place: 1 },
  { avatar: "color", name: "leopard3", points: 30, place: 2 },
  { avatar: "color", name: "layma2", points: 20, place: 3 },
  { avatar: "color", name: "gerald", points: 55, place: 4 },
  { avatar: "color", name: "nananha", points: 50, place: 5 },
  { avatar: "https://www.quackit.com/pix/samples/18m.jpg", name: "Simun", points: 40, place: 1 },
  { avatar: "color", name: "leopard3", points: 30, place: 2 },
  { avatar: "color", name: "layma2", points: 20, place: 3 },
  { avatar: "color", name: "gerald", points: 55, place: 4 },
  { avatar: "color", name: "nananha", points: 50, place: 5 },
  { avatar: "https://www.quackit.com/pix/samples/18m.jpg", name: "Simun", points: 40, place: 1 },
  { avatar: "color", name: "leopard3", points: 30, place: 2 },
  { avatar: "color", name: "layma2", points: 20, place: 3 },
  { avatar: "color", name: "gerald", points: 55, place: 4 },
  { avatar: "color", name: "nananha", points: 50, place: 5 },
  { avatar: "https://www.quackit.com/pix/samples/18m.jpg", name: "Simun", points: 40, place: 1 },
  { avatar: "color", name: "leopard3", points: 30, place: 2 },
  { avatar: "color", name: "layma2", points: 20, place: 3 },
  { avatar: "color", name: "gerald", points: 55, place: 4 },
  { avatar: "color", name: "nananha", points: 50, place: 5 },
];

app.get("/leaders", (req, res) => {
  res.json(leaders);
});

app.post("/add-to-leaderboard", function (req, res) {
  var leader = {
    avatar: req.body.avatar,
    name: req.body.name,
    points: req.body.points,
    place: req.body.place,
  };
  leaders.push(leader);
  console.log(leaders);
});

app.listen(PORT, () => {
  console.log("Server listening...");
});
