const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Got all the books...",
    data: books,
  });
});

router.get("/issued/by-user", (req, res) => {
  const userWithTheIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBooks = [];

  userWithTheIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);
    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });

  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book have been issued yet...",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User with a issued books...",
    data: issuedBooks,
  });
});

router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No Data to Add a Book",
    });
  }

  const book = books.find((each) => each.id === data.id);

  if (book) {
    return res.status(404).json({
      success: false,
      message: "Id Already Exists !!",
    });
  }

  const allBooks = { ...books, data };
  return res.status(201).json({
    success: true,
    message: "Added book successfully",
    data: allBooks,
  });
});

router.put("/updateBook/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(400).json({
      success: false,
      message: "Book not fonund for this ID",
    });
  }

  const updateData = books.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "Updating a book by their ID",
    data: updateData,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Books Not Found",
    });
  }
  res.status(200).json({
    success: true,
    message: "book Found ",
    data: book,
  });
});

module.exports = router;
