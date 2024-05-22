const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const DATA_FILE = './data.json';

const readData = async () => {
  try {
    const data = await fs.readFile(DATA_FILE);
    return JSON.parse(data);
  } catch (error) {
    return { users: [], books: [] };
  }
};

const writeData = async (data) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
};

// Create User
app.post('/users', async (req, res) => {
  try {
    const { firstname, lastname, email, username, password } = req.body;
    const data = await readData();
    const newUser = { id: Date.now(), firstname, lastname, email, username, password };
    data.users.push(newUser);
    await writeData(data);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Authenticate User
app.post('/users/authenticate', async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await readData();
    const user = data.users.find(u => u.username === username && u.password === password);
    if (user) {
      res.status(200).json({ message: 'Authenticated successfully' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get All Users
app.get('/users', async (req, res) => {
  try {
    const data = await readData();
    res.status(200).json(data.users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get All Books
app.get('/books', async (req, res) => {
  try {
    const data = await readData();
    res.status(200).json(data.books);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Create Book
app.post('/books', async (req, res) => {
  try {
    const { title, author } = req.body;
    const data = await readData();
    const newBook = { id: Date.now(), title, author, isLoaned: false, loanedTo: null };
    data.books.push(newBook);
    await writeData(data);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete Book
app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readData();
    data.books = data.books.filter(book => book.id !== parseInt(id));
    await writeData(data);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Loan Out Book
app.post('/books/:id/loan', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const data = await readData();
    const book = data.books.find(book => book.id === parseInt(id));
    if (book && !book.isLoaned) {
      book.isLoaned = true;
      book.loanedTo = userId;
      await writeData(data);
      res.status(200).json(book);
    } else {
      res.status(400).json({ message: 'Book not available for loan' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Return Book
app.post('/books/:id/return', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readData();
    const book = data.books.find(book => book.id === parseInt(id));
    if (book && book.isLoaned) {
      book.isLoaned = false;
      book.loanedTo = null;
      await writeData(data);
      res.status(200).json(book);
    } else {
      res.status(400).json({ message: 'Book is not loaned out' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update Book
app.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author } = req.body;
    const data = await readData();
    const book = data.books.find(book => book.id === parseInt(id));
    if (book) {
      book.title = title || book.title;
      book.author = author || book.author;
      await writeData(data);
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
