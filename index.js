const express = require("express");
const app = express();
const port = 8081;

const userRouter = require("./routes/users.js");
const bookRouter = require("./routes/books.js");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is Up and Running...",
    data: "Hey",
  });
});

app.use("/users", userRouter);
app.use("/books", bookRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route is doesn't exits",
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
