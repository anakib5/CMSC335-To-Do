require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const todosRouter = require('./routes/todos');
const quotesRouter = require('./routes/quotes');

const app = express();

// ------------------------------
// MongoDB Connection
// ------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// ------------------------------
// Middleware
// ------------------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); // Form data
app.use(express.static(path.join(__dirname, 'public'))); // CSS, images, JS

// ------------------------------
// Main routes
// ------------------------------
app.get('/', (req, res) => {
  res.redirect('/add'); // Default landing page
});

// Use routers
app.use('/', todosRouter);
app.use('/', quotesRouter);

// ------------------------------
// Server Start
// ------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});