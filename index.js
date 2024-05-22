const express = require("express");
const app = express();
const port = 8081;
const { users } = require("./data/users.json");
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is Up and Running...",
    data: "Hey",
  });
});

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route is doesn't exits",
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
