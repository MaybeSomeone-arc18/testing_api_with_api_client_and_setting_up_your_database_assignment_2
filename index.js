const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Sample in-memory database (this can be replaced with a real database)
let books = [
  {
    book_id: "101",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: 1925,
    copies: 5,
  },
  {
    book_id: "102",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    year: 1960,
    copies: 3,
  },
];

// Create a new book (C)
app.post('/books', (req, res) => {
  const { book_id, title, author, genre, year, copies } = req.body;

  // Validate input
  if (!book_id || !title || !author || !genre || !year || !copies) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newBook = {
    book_id,
    title,
    author,
    genre,
    year,
    copies,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// Retrieve all books (R)
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

// Retrieve a specific book by ID (R)
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.book_id === req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json(book);
});

// Update a book by ID (U)
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.book_id === req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Update book details
  const { title, author, genre, year, copies } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;
  book.genre = genre || book.genre;
  book.year = year || book.year;
  book.copies = copies || book.copies;

  res.status(200).json(book);
});

// Delete a book by ID (D)
app.delete('/books/:id', (req, res) => {
  const index = books.findIndex(b => b.book_id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books.splice(index, 1);
  res.status(200).json({ message: "Book deleted successfully" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
